import { graphql } from 'react-relay'

export const ReportTypeListQuery = graphql`
  query ReportTypeListQuery($topLevelOnly: Boolean!, $targetObjectId: String) {
    allReportTypes(topLevelOnly: $topLevelOnly, targetObjectId: $targetObjectId) {
      edges {
        node {
          id
          key
          label
          subTypes {
            edges {
              node {
                id
                key
                label
                parentType {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`
