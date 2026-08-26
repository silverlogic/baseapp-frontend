import React from 'react'

import { render } from '@testing-library/react'

import SwipeableDrawer from '..'

const getStyleRules = () =>
  Array.from(document.querySelectorAll('style')).flatMap((tag) =>
    Array.from(tag.sheet?.cssRules ?? []),
  ) as CSSStyleRule[]

const getPaper = () => document.querySelector('.MuiDrawer-paper') as HTMLElement

const getPaperRules = () => {
  const paper = getPaper()
  return getStyleRules().filter((rule) => {
    if (!rule.selectorText) return false
    try {
      return paper.matches(rule.selectorText)
    } catch {
      return false
    }
  })
}

// style tags are intentionally left in place between tests: emotion caches inserted
// class names and would not re-insert their rules on the next render

describe('SwipeableDrawer', () => {
  it('does not inject unscoped rules targeting every drawer paper', () => {
    render(
      <SwipeableDrawer open onClose={() => {}}>
        content
      </SwipeableDrawer>,
    )

    const unscopedRules = getStyleRules().filter((rule) =>
      (rule.selectorText ?? '').replace(/\s+/g, ' ').includes('.MuiDrawer-root > .MuiPaper-root'),
    )
    expect(unscopedRules).toHaveLength(0)
  })

  it('applies the default height and overflow to its own paper', () => {
    render(
      <SwipeableDrawer open onClose={() => {}}>
        content
      </SwipeableDrawer>,
    )

    const heights = getPaperRules()
      .map((rule) => rule.style.height)
      .filter(Boolean)
    const overflows = getPaperRules()
      .map((rule) => rule.style.overflow)
      .filter(Boolean)
    expect(heights[heights.length - 1]).toBe('calc(25% - 26px)')
    expect(overflows[overflows.length - 1]).toBe('visible')
  })

  it('respects the globalHeight prop', () => {
    render(
      <SwipeableDrawer open onClose={() => {}} globalHeight="auto">
        content
      </SwipeableDrawer>,
    )

    const heights = getPaperRules()
      .map((rule) => rule.style.height)
      .filter(Boolean)
    expect(heights[heights.length - 1]).toBe('auto')
  })

  it('lets PaperProps.sx override the default paper styles', () => {
    render(
      <SwipeableDrawer open onClose={() => {}} PaperProps={{ sx: { height: '90vh' } }}>
        content
      </SwipeableDrawer>,
    )

    const heights = getPaperRules()
      .map((rule) => rule.style.height)
      .filter(Boolean)
    expect(heights[heights.length - 1]).toBe('90vh')
  })
})
