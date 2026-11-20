import { Button, Chip, TableCell, TableRow, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { INVOICE_TABLE_MESSAGES } from '../constants'
import { InvoiceItemTableRowProps } from '../types'

const InvoiceItemTableRow = ({
  row,
  rowProps,
  cellProps,
  formattedDate,
  amountDue,
  statusLabel,
  color,
}: InvoiceItemTableRowProps) => (
  <TableRow key={row.id} {...rowProps}>
    <TableCell {...cellProps}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {row.lines?.[0]?.description ?? ''}
      </Typography>
    </TableCell>
    <TableCell {...cellProps}>{formattedDate}</TableCell>
    <TableCell {...cellProps}>
      <Chip label={statusLabel} color={color} variant="soft" size="small" />
    </TableCell>
    <TableCell {...cellProps}>{amountDue || '-'}</TableCell>
    <TableCell {...cellProps}>
      <Button
        variant="soft"
        color="inherit"
        size="small"
        onClick={() => {
          window.open(row.hostedInvoiceUrl, '_blank')
        }}
        disabled={!row.hostedInvoiceUrl}
      >
        <FormattedMessage {...INVOICE_TABLE_MESSAGES.receipt} />
      </Button>
    </TableCell>
  </TableRow>
)

export default InvoiceItemTableRow
