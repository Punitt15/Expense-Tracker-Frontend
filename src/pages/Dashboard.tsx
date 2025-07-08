import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExpenseFilters from '../components/ExpenseFilters'
import ExpenseTable from '../components/ExpenseTable'
import ExpenseModal from '../components/ExpenseModal'
import Toast, { type ToastType } from '../components/Toast'
import Loader from '../components/Loader'
import type { AppDispatch } from '../redux/store'
import {
  fetchExpensesThunk,
  addExpenseThunk,
  editExpenseThunk,
  deleteExpenseThunk,
  selectLoading,
  selectError,
  selectExpenses
} from '../redux/slices/expenseSlice'
import {
  fetchTopSpendingDaysThunk,
  fetchMonthlyChangeThunk,
  fetchPredictionThunk,
  selectTopSpendingDays,
  selectMonthlyChange,
  selectPrediction
} from '../redux/slices/statsSlice'
import { fetchUsersThunk, fetchCategoriesThunk, selectUsers, selectCategories } from '../redux/slices/generalSlice'
import type { Expense } from '../types/expense.interface'
import type { Filters, TopSpendingDay, MonthlyChangeData, PredictionData } from '../types/dashboard.interface'
import styles from './Dashboard.module.css'
import { getLastNDaysRange } from '../utils/dateHelpers'

interface ToastState {
  isVisible: boolean
  message: string
  type: ToastType
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUsers)
  const categories = useSelector(selectCategories)
  const expenses = useSelector(selectExpenses) as Expense[]
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const topSpendingDays = useSelector(selectTopSpendingDays) as TopSpendingDay[]
  const monthlyChange = useSelector(selectMonthlyChange) as unknown as MonthlyChangeData
  const prediction = useSelector(selectPrediction) as PredictionData

  console.log('monthlyChange', JSON.stringify(monthlyChange));
  console.log('prediction', JSON.stringify(prediction));

  const defaultDateRange = getLastNDaysRange(30);
  const [filters, setFilters] = useState<Filters>({
    user_id: '',
    category: '',
    startDate: defaultDateRange.startDate,
    endDate: defaultDateRange.endDate,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [editExpense, setEditExpense] = useState<Expense | null>(null)
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'info'
  })

  const showToast = (message: string, type: ToastType) => {
    setToast({ isVisible: true, message, type })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchCategoriesThunk())
    dispatch(fetchTopSpendingDaysThunk())
    dispatch(fetchMonthlyChangeThunk())
    dispatch(fetchPredictionThunk())

  }, [dispatch])

  useEffect(() => {
    dispatch(fetchExpensesThunk(filters))
  }, [dispatch, filters])

  // Filter logic
  const filteredExpenses = expenses || [];

  const handleAddExpense = () => {
    setModalMode('add')
    setEditExpense(null)
    setModalOpen(true)
  }

  const handleEditExpense = (expense: Expense) => {
    setModalMode('edit')
    const { category_name, user_name, ...cleanExpense } = expense
    setEditExpense(cleanExpense)
    setModalOpen(true)
  }

  const handleSaveExpense = async (data: Expense) => {
    console.log('====data', data);
    try {
      if (modalMode === 'edit' && editExpense) {
        const result = await dispatch(editExpenseThunk({ id: editExpense.id!, expense: data }))
        const payload = result.payload as any
        console.log('Edit response:', payload)
        if (payload?.message) {
          showToast(payload.message, 'success')
        } else if (payload?.data?.message) {
          showToast(payload.data.message, 'success')
        } else {
          showToast('Expense updated successfully!', 'success')
        }
      } else {
        const result = await dispatch(addExpenseThunk({ ...data, id: 0 }))
        const payload = result.payload as any
        if (payload?.message) {
          showToast(payload.message, 'success')
        } else if (payload?.data?.message) {
          showToast(payload.data.message, 'success')
        } else {
          showToast('Expense added successfully!', 'success')
        }
      }
      await dispatch(fetchExpensesThunk(filters))
      dispatch(fetchTopSpendingDaysThunk())
      dispatch(fetchMonthlyChangeThunk())
      dispatch(fetchPredictionThunk())
      setModalOpen(false)
      setEditExpense(null)
    } catch (error: any) {
      console.error('Save error:', error)
      showToast(error?.message || 'Failed to save expense. Please try again.', 'error')
    }
  }

  const handleDeleteExpense = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const result = await dispatch(deleteExpenseThunk(id))
        const payload = result.payload as any
        console.log('Delete response:', payload)
        if (payload?.message) {
          showToast(payload.message, 'success')
        } else if (payload?.data?.message) {
          showToast(payload.data.message, 'success')
        } else {
          showToast('Expense deleted successfully!', 'success')
        }
      } catch (error: any) {
        console.error('Delete error:', error)
        showToast(error?.message || 'Failed to delete expense. Please try again.', 'error')
      }
    }
  }

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardHeader}>
        <h1>Expense Dashboard</h1>
        <button className={styles.addExpenseBtn} onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className={styles.filtersSection}>
        {users.length > 0 && categories.length > 0 && <ExpenseFilters users={users} categories={categories} filters={filters} onChange={setFilters} />} 
      </div>
      {loading && (
        <div className={styles.loadingMessage}>
          <Loader size="large" />
          <span className="ml-2">Loading expenses...</span>
        </div>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.tableSection}>
        {filteredExpenses && filteredExpenses.length > 0 ? <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        /> : <p className={styles.noDataMessage}>No expenses found</p>}
      </div>
      {users.length > 0 && categories.length > 0 && <ExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveExpense}
        users={users}
        categories={categories}
        initialData={editExpense || undefined}
        mode={modalMode}
      />}
      <div className={styles.statistics}>
        <div className={styles.statCard}>
          <h3>Top 3 Spending Days</h3>
          {topSpendingDays && topSpendingDays.length > 0 ? (
            <div>
              {(() => {
                // Group by user
                const groupedByUser = topSpendingDays.reduce((acc, day) => {
                  const userName = users.find((u) => u.id.toString() === day.user)?.name || `User ${day.user}`;
                  if (!acc[userName]) {
                    acc[userName] = [];
                  }
                  acc[userName].push(day);
                  return acc;
                }, {} as Record<string, typeof topSpendingDays>);

                return Object.entries(groupedByUser).map(([userName, userDays]) => (
                  <div key={userName} className={styles.userSection}>
                    <h4 className={styles.userName}>{userName}</h4>
                    <ul className={styles.userList}>
                      {userDays.map((day, index) => (
                        <li key={index}>
                          ₹{day.amount.toFixed(2)} on {new Date(day.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </li>
                      ))}
                    </ul>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <p className={styles.noDataMessage}>No data available</p>
          )}
        </div>
        <div className={styles.statCard}>
          <h3>Monthly Change (%)</h3>
          {monthlyChange && monthlyChange.data && Object.keys(monthlyChange.data).length > 0 ? (
            <div>
              {(() => {
                // Transform the object format to grouped format
                const groupedByUser = Object.entries(monthlyChange.data).reduce((acc, [userId, change]) => {
                  const userName = users.find((u) => u.id.toString() === userId)?.name || `User ${userId}`;
                  if (!acc[userName]) {
                    acc[userName] = [];
                  }
                  acc[userName].push({ change: change as number });
                  return acc;
                }, {} as Record<string, { change: number }[]>);

                return Object.entries(groupedByUser).map(([userName, userChanges]) => (
                  <div key={userName} className={styles.userSection}>
                    <h4 className={styles.userName}>{userName}</h4>
                    <ul className={styles.userList}>
                      {(userChanges as { change: number | null }[]).map((item, index) => (
                        <li key={index}>
                          {typeof item.change === 'number'
                            ? `${item.change > 0 ? '+' : ''}${item.change.toFixed(2)}%`
                            : 'Data Not Found'}
                        </li>
                      ))}
                    </ul>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <p className={styles.noDataMessage}>No data available</p>
          )}
        </div>
        <div className={styles.statCard}>
          <h3>Next Month's Prediction</h3>
          {prediction && prediction?.data && Object.keys(prediction.data).length > 0 ? (
            <div>
              {(() => {
                // Transform the object format to grouped format
                const groupedByUser = Object.entries(prediction.data).reduce((acc, [userId, amount]) => {
                  const userName = users.find((u) => u.id.toString() === userId)?.name || `User ${userId}`;
                  if (!acc[userName]) {
                    acc[userName] = [];
                  }
                  acc[userName].push({ amount: amount as number });
                  return acc;
                }, {} as Record<string, { amount: number }[]>);

                return Object.entries(groupedByUser).map(([userName, userPredictions]) => (
                  <div key={userName} className={styles.userSection}>
                    <h4 className={styles.userName}>{userName}</h4>
                    <ul className={styles.userList}>
                      {(userPredictions as { amount: number }[]).map((item, index) => (
                        <li key={index}>
                          ₹{item.amount.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <p className={styles.noDataMessage}>No data available</p>
          )}
        </div>
      </div>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  )
}
