import { FC } from 'react'

import { PageComponentFragment } from '@baseapp-frontend/components/pages/common'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import RenderHtml from '@native-html/render'
import { type Href, useRouter } from 'expo-router'
import { Linking, ScrollView, useWindowDimensions } from 'react-native'
import { useFragment } from 'react-relay'

import { CONTENT_HORIZONTAL_PADDING, HTML_TAGS_STYLES } from './constants'
import { createStyles } from './styles'
import { PageComponentProps } from './types'

const PageComponent: FC<PageComponentProps> = ({ page: pageRef }) => {
  const page = useFragment(PageComponentFragment, pageRef)
  const { width } = useWindowDimensions()
  const theme = useTheme()
  const router = useRouter()
  const styles = createStyles(theme)

  // Internal links (href starting with "/") route through expo-router; everything else
  // (http(s), mailto, tel, …) opens in the device's default handler / browser.
  const handleLinkPress = (href?: string) => {
    if (!href) return
    if (href.startsWith('/')) {
      router.push(href as Href)
    } else {
      Linking.openURL(href)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!!page.title && (
        <Text variant="h2" style={styles.title}>
          {page.title}
        </Text>
      )}
      <RenderHtml
        contentWidth={width - CONTENT_HORIZONTAL_PADDING * 2}
        source={{ html: page.body ?? '' }}
        baseStyle={styles.body}
        tagsStyles={HTML_TAGS_STYLES}
        renderersProps={{ a: { onPress: (_event, href) => handleLinkPress(href) } }}
        // Collapse adjacent vertical margins like the web does (RN otherwise adds them,
        // doubling the gap between headings and paragraphs).
        enableExperimentalMarginCollapsing
      />
    </ScrollView>
  )
}

export default PageComponent
