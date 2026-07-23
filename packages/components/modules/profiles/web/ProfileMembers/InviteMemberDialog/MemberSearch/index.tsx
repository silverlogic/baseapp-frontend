'use client'

import { FC, useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AddIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { AutocompleteField } from '@baseapp-frontend/design-system/components/web/inputs'
import { useDebouncedValue } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { InviteMembersSearchQuery as InviteMembersSearchQueryType } from '../../../../../../__generated__/InviteMembersSearchQuery.graphql'
import { InviteMembersSearchQuery, useInviteMembersSearch } from '../../../../common'
import {
  INVITE_MEMBER_DIALOG_COPY as COPY,
  EMAIL_REGEX,
  SEARCH_DEBOUNCE_MS,
  SEARCH_RESULTS_COUNT,
} from '../constants'
import { MemberSearchOption, MemberSearchProps, SelectedProfile } from '../types'
import { getMemberKey } from '../utils'
import { ChipsList, MemberChip, OptionInfo } from './styled'

const MemberSearch: FC<MemberSearchProps> = ({ selected, onAdd, onRemove }) => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, { debounceTime: SEARCH_DEBOUNCE_MS })
  const [isPending, startTransition] = useTransition()

  const queryRef = useLazyLoadQuery<InviteMembersSearchQueryType>(InviteMembersSearchQuery, {
    count: SEARCH_RESULTS_COUNT,
    q: '',
  })
  const { data, refetch } = useInviteMembersSearch(queryRef)
  const isInitialQuery = useRef(true)

  useEffect(() => {
    // The lazy query already loaded with q:'', so skip the refetch on mount — otherwise
    // the in-field spinner flashes right after the dialog's initial Suspense fallback.
    if (isInitialQuery.current) {
      isInitialQuery.current = false
      return
    }
    // Refetch inside a transition so the new search query doesn't suspend the component
    // (which would trigger the parent <Suspense> fallback and unmount the input).
    startTransition(() => {
      refetch({ q: debouncedQuery.trim() || null, count: SEARCH_RESULTS_COUNT })
    })
  }, [debouncedQuery, refetch])

  const selectedKeys = useMemo(() => new Set(selected.map(getMemberKey)), [selected])

  const profileOptions = useMemo<SelectedProfile[]>(() => {
    const options: SelectedProfile[] = []
    // eslint-disable-next-line no-restricted-syntax
    for (const edge of data.allProfiles?.edges ?? []) {
      const node = edge?.node
      const userId = node?.user?.id
      // Dedupe by userId — must match the `profile:${userId}` contract in getMemberKey.
      if (!node || !userId || selectedKeys.has(`profile:${userId}`)) {
        // eslint-disable-next-line no-continue
        continue
      }
      options.push({
        kind: 'profile',
        profileId: node.id,
        userId,
        name: node.name ?? node.urlPath?.path ?? '',
        handle: node.urlPath?.path ?? undefined,
        avatarUrl: node.image ?? undefined,
      })
    }
    return options
  }, [data.allProfiles?.edges, selectedKeys])

  const trimmedQuery = query.trim()
  const isEmail = EMAIL_REGEX.test(trimmedQuery)
  const canAddEmail = isEmail && !selectedKeys.has(`email:${trimmedQuery}`)

  // Profiles plus the optional "invite this email" row, as a single option list.
  const options = useMemo<MemberSearchOption[]>(() => {
    const next: MemberSearchOption[] = profileOptions.map((profile) => ({
      kind: 'profile',
      profile,
    }))
    if (canAddEmail) {
      next.push({ kind: 'email', email: trimmedQuery })
    }
    return next
  }, [profileOptions, canAddEmail, trimmedQuery])

  const selectOption = (option: MemberSearchOption) => {
    if (option.kind === 'email') {
      onAdd({ kind: 'email', email: option.email })
    } else {
      onAdd(option.profile)
    }
    setQuery('')
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <AutocompleteField
        options={options}
        value={null}
        inputValue={query}
        isPending={isPending}
        placeholder={COPY.searchPlaceholder}
        freeSolo={false}
        autoComplete
        // Results are filtered server-side via refetch; keep MUI from re-filtering them.
        filterOptions={(unfiltered) => unfiltered}
        getOptionLabel={(option) => {
          const optionData = option as MemberSearchOption
          return optionData.kind === 'email' ? optionData.email : optionData.profile.name
        }}
        onChange={(_event: unknown, value?: unknown) => {
          if (value) selectOption(value as MemberSearchOption)
        }}
        onInputChange={(_event, value, reason) => {
          if (reason === 'input') setQuery(value)
        }}
        renderOption={(optionProps, option) => {
          const optionData = option as MemberSearchOption
          // Extract MUI's per-option key (unique, index-based) so it isn't spread.
          const { key, ...liProps } = optionProps as typeof optionProps & { key?: string }
          if (optionData.kind === 'email') {
            return (
              <Box
                component="li"
                key={key}
                {...liProps}
                sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5 }}
              >
                <Typography variant="subtitle2" noWrap>
                  {optionData.email}
                </Typography>
                <AddIcon />
              </Box>
            )
          }
          const { profile } = optionData
          return (
            <Box component="li" key={key} {...liProps}>
              <OptionInfo>
                <AvatarWithPlaceholder
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={32}
                  height={32}
                />
                <Box sx={{ minWidth: 0, textAlign: 'left' }}>
                  <Typography variant="subtitle2" noWrap>
                    {profile.name}
                  </Typography>
                  {profile.handle && (
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {profile.handle}
                    </Typography>
                  )}
                </Box>
              </OptionInfo>
            </Box>
          )
        }}
      />

      {selected.length > 0 && (
        <ChipsList>
          {selected.map((member) => {
            const isProfile = member.kind === 'profile'
            const label = isProfile ? member.name : member.email
            return (
              <MemberChip key={getMemberKey(member)}>
                <AvatarWithPlaceholder
                  src={isProfile ? member.avatarUrl : undefined}
                  alt={label}
                  width={32}
                  height={32}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" noWrap>
                    {label}
                  </Typography>
                  {isProfile && member.handle && (
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {member.handle}
                    </Typography>
                  )}
                </Box>
                <IconButton
                  aria-label="Remove member"
                  size="small"
                  onClick={() => onRemove(getMemberKey(member))}
                >
                  <CloseIcon />
                </IconButton>
              </MemberChip>
            )
          })}
        </ChipsList>
      )}
    </Box>
  )
}

export default MemberSearch
