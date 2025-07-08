import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as statsApi from '../api/statsApi'
import type { RootState } from '../store'
import type { StatsState, TopSpendingDay } from '../../types/stats.interface'

const initialState: StatsState = {
  topSpendingDays: [],
  monthlyChange: {},
  prediction: null,
  loading: false,
  error: null,
}

export const fetchTopSpendingDaysThunk = createAsyncThunk('stats/topSpendingDays', async () => {
  return await statsApi.getTopSpendingDays()
})

export const fetchMonthlyChangeThunk = createAsyncThunk('stats/monthlyChange', async () => {
  return await statsApi.getMonthlyChange()
})

export const fetchPredictionThunk = createAsyncThunk('stats/prediction', async () => {
  return await statsApi.predictNextMonth()
})


const statsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSpendingDaysThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopSpendingDaysThunk.fulfilled, (state, action) => {
        state.loading = false
        // Transform the data format to match the expected structure
        const responseData = action.payload.data;
        const transformedData: TopSpendingDay[] = [];
        
        // Convert the object format to array format
        Object.entries(responseData).forEach(([userId, days]) => {
          (days as any[]).forEach((day: any) => {
            transformedData.push({
              user: userId,
              amount: day.total,
              date: day.date
            });
          });
        });
        
        state.topSpendingDays = transformedData;
      })
      .addCase(fetchTopSpendingDaysThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch top spending days'
      })
      .addCase(fetchMonthlyChangeThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMonthlyChangeThunk.fulfilled, (state, action) => {
        state.loading = false
        state.monthlyChange = action.payload
      })
      .addCase(fetchMonthlyChangeThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch monthly change'
      })
      .addCase(fetchPredictionThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPredictionThunk.fulfilled, (state, action) => {
        state.loading = false
        state.prediction = action.payload
      })
      .addCase(fetchPredictionThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch prediction'
      })
  },
})

export const selectTopSpendingDays = (state: RootState) => state.statistics.topSpendingDays
export const selectMonthlyChange = (state: RootState) => state.statistics.monthlyChange
export const selectPrediction = (state: RootState) => state.statistics.prediction
export const selectStatsLoading = (state: RootState) => state.statistics.loading
export const selectStatsError = (state: RootState) => state.statistics.error

export default statsSlice.reducer 