'use client'

import { FC, MouseEvent, useEffect, useMemo, useState, useTransition } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AddIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useDebouncedValue } from '@baseapp-frontend/utils'

import { Box, Popper, TextField, Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { InviteMembersSearchQuery as InviteMembersSearchQueryType } from '../../../../../../__generated__/InviteMembersSearchQuery.graphql'
import { InviteMembersSearchQuery, useInviteMembersSearch } from '../../../../common'
import {
  INVITE_MEMBER_DIALOG_COPY as COPY,
  EMAIL_REGEX,
  SEARCH_DEBOUNCE_MS,
  SEARCH_RESULTS_COUNT,
} from '../constants'
import { MemberSearchProps, SelectedProfile } from '../types'
import { getMemberKey } from '../utils'
import {
  ChipsList,
  MemberChip,
  OptionInfo,
  OptionRow,
  OptionsDropdown,
  SearchFieldWrapper,
} from './styled'

const MemberSearch: FC<MemberSearchProps> = ({ selected, onAdd, onRemove }) => {
  const [query, setQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebouncedValue(query, { debounceTime: SEARCH_DEBOUNCE_MS })
  const [, startTransition] = useTransition()

  const queryRef = useLazyLoadQuery<InviteMembersSearchQueryType>(InviteMembersSearchQuery, {
    count: SEARCH_RESULTS_COUNT,
    q: '',
  })
  const { data, refetch } = useInviteMembersSearch(queryRef)

  useEffect(() => {
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
      if (!node || !userId || selectedKeys.has(`profile:${node.id}`)) {
        // eslint-disable-next-line no-continue
        continue
      }
      options.push({
        kind: 'profile',
        profileId: node.id,
        userId,
        name: node.name ?? node.urlPath?.path ?? '',
        handle: node.urlPath?.path ?? undefined,
        avatarUrl: node.image?.url ?? undefined,
      })
    }
    return options
  }, [data.allProfiles?.edges, selectedKeys])

  const trimmedQuery = query.trim()
  const isEmail = EMAIL_REGEX.test(trimmedQuery)
  const canAddEmail = isEmail && !selectedKeys.has(`email:${trimmedQuery}`)
  const showDropdown = isOpen && Boolean(trimmedQuery) && (profileOptions.length > 0 || canAddEmail)

  // Select on mousedown (with preventDefault) so the click never blurs the input — keeps
  // it focused for adding more, and avoids the dropdown closing before the click registers.
  const handleSelect = (event: MouseEvent, member: SelectedProfile | { kind: 'email' }) => {
    event.preventDefault()
    if (member.kind === 'email') {
      onAdd({ kind: 'email', email: trimmedQuery })
    } else {
      onAdd(member)
    }
    setQuery('')
  }

  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <SearchFieldWrapper ref={setAnchorEl}>
        <TextField
          fullWidth
          size="small"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          placeholder={COPY.searchPlaceholder}
          autoComplete="off"
        />
        <Popper
          open={showDropdown}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{ zIndex: (theme) => theme.zIndex.modal + 1, width: anchorEl?.clientWidth }}
        >
          <OptionsDropdown>
            {profileOptions.map((option) => (
              <OptionRow
                key={option.profileId}
                onMouseDown={(event) => handleSelect(event, option)}
              >
                <OptionInfo>
                  <AvatarWithPlaceholder
                    src={option.avatarUrl}
                    alt={option.name}
                    width={32}
                    height={32}
                  />
                  <Box sx={{ minWidth: 0, textAlign: 'left' }}>
                    <Typography variant="subtitle2" noWrap>
                      {option.name}
                    </Typography>
                    {option.handle && (
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {option.handle}
                      </Typography>
                    )}
                  </Box>
                </OptionInfo>
              </OptionRow>
            ))}
            {canAddEmail && (
              <OptionRow onMouseDown={(event) => handleSelect(event, { kind: 'email' })}>
                <Typography variant="subtitle2" noWrap>
                  {trimmedQuery}
                </Typography>
                <AddIcon />
              </OptionRow>
            )}
          </OptionsDropdown>
        </Popper>
      </SearchFieldWrapper>

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
