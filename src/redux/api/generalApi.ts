const API_BASE = import.meta.env.VITE_API_BASE as string;

export async function getUsers() {
  const res = await fetch(`${API_BASE}/user`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/category`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
} 