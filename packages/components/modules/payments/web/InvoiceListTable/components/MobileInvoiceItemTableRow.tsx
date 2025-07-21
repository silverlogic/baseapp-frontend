import { Button, Chip, TableCell, TableRow, Typography } from '@mui/material'

import { InvoiceItemTableRowProps } from '../types'

const MobileInvoiceItemTableRow = ({
  row,
  rowProps,
  cellProps,
  formattedDate,
  amountDue,
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
      <Chip label={row.status} color={color} variant="soft" size="small" />
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

export default MobileInvoiceItemTableRow
