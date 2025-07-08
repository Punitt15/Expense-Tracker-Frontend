// Helper to get YYYY-MM-DD for first and last day of current month
export function getCurrentMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}

// Helper to get YYYY-MM-DD for the last N days (including today)
export function getLastNDaysRange(n: number) {
  const end = new Date();
  end.setDate(end.getDate() + 1); // exclusive end
  const start = new Date(end);
  start.setDate(end.getDate() - n);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}
