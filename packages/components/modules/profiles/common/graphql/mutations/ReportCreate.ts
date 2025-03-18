import { graphql } from 'relay-runtime'

export const ReportCreateMutationQuery = graphql`
  mutation ReportCreateMutation($input: ReportCreateInput!) {
    reportCreate(input: $input) {
      report {
        node {
          reportSubject
          reportType
        }
      }
    }
  }
`
