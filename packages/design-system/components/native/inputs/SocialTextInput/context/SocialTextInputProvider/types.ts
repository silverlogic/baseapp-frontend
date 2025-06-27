export type SocialTextInputState = {
  textHeight?: number
  isFocused?: boolean
}

type SocialTextInputFunctions = {
  setSocialInputState: (state: SocialTextInputState) => void
  reset: VoidFunction
}

export type UseSocialTextInput = SocialTextInputState & SocialTextInputFunctions
