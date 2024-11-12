'use client'

import { useMutation } from '@tanstack/react-query'

// import {
//   parseRequestOptionsFromJSON,
//   get
// } from '@github/webauthn-json/browser-ponyfill'

// import AllAuthApi from '../../../../services/allAuth'

// TODO: Finish implementation
export const useAllAuthLoginWebAuthn = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      // Example how to perform login
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
