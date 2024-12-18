'use client'

import { useMutation } from '@tanstack/react-query'

// TODO: MFA Follow Up | Sign Up & Login with Passkey
// Example how to perform signup

// import {
//   create,
//   parseCreationOptionsFromJSON
// } from '@github/webauthn-json/browser-ponyfill'

// import AllAuthApi from '../../../../services/allAuth'

const useAllAuthSignUpWebAuthn = () => {
  const mutation = useMutation({
    mutationFn: async () => {
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

export default useAllAuthSignUpWebAuthn
