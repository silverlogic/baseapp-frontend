export const getChipLabelAndColorByStatus = (status: string) => {
  let label = ''
  let color: 'success' | 'error' | 'warning' | 'info' | '' = ''
  if (status === 'active' || status === 'trialing' || status === 'incomplete') {
    label = 'Active'
    color = 'success'
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
