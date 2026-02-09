import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'
import { AboutProps } from './type'

const About: FC<AboutProps> = ({ biography }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.aboutContainer}>
      <View style={styles.aboutTextContainer}>
        <Text variant="subtitle2" color="high">
          About
        </Text>
      </View>
      <View style={styles.bioContainer}>
        <Text variant="body2" color="low">
          {biography ?? ''}
        </Text>
      </View>
    </View>
  )
}

export default About
