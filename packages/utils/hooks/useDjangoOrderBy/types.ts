import { OrderingDirection } from '../../types/django'

export interface DjangoOrderByOptions<OrderPair extends Record<string, OrderingDirection>> {
  defaultPairs: OrderPair
  descendingOrderPrefix?: string
}
