import type { ValueOf } from '@baseapp-frontend/utils'

import { MFA_METHOD } from '../modules/mfa/constants'

export type MfaMethod = ValueOf<typeof MFA_METHOD>

export interface MfaActiveMethodResponse {
  name: MfaMethod
  isPrimary: boolean
}

export interface MfaConfigurationResponse {
  methods: MfaMethod[]
  confirmDisableWithCode: boolean
  confirmRegenerationWithCode: boolean
  allowBackupCodesRegeneration: boolean
}

export interface MfaRequest {
  method: MfaMethod
  code: string
}

export interface MfaDeactivateRequest {
  method: MfaRequest['method']
  code?: MfaRequest['code']
}

export interface MfaConfirmationResponse {
  backupCodes: string[]
}

export interface MfaActivationResponse {
  details: string
}

export type MfaActivationEmailRequest = {
  email: string
}

export type MfaActivationPhoneRequest = {
  phoneNumber: string
}
