export enum MfaMethodEnum {
  email = 'email',
  app = 'app',
  smsTwilio = 'sms_twilio',
}

export declare type MfaMethod = `${MfaMethodEnum}`

export interface IMfaActiveMethodResponse {
  name: string
  isPrimary: boolean
}

export interface IMfaConfigurationResponse {
  methods: string[]
  confirmDisableWithCode: boolean
  confirmRegenerationWithCode: boolean
  allowBackupCodesRegeneration: boolean
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
