import React from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { EditIcon, ShareIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { ScrollView, View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useRouter } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import { Image } from 'react-native'
import { useFragment } from 'react-relay'

import { ProfileComponentFragment } from '../../common'
import { createStyles } from './styles'
import { ProfileComponentProps } from './types'

const ProfileComponent = ({ profile: profileRef }: ProfileComponentProps) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const profile = useFragment(ProfileComponentFragment, profileRef)
  const router = useRouter()

  return (
    <ScrollView
      avoidKeyboard={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: profile?.bannerImage ?? undefined }}
          style={styles.bannerImage ?? undefined}
        />
        <Image source={{ uri: profile?.image ?? undefined }} style={styles.profileImage} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text variant="h6" color="high">
            {profile?.name}
          </Text>
          <Text variant="body2" color="low">
            @{profile?.urlPath?.path?.replace('/', '')}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text variant="h6" color="high">
              {profile?.followersCount}
            </Text>
            <Text variant="body2" color="low">
              <FormattedMessage id="profiles.profile.followers" defaultMessage="Followers" />
            </Text>
          </View>
          <View style={[styles.statContainer, styles.leftBorder]}>
            <Text variant="h6" color="high">
              {profile?.followingCount}
            </Text>
            <Text variant="body2" color="low">
              <FormattedMessage id="profiles.profile.following" defaultMessage="Following" />
            </Text>
          </View>
        </View>
        <Text style={styles.biography} variant="caption" color="low">
          {profile?.biography}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            size="medium"
            mode="soft"
            color="inherit"
            icon={EditIcon}
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => {
              router.push('/profile-settings')
            }}
          >
            <FormattedMessage id="profiles.profile.editProfile" defaultMessage="Edit Profile" />
          </Button>
          <Button
            size="medium"
            mode="soft"
            color="inherit"
            icon={ShareIcon}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            <FormattedMessage id="profiles.profile.shareProfile" defaultMessage="Share profile" />
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileComponent
