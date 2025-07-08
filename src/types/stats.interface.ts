// Stats-related state for Redux
export interface TopSpendingDay {
  user: string
  amount: number
  date: string
}

export interface StatsState {
  topSpendingDays: TopSpendingDay[]
  monthlyChange: Record<string, number>
  prediction: Record<string, number> | null
  loading: boolean
  error: string | null
} 