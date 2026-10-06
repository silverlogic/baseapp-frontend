import { type Locator, type Page, expect, test } from '@playwright/test'

import type { CommentsControls } from './__utils__/Comments.story'

/**
 * The confirmation dialog is portaled outside `#root`, so it is queried through
 * `page`; everything else lives inside the `mount()` locator.
 */
const STORY = 'comments/web/Comments/Comments'

const REGULAR_COMMENT = 'This is a regular comment.'
const PINNED_COMMENT = 'This is a pinned comment.'
const EDITED_COMMENT = 'This is not a pinned comment anymore.'
const NEW_COMMENT = 'This is a new comment'
const ANOTHER_COMMENT = 'This is another new comment'
const ANOTHER_REPLY = 'This is another reply'

const FIRST_PAGE = ['First comment', 'Second comment', 'Third comment', 'Fourth comment']

const SECOND_PAGE = [
  'Sixth comment',
  'Seventh comment',
  'Eighth comment',
  'Ninth comment',
  'Tenth comment',
]

const FIRST_REPLIES = [
  'Newest reply',
  'Second newest reply',
  'Third newest reply',
  'Fourth newest reply',
  'Fifth newest reply',
]

const SECOND_REPLIES = [
  'Sixth newest reply',
  'Seventh newest reply',
  'Eighth newest reply',
  'Ninth newest reply',
]

/** Drives the story's browser-side Relay bridge. */
const resolve = (page: Page, key: keyof CommentsControls) =>
  page.evaluate((k) => window.__commentsControls[k](), key)

/** `scrollIntoViewIfNeeded()` is a no-op for a visible element, so it never advances Virtuoso. */
const scrollTo = (locator: Locator) =>
  locator.evaluate((element: Element) => element.scrollIntoView())

const textOf = (component: Locator, text: string) => component.getByText(text, { exact: true })

/**
 * A comment reveals its action buttons only while it is selected, and on WebKit
 * they are gone again after any other interaction — so every edit re-selects the
 * comment, clicks the pencil, then clicks the text again to focus the editor.
 */
const startEditing = async (component: Locator, text: string) => {
  await textOf(component, text).click()
  await component
    .getByRole('button', { name: /edit comment/i })
    .first()
    .click()
  await textOf(component, text).click()
}

const replaceEditorText = async (page: Page, text: string) => {
  await page.keyboard.press('ControlOrMeta+a')
  await page.keyboard.type(text)
}

const openDeleteDialog = async (component: Locator, text: string) => {
  await textOf(component, text).click()
  await component
    .getByRole('button', { name: /delete item/i })
    .last()
    .click()
}

test.describe('Component: Comments', () => {
  test('GIVEN a comment thread, WHEN comments are created, reacted to, replied to, pinned, edited and deleted, THEN every change is reflected', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a comment thread', async () => {
      const mounted = await mount(`${STORY}/Default`)
      await expect(textOf(mounted, REGULAR_COMMENT)).toBeAttached()

      return mounted
    })

    const input = component.getByPlaceholder('Comment...')
    const createButton = component.getByRole('button', { name: /create comment/i })

    await test.step('WHEN a comment is created, THEN it joins the thread and the field empties', async () => {
      await expect(createButton).toBeDisabled()
      await input.click()
      await input.pressSequentially(NEW_COMMENT)
      await expect(createButton).toBeEnabled()
      await createButton.click()
      await resolve(page, 'resolveCommentCreate')

      await expect(input).toHaveValue('')
      await expect(textOf(component, NEW_COMMENT)).toBeAttached()
    })

    await test.step('WHEN a second comment is created, THEN it joins the thread too', async () => {
      await input.click()
      await input.pressSequentially(ANOTHER_COMMENT)
      await expect(createButton).toBeEnabled()
      await createButton.click()
      await resolve(page, 'resolveCommentCreate')

      await expect(input).toHaveValue('')
      await expect(textOf(component, ANOTHER_COMMENT)).toBeAttached()
    })

    await test.step('WHEN a comment is reacted to and the reaction is withdrawn, THEN the count follows', async () => {
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

    await test.step('WHEN the replies of a comment are opened, THEN they are loaded', async () => {
      const replyButton = component.getByRole('button', { name: /reply to comment comment-2/i })

      await expect(replyButton).toBeEnabled()
      await replyButton.click()
      await resolve(page, 'resolveReplyTo')

      await expect(textOf(component, 'Some reply')).toBeAttached()
    })

    await test.step('WHEN the reply is cancelled, THEN the reply banner goes away', async () => {
      await expect(component.getByText('Replying to', { exact: false })).toBeAttached()

      await component.getByRole('button', { name: /cancel reply/i }).click()

      await expect(component.getByText('Replying to', { exact: false })).not.toBeAttached()
    })

    await test.step('WHEN a reply is posted, THEN it joins the replies and the count follows', async () => {
      const repliesCount = component.getByLabel('replies count comment-2')

      await component.getByRole('button', { name: /reply to comment comment-2/i }).click()
      await expect(repliesCount).toHaveText('1')

      await input.click()
      await input.pressSequentially(ANOTHER_REPLY)
      await createButton.click()
      await resolve(page, 'resolveCommentReply')

      await expect(input).toHaveValue('')
      await expect(textOf(component, ANOTHER_REPLY)).toBeAttached()
      await expect(repliesCount).toHaveText('2')
    })

    await test.step('WHEN a pinned comment is unpinned, THEN the badge goes away', async () => {
      await textOf(component, PINNED_COMMENT).click()
      await expect(textOf(component, 'Pinned')).toBeAttached()

      await component.getByRole('button', { name: /unpin comment/i }).click()
      await resolve(page, 'resolveUnpin')

      await expect(textOf(component, 'Pinned')).not.toBeAttached()
    })

    await test.step('WHEN another comment is pinned, THEN the badge comes back', async () => {
      await textOf(component, ANOTHER_REPLY).click()
      await component
        .getByRole('button', { name: /pin comment/i })
        .last()
        .click()
      await resolve(page, 'resolvePin')

      await expect(textOf(component, 'Pinned')).toBeAttached()
    })

    await test.step('WHEN a comment is edited, THEN its text is replaced in the editor', async () => {
      await startEditing(component, PINNED_COMMENT)
      await replaceEditorText(page, 'Something else')

      await expect(textOf(component, PINNED_COMMENT)).not.toBeAttached()
    })

    await test.step('WHEN the edit is cancelled, THEN the original text returns', async () => {
      await component.getByRole('button', { name: /cancel comment edit/i }).click()

      await expect(textOf(component, PINNED_COMMENT)).toBeAttached()
    })

    await test.step('WHEN the edit is saved, THEN the new text is stored', async () => {
      await startEditing(component, PINNED_COMMENT)
      await replaceEditorText(page, EDITED_COMMENT)

      await component.getByRole('button', { name: /save comment edit/i }).click()
      await resolve(page, 'resolveEdit')

      await expect(textOf(component, EDITED_COMMENT)).toBeAttached()
    })

    await test.step('WHEN a deletion is started, THEN a confirmation is required', async () => {
      await openDeleteDialog(component, EDITED_COMMENT)

      await expect(page.getByText('Delete Comment?', { exact: true })).toBeAttached()
    })

    await test.step('WHEN the deletion is cancelled, THEN the comment stays', async () => {
      await page.getByRole('button', { name: /cancel/i }).click()

      await expect(page.getByText('Delete Comment?', { exact: true })).not.toBeAttached()
      await expect(textOf(component, EDITED_COMMENT)).toBeAttached()
    })

    await test.step('WHEN the deletion is confirmed, THEN the comment goes', async () => {
      await openDeleteDialog(component, EDITED_COMMENT)
      await page.getByRole('button', { name: /^delete$/i }).click()
      await resolve(page, 'resolveDelete')

      await expect(textOf(component, EDITED_COMMENT)).not.toBeAttached()
    })
  })

  test('GIVEN a first page of comments with another page behind it, WHEN the bottom is reached, THEN the next page is fetched once and appended', async ({
    mount,
    page,
  }) => {
    const component =
      await test.step('GIVEN a first page of comments with another page behind it', async () => {
        await page.setViewportSize({ width: 500, height: 350 })

        const mounted = await mount(`${STORY}/WithNextPage`)

        for (const text of FIRST_PAGE) {
          await expect(textOf(mounted, text)).toBeAttached()
        }
        for (const text of SECOND_PAGE) {
          await expect(textOf(mounted, text)).not.toBeAttached()
        }

        return mounted
      })

    const loader = component.getByLabel('loading more comments')

    await test.step('WHEN the bottom is reached, THEN the next page is fetched', async () => {
      await scrollTo(textOf(component, 'Fourth comment'))
      await scrollTo(textOf(component, 'Fifth comment'))

      await expect(loader).toBeAttached()
      await scrollTo(loader)
      await resolve(page, 'resolveNextPage')

      await expect(loader).not.toBeAttached()
    })

    await test.step('THEN the next comments render as they scroll into the window', async () => {
      for (const text of SECOND_PAGE) {
        await expect(textOf(component, text)).toBeAttached()
        await scrollTo(textOf(component, text))
      }
    })

    await test.step('WHEN the new bottom is reached, THEN nothing further is fetched', async () => {
      await scrollTo(textOf(component, 'Tenth comment'))

      await expect(loader).not.toBeAttached()
    })
  })

  test('GIVEN a comment with eleven replies, WHEN more replies are shown twice, THEN every reply is loaded and the affordance goes away', async ({
    mount,
    page,
  }) => {
    const component = await test.step('GIVEN a comment with eleven replies', async () => {
      await page.setViewportSize({ width: 500, height: 1000 })

      const mounted = await mount(`${STORY}/WithElevenReplies`)

      await mounted
        .getByRole('button', { name: /reply to comment comment-with-eleven-replies/i })
        .click()
      await resolve(page, 'resolveElevenReplies')

      for (const text of FIRST_REPLIES) {
        await expect(textOf(mounted, text)).toBeAttached()
      }

      return mounted
    })

    await test.step('WHEN the next six replies are shown, THEN they are appended', async () => {
      await component.getByRole('button', { name: /show more replies \(6\)/i }).click()
      await resolve(page, 'resolveSecondPageOfReplies')

      for (const text of SECOND_REPLIES) {
        await expect(textOf(component, text)).toBeAttached()
      }

      await expect(textOf(component, 'Tenth newest reply')).toBeAttached()
      await scrollTo(textOf(component, 'Tenth newest reply'))
    })

    await test.step('WHEN the last reply is shown, THEN the affordance goes away', async () => {
      await expect(textOf(component, 'Eleventh newest reply')).not.toBeAttached()

      await component.getByRole('button', { name: /show more replies \(1\)/i }).click()
      await resolve(page, 'resolveThirdPageOfReplies')

      await expect(textOf(component, 'Eleventh newest reply')).toBeAttached()
      await expect(component.getByRole('button', { name: /show more replies/i })).not.toBeAttached()
    })
  })
})
