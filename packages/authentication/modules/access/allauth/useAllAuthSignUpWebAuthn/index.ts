'use client'

import { useMutation } from '@tanstack/react-query'

// import {
//   create,
//   parseCreationOptionsFromJSON
// } from '@github/webauthn-json/browser-ponyfill'

// import AllAuthApi from '../../../../services/allAuth'

export const useAllAuthSignUpWebAuthn = () => {
  // TODO: Finish implementation
  const mutation = useMutation({
    mutationFn: async () => {
      // Example how to create signup passkey
      // const optionsResponse = await AllAuthApi.createWebAuthnAuthenticatorOptions({ passwordless: true })
      // if (optionsResponse.status === 200) {
      //   const jsonOptions = optionsResponse.data.creationOptions
      //   const options = parseCreationOptionsFromJSON(jsonOptions)
      //   const credential = await create(options)
      //   const signupResponse = await AllAuthApi.signupWebAuthn({ email, credential })
      //   console.log(signupResponse)
      // }
    },
  })

  return {
    mutation,
  }
}
