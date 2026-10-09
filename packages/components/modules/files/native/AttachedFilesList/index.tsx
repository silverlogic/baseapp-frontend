import type { FC } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { useFragment } from 'react-relay'

import { FilesListFragment } from '../../common/graphql/queries/FilesList'
import AttachedFileChip from './AttachedFileChip'
import { createStyles } from './styles'
import type { AttachedFilesListProps } from './types'

/** Read-only row of the files attached to a target (e.g. a comment). */
const AttachedFilesList: FC<AttachedFilesListProps> = ({
  target: targetRef,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const target = useFragment(FilesListFragment, targetRef)
  const styles = createStyles()
  const edges = target.files?.edges ?? []

  if (!edges.length) {
    return null
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    >
      {edges.map((edge) =>
        edge?.node ? (
          <AttachedFileChip
            key={edge.node.id}
            file={edge.node}
            shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
          />
        ) : null,
      )}
    </ScrollView>
  )
}

export default AttachedFilesList
export type { AttachedFilesListProps } from './types'
