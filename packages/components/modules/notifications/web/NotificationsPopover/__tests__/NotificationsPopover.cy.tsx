import { createTestEnvironment } from '@baseapp-frontend/graphql'

import CustomNotificationItemForTesting from './CustomNotificationItemForTesting'
import CustomNotificationListForTesting from './CustomNotificationListForTesting'
import NotificationsPopoverForTesting from './NotificationsPopoverForTesting'
import {
  emptyNotificationsListMockData,
  markNotificationAsReadMockData,
  notificationsListMockData,
  notificationsListNextPageMockData,
  unreadNotificationsEmptyMockData,
  unreadNotificationsMockData,
} from './__mocks__/requests'

describe('Notifications', () => {
  it('should render show notification drawer with empty state', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    cy.viewport(1024, 768)

    queueOperationResolver({
      queryName: 'NotificationsPopoverQuery',
      data: unreadNotificationsEmptyMockData,
    })

    cy.mount(<NotificationsPopoverForTesting environment={environment} />)

    cy.step('See the notification bell and icon')
    cy.findByRole('presentation').should('not.exist')
    cy.findByRole('button', { name: /see notifications/i })
      .should('exist')
      .click()

    cy.step('Open notifications drawer from right')
    cy.findByRole('presentation')
      .should('be.visible')
      .find('.MuiDrawer-paper')
      .should('have.class', 'MuiDrawer-paperAnchorRight')

    cy.step('See the loading state')
    cy.findByRole('progressbar')
      .should('exist')
      .then(() => {
        resolveMostRecentOperation({
          data: emptyNotificationsListMockData,
        })
      })

    cy.step('See the empty state')
    cy.findByText('You don’t have notifications.').should('exist')
    cy.findByText('Your future notifications will be shown here.').should('exist')

    cy.step('Close notifications drawer on backdrop click')
    cy.findByRole('presentation').find('.MuiBackdrop-root').click()
    cy.findByRole('presentation').should('not.exist')
  })

  it('should render notifications and be able to interact with it', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    cy.viewport('iphone-x')

    queueOperationResolver({
      queryName: 'NotificationsPopoverQuery',
      data: unreadNotificationsMockData,
    })
    cy.mount(<NotificationsPopoverForTesting environment={environment} />)

    cy.step('See the notification bell and icon')
    cy.findByRole('presentation').should('not.exist')
    cy.findByRole('button', { name: /see notifications/i })
      .should('exist')
      .contains(unreadNotificationsMockData.data.me.notificationsUnreadCount)
      .should('exist')
      .click()

    cy.step('Open notifications drawer from bottom')
    cy.findByRole('presentation')
      .should('be.visible')
      .find('.MuiDrawer-paper')
      .should('have.class', 'MuiDrawer-paperAnchorBottom')

    cy.step('See the loading state')
    cy.findByRole('presentation').should('be.visible')
    cy.findByRole('progressbar')
      .should('exist')
      .then(() => {
        resolveMostRecentOperation({
          data: notificationsListMockData,
        })
      })

    cy.step('See the notifications list')
    cy.findByText('This is the first comment reply.').should('exist')
    cy.findByText('This is the second comment reply.').should('exist')
    cy.findByText('This is the third comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the fourth comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the fifth comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the sixth comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the seventh comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the eighth comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the ninth comment reply.').should('exist').scrollIntoView()
    cy.findByText('This is the tenth comment reply.').should('exist').scrollIntoView()

    cy.step('Load more notifications')
    cy.findByRole('progressbar')
      .should('exist')
      .scrollIntoView()
      .then(() => {
        resolveMostRecentOperation({
          data: notificationsListNextPageMockData,
        })
      })
    cy.findByText('This is the eleventh comment reply.').should('exist').scrollIntoView()

    cy.step('Mark notification as read')
    cy.findByText('This is the twelfth comment reply.')
      .should('exist')
      .click()
      .then(() => {
        resolveMostRecentOperation({
          data: markNotificationAsReadMockData,
        })
      })

    cy.step('See read notifications and older divider')
    cy.findByText('Older').should('exist')
    cy.findByText('This is the twelfth comment reply.').should('exist')

    cy.step('Close notifications drawer')
    cy.findByRole('button', { name: /close notifications/i })
      .should('exist')
      .click()

    cy.step('See the notification bell count updated')
    cy.findByRole('button', { name: /see notifications/i })
      .should('exist')
      .contains(unreadNotificationsMockData.data.me.notificationsUnreadCount - 1)
      .should('exist')
  })

  it('should render custom components for list', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    queueOperationResolver({
      queryName: 'NotificationsPopoverQuery',
      data: unreadNotificationsMockData,
    })

    cy.mount(
      <NotificationsPopoverForTesting
        environment={environment}
        NotificationsList={CustomNotificationListForTesting}
      />,
    ).then(() => {
      resolveMostRecentOperation({
        data: unreadNotificationsMockData,
      })
    })
    cy.step('See the notification bell and icon')
    cy.findByRole('presentation').should('not.exist')
    cy.findByRole('button', { name: /see notifications/i })
      .should('exist')
      .contains(unreadNotificationsMockData.data.me.notificationsUnreadCount)
      .should('exist')
      .click()

    cy.step('Open notifications drawer from bottom')
    cy.findByRole('presentation')
      .should('be.visible')
      .then(() => {
        resolveMostRecentOperation({
          data: notificationsListMockData,
        })
      })

    cy.step('See the custom notifications list')
    cy.findByText('Custom notifications list').should('exist')
  })

  it('should render custom components for item', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    queueOperationResolver({
      queryName: 'NotificationsPopoverQuery',
      data: unreadNotificationsMockData,
    })

    cy.mount(
      <NotificationsPopoverForTesting
        environment={environment}
        NotificationsListProps={{
          NotificationItem: CustomNotificationItemForTesting,
        }}
      />,
    )
    cy.step('See the notification bell and icon')
    cy.findByRole('presentation').should('not.exist')
    cy.findByRole('button', { name: /see notifications/i })
      .should('exist')
      .contains(unreadNotificationsMockData.data.me.notificationsUnreadCount)
      .should('exist')
      .click()

    cy.step('Open notifications drawer from bottom')
    cy.findByRole('presentation')
      .should('be.visible')
      .then(() => {
        resolveMostRecentOperation({
          data: notificationsListMockData,
        })
      })

    cy.step('See the custom notification items')
    cy.findByText('Someone replied to your comment 1.').should('exist')
    cy.findByText('Someone replied to your comment 2.').should('exist')
    cy.findByText('Someone replied to your comment 3.').should('exist')
    cy.findByText('Someone replied to your comment 4.').should('exist')
    cy.findByText('Someone replied to your comment 5.').should('exist')
    cy.findByText('Someone replied to your comment 6.').should('exist')
    cy.findByText('Someone replied to your comment 7.').should('exist')
    cy.findByText('Someone replied to your comment 8.').should('exist').scrollIntoView()
    cy.findByText('Someone replied to your comment 9.').should('exist')
    cy.findByText('Someone replied to your comment 10.').should('exist')
  })

  it('should render custom components for list anditem', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()

    queueOperationResolver({
      queryName: 'NotificationsPopoverQuery',
      data: unreadNotificationsMockData,
    })

    cy.mount(
      <NotificationsPopoverForTesting
        environment={environment}
        NotificationsList={CustomNotificationListForTesting}
        NotificationsListProps={{
          NotificationItem: CustomNotificationItemForTesting,
        }}
      />,
    )
    cy.step('See the notification bell and icon')
    cy.findByRole('presentation').should('not.exist')
    cy.findByRole('button', { name: /see notifications/i })
      .should('exist')
      .contains(unreadNotificationsMockData.data.me.notificationsUnreadCount)
      .should('exist')
      .click()

    cy.step('Open notifications drawer from bottom')
    cy.findByRole('presentation')
      .should('be.visible')
      .then(() => {
        resolveMostRecentOperation({
          data: notificationsListMockData,
        })
      })

    cy.step('See the custom notifications list')
    cy.findByText('Custom notifications list').should('exist')

    cy.step('See the custom notification items')
    cy.findByText('Someone replied to your comment 1.').should('exist')
    cy.findByText('Someone replied to your comment 2.').should('exist')
    cy.findByText('Someone replied to your comment 3.').should('exist')
    cy.findByText('Someone replied to your comment 4.').should('exist')
    cy.findByText('Someone replied to your comment 5.').should('exist')
    cy.findByText('Someone replied to your comment 6.').should('exist')
    cy.findByText('Someone replied to your comment 7.').should('exist')
    cy.findByText('Someone replied to your comment 8.').should('exist').scrollIntoView()
    cy.findByText('Someone replied to your comment 9.').should('exist')
    cy.findByText('Someone replied to your comment 10.').should('exist')
  })
})
