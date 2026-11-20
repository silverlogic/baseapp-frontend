import { graphql } from 'react-relay'

/**
 * A file the backend serves only through permission-checked downloads. Select it on a field
 * exposed with `ProtectedFileField`, read it with `useFragment`, and pass the result to
 * `useProtectedFileDownload().download`.
 */
export const ProtectedFileFragment = graphql`
  fragment ProtectedFile_file on ProtectedFile {
    key
    objectId
    fileName
    contentType
    size
  }
`
