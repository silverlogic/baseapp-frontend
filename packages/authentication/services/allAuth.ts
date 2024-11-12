/* eslint-disable no-underscore-dangle */

/* eslint-disable @typescript-eslint/naming-convention */
import { axiosForAllAuth } from '@baseapp-frontend/utils'

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { clone, get, isString } from 'lodash'

import type * as AllAuthTypes from '../types/allAuth'
import { getCSRFToken } from '../utils/allAuth/django'

// This must be APP to be able to get a jwt or auth token in the final response
const ALL_AUTH_CLIENT: AllAuthTypes.Client = AllAuthTypes.Client.APP
const ALL_AUTH_BASE_URL = `/_allauth/${ALL_AUTH_CLIENT}/v1`
// eslint-disable-next-line @typescript-eslint/naming-convention
function ALL_AUTH_URL(path: string): string {
  return `${ALL_AUTH_BASE_URL}/${path}`
}

const ALL_AUTH_URLS = Object.freeze({
  // Meta
  CONFIG: ALL_AUTH_URL('config'),

  // Account management
  CHANGE_PASSWORD: ALL_AUTH_URL('account/password/change'),
  EMAIL: ALL_AUTH_URL('account/email'),
  PROVIDERS: ALL_AUTH_URL('account/providers'),

  // Account management: 2FA
  AUTHENTICATORS: ALL_AUTH_URL('account/authenticators'),
  RECOVERY_CODES: ALL_AUTH_URL('account/authenticators/recovery-codes'),
  TOTP_AUTHENTICATOR: ALL_AUTH_URL('account/authenticators/totp'),

  // Auth: Basics
  LOGIN: ALL_AUTH_URL('auth/login'),
  REQUEST_LOGIN_EMAIL_CODE: ALL_AUTH_URL('auth/code/request'),
  CONFIRM_LOGIN_EMAIL_CODE: ALL_AUTH_URL('auth/code/confirm'),
  SESSION: ALL_AUTH_URL('auth/session'),
  SESSIONS: ALL_AUTH_URL('auth/sessions'),
  REAUTHENTICATE: ALL_AUTH_URL('auth/reauthenticate'),
  REQUEST_PASSWORD_RESET: ALL_AUTH_URL('auth/password/request'),
  RESET_PASSWORD: ALL_AUTH_URL('auth/password/reset'),
  SIGNUP: ALL_AUTH_URL('auth/signup'),
  VERIFY_EMAIL: ALL_AUTH_URL('auth/email/verify'),

  // Auth: 2FA
  MFA_AUTHENTICATE: ALL_AUTH_URL('auth/2fa/authenticate'),
  MFA_REAUTHENTICATE: ALL_AUTH_URL('auth/2fa/reauthenticate'),

  // Auth: Social
  PROVIDER_SIGNUP: ALL_AUTH_URL('auth/provider/signup'),
  REDIRECT_TO_PROVIDER: ALL_AUTH_URL('auth/provider/redirect'),
  PROVIDER_TOKEN: ALL_AUTH_URL('auth/provider/token'),

  // Auth: WebAuthn
  REAUTHENTICATE_WEBAUTHN: ALL_AUTH_URL('auth/webauthn/reauthenticate'),
  AUTHENTICATE_WEBAUTHN: ALL_AUTH_URL('auth/webauthn/authenticate'),
  LOGIN_WEBAUTHN: ALL_AUTH_URL('auth/webauthn/login'),
  SIGNUP_WEBAUTHN: ALL_AUTH_URL('auth/webauthn/signup'),
  WEBAUTHN_AUTHENTICATOR: ALL_AUTH_URL('account/authenticators/webauthn'),
})

export default class AllAuthApi {
  static _request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    if (config.url === ALL_AUTH_URLS.CONFIG) {
      return axiosForAllAuth.request(config)
    }
    if (ALL_AUTH_CLIENT === AllAuthTypes.Client.BROWSER) {
      const csrfToken = getCSRFToken()

      return AllAuthApi._addSessionInfo(
        axiosForAllAuth.request({
          ...config,
          headers: {
            ...config.headers,
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }),
      )
    }
    if (ALL_AUTH_CLIENT === AllAuthTypes.Client.APP) {
      const tokenStorage = window.sessionStorage
      const sessionToken = tokenStorage.getItem('sessionToken')

      return AllAuthApi._addSessionInfo(
        axiosForAllAuth.request({
          ...config,
          headers: {
            ...config.headers,
            'X-Session-Token': sessionToken,
          },
        }),
      )
    }
    return Promise.reject(new Error('Invalid client'))
  }

  // Catch 401 and 410 errors and add sessionInfo to the error
  static _addSessionInfo<T = any, R = AxiosResponse<T>>(promise: Promise<R>): Promise<R> {
    return promise.catch((error) => {
      const newError = clone(error)
      const response = get(newError, 'response')
      if (response && [401, 410].includes(response.status)) {
        newError.sessionInfo = AllAuthApi._sessionInfo(response)
      }
      throw newError
    })
  }

  static _sessionInfo(
    response: AxiosResponse<AllAuthTypes.SessionResponse, any>,
  ): AllAuthTypes.SessionInfo {
    const tokenStorage = window.sessionStorage

    const session = response.data
    const isAuthenticated =
      response.status === 200 || (response.status === 401 && session.meta.isAuthenticated)
    const requiresReauthentication = isAuthenticated && response.status === 401
    let user: AllAuthTypes.SessionResponseDataUser | null = null
    let pendingFlow: AllAuthTypes.SessionResponseAuthFlow | null = null
    if (isAuthenticated) {
      const _session = session as AllAuthTypes.SessionResponseAuthenticated
      user = _session.data.user
    } else {
      if (response.status === 401) {
        const _session = session as AllAuthTypes.SessionResponseNotAuthenticated
        pendingFlow =
          _session.data.flows.find((flow) => flow.isPending) || _session.data.flows[0] || null
      }
      if (response.status === 410) {
        const _session = session as AllAuthTypes.SessionResponseNotAuthenticated
        pendingFlow =
          _session.data.flows.find((flow) => flow.isPending) || _session.data.flows[0] || null
        tokenStorage.removeItem('sessionToken')
      }
    }

    if (isString(response.data.meta?.sessionToken)) {
      tokenStorage.setItem('sessionToken', response.data.meta.sessionToken)
    }

    return {
      isAuthenticated,
      requiresReauthentication,
      user,
      pendingFlow,
      response,
    }
  }

  static QUERY_KEYS = {
    default: ['allauth'],
    config: () => [...AllAuthApi.QUERY_KEYS.default, ALL_AUTH_URLS.CONFIG] as const,
    login: () => [...AllAuthApi.QUERY_KEYS.default, ALL_AUTH_URLS.LOGIN] as const,
    mfaAuthenticate: () =>
      [...AllAuthApi.QUERY_KEYS.default, ALL_AUTH_URLS.MFA_AUTHENTICATE] as const,
    getTOTPAuthenticator: () =>
      [...AllAuthApi.QUERY_KEYS.default, ALL_AUTH_URLS.TOTP_AUTHENTICATOR] as const,
    sessions: () => [...AllAuthApi.QUERY_KEYS.default, ALL_AUTH_URLS.SESSIONS] as const,
    getRecoveryCodes: () =>
      [...AllAuthApi.QUERY_KEYS.default, ALL_AUTH_URLS.RECOVERY_CODES] as const,
  }

  // Meta
  static config(data: AllAuthTypes.ConfigRequest = {}): Promise<AllAuthTypes.ConfigResponse> {
    return AllAuthApi._request({ url: ALL_AUTH_URLS.CONFIG, method: 'GET', params: data }).then(
      (response) => response.data,
    )
  }

  // Account management
  // CHANGE_PASSWORD: ALL_AUTH_URL('account/password/change'),
  // EMAIL: ALL_AUTH_URL('account/email'),
  // PROVIDERS: ALL_AUTH_URL('account/providers'),

  // Account management: 2FA

  // Can return the following status codes and data
  // 200: AllAuthTypes.AuthenticatorsResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 410: Session
  static getAuthenticators(): Promise<AllAuthTypes.AuthenticatorsResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.AUTHENTICATORS,
      method: 'GET',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: AllAuthTypes.TOTPAuthenticatorResponse
  // 404: TOTPAuthenticatorNotFoundResponse
  // 409: ConflictResponse
  static getTOTPAuthenticator(): Promise<AllAuthTypes.TOTPAuthenticatorResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.TOTP_AUTHENTICATOR,
      method: 'GET',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: AllAuthTypes.ActivateTOTPAuthenticatorResponse
  // 400: BadRequestResponse
  // 409: ConflictResponse
  static activateTOTPAuthenticator(
    data: AllAuthTypes.ActivateTOTPAuthenticatorRequest,
  ): Promise<AllAuthTypes.ActivateTOTPAuthenticatorResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.TOTP_AUTHENTICATOR,
      method: 'POST',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: AllAuthTypes.ActivateTOTPAuthenticatorResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated (to reauthenticate)
  static deactivateTOTPAuthenticator(): Promise<AllAuthTypes.DeactivateTOTPAuthenticatorResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.TOTP_AUTHENTICATOR,
      method: 'DELETE',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: RecoveryCodesResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated (to reauthenticate)
  // 404: NotFoundResponse
  static getRecoveryCodes(): Promise<AllAuthTypes.RecoveryCodesResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.RECOVERY_CODES,
      method: 'GET',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: NA
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated (to reauthenticate)
  static generateRecoveryCodes(): Promise<AllAuthTypes.RecoveryCodesResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.RECOVERY_CODES,
      method: 'POST',
    }).then((response) => response.data)
  }
  // TOTP_AUTHENTICATOR: ALL_AUTH_URL('account/authenticators/totp'),

  // Auth: Basics

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 409: ConflictResponse
  static login(data: AllAuthTypes.LoginRequest): Promise<AllAuthTypes.SessionInfo> {
    const tokenStorage = window.sessionStorage
    tokenStorage.removeItem('sessionToken')

    return AllAuthApi._request({
      url: ALL_AUTH_URLS.LOGIN,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Can return the following status codes and data
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static logout(): Promise<void> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SESSION,
      method: 'DELETE',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: NA?
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static requestLoginEmailCode(
    data: AllAuthTypes.RequestLoginEmailCodeRequest,
  ): Promise<AllAuthTypes.SessionInfo> {
    const tokenStorage = window.sessionStorage
    tokenStorage.removeItem('sessionToken')

    return AllAuthApi._request({
      url: ALL_AUTH_URLS.REQUEST_LOGIN_EMAIL_CODE,
      method: 'POST',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 409: ConflictResponse
  static confirmLoginEmailCode(
    data: AllAuthTypes.ConfirmLoginEmailCodeRequest,
  ): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.CONFIRM_LOGIN_EMAIL_CODE,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 410: SessionInfo with SessionResponseInvalid
  static session(): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SESSION,
      method: 'GET',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: NA
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static endSession(): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SESSION,
      method: 'DELETE',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionsResponse
  static sessions(): Promise<AllAuthTypes.SessionsResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SESSIONS,
      method: 'GET',
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionsResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // If we end all sessions it will return a 410 AllAuthTypes.SessionInfo
  // But this status code isn't in the documentation
  static endSessions(
    data: AllAuthTypes.EndSessionsRequest,
  ): Promise<AllAuthTypes.SessionsResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SESSIONS,
      method: 'DELETE',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  static reauthenticate(
    data: AllAuthTypes.ReauthenticateRequest,
  ): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.REAUTHENTICATE,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Can return the following status codes and data
  // 200: GetResetPasswordRequest
  // 400: BadRequestResponse
  static requestPasswordReset(
    data: AllAuthTypes.RequestPasswordResetRequest,
  ): Promise<AllAuthTypes.RequestPasswordResetResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.REQUEST_PASSWORD_RESET,
      method: 'POST',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: GetResetPasswordRequest
  // 400: BadRequestResponse
  static getPasswordResetInfo({
    key,
  }: AllAuthTypes.GetPasswordResetInfoRequest): Promise<AllAuthTypes.GetPasswordResetInfoResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.REQUEST_PASSWORD_RESET,
      method: 'POST',
      headers: {
        'X-Password-Reset-Key': key,
      },
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static resetPassword(data: AllAuthTypes.ResetPasswordRequest): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.RESET_PASSWORD,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 403: ForbiddenResponse
  // 409: ConflictResponse
  static signUp(data: AllAuthTypes.SignUpRequest): Promise<AllAuthTypes.SessionInfo> {
    const tokenStorage = window.sessionStorage
    tokenStorage.removeItem('sessionToken')

    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SIGNUP,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Can return the following status codes and data
  // 200: GetResetPasswordRequest
  // 400: BadRequestResponse
  static getVerifyEmailInfo({
    key,
  }: AllAuthTypes.GetVerifyEmailInfoRequest): Promise<AllAuthTypes.GetVerifyEmailInfoResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.VERIFY_EMAIL,
      method: 'GET',
      headers: {
        'X-Email-Verification-Key': key,
      },
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static verifyEmail(data: AllAuthTypes.VerifyEmailRequest): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.VERIFY_EMAIL,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // // Auth: 2FA
  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static mfaAuthenticate(
    data: AllAuthTypes.TOTPAuthenticateRequest | AllAuthTypes.RecoveryCodeAuthenticateRequest,
  ): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.MFA_AUTHENTICATE,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 400: BadRequestResponse
  static mfaReauthenticate(
    data: AllAuthTypes.TOTPReauthenticateRequest,
  ): Promise<AllAuthTypes.SessionInfo> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.MFA_REAUTHENTICATE,
      method: 'POST',
      data,
    }).then((response) => {
      const sessionInfo = AllAuthApi._sessionInfo(response)
      return sessionInfo
    })
  }

  // Auth: Social
  // TODO: Implement the following when adding AllAuth Social Provider Integrations
  // PROVIDER_SIGNUP: ALL_AUTH_URL('auth/provider/signup')
  // REDIRECT_TO_PROVIDER: ALL_AUTH_URL('auth/provider/redirect')
  // PROVIDER_TOKEN: ALL_AUTH_URL('auth/provider/token')

  // Auth: WebAuthn

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 403: ForbiddenResponse
  // 409: ConflictResponse
  // This method never returns 200. Instead it returns a 401 which will redirect the user to the
  // verify email flow, after which WebAuthn credential creation options can be retrieved (GET) and used to actualy complete (PUT) the flow.
  static signupWebAuthn(data: AllAuthTypes.SignupWebAuthnRequest): Promise<void> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.SIGNUP_WEBAUTHN,
      method: 'POST',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 409: ConflictResponse
  static createWebAuthnAuthenticatorOptions(
    data: AllAuthTypes.CreateWebAuthnAuthenticatorOptionsRequest,
  ): Promise<AllAuthTypes.CreateWebAuthnAuthenticatorOptionsResponse> {
    let params = {}
    if (data.passwordless) {
      params = { passwordless: true }
    }
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.WEBAUTHN_AUTHENTICATOR,
      method: 'GET',
      params,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 401: SessionInfo with SessionResponseNotAuthenticated
  // 409: ConflictResponse
  static addWebAuthnCredential(
    data: AllAuthTypes.AddWebAuthnCredentialRequest,
  ): Promise<AllAuthTypes.AddWebAuthnCredentialResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.WEBAUTHN_AUTHENTICATOR,
      method: 'POST',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static updateWebAuthnCredential(
    data: AllAuthTypes.UpdateWebAuthnCredentialRequest,
  ): Promise<AllAuthTypes.UpdateWebAuthnCredentialResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.WEBAUTHN_AUTHENTICATOR,
      method: 'PUT',
      data,
    }).then((response) => response.data)
  }

  // Can return the following status codes and data
  // 200: SessionInfo with SessionResponseAuthenticated
  // 401: SessionInfo with SessionResponseNotAuthenticated
  static deleteWebAuthnCredential(
    data: AllAuthTypes.DeleteWebAuthnCredentialRequest,
  ): Promise<AllAuthTypes.DeleteWebAuthnCredentialResponse> {
    return AllAuthApi._request({
      url: ALL_AUTH_URLS.WEBAUTHN_AUTHENTICATOR,
      method: 'DELETE',
      data,
    }).then((response) => response.data)
  }

  // TODO: Finish implementing webauthn endpoints
  // See https://docs.allauth.org/en/latest/headless/openapi-specification
  // Get WebAuthn credential request options for 2FA
  // Perform 2FA using WebAuthn
  // Get WebAuthn credential request options for reauthentication
  // Reauthenticate using WebAuthn
  // Get WebAuthn credential request options for login
  // Login using WebAuthn
}
