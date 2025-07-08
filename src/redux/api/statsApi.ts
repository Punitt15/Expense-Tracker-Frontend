const API_BASE = import.meta.env.VITE_API_BASE as string;

export async function getTopSpendingDays() {
  const res = await fetch(`${API_BASE}/stats/top-days`)
  if (!res.ok) throw new Error('Failed to fetch top spending days')
  return res.json()
}

export async function getMonthlyChange() {
  const res = await fetch(`${API_BASE}/stats/monthly-change`)
  if (!res.ok) throw new Error('Failed to fetch monthly change')
  return res.json()
}

export async function predictNextMonth() {
  const res = await fetch(`${API_BASE}/stats/predict-next-month`)
  if (!res.ok) throw new Error('Failed to fetch prediction')
  return res.json()
} 