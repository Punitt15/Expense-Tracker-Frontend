import type { Expense } from '../types/expense.interface'

interface ExpenseTableProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: number) => void
}

export default function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  console.log(expenses)
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td className="action-buttons">{exp.user_name}</td>
            <td>{exp.category_name}</td>
            <td>₹{exp.amount.toFixed(2)}</td>
            <td className="action-buttons">{new Date(exp.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</td>
            <td>{exp.description}</td>
            <td className="action-buttons">
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(exp)}
                title="Edit"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => exp.id && onDelete(exp.id)}
                title="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
