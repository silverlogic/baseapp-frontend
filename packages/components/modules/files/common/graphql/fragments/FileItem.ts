import { graphql } from 'react-relay'

export const FileItemFragment = graphql`
  fragment FileItem_file on File {
    id
    fileName
    fileSize
    fileContentType
    uploadStatus
    file
    description
    created
    createdBy {
      id
      fullName
    }
    hasPerm(perm: "change_file")
    thumbnail(width: 100, height: 100)
  }
`
