import { Button, Chip, TableCell, TableRow, Typography } from '@mui/material'

import { InvoiceItemTableRowProps } from '../types'
import { formatInvoiceDescription, getInvoiceStatusLabel, truncateText } from '../utils'

const InvoiceItemTableRow = ({
  row,
  rowProps,
  cellProps,
  formattedDate,
  amountDue,
  color,
}: InvoiceItemTableRowProps) => {
  // The full text stays available on hover when the list cuts it.
  const description = formatInvoiceDescription(row.lines)

  return (
    <TableRow key={row.id} {...rowProps}>
      <TableCell {...cellProps}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }} title={description}>
          {truncateText(description)}
        </Typography>
      </TableCell>
      <TableCell {...cellProps}>{formattedDate}</TableCell>
      <TableCell {...cellProps}>
        <Chip label={getInvoiceStatusLabel(row.status)} color={color} variant="soft" size="small" />
      </TableCell>
      <TableCell {...cellProps}>{amountDue ? `$${amountDue}` : '-'}</TableCell>
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
          Receipt
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default InvoiceItemTableRow
