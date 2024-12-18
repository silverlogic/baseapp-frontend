export interface DateRangeChipProps {
  value: [Date | null, Date | null]
  onChange: (newValue: [Date | null, Date | null]) => void
}
