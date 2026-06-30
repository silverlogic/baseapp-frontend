'use client'

import { FC, KeyboardEvent, MouseEvent, useEffect, useMemo, useState, useTransition } from 'react'

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
  LISTBOX_ID,
  SEARCH_DEBOUNCE_MS,
  SEARCH_RESULTS_COUNT,
} from '../constants'
import { MemberSearchOption, MemberSearchProps, SelectedProfile } from '../types'
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
        avatarUrl: node.image?.url ?? undefined,
      })
    }
    return options
  }, [data.allProfiles?.edges, selectedKeys])

  const trimmedQuery = query.trim()
  const isEmail = EMAIL_REGEX.test(trimmedQuery)
  const canAddEmail = isEmail && !selectedKeys.has(`email:${trimmedQuery}`)

  // Flatten profiles + the optional email row into a single indexable list so the same
  // options drive both mouse selection and keyboard navigation (ARIA combobox/listbox).
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

  const showDropdown = isOpen && Boolean(trimmedQuery) && options.length > 0
  const [activeIndex, setActiveIndex] = useState(0)

  // Keep the active option in range as the option list changes (e.g. while typing).
  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(options.length - 1, 0)))
  }, [options.length])

  const selectOption = (option: MemberSearchOption) => {
    if (option.kind === 'email') {
      onAdd({ kind: 'email', email: option.email })
    } else {
      onAdd(option.profile)
    }
    setQuery('')
    setActiveIndex(0)
  }

  // Select on mousedown (with preventDefault) so the click never blurs the input — keeps
  // it focused for adding more, and avoids the dropdown closing before the click registers.
  const handleOptionMouseDown = (event: MouseEvent, option: MemberSearchOption) => {
    event.preventDefault()
    selectOption(option)
  }

  // Keyboard support for the combobox: arrow keys move the active option, Enter/Space
  // selects it, and Escape closes the dropdown — all while focus stays on the input.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (!showDropdown) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => (index + 1) % options.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => (index - 1 + options.length) % options.length)
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(options.length - 1)
        break
      // Enter selects the active option. Space is intentionally left to type a literal
      // space in the editable combobox (per the WAI-ARIA editable combobox pattern).
      case 'Enter': {
        const activeOption = options[activeIndex]
        if (activeOption) {
          event.preventDefault()
          selectOption(activeOption)
        }
        break
      }
      default:
        break
    }
  }

  const getOptionId = (index: number) => `${LISTBOX_ID}-option-${index}`

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
          onKeyDown={handleKeyDown}
          placeholder={COPY.searchPlaceholder}
          autoComplete="off"
          inputProps={{
            role: 'combobox',
            'aria-expanded': showDropdown,
            'aria-controls': LISTBOX_ID,
            'aria-autocomplete': 'list',
            'aria-activedescendant':
              showDropdown && options[activeIndex] ? getOptionId(activeIndex) : undefined,
          }}
        />
        <Popper
          open={showDropdown}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{ zIndex: (theme) => theme.zIndex.modal + 1, width: anchorEl?.clientWidth }}
        >
          <OptionsDropdown id={LISTBOX_ID} role="listbox" aria-label={COPY.searchPlaceholder}>
            {options.map((option, index) => {
              const isActive = index === activeIndex
              if (option.kind === 'email') {
                return (
                  <OptionRow
                    key={`email:${option.email}`}
                    id={getOptionId(index)}
                    role="option"
                    aria-selected={isActive}
                    isActive={isActive}
                    onMouseDown={(event) => handleOptionMouseDown(event, option)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <Typography variant="subtitle2" noWrap>
                      {option.email}
                    </Typography>
                    <AddIcon />
                  </OptionRow>
                )
              }
              const { profile } = option
              return (
                <OptionRow
                  key={getMemberKey(profile)}
                  id={getOptionId(index)}
                  role="option"
                  aria-selected={isActive}
                  isActive={isActive}
                  onMouseDown={(event) => handleOptionMouseDown(event, option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
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
                </OptionRow>
              )
            })}
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
