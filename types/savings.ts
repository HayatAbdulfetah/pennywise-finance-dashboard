export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // YYYY-MM-DD
  category: 'emergency' | 'travel' | 'purchase' | 'investment' | 'education' | 'other';
  color?: string;
  monthlyContribution?: number;
}

export interface SavingsSummaryData {
  totalTarget: number;
  totalSaved: number;
  remainingToSave: number;
  overallProgress: number;
  activeGoalsCount: number;
}
