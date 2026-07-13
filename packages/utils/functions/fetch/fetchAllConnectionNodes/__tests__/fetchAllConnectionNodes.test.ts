import { fetchAllConnectionNodes } from '../index'
import { ConnectionPage } from '../types'

type Node = { name: string }

const page = (
  nodes: (Node | null)[],
  endCursor: string | null,
  hasNextPage: boolean,
): ConnectionPage<Node> => ({
  edges: nodes.map((node) => (node ? { node } : null)),
  pageInfo: { hasNextPage, endCursor },
})

describe('fetchAllConnectionNodes', () => {
  it('follows cursors until hasNextPage is false and flattens nodes', async () => {
    const fetchPage = jest
      .fn<Promise<ConnectionPage<Node>>, [string | null]>()
      .mockResolvedValueOnce(page([{ name: 'a' }, { name: 'b' }], 'cursor-1', true))
      .mockResolvedValueOnce(page([{ name: 'c' }], 'cursor-2', false))

    const nodes = await fetchAllConnectionNodes(fetchPage)

    expect(nodes).toEqual([{ name: 'a' }, { name: 'b' }, { name: 'c' }])
    expect(fetchPage).toHaveBeenNthCalledWith(1, null)
    expect(fetchPage).toHaveBeenNthCalledWith(2, 'cursor-1')
    expect(fetchPage).toHaveBeenCalledTimes(2)
  })

  it('skips null edges and nodes', async () => {
    const fetchPage = jest.fn().mockResolvedValue(page([{ name: 'a' }, null], null, false))
    expect(await fetchAllConnectionNodes(fetchPage)).toEqual([{ name: 'a' }])
  })

  it('stops when a page is missing', async () => {
    const fetchPage = jest.fn().mockResolvedValue(null)
    expect(await fetchAllConnectionNodes(fetchPage)).toEqual([])
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })

  it('stops when hasNextPage is true but the cursor is missing', async () => {
    const fetchPage = jest.fn().mockResolvedValue(page([{ name: 'a' }], null, true))
    expect(await fetchAllConnectionNodes(fetchPage)).toEqual([{ name: 'a' }])
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })

  it('honors the maxPages backstop when the connection never terminates', async () => {
    const fetchPage = jest.fn().mockResolvedValue(page([{ name: 'x' }], 'same-cursor', true))
    const nodes = await fetchAllConnectionNodes(fetchPage, { maxPages: 3 })
    expect(nodes).toHaveLength(3)
    expect(fetchPage).toHaveBeenCalledTimes(3)
  })
})
