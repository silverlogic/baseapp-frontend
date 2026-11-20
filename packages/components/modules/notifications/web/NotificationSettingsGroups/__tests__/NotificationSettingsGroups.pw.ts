import { type Page, expect, test } from '@playwright/test'

import type { NotificationSettingsControls } from './__utils__/NotificationSettingsGroups.story'

const STORY = 'notifications/web/NotificationSettingsGroups/NotificationSettingsGroups'

const controls = <Key extends keyof NotificationSettingsControls>(page: Page, key: Key) =>
  page.evaluate((k) => window.__notificationSettingsControls[k](), key) as Promise<
    ReturnType<NotificationSettingsControls[Key]>
  >

const eventsEmail = (page: Page) =>
  page.getByRole('checkbox', { name: 'Email notifications for Events' })

test.describe('Component: NotificationSettingsGroups', () => {
  test('GIVEN the viewer groups, THEN one row per group and one switch per offered channel is shown, locked groups disabled', async ({
    mount,
    page,
  }) => {
    await mount(`${STORY}/WithGroups`)

    await expect(page.getByRole('columnheader', { name: 'Notifications' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'In-app' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible()

    await expect(page.getByText('Registrations, reminders and schedule changes.')).toBeVisible()
    await expect(eventsEmail(page)).toBeChecked()
    await expect(eventsEmail(page)).toBeEnabled()

    const lockedSwitch = page.getByRole('checkbox', {
      name: 'Email notifications for Account and security',
    })
    await expect(lockedSwitch).toBeDisabled()
    await expect(lockedSwitch).toBeChecked()
    await expect(
      page.getByText('Required — these notifications cannot be turned off.'),
    ).toHaveCount(1)

    await expect(
      page.getByRole('checkbox', { name: 'Email notifications for Weekly digest' }),
    ).not.toBeChecked()
    await expect(
      page.getByRole('checkbox', { name: 'In-app notifications for Weekly digest' }),
    ).toHaveCount(0)
  })

  test('GIVEN a switch, WHEN it is turned off, THEN it moves at once and keeps the server state', async ({
    mount,
    page,
  }) => {
    await mount(`${STORY}/WithGroups`)

    await eventsEmail(page).click()
    await expect(eventsEmail(page)).not.toBeChecked()

    expect(await controls(page, 'lastUpdateVariables')).toEqual({
      input: { settings: [{ group: 'EVENTS', channel: 'EMAIL', isActive: false }] },
    })

    await controls(page, 'resolveUpdate')
    await expect(eventsEmail(page)).not.toBeChecked()
  })

  test('GIVEN a switch, WHEN the server answers with errors, THEN it goes back and the error is shown', async ({
    mount,
    page,
  }) => {
    await mount(`${STORY}/WithGroups`)

    await eventsEmail(page).click()
    await expect(eventsEmail(page)).not.toBeChecked()

    await controls(page, 'resolveUpdateWithErrors')
    await expect(eventsEmail(page)).toBeChecked()
    await expect(page.getByText('This group cannot be changed right now.')).toBeVisible()
  })

  test('GIVEN a switch, WHEN the request fails, THEN it goes back and the error is shown', async ({
    mount,
    page,
  }) => {
    await mount(`${STORY}/WithGroups`)

    await eventsEmail(page).click()
    await expect(eventsEmail(page)).not.toBeChecked()

    await controls(page, 'rejectUpdate')
    await expect(eventsEmail(page)).toBeChecked()
    await expect(page.getByText('Network request failed')).toBeVisible()
  })

  test('GIVEN a group with the ALL channel, WHEN ALL is turned off, THEN every channel of the group moves at once and goes back on failure', async ({
    mount,
    page,
  }) => {
    await mount(`${STORY}/WithAllChannel`)

    const newsSwitch = (channel: string) =>
      page.getByRole('checkbox', { name: `${channel} notifications for News` })

    await page.getByRole('checkbox', { name: 'All notifications for News' }).click()

    await expect(newsSwitch('All')).not.toBeChecked()
    await expect(newsSwitch('In-app')).not.toBeChecked()
    await expect(newsSwitch('Email')).not.toBeChecked()

    // only the ALL change is sent: the server expands it to every channel itself
    expect(await controls(page, 'lastUpdateVariables')).toEqual({
      input: { settings: [{ group: 'NEWS', channel: 'ALL', isActive: false }] },
    })

    await controls(page, 'rejectUpdate')
    await expect(newsSwitch('All')).toBeChecked()
    await expect(newsSwitch('In-app')).toBeChecked()
    await expect(newsSwitch('Email')).toBeChecked()
  })

  test('GIVEN custom copy, THEN every label comes from the props', async ({ mount, page }) => {
    await mount(`${STORY}/WithCustomCopy`)

    await expect(page.getByRole('columnheader', { name: 'Topic' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Portal' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'E-mail' })).toBeVisible()
    await expect(page.getByText('Always on')).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'Events by E-mail' })).toBeChecked()
  })

  test('GIVEN no groups, THEN the empty state is shown', async ({ mount, page }) => {
    await mount(`${STORY}/Empty`)

    await expect(page.getByText('Nothing to configure.')).toBeVisible()
    await expect(page.getByRole('table')).toHaveCount(0)
  })
})
