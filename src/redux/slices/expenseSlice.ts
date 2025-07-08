import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as expenseApi from '../api/expenseApi'
import type { ExpenseState } from '../../types/expense.interface'
import type { RootState } from '../store'

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
}

export const fetchExpensesThunk = createAsyncThunk(
  'expenses/fetchAll',
  async (filters?: { user_id?: string; category?: string; startDate?: string; endDate?: string }) => {
    return await expenseApi.getExpenses(filters)
  }
)

export const addExpenseThunk = createAsyncThunk('expenses/add', async (expense: any) => {
  return await expenseApi.addExpense(expense)
})

export const editExpenseThunk = createAsyncThunk('expenses/edit', async ({ id, expense }: { id: number, expense: any }) => {
  return await expenseApi.editExpense(id, expense)
})

export const deleteExpenseThunk = createAsyncThunk('expenses/delete', async (id: number) => {
  await expenseApi.deleteExpense(id)
  return id
})

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.expenses = Array.isArray(action.payload) ? action.payload : action.payload.expenses
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        console.log('Res', action);
        state.loading = false
        state.error = action.error.message || 'Failed to fetch expenses'
      })
      .addCase(addExpenseThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addExpenseThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to add expense'
      })
      .addCase(editExpenseThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editExpenseThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(editExpenseThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to edit expense'
      })
      .addCase(deleteExpenseThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.loading = false
        state.expenses = state.expenses.filter(e => e.id !== action.payload)
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete expense'
      })
  },
})

export const selectExpenses = (state: RootState) => state.expenses.expenses
export const selectLoading = (state: RootState) => state.expenses.loading
export const selectError = (state: RootState) => state.expenses.error

export default expenseSlice.reducer


