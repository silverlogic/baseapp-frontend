'use client'

import { useMutation } from '@tanstack/react-query'

// TODO: MFA Follow Up | Sign Up & Login with Passkey
// Example how to perform login

// import {
//   parseRequestOptionsFromJSON,
//   get
// } from '@github/webauthn-json/browser-ponyfill'

// import AllAuthApi from '../../../../services/allAuth'
export const useAllAuthLoginWebAuthn = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      // const optionsResponse = await AllAuthApi.loginWebAuthnOptions()
      // const jsonOptions = optionsResponse.data.requestOptions
      // const options = parseRequestOptionsFromJSON(jsonOptions)
      // const credential = await get(options)
      // const loginResponse = await AllAuthApi.loginWebAuthn(credential)
      // return loginResponse
    },
  })

  return {
    mutation,
  }
}
