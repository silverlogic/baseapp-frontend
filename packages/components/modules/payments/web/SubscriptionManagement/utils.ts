export const getChipLabelAndColorByStatus = (status: string) => {
  let label = ''
  let color: 'success' | 'error' | 'warning' | 'info' | '' = ''
  if (status === 'active' || status === 'trialing') {
    label = 'Active'
    color = 'success'
  }
  if (status === 'incomplete') {
    // The first payment has not cleared. Calling it Active told the user they were
    // paid up when they were not, and this is the state checkout itself produces.
    label = 'Pending'
    color = 'warning'
  }
  if (status === 'canceled' || status === 'incomplete_expired') {
    label = 'Canceled'
    color = 'error'
  }
  if (status === 'past_due') {
    label = 'Past Due'
    color = 'warning'
  }
  if (status === 'unpaid') {
    label = 'Unpaid'
    color = 'error'
  }
  return { label, color }
}
