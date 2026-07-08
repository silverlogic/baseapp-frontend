/**
 * Structural shape of one page of a cursor-based (Relay-style) connection, so any generated
 * connection type is accepted without depending on relay-runtime.
 */
export interface ConnectionPage<TNode> {
  readonly edges:
    | ReadonlyArray<{ readonly node: TNode | null | undefined } | null | undefined>
    | null
    | undefined
  readonly pageInfo: {
    readonly hasNextPage: boolean
    readonly endCursor: string | null | undefined
  }
}

export type FetchConnectionPage<TNode> = (
  after: string | null,
) => Promise<ConnectionPage<TNode> | null | undefined>

export interface FetchAllConnectionNodesOptions {
  /** Backstop against a cursor loop that never terminates. */
  maxPages?: number
}
