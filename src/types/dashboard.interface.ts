export interface Filters {
  user_id: string
  category: string
  startDate: string
  endDate: string
}

export interface TopSpendingDay {
  user: string
  amount: number
  date: string
}

export interface MonthlyChangeData {
  [key: string]: number
}

export interface PredictionData {
  [key: string]: number
} 