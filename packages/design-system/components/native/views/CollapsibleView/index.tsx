import { FC, useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'

import { useTheme } from '../../../../providers/native'
import Text from '../../typographies/Text'
import View from '../View'
import { styles } from './styles'
import { CollapsibleViewProps } from './types'

const CollapsibleView: FC<CollapsibleViewProps> = ({ children, title }) => {
  const { colors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={colors.object.low}
        />
        <Text variant="body1">{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  )
}

export default CollapsibleView
