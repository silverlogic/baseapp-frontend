import { DateTime } from 'luxon'

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

export type FormatRelativeTimeOptions = {
  reference?: DateTime
  toFormat?: DateFormat | TimeFormat
  lowerCaseTimeIndicator?: boolean
}
