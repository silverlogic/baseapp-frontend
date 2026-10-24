import { TableCell, TableHead, TableRow } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { INVOICE_TABLE_MESSAGES } from '../constants'
import { InvoiceListTableHeaderProps } from '../types'

const InvoiceListTableHeader = ({ smDown, headerProps }: InvoiceListTableHeaderProps) => {
  if (smDown) {
    return (
      <TableHead {...headerProps}>
        <TableRow>
          <TableCell>
            <FormattedMessage {...INVOICE_TABLE_MESSAGES.description} />
          </TableCell>
          <TableCell>
            <FormattedMessage id="payments.invoices.header.info" defaultMessage="Info" />
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    )
  }

  return (
    <TableHead {...headerProps}>
      <TableRow>
        <TableCell>
          <FormattedMessage {...INVOICE_TABLE_MESSAGES.description} />
        </TableCell>
        <TableCell>
          <FormattedMessage id="payments.invoices.header.date" defaultMessage="Date" />
        </TableCell>
        <TableCell>
          <FormattedMessage id="payments.invoices.header.status" defaultMessage="Status" />
        </TableCell>
        <TableCell>
          <FormattedMessage id="payments.invoices.header.amount" defaultMessage="Amount" />
        </TableCell>
        <TableCell>
          <FormattedMessage id="payments.invoices.header.details" defaultMessage="Details" />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default InvoiceListTableHeader
