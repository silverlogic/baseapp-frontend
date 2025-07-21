import { DATE_FORMAT, formatDateFromApi } from '@baseapp-frontend/utils'

import { STATUS_COLORS } from '../../utils'
import { InvoiceItemWrapperProps } from '../types'
import InvoiceItemTableRow from './InvoiceItemTableRow'
import MobileInvoiceItemTableRow from './MobileInvoiceItemTableRow'

const InvoiceItemWrapper = ({ row, rowProps, cellProps, smDown }: InvoiceItemWrapperProps) => {
  const amountDue = (row.amountDue / 100).toFixed(2) ?? ''
  const formattedDate =
    formatDateFromApi(row.webhooksDeliveredAt, { toFormat: DATE_FORMAT[1] }) ?? ''

  const getStatusColor = (status: string) => STATUS_COLORS[status as keyof typeof STATUS_COLORS]

  if (smDown) {
    return (
      <MobileInvoiceItemTableRow
        row={row}
        rowProps={rowProps}
        cellProps={cellProps}
        formattedDate={formattedDate}
        amountDue={amountDue}
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
      color={getStatusColor(row.status)}
    />
  )
}

export default InvoiceItemWrapper
