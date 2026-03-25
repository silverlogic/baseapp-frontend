import { formatFollowCount } from '../index'

describe('formatFollowCount', () => {
  it('returns 0 for null, undefined, and 0', () => {
    expect(formatFollowCount(null)).toBe(0)
    expect(formatFollowCount(undefined)).toBe(0)
    expect(formatFollowCount(0)).toBe(0)
  })

  it('returns the raw number for values up to 1000', () => {
    expect(formatFollowCount(1)).toBe(1)
    expect(formatFollowCount(999)).toBe(999)
    expect(formatFollowCount(1000)).toBe(1000)
  })

  it('formats values between 1001 and 999999 as K', () => {
    expect(formatFollowCount(1001)).toBe('1K')
    expect(formatFollowCount(1500)).toBe('2K')
    expect(formatFollowCount(9999)).toBe('10K')
    expect(formatFollowCount(10000)).toBe('10K')
    expect(formatFollowCount(100000)).toBe('100K')
    expect(formatFollowCount(999999)).toBe('1000K')
  })

  it('formats values between 1000000 and 1049999 as whole M', () => {
    expect(formatFollowCount(1000000)).toBe('1M')
    expect(formatFollowCount(1049999)).toBe('1M')
  })

  it('formats values from 1050000 with one decimal M', () => {
    expect(formatFollowCount(1050000)).toBe('1.1M')
    expect(formatFollowCount(1500000)).toBe('1.5M')
    expect(formatFollowCount(2000000)).toBe('2M')
    expect(formatFollowCount(10000000)).toBe('10M')
    expect(formatFollowCount(999999999)).toBe('1000M')
  })

  it('formats values >= 1 billion as B', () => {
    expect(formatFollowCount(1000000000)).toBe('1B')
    expect(formatFollowCount(1500000000)).toBe('1.5B')
  })
})
