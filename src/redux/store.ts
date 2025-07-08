import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './slices/expenseSlice'
import statisticsReducer from './slices/statsSlice'
import generalReducer from './slices/generalSlice'
// Import slices here when created

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    statistics: statisticsReducer,
    general: generalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store 