import { graphql } from 'react-relay'

export const AddContactToGroupItemFragment = graphql`
  fragment AddContactToGroupItemFragment on ChatRoom
  @argumentDefinitions(contactProfileId: { type: "ID!" }) {
    id
    title
    participantsCount
    image(width: 100, height: 100) {
      url
    }
    isParticipant(profileId: $contactProfileId)
  }
`
