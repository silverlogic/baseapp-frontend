import { graphql } from 'relay-runtime'

export const ReportTypeFragment = graphql`
  fragment ReportTypeFragment on ReportTypeInterface
  @argumentDefinitions(
    topLevelOnly: { type: "Boolean", defaultValue: false }
    targetObjectId: { type: "ID" }
  ) {
    label
    id
    name
    subTypes {
      edges {
        node {
          label
          name
        }
      }
    }
    parentType {
      name
      label
    }
    ... on Profile {
      id
    }
  }
`
