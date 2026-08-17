import { FC, useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

import {
  commentDeleteMockData,
  commentEditMockData,
  commentsNextPageMockData,
  commentsTestMockData,
  commentsWithElevenRepliesMockData,
  commentsWithNextPageMockData,
  likeACommentMockData,
  pinACommentMockData,
  replytoCommentMockData,
  replytoCommentWithElevenRepliesMockData,
  secondPageOfRepliesCommentWithElevenRepliesMockData,
  thirdPageOfRepliesCommentWithElevenRepliesMockData,
  unlikeACommentMockData,
  unpinACommentMockData,
} from '../__mocks__/requests'
import { commentCreateResolver, commentReplyResolver } from '../__mocks__/resolvers'
import CommentsForTesting from './CommentsForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/Comments.cy.tsx`, which drives Relay from the *test*
 * process: it builds the mock environment with `createTestEnvironment()`, passes
 * it in as a prop and calls `resolveMostRecentOperation()` between UI actions.
 *
 * Playwright runs the test in Node, so the environment is created here in the
 * browser and every resolution point the specs need is exposed on
 * `window.__relayControls` for the test to trigger via `page.evaluate()`.
 * All resolvers are built for every story — they are closures, so the unused
 * ones cost nothing and the surface stays uniformly typed.
 */
export interface RelayControls {
  resolveCommentCreate: () => void
  resolveCommentReply: () => void
  resolveLike: () => void
  resolveUnlike: () => void
  resolveReplyTo: () => void
  resolvePin: () => void
  resolveUnpin: () => void
  resolveEdit: () => void
  resolveDelete: () => void
  resolveNextPage: () => void
  resolveElevenReplies: () => void
  resolveSecondPageOfReplies: () => void
  resolveThirdPageOfReplies: () => void
}

declare global {
  interface Window {
    __relayControls: RelayControls
  }
}

const noop = () => {}

const routerMock = {
  push: noop,
  back: noop,
  forward: noop,
  refresh: noop,
  replace: noop,
  prefetch: noop,
}

type TestEnvironment = ReturnType<typeof createTestEnvironment>

const makeControls = ({ resolveMostRecentOperation }: TestEnvironment): RelayControls => ({
  resolveCommentCreate: () => resolveMostRecentOperation({ mockResolvers: commentCreateResolver }),
  resolveCommentReply: () => resolveMostRecentOperation({ mockResolvers: commentReplyResolver }),
  resolveLike: () => resolveMostRecentOperation({ data: likeACommentMockData }),
  resolveUnlike: () => resolveMostRecentOperation({ data: unlikeACommentMockData }),
  resolveReplyTo: () => resolveMostRecentOperation({ data: replytoCommentMockData }),
  resolvePin: () => resolveMostRecentOperation({ data: pinACommentMockData }),
  resolveUnpin: () => resolveMostRecentOperation({ data: unpinACommentMockData }),
  resolveEdit: () => resolveMostRecentOperation({ data: commentEditMockData }),
  resolveDelete: () => resolveMostRecentOperation({ data: commentDeleteMockData }),
  resolveNextPage: () => resolveMostRecentOperation({ data: commentsNextPageMockData }),
  resolveElevenReplies: () =>
    resolveMostRecentOperation({ data: replytoCommentWithElevenRepliesMockData }),
  resolveSecondPageOfReplies: () =>
    resolveMostRecentOperation({ data: secondPageOfRepliesCommentWithElevenRepliesMockData }),
  resolveThirdPageOfReplies: () =>
    resolveMostRecentOperation({ data: thirdPageOfRepliesCommentWithElevenRepliesMockData }),
})

/** Seeds the initial `CommentsForTestingQuery` and installs the control bridge. */
const useSeededEnvironment = (data: unknown) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({
      queryName: 'CommentsForTestingQuery',
      data,
    })

    window.__relayControls = makeControls(testEnvironment)

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

const Scenario: FC<{ data: unknown }> = ({ data }) => {
  const environment = useSeededEnvironment(data)

  return (
    <PathnameContext.Provider value="/mock-path">
      <AppRouterContext.Provider value={routerMock as any}>
        <CommentsForTesting environment={environment} />
      </AppRouterContext.Provider>
    </PathnameContext.Provider>
  )
}

export const Default = () => <Scenario data={commentsTestMockData} />

/** Ten comments behind a paginated connection — drives the infinite-scroll test. */
export const WithNextPage = () => <Scenario data={commentsWithNextPageMockData} />

/** A comment with eleven replies — drives the paginated-replies test. */
export const WithElevenReplies = () => <Scenario data={commentsWithElevenRepliesMockData} />
