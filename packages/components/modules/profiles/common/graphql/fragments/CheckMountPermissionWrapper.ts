import { graphql } from 'react-relay'

export const CheckMountPermissionWrapper = graphql`
  fragment CheckMountPermissionWrapper on PermissionsInterface
  @argumentDefinitions(perm: { type: "String!", defaultValue: "change" }) {
    canMountComponent: hasPerm(perm: $perm)
  }
`
