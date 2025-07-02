import { useState } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { DATE_FORMAT, formatDateFromApi } from '@baseapp-frontend/utils'

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Invoice } from '../types'
import { InvoiceListTableProps } from './types'

const InvoiceListTable = ({
  title,
  titleProps,
  tableProps,
  rowProps,
  cellProps,
}: InvoiceListTableProps) => {
  const [page, setPage] = useState(1)

  const smDown = useResponsive('down', 'sm')
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
        {title ?? 'Subscription Receipts'}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : (
        <TableContainer>
          <Table {...tableProps}>
            <TableHead>
              {smDown ? (
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Info</TableCell>
                  <TableCell />
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              )}
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
                  return smDown ? (
                    <TableRow key={row.id} {...rowProps}>
                      <TableCell {...cellProps}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {row.lines?.[0]?.description ?? ''}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formattedDate}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell {...cellProps}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'flex-end',
                          }}
                        >
                          <Chip label={row.status} color={color} variant="soft" size="small" />
                          <Typography variant="body2">
                            {amountDue ? `$${amountDue}` : '-'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell {...cellProps}>
                        <IconButton
                          onClick={() => {
                            window.open(row.hostedInvoiceUrl, '_blank')
                          }}
                          disabled={!row.hostedInvoiceUrl}
                        >
                          <ChevronIcon position="right" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : (
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
        </TableContainer>
      )}
    </Box>
  )
}

export default InvoiceListTable
