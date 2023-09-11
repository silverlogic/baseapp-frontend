import { OrderingDirection } from '../../types/django'

export interface IDjangoOrderByOptions<OrderPair extends Record<string, OrderingDirection>> {
  defaultPairs: OrderPair
  descendingOrderPrefix?: string
}
