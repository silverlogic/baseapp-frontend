import { FC } from 'react'

import { Text } from '../../../../components/native/typographies'
import { View } from '../../../../components/native/views'
import DrawerItem from './DrawerItem'
import { styles } from './styles'
import { DrawerContentProps } from './types'

const DrawerContent: FC<DrawerContentProps> = ({ ProjectLogo, sections }) => (
  <View style={styles.container}>
    <ProjectLogo style={styles.projectImage} />
    <View style={styles.sectionsContainer}>
      {sections.map((section) => (
        <View key={section.label} style={styles.sectionContainer}>
          <Text variant="overline" color="disabled" style={styles.sectionLabel}>
            {section.label}
          </Text>
          {section.items.map(({ href, Icon, label }) => (
            <DrawerItem key={label} href={href} Icon={Icon} label={label} />
          ))}
        </View>
      ))}
    </View>
  </View>
)

export default DrawerContent
