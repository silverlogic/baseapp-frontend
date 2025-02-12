import { axios } from "@baseapp-frontend/utils/functions/axios"
import { useMutation } from "@tanstack/react-query"


export interface LogoutDeviceMutationVariables {
	deviceId: string
}


export interface LogoutDeviceProps {
	onSuccess?: () => void
	onError?: (error: any) => void
}

/**
 * Hook for handling device logout functionality
 * 
 * @param {LogoutDeviceProps} [options] - Optional configuration object
 * @param {Function} [options.onSuccess] - Callback function to execute on successful logout
 * @param {Function} [options.onError] - Callback function to execute on logout error
 * @returns {Object} A react-query mutation object for handling device logout
 * 
 * @example
 * const { mutate: logoutDevice } = useLogoutDevice({
 *   onSuccess: () => console.log('Device logged out successfully'),
 *   onError: (error) => console.error('Logout failed:', error)
 * })
 * 
 * // To trigger logout:
 * logoutDevice({ deviceId: '12345' })
 */
export const useLogoutDevice = ({onSuccess, onError}: LogoutDeviceProps = {}) => {
  return useMutation({
		mutationFn: ({deviceId}: LogoutDeviceMutationVariables) => {
			return axios.post('/auth/logoutdevice', {deviceId})
		},
		onSuccess,
		onError
	})
}