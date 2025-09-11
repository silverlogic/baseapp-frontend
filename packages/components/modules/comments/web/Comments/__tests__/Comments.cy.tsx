import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as Router from 'next/navigation'

import '../../../../../styles/tailwind/globals.css'
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
} from './__mocks__/requests'
import { commentCreateResolver, commentReplyResolver } from './__mocks__/resolvers'
import CommentsForTesting from './__utils__/CommentsForTesting'

describe('Comments', () => {
  it('should render comments and be able to interact with it', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    queueOperationResolver({
      queryName: 'CommentsForTestingQuery',
      data: commentsTestMockData,
    })

    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <CommentsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.findByText('This is a regular comment.').should('exist')

    cy.step('Create a comment and check if it was created')
    cy.findByRole('button', { name: /create comment/i }).should('be.disabled')
    cy.findByPlaceholderText('Comment...').click().type('This is a new comment')
    cy.findByRole('button', { name: /create comment/i })
      .should('not.be.disabled')
      .click()
      .then(() => {
        resolveMostRecentOperation({ mockResolvers: commentCreateResolver })
      })
    cy.findByPlaceholderText('Comment...').should('have.value', '')
    cy.findByText('This is a new comment').should('exist')

    cy.step('Create another comment and check if it was created')
    cy.findByPlaceholderText('Comment...').click().type('This is another new comment')
    cy.findByRole('button', { name: /create comment/i })
      .should('not.be.disabled')
      .click()
      .then(() => {
        resolveMostRecentOperation({ mockResolvers: commentCreateResolver })
      })
    cy.findByPlaceholderText('Comment...').should('have.value', '')
    cy.findByText('This is another new comment').should('exist')

    cy.step('React to a comment')
    cy.findByLabelText('reactions count comment-1').should('have.text', '2')
    cy.findByRole('button', { name: /react to comment comment-1/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: likeACommentMockData })
      })
    cy.findByLabelText('reactions count comment-1').should('have.text', '3')
    cy.findByRole('button', { name: /react to comment comment-1/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: unlikeACommentMockData })
      })
    cy.findByLabelText('reactions count comment-1').should('have.text', '2')

    cy.step('Load comment`s replies')
    cy.findByRole('button', { name: /reply to comment comment-2/i })
      .should('not.be.disabled')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: replytoCommentMockData })
      })
    cy.findByText('Some reply').should('exist')

    cy.step('Cancel reply')
    cy.findByText('Replying to').should('exist')
    cy.findByRole('button', { name: /cancel reply/i }).click()
    cy.findByText('Replying to').should('not.exist')

    cy.step('Reply to a comment')
    cy.findByRole('button', { name: /reply to comment comment-2/i }).click()
    cy.findByLabelText('replies count comment-2').should('have.text', '1')
    cy.findByPlaceholderText('Comment...').click().type('This is another reply')
    cy.findByRole('button', { name: /create comment/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ mockResolvers: commentReplyResolver })
      })
    cy.findByPlaceholderText('Comment...').should('have.value', '')
    cy.findByText('This is another reply').should('exist')
    cy.findByLabelText('replies count comment-2').should('have.text', '2')

    cy.step('Unpin a comment')
    cy.findByText('This is a pinned comment.').click()
    cy.findByText('Pinned').should('exist')
    cy.findByRole('button', { name: /unpin comment/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: unpinACommentMockData })
      })
    cy.findByText('Pinned').should('not.exist')

    cy.step('Pin a comment')
    cy.findByText('This is another reply').click()
    cy.findAllByRole('button', { name: /pin comment/i })
      .last()
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: pinACommentMockData })
      })
    cy.findByText('Pinned').should('exist')

    cy.step('Edit a comment')
    cy.findByText('This is a pinned comment.').click()
    cy.findAllByRole('button', { name: /edit comment/i })
      .first()
      .click()
    cy.findByText('This is a pinned comment.').click().type('{selectall}').type('Something else')

    cy.step('Cancel comment edit')
    cy.findByText('This is a pinned comment.').should('not.exist')
    cy.findByRole('button', { name: /cancel comment edit/i }).click()
    cy.findByText('This is a pinned comment.').should('exist')

    cy.step('Save comment edit')
    cy.findAllByRole('button', { name: /edit comment/i })
      .first()
      .click()
    cy.findByText('This is a pinned comment.')
      .click()
      .type('{selectall}')
      .type('This is not a pinned comment anymore.')
    cy.findByRole('button', { name: /save comment edit/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: commentEditMockData })
      })
    cy.findByText('This is not a pinned comment anymore.').should('exist')

    cy.step('Cannot delete a comment')
    cy.findByText('This is a regular comment.').click()
    cy.findAllByRole('button', { name: /delete item/i }).should('not.exist')

    cy.step('Delete a comment')
    cy.findByText('This is not a pinned comment anymore.').click()
    cy.findAllByRole('button', { name: /delete item/i })
      .last()
      .click()
    cy.findByText('Delete Comment?').should('exist')

    cy.step('Cancel comment deletion')
    cy.findByRole('button', { name: /cancel/i }).click()
    cy.findByText('Delete Comment?').should('not.exist')
    cy.findByText('This is not a pinned comment anymore.').should('exist')

    cy.step('Confirm comment deletion')
    cy.findByText('This is not a pinned comment anymore.').click()
    cy.findAllByRole('button', { name: /delete item/i })
      .last()
      .click()
    cy.findByRole('button', { name: /delete/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: commentDeleteMockData })
      })
    cy.findByText('This is not a pinned comment anymore.').should('not.exist')
  })

  it('should render more comments when the bottom is reached', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    queueOperationResolver({
      queryName: 'CommentsForTestingQuery',
      data: commentsWithNextPageMockData,
    })

    cy.viewport(500, 350)

    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <CommentsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.step('See the first four comments')
    cy.findByText('First comment').should('exist')
    cy.findByText('Second comment').should('exist')
    cy.findByText('Third comment').should('exist')
    cy.findByText('Fourth comment').should('exist')
    cy.findByLabelText('loading more comments').should('not.exist')

    cy.findByText('Fifth comment').should('not.exist')
    cy.findByText('Sixth comment').should('not.exist')
    cy.findByText('Seventh comment').should('not.exist')
    cy.findByText('Eighth comment').should('not.exist')
    cy.findByText('Ninth comment').should('not.exist')
    cy.findByText('Tenth comment').should('not.exist')

    cy.step('Scroll to the bottom and see the next 5 comments')

    cy.findByText('Fourth comment').should('exist').scrollIntoView()
    cy.wait(100)
    cy.findByText('Fifth comment').should('exist').scrollIntoView()

    cy.findByLabelText('loading more comments')
      .should('exist')
      .scrollIntoView()
      .then(() => {
        resolveMostRecentOperation({ data: commentsNextPageMockData })
      })

    cy.findByLabelText('loading more comments').should('not.exist')
    cy.findByText('Sixth comment').should('exist').scrollIntoView()
    cy.findByText('Seventh comment').should('exist')
    cy.findByText('Eighth comment').should('exist').scrollIntoView()
    cy.findByText('Ninth comment').should('exist')
    cy.findByText('Tenth comment').should('exist')

    cy.step('Scroll to the bottom should not trigger another fetch')
    cy.findByText('Tenth comment').scrollIntoView()
  })

  it('should be able to render all comment`s replies', () => {
    const router = {
      push: cy.stub().as('router:push'),
    }
    cy.stub(Router, 'useRouter').returns(router)
    cy.viewport(500, 1000)
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    queueOperationResolver({
      queryName: 'CommentsForTestingQuery',
      data: commentsWithElevenRepliesMockData,
    })
    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <CommentsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.step('See the first comment and its replies')
    cy.findByRole('button', { name: /reply to comment comment-with-eleven-replies/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: replytoCommentWithElevenRepliesMockData })
      })
    cy.findByText('Newest reply').should('exist')
    cy.findByText('Second newest reply').should('exist')
    cy.findByText('Third newest reply').should('exist')
    cy.findByText('Fourth newest reply').should('exist')
    cy.findByText('Fifth newest reply').should('exist')

    cy.step('See the first five replies and load the next six')
    cy.findByRole('button', { name: /show more replies \(6\)/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: secondPageOfRepliesCommentWithElevenRepliesMockData })
      })
    cy.findByText('Sixth newest reply').should('exist')
    cy.findByText('Seventh newest reply').should('exist')
    cy.findByText('Eighth newest reply').should('exist')
    cy.findByText('Ninth newest reply').should('exist')
    cy.findByText('Tenth newest reply').should('exist').scrollIntoView()

    cy.step('See the remaining replies')
    cy.findByText('Eleventh newest reply').should('not.exist')
    cy.findByRole('button', { name: /show more replies \(1\)/i })
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: thirdPageOfRepliesCommentWithElevenRepliesMockData })
      })
    cy.findByText('Eleventh newest reply').should('exist')
    cy.findByRole('button', { name: /show more replies/i }).should('not.exist')
  })
})
