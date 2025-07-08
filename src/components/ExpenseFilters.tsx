import { getLastNDaysRange } from "../utils/dateHelpers"

interface Filters {
  user_id: string
  category: string
  startDate: string
  endDate: string
}

interface ExpenseFiltersProps {
  users: { id: number; name: string }[]
  categories: { id: number; name: string }[]
  filters: Filters
  onChange: (filters: Filters) => void
}

export default function ExpenseFilters({ users, categories, filters, onChange }: ExpenseFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log('====hERE', e.target.name, e.target.value);
    onChange({ ...filters, [e.target.name]: e.target.value })
  }

  const defaultDateRange = getLastNDaysRange(30);

  return (
    <div className="filters">
      <div className="filters-header">
        <h2>Filters</h2>
        <button onClick={() => onChange({ ...filters, user_id: '', category: '', startDate: defaultDateRange.startDate, endDate: defaultDateRange.endDate })}>Clear</button>
      </div>
      <div className="filters-form">
        <select name="user_id" value={filters.user_id} onChange={handleChange}>
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input name="startDate" type="date" max={filters.endDate} value={filters.startDate} onChange={handleChange} />
        <input name="endDate" type="date" min={filters.startDate} value={filters.endDate} onChange={handleChange} />
      </div>
    </div>
  )
}
