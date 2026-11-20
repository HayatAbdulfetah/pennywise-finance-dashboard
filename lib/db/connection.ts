import mongoose from 'mongoose';

/**
 * Interface defining the shape of our cached Mongoose connection.
 */
interface MongooseConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * In development, Next.js rebuilds and re-evaluates modules on hot reload.
 * Storing the connection in the global object ensures the connection is cached
 * and reused across module re-evaluations, preventing connection pool exhaustion.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseConnectionCache | undefined;
}

let cached: MongooseConnectionCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Establishes or retrieves a cached connection to MongoDB using Mongoose.
 * 
 * @returns {Promise<typeof mongoose>} Active Mongoose instance
 * @throws {Error} If MONGODB_URI is not set in environment variables
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Invalid/Missing environment variable: "MONGODB_URI". ' +
        'Please define MONGODB_URI in your .env.local file.'
    );
  }

  // Return existing active connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is not already in flight, create one
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((error) => {
        // Reset promise on error so subsequent attempts can retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/**
 * Helper utility to inspect current Mongoose connection state.
 * 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
export function getConnectionState(): {
  readyState: number;
  status: 'disconnected' | 'connected' | 'connecting' | 'disconnecting' | 'uninitialized';
} {
  const stateMap: Record<number, 'disconnected' | 'connected' | 'connecting' | 'disconnecting'> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const readyState = mongoose.connection.readyState;
  return {
    readyState,
    status: stateMap[readyState] || 'uninitialized',
  };
}

export default connectToDatabase;
