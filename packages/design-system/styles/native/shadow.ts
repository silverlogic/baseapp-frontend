import { transparent } from './transparent'
import { ComponentShadow, VariantShadow, ZShadow } from './types'

export const shadowVariant: VariantShadow = {
  primary: `0px 8px 16px 0px ${transparent.primary[24]}`,
  secondary: `0px 8px 16px 0px ${transparent.secondary[24]}`,
  info: `0px 8px 16px 0px ${transparent.info[24]}`,
  success: `0px 8px 16px 0px ${transparent.success[24]}`,
  warning: `0px 8px 16px 0px ${transparent.warning[24]}`,
  error: `0px 8px 16px 0px ${transparent.error[24]}`,
}

export const shadowComponent: ComponentShadow = {
  card: `0px 0px 2px 0px ${transparent.black[20]}, 0px 12px 24px -4px ${transparent.black[12]}`,
  dropdown: `0px 0px 2px 0px ${transparent.black[24]}, -20px 20px 40px -4px ${transparent.black[8]}`,
  dialog: `-40px 40px 80px -8px ${transparent.black[24]}`,
}

export const shadowZ: ZShadow = {
  z1: `0px 1px 2px 0px ${transparent.black[16]}`,
  z4: `0px 4px 8px 0px ${transparent.black[16]}`,
  z8: `0px 8px 16px 0px ${transparent.black[16]}`,
  z12: `0px 12px 24px -4px ${transparent.black[16]}`,
  z16: `0px 16px 32px -4px ${transparent.black[16]}`,
  z20: `0px 20px 40px -4px ${transparent.black[16]}`,
  z24: `0px 24px 48px 0px ${transparent.black[16]}`,
}

export const shadow = {
  variant: shadowVariant,
  component: shadowComponent,
  z: shadowZ,
}
