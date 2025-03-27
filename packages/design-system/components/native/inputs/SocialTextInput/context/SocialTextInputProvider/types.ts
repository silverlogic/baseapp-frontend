export type SocialTextInputState = {
  textHeight: number
  isFocused: boolean
}

type SocialTextInputFunctions = {
  setSocialInputState: (
    partial:
      | Partial<SocialTextInputState>
      | ((state: SocialTextInputState) => Partial<SocialTextInputState>),
    replace?: boolean | undefined,
  ) => void
  reset: VoidFunction
}

export type UseSocialTextInput = SocialTextInputState & SocialTextInputFunctions
