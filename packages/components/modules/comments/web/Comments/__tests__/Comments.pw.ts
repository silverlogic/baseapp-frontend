import { type Locator, type Page, expect, test } from '@playwright/test'

import type { RelayControls } from './__utils__/Comments.story'

/**
 * Playwright port of `Comments.cy.tsx` in this folder,
 * aiming for assertion-for-assertion equivalence so the two runners can be
 * compared directly.
 *
 * Translation rules applied throughout:
 *   cy.findByText(x)             -> getByText(x, { exact: true })  (Testing
 *                                   Library matches full strings by default,
 *                                   Playwright matches substrings)
 *   .should('exist')             -> toBeAttached()
 *   .should('not.exist')         -> not.toBeAttached()
 *   .type(s)                     -> pressSequentially(s)
 *   .type('{selectall}')         -> keyboard.press('ControlOrMeta+a')
 *   cy.findAllByRole(...).last() -> getByRole(...).last()
 *   cy.viewport(w, h)            -> page.setViewportSize({ width, height })
 *   resolveMostRecentOperation   -> page.evaluate on window.__relayControls
 */
const STORY = 'comments/web/Comments/Comments'

/** Drives the story's browser-side Relay bridge. */
const resolve = (page: Page, key: keyof RelayControls) =>
  page.evaluate((k) => window.__relayControls[k](), key)

/**
 * Cypress's `cy.scrollIntoView()` always scrolls, aligning the element to the
 * top. Playwright's `scrollIntoViewIfNeeded()` is a no-op when the element is
 * already visible — which never advances a react-virtuoso window, so the next
 * batch of rows is never rendered. Use the DOM API to match Cypress.
 */
const scrollTo = (locator: Locator) => locator.evaluate((el: Element) => el.scrollIntoView())

test.describe('Comments', () => {
  test('should render comments and be able to interact with it', async ({ mount, page }) => {
    const component = await mount(`${STORY}/Default`)

    const input = component.getByPlaceholder('Comment...')
    const createButton = component.getByRole('button', { name: /create comment/i })

    await expect(component.getByText('This is a regular comment.', { exact: true })).toBeAttached()

    await test.step('Create a comment and check if it was created', async () => {
      await expect(createButton).toBeDisabled()
      await input.click()
      await input.pressSequentially('This is a new comment')
      await expect(createButton).toBeEnabled()
      await createButton.click()
      await resolve(page, 'resolveCommentCreate')

      await expect(input).toHaveValue('')
      await expect(component.getByText('This is a new comment', { exact: true })).toBeAttached()
    })

    await test.step('Create another comment and check if it was created', async () => {
      await input.click()
      await input.pressSequentially('This is another new comment')
      await expect(createButton).toBeEnabled()
      await createButton.click()
      await resolve(page, 'resolveCommentCreate')

      await expect(input).toHaveValue('')
      await expect(
        component.getByText('This is another new comment', { exact: true }),
      ).toBeAttached()
    })

    await test.step('React to a comment', async () => {
      const reactionsCount = component.getByLabel('reactions count comment-1')
      const reactButton = component.getByRole('button', { name: /react to comment comment-1/i })

      await expect(reactionsCount).toHaveText('2')
      await reactButton.click()
      await resolve(page, 'resolveLike')
      await expect(reactionsCount).toHaveText('3')

      await reactButton.click()
      await resolve(page, 'resolveUnlike')
      await expect(reactionsCount).toHaveText('2')
    })

    await test.step('Load comment`s replies', async () => {
      const replyButton = component.getByRole('button', { name: /reply to comment comment-2/i })
      await expect(replyButton).toBeEnabled()
      await replyButton.click()
      await resolve(page, 'resolveReplyTo')

      await expect(component.getByText('Some reply', { exact: true })).toBeAttached()
    })

    await test.step('Cancel reply', async () => {
      await expect(component.getByText('Replying to', { exact: false })).toBeAttached()
      await component.getByRole('button', { name: /cancel reply/i }).click()
      await expect(component.getByText('Replying to', { exact: false })).not.toBeAttached()
    })

    await test.step('Reply to a comment', async () => {
      const repliesCount = component.getByLabel('replies count comment-2')

      await component.getByRole('button', { name: /reply to comment comment-2/i }).click()
      await expect(repliesCount).toHaveText('1')

      await input.click()
      await input.pressSequentially('This is another reply')
      await createButton.click()
      await resolve(page, 'resolveCommentReply')

      await expect(input).toHaveValue('')
      await expect(component.getByText('This is another reply', { exact: true })).toBeAttached()
      await expect(repliesCount).toHaveText('2')
    })

    await test.step('Unpin a comment', async () => {
      await component.getByText('This is a pinned comment.', { exact: true }).click()
      await expect(component.getByText('Pinned', { exact: true })).toBeAttached()

      await component.getByRole('button', { name: /unpin comment/i }).click()
      await resolve(page, 'resolveUnpin')
      await expect(component.getByText('Pinned', { exact: true })).not.toBeAttached()
    })

    await test.step('Pin a comment', async () => {
      await component.getByText('This is another reply', { exact: true }).click()
      await component
        .getByRole('button', { name: /pin comment/i })
        .last()
        .click()
      await resolve(page, 'resolvePin')
      await expect(component.getByText('Pinned', { exact: true })).toBeAttached()
    })

    await test.step('Edit a comment', async () => {
      await component.getByText('This is a pinned comment.', { exact: true }).click()
      await component
        .getByRole('button', { name: /edit comment/i })
        .first()
        .click()

      await component.getByText('This is a pinned comment.', { exact: true }).click()
      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.type('Something else')
    })

    await test.step('Cancel comment edit', async () => {
      await expect(
        component.getByText('This is a pinned comment.', { exact: true }),
      ).not.toBeAttached()
      await component.getByRole('button', { name: /cancel comment edit/i }).click()
      await expect(component.getByText('This is a pinned comment.', { exact: true })).toBeAttached()
    })

    await test.step('Save comment edit', async () => {
      // The Cypress original clicks 'edit comment' straight away, relying on the
      // comment's action buttons still being present after the cancel above.
      // They are on Chromium but not on WebKit, so re-select the comment first.
      await component.getByText('This is a pinned comment.', { exact: true }).click()
      await component
        .getByRole('button', { name: /edit comment/i })
        .first()
        .click()
      await component.getByText('This is a pinned comment.', { exact: true }).click()
      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.type('This is not a pinned comment anymore.')

      await component.getByRole('button', { name: /save comment edit/i }).click()
      await resolve(page, 'resolveEdit')
      await expect(
        component.getByText('This is not a pinned comment anymore.', { exact: true }),
      ).toBeAttached()
    })

    await test.step('Delete a comment', async () => {
      await component.getByText('This is not a pinned comment anymore.', { exact: true }).click()
      await component
        .getByRole('button', { name: /delete item/i })
        .last()
        .click()
      await expect(page.getByText('Delete Comment?', { exact: true })).toBeAttached()
    })

    await test.step('Cancel comment deletion', async () => {
      await page.getByRole('button', { name: /cancel/i }).click()
      await expect(page.getByText('Delete Comment?', { exact: true })).not.toBeAttached()
      await expect(
        component.getByText('This is not a pinned comment anymore.', { exact: true }),
      ).toBeAttached()
    })

    await test.step('Confirm comment deletion', async () => {
      await component.getByText('This is not a pinned comment anymore.', { exact: true }).click()
      await component
        .getByRole('button', { name: /delete item/i })
        .last()
        .click()
      await page.getByRole('button', { name: /^delete$/i }).click()
      await resolve(page, 'resolveDelete')
      await expect(
        component.getByText('This is not a pinned comment anymore.', { exact: true }),
      ).not.toBeAttached()
    })
  })

  /**
   * DELIBERATE DIVERGENCE from `Comments.cy.tsx`, which is flaky here (~50%).
   *
   * `commentsWithNextPageMockData` holds five comments (First–Fifth) with
   * `hasNextPage: true`. The Cypress spec asserts that 'Fifth comment' and the
   * 'loading more comments' sentinel do *not* exist initially — but Fifth is in
   * the data, so both assertions really mean "only four rows are in the DOM
   * right now". Whether react-virtuoso keeps four rows or five is a layout
   * coincidence: measured here the scroller sizes itself to 457px against a
   * 350px viewport and keeps five, which reaches the end and mounts the
   * sentinel. Cypress sits right on that 4-vs-5 boundary, which is why it
   * fails about half the time on this exact assertion.
   *
   * This port asserts the invariant that actually matters — the *second* page
   * (Sixth–Tenth) has not been fetched — and drops the two windowing proxies.
   */
  test.describe('paginated comments', () => {
    test('should render more comments when the bottom is reached', async ({ mount, page }) => {
      await page.setViewportSize({ width: 500, height: 350 })

      const component = await mount(`${STORY}/WithNextPage`)
      const loader = component.getByLabel('loading more comments')
      const comment = (text: string) => component.getByText(text, { exact: true })

      await test.step('See the first page of comments', async () => {
        for (const text of ['First comment', 'Second comment', 'Third comment', 'Fourth comment']) {
          await expect(comment(text)).toBeAttached()
        }

        // The second page genuinely is not in the Relay store yet — unlike
        // 'Fifth comment', this does not depend on the virtualiser's window.
        for (const text of [
          'Sixth comment',
          'Seventh comment',
          'Eighth comment',
          'Ninth comment',
          'Tenth comment',
        ]) {
          await expect(comment(text)).not.toBeAttached()
        }
      })

      await test.step('Reaching the bottom fetches the next page', async () => {
        await scrollTo(comment('Fourth comment'))
        await scrollTo(comment('Fifth comment'))

        await expect(loader).toBeAttached()
        await scrollTo(loader)
        await resolve(page, 'resolveNextPage')

        await expect(loader).not.toBeAttached()
      })

      await test.step('The next five comments render as they scroll into the window', async () => {
        // Each row must be in the DOM before it can be scrolled to, and
        // scrolling to it advances Virtuoso's window far enough to mount the
        // next — so assert then scroll, one row at a time.
        for (const text of [
          'Sixth comment',
          'Seventh comment',
          'Eighth comment',
          'Ninth comment',
          'Tenth comment',
        ]) {
          await expect(comment(text)).toBeAttached()
          await scrollTo(comment(text))
        }
      })

      await test.step('Scrolling to the bottom does not trigger another fetch', async () => {
        await scrollTo(comment('Tenth comment'))
        await expect(loader).not.toBeAttached()
      })
    })
  })

  test.describe('paginated replies', () => {
    test('should be able to render all comment`s replies', async ({ mount, page }) => {
      await page.setViewportSize({ width: 500, height: 1000 })

      const component = await mount(`${STORY}/WithElevenReplies`)
      const reply = (text: string) => component.getByText(text, { exact: true })

      await test.step('See the first comment and its replies', async () => {
        await component
          .getByRole('button', { name: /reply to comment comment-with-eleven-replies/i })
          .click()
        await resolve(page, 'resolveElevenReplies')

        for (const text of [
          'Newest reply',
          'Second newest reply',
          'Third newest reply',
          'Fourth newest reply',
          'Fifth newest reply',
        ]) {
          await expect(reply(text)).toBeAttached()
        }
      })

      await test.step('See the first five replies and load the next six', async () => {
        await component.getByRole('button', { name: /show more replies \(6\)/i }).click()
        await resolve(page, 'resolveSecondPageOfReplies')

        for (const text of [
          'Sixth newest reply',
          'Seventh newest reply',
          'Eighth newest reply',
          'Ninth newest reply',
        ]) {
          await expect(reply(text)).toBeAttached()
        }
        await expect(reply('Tenth newest reply')).toBeAttached()
        await scrollTo(reply('Tenth newest reply'))
      })

      await test.step('See the remaining replies', async () => {
        await expect(reply('Eleventh newest reply')).not.toBeAttached()

        await component.getByRole('button', { name: /show more replies \(1\)/i }).click()
        await resolve(page, 'resolveThirdPageOfReplies')

        await expect(reply('Eleventh newest reply')).toBeAttached()
        await expect(
          component.getByRole('button', { name: /show more replies/i }),
        ).not.toBeAttached()
      })
    })
  })
})
