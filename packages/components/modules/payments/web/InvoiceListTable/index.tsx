import { ChangeEvent, useState } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Invoice } from '../types'
import InvoiceItemWrapper from './components/InvoiceItemWrapper'
import InvoiceListTableFooter from './components/InvoiceListTableFooter'
import InvoiceListTableHeader from './components/InvoiceListTableHeader'
import { InvoiceListTableProps } from './types'

const InvoiceListTable = ({
  title,
  titleProps,
  tableProps,
  headerProps,
  rowProps,
  cellProps,
  footerProps,
  entityId,
}: InvoiceListTableProps) => {
  const [page, setPage] = useState(1)

  const smDown = useResponsive('down', 'sm')
  const { useListInvoices } = useStripeHook()
  const { data, isLoading, isFetching } = useListInvoices({ page, entityId })

  const receipts = data?.results ?? []
  const isResultsEmpty = receipts.length === 0
  const { onChange, ...restFooterProps } = footerProps ?? {}

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
            <InvoiceListTableHeader smDown={smDown} {...headerProps} />
            <TableBody>
              {isFetching && <CircularProgress sx={{ margin: 'auto' }} />}
              {isResultsEmpty ? (
                <TableRow {...rowProps}>
                  <TableCell colSpan={5} sx={{ p: 0, paddingX: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      No receipts found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                receipts.map((row: Invoice) => (
                  <InvoiceItemWrapper
                    key={row.id}
                    row={row}
                    rowProps={rowProps}
                    cellProps={cellProps}
                    smDown={smDown}
                  />
                ))
              )}
            </TableBody>
            <InvoiceListTableFooter
              count={data?.count}
              page={page}
              onChange={(event: ChangeEvent<unknown>, pageNumber: number) => {
                setPage(pageNumber)
                onChange?.(event as ChangeEvent<HTMLTableSectionElement>)
              }}
              {...restFooterProps}
            />
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default InvoiceListTable
