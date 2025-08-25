import type { UseMutationOptions } from '@tanstack/react-query'

export type DeleteAccountMutationOptions = UseMutationOptions<void, Error, void, unknown>

export interface UseDeleteAccountOptions extends DeleteAccountMutationOptions {}
