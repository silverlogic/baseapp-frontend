import { DateTime } from 'luxon'
import { IntlShape } from 'react-intl'

import { DATE_FORMAT, TIME_FORMAT } from '../constants/date'
import { ValueOf } from './typescript'

export type DateFormat = ValueOf<typeof DATE_FORMAT>
export type TimeFormat = ValueOf<typeof TIME_FORMAT>

export type FormatDateOptions = {
  toFormat?: DateFormat | TimeFormat
  fromFormat?: DateFormat | TimeFormat
}

export type FormatDateFromApiOptions = {
  toFormat?: DateFormat | TimeFormat
}

export type FormatDateToApiOptions = {
  fromFormat?: DateFormat | TimeFormat
}

/** With `intl` the output follows its locale and `toFormat` gives way to `INTL_DATE_FORMAT`. */
export type RelativeDateOptions = {
  intl?: IntlShape
  reference?: DateTime
}

export type FormatRelativeTimeOptions = RelativeDateOptions & {
  toFormat?: DateFormat | TimeFormat
  lowerCaseTimeIndicator?: boolean
}
