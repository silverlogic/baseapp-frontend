import { ValueOf } from '@baseapp-frontend/utils'

import { MFA_METHOD } from '../modules/mfa/constants'

export type MfaMethod = ValueOf<typeof MFA_METHOD>

export interface IMfaActiveMethodResponse {
  name: MfaMethod
  isPrimary: boolean
}

export interface IMfaConfigurationResponse {
  methods: MfaMethod[]
  confirmDisableWithCode: boolean
  confirmRegenerationWithCode: boolean
  allowBackupCodesRegeneration: boolean
}

export interface IMfaRequest {
  method: MfaMethod
  code: string
}

export interface IMfaDeactivateRequest {
  method: IMfaRequest['method']
  code?: IMfaRequest['code']
}

export interface IMfaConfirmationResponse {
  backupCodes: string[]
}

export interface IMfaActivationResponse {
  details: string
}

export type MfaActivationEmailRequest = {
  email: string
}

export type MfaActivationPhoneRequest = {
  phoneNumber: string
}
