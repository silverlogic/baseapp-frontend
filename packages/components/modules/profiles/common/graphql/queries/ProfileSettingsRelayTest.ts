import { graphql } from 'react-relay'

export const ProfileSettingsRelayTest = graphql`
  query ProfileSettingsRelayTestQuery @relay_test_operation {
    profile: node(id: "test-id") {
      ...ProfileComponentFragment
    }
  }
`
