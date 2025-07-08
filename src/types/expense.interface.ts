export interface Expense {
  id?: number
  user_id: number
  category: number
  amount: number
  date: string
  description: string
  user_name?: string
  category_name?: string
}

export interface ExpenseState {
  expenses: Expense[]
  loading: boolean
  error: string | null
} 