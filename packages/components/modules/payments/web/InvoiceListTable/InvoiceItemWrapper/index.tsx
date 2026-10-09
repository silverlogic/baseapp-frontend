import { useIntl } from 'react-intl'

import { STATUS_COLORS } from '../../utils'
import InvoiceItemTableRow from '../InvoiceItemTableRow'
import MobileInvoiceItemTableRow from '../MobileInvoiceItemTableRow'
import { INVOICE_STATUS_MESSAGES } from '../constants'
import { InvoiceItemWrapperProps } from '../types'

const InvoiceItemWrapper = ({ row, rowProps, cellProps, smDown }: InvoiceItemWrapperProps) => {
  const intl = useIntl()
  const amountDue = intl.formatNumber(row.amountDue / 100, { style: 'currency', currency: 'USD' })
  const formattedDate = row.webhooksDeliveredAt
    ? intl.formatDate(row.webhooksDeliveredAt, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''
  const statusMessage = INVOICE_STATUS_MESSAGES[row.status]
  const statusLabel = statusMessage ? intl.formatMessage(statusMessage) : row.status

  const getStatusColor = (status: string) => STATUS_COLORS[status as keyof typeof STATUS_COLORS]

  if (smDown) {
    return (
      <MobileInvoiceItemTableRow
        row={row}
        rowProps={rowProps}
        cellProps={cellProps}
        formattedDate={formattedDate}
        amountDue={amountDue}
        statusLabel={statusLabel}
        color={getStatusColor(row.status)}
      />
    )
  }

  return (
    <InvoiceItemTableRow
      row={row}
      rowProps={rowProps}
      cellProps={cellProps}
      formattedDate={formattedDate}
      amountDue={amountDue}
      statusLabel={statusLabel}
      color={getStatusColor(row.status)}
    />
  )
}

export default InvoiceItemWrapper
