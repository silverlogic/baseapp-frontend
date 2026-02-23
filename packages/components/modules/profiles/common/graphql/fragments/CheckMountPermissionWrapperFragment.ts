import { graphql } from 'react-relay'

export const CheckMountPermissionWrapperFragment = graphql`
  fragment CheckMountPermissionWrapperFragment on PermissionsInterface
  @argumentDefinitions(perm: { type: "String!", defaultValue: "change" }) {
    canMountComponent: hasPerm(perm: $perm)
  }
`
