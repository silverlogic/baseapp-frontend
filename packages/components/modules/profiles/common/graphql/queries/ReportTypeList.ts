import { graphql } from 'react-relay'

export const ReportTypeListQuery = graphql`
  query ReportTypeListQuery($topLevelOnly: Boolean!, $targetObjectId: String) {
    allReportTypes(topLevelOnly: $topLevelOnly, targetObjectId: $targetObjectId) {
      edges {
        node {
          id
          name
          label
          subTypes {
            edges {
              node {
                id
                name
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
