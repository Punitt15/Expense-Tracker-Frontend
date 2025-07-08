import Joi from 'joi'
import { useState, useEffect } from 'react'
import type { Expense } from '../types/expense.interface'
import '../index.css'

interface ExpenseModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: Expense) => void
  users: { id: number; name: string }[]
  categories: { id: number; name: string }[]
  initialData?: Expense
  mode: 'add' | 'edit'
}

const defaultExpense: Expense = {
  user_id: 0,
  category: 0,
  amount: 0,
  date: '',
  description: '',
}

export default function ExpenseModal({
  open,
  onClose,
  onSave,
  users,
  categories,
  initialData,
  mode
}: ExpenseModalProps) {
  const [form, setForm] = useState<Expense>(initialData || defaultExpense)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  console.log(form)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  useEffect(() => {
    setForm(initialData || defaultExpense)
    setErrors({})
  }, [initialData, mode])

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value: any = e.target.value;
    if (e.target.name === 'user_id' || e.target.name === 'category') {
      value = value === '' ? 0 : Number(value);
    } else if (e.target.name === 'amount') {
      value = Number(value);
    }
    setForm({ ...form, [e.target.name]: value });
  }

  const expenseSchema = Joi.object({
    id: Joi.number().optional(),
    user_id: Joi.number().greater(0).required().messages({
      'any.required': 'User is required',
      'number.greater': 'User is required',
      'number.base': 'User is required'
    }),
    category: Joi.number().greater(0).required().messages({
      'any.required': 'Category is required',
      'number.base': 'Category is required',
      'number.greater': 'Category is required'
    }),
    amount: Joi.number().greater(0).required().messages({
      'any.required': 'Amount is required',
      'number.base': 'Amount must be a number',
      'number.greater': 'Amount must be greater than 0'
    }),
    date: Joi.string().required().messages({
      'any.required': 'Date is required',
      'string.empty': 'Date is required'
    }),
    description: Joi.string().allow('').optional()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = expenseSchema.validate(form, { abortEarly: false })
    console.log(error)
    if (error) {
      const fieldErrors: { [key: string]: string } = {}
      error.details.forEach((detail) => {
        if (detail.path[0]) fieldErrors[detail.path[0] as string] = detail.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    onSave(form)
    if (mode === 'add') {
      setForm(defaultExpense) // Reset form after adding
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'add' ? 'Add Expense' : 'Edit Expense'}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <select name="user_id" value={form.user_id} onChange={handleChange} >
            <option value={0}>Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {errors.user_id && <div className="form-error">{errors.user_id}</div>}
          <select name="category" value={form.category} onChange={handleChange}>
            <option value={0}>Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.category && <div className="form-error">{errors.category}</div>}
          <input name="amount" type="number" placeholder="Amount" value={form.amount || ''} onChange={handleChange}  />
          {errors.amount && <div className="form-error">{errors.amount}</div>}
          <input name="date" type="date" value={form.date} onChange={handleChange}  />
          {errors.date && <div className="form-error">{errors.date}</div>}
          <input name="description" type="text" placeholder="Description" value={form.description} onChange={handleChange} />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="add-expense-btn">
              {mode === 'add' ? 'Add Expense' : 'Save Changes'}
            </button>
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
