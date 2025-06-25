import { useState } from 'react'

import { DATE_FORMAT, formatDateFromApi } from '@baseapp-frontend/utils'

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Invoice } from '../types'
import { InvoiceListTableProps } from './types'

const InvoiceListTable = ({ title, titleProps, tableProps, rowProps }: InvoiceListTableProps) => {
  const [page, setPage] = useState(1)

  const { useListInvoices } = useStripeHook()
  const { data, isLoading, isFetching } = useListInvoices({ page })

  const receipts = data?.results || []

  const getStatusColor = (status: string) => {
    if (status === 'paid') return 'success'
    if (status === 'failed') return 'error'
    return 'warning'
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" sx={{ p: 2 }} {...titleProps}>
        {title ?? 'Order History'}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <Table {...tableProps}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching && <CircularProgress sx={{ margin: 'auto' }} />}
            {receipts.length === 0 ? (
              <TableRow {...rowProps}>
                <TableCell colSpan={5} sx={{ p: 0, paddingX: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    No receipts found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              receipts.map((row: Invoice) => {
                const color = getStatusColor(row.status)
                const amountDue = (row.amountDue / 100).toFixed(2) ?? ''
                const formattedDate =
                  formatDateFromApi(row.webhooksDeliveredAt, { toFormat: DATE_FORMAT[1] }) ?? ''
                return (
                  <TableRow key={row.id} {...rowProps}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {row.lines?.[0]?.description ?? ''}
                      </Typography>
                    </TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <Chip label={row.status} color={color} variant="soft" size="small" />
                    </TableCell>
                    <TableCell>{amountDue ? `$${amountDue}` : '-'}</TableCell>
                    <TableCell>
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
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} sx={{ p: 0, paddingX: 2 }}>
                <Box display="flex" justifyContent="flex-end" width="100%">
                  <Pagination
                    count={(data?.count ?? 0) / 10}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Box>
  )
}

export default InvoiceListTable
