import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import '../../../../../styles/tailwind/globals.css'
import {
  mockDataWithBanner,
  profileSettingsBannerRemoveData,
  profileSettingsBannerUpdateData,
  profileSettingsImageRemoveData,
  profileSettingsImageUpdateData,
  profileSettingsMockData,
  profileSettingsTextUpdateData,
} from './__mocks__/requests'
import ProfileSettingsForTesting from './__utils__/ProfileSettingsForTesting'

const nameInput = () =>
  cy.findByLabelText('Name', { exact: true, selector: 'input' }).as('nameInput')
const usernameInput = () =>
  cy.findByLabelText(/username/i, { selector: 'input' }).as('usernameInput')
const phoneInput = () => cy.findByLabelText(/phone number/i, { selector: 'input' }).as('phoneInput')
const bioInput = () => cy.findByLabelText(/bio/i).as('bioInput')
const avatarInput = () =>
  cy
    .findByText(/change image/i)
    .parent()
    .find('input[type="file"]')
    .as('avatarInput')
const bannerInput = () =>
  cy
    .findByText(/change banner/i)
    .parent()
    .find('input[type="file"]')
    .as('bannerInput')
const avatarFallbackImage = () => cy.get('img, [title="Avatar Fallback"]').as('avatarFallbackImage')
const avatarImage = () => cy.findByAltText('Avatar image').as('avatarImage')
const bannerImage = () => cy.findByAltText('Home Banner').as('bannerImage')
// const changeAvatarButton = () =>
//   cy.findByLabelText(/avatar image/i, { selector: 'button' }).as('changeAvatarButton')
const changeAvatarButton = () => cy.findByText(/change image/i).as('changeAvatarButton')
const removeAvatarButton = () =>
  cy.findByRole('button', { name: /remove avatar button/i }).as('removeAvatarButton')
const changeBannerButton = () => cy.findByText(/change banner/i).as('changeBannerButton')
const removeBannerButton = () =>
  cy.findByLabelText(/remove banner button/i).as('removeBannerButton')
const saveChangesButton = () =>
  cy.findByRole('button', { name: /save changes/i }).as('saveChangesButton')

describe('ProfileSettings', () => {
  it('should render profile settings form elements with initial data', () => {
    const { environment, queueOperationResolver } = createTestEnvironment()
    queueOperationResolver({
      queryName: 'ProfileSettingsForTestingQuery',
      data: profileSettingsMockData,
    })
    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <ProfileSettingsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.findByText('Profile').should('exist')
    cy.findByText('Manage your personal information you and other people see.').should('exist')
    nameInput().should('have.value', 'John Doe')
    usernameInput().should('have.value', 'johndoes')
    phoneInput().should('have.value', '+1 (555) 123-4567')
    bioInput().should('have.value', 'John Doe is a software engineer at Google.')
    avatarFallbackImage().should('exist')
    changeAvatarButton().should('exist')
    bannerImage().should('exist')
    changeBannerButton().should('exist')
    saveChangesButton().should('be.disabled')
  })

  it('should show validation errors for invalid input', () => {
    const { environment, queueOperationResolver } = createTestEnvironment()
    queueOperationResolver({
      queryName: 'ProfileSettingsForTestingQuery',
      data: profileSettingsMockData,
    })
    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <ProfileSettingsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.step('Test name validation')
    nameInput().clear().blur()
    cy.findByText('Please enter a name.').should('exist')
    cy.step('Test username validation')
    usernameInput().clear().type('short').blur()
    cy.findByText('Username must be at least 8 characters long.').should('exist')
    cy.get('@usernameInput').clear().type('invalid-username').blur()
    cy.findByText('Username can only contain letters and numbers').should('exist')
    saveChangesButton().should('be.disabled')
  })

  it('should update text fields successfully', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()
    queueOperationResolver({
      queryName: 'ProfileSettingsForTestingQuery',
      data: profileSettingsMockData,
    })
    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <ProfileSettingsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    nameInput().clear().type('Jane Smith')
    usernameInput().clear().type('janesmith')
    phoneInput().clear().type('+1123456789')
    bioInput().clear().type('Jane Smith is a software engineer at Microsoft.')
    saveChangesButton().should('not.be.disabled')
    cy.step('Submit the form')
    cy.get('@saveChangesButton')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileSettingsTextUpdateData })
      })
    cy.findByText('Profile updated').should('exist')
    cy.get('@nameInput').should('have.value', 'Jane Smith')
    cy.get('@usernameInput').should('have.value', 'janesmith')
    cy.get('@phoneInput').should('have.value', '+1 (123) 456-789')
    cy.get('@bioInput').should('have.value', 'Jane Smith is a software engineer at Microsoft.')
  })

  it('should update and remove avatar image successfully', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()
    queueOperationResolver({
      queryName: 'ProfileSettingsForTestingQuery',
      data: profileSettingsMockData,
    })
    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <ProfileSettingsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.step('Update the avatar image')
    avatarInput().selectFile('cypress/fixtures/tsl-logo.png', { force: true })
    changeAvatarButton().should('exist')
    removeAvatarButton().should('exist')
    saveChangesButton().should('not.be.disabled')
    cy.step('Submit the form')
    cy.get('@saveChangesButton')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileSettingsImageUpdateData })
      })
    cy.findByText('Profile updated').should('exist')
    avatarImage().should('exist')
    cy.step('Remove the avatar image')
    cy.findByRole('button', { name: /remove/i })
      .first()
      .click()
    saveChangesButton().should('not.be.disabled')
    cy.step('Submit the form')
    cy.get('@saveChangesButton')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileSettingsImageRemoveData })
      })
    cy.findByText('Profile updated').should('exist')
  })

  it('should update and remove banner image successfully', () => {
    const { environment, resolveMostRecentOperation, queueOperationResolver } =
      createTestEnvironment()
    queueOperationResolver({
      queryName: 'ProfileSettingsForTestingQuery',
      data: profileSettingsMockData,
    })
    cy.mockNextRouter().then((router) => {
      cy.mount(
        <AppRouterContext.Provider value={router}>
          <ProfileSettingsForTesting environment={environment} />
        </AppRouterContext.Provider>,
      )
    })

    cy.step('Update the banner image')
    bannerInput().selectFile('cypress/fixtures/tsl-logo.png', { force: true })
    changeBannerButton().should('exist')
    removeBannerButton().should('exist')
    saveChangesButton().should('not.be.disabled')
    cy.step('Submit the form')
    cy.get('@saveChangesButton')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileSettingsBannerUpdateData })
      })
    cy.findByText('Profile updated').should('exist')
    bannerImage().should('exist')
    cy.step('Remove the banner image')
    cy.get('@removeBannerButton').click()
    cy.get('@saveChangesButton').should('not.be.disabled')
    cy.step('Submit the form')
    cy.get('@saveChangesButton')
      .click()
      .then(() => {
        resolveMostRecentOperation({ data: profileSettingsBannerRemoveData })
      })
    cy.findByText('Profile updated').should('exist')
  })
})
