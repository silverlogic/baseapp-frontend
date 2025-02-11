import type { FC } from 'react'

import { Pressable, type PressableProps } from 'react-native'

const IconButton: FC<PressableProps> = (props) => <Pressable style={{ padding: 8 }} {...props} />

export default IconButton
