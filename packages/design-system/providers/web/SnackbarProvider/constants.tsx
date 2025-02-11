import Iconify from '../../components/Iconify'
import ErrorIcon from '../../components/icons/ErrorIcon'

export const HIDE_DURATION = 3000
export const OUTLINED_ALERT_ICONS = {
  error: <ErrorIcon sx={{ color: 'error.main', width: '24px', height: '24px' }} />,
  info: <Iconify icon="eva:info-outline" width={24} sx={{ color: 'text.primary' }} />,
  success: <Iconify icon="eva:checkmark-circle-2-outline" width={24} />,
  warning: <Iconify icon="eva:alert-triangle-outline" width={24} />,
}
