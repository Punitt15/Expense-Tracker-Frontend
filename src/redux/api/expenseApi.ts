const API_BASE = import.meta.env.VITE_API_BASE as string;

export async function getExpenses(filters?: { user_id?: string; category?: string; startDate?: string; endDate?: string }) {
  let url = `${API_BASE}/expenses`;
  if (filters) {
    const params = new URLSearchParams();
    if (filters.user_id) params.append('user_id', filters.user_id);
    if (filters.category) params.append('category', filters.category);
    if (filters.startDate) params.append('start_date', filters.startDate);
    if (filters.endDate) params.append('end_date', filters.endDate);
    if(params.toString()) {
      url += `?${params.toString()}`;
    }
  }
  console.log('URL', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}

export async function addExpense(expense: any) {
  const res = await fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
  if (!res.ok) throw new Error('Failed to add expense')
  return res.json()
}

export async function editExpense(id: number, expense: any) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  })
  if (!res.ok) throw new Error('Failed to edit expense')
  return res.json()
}

export async function deleteExpense(id: number) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete expense')
  return res.json()
}
