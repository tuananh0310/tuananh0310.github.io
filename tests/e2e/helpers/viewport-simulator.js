/**
 * tests/e2e/helpers/viewport-simulator.js
 * Responsive Viewport & Breakpoint Rules Helper
 */

'use strict'

const { getMediaQueries, loadCss } = require('./css-analyzer')
const { assert } = require('./test-harness')

const BREAKPOINTS = {
  mobileMax: 768,
  tabletMin: 769,
  tabletMax: 1024,
  desktopMin: 1200,
  ultraWideMin: 2560
}

function verifyMobileBreakpointRules (cssPath) {
  const mediaQueries = getMediaQueries(cssPath)
  const hasMobileBreakpoint = mediaQueries.some(mq =>
    mq.params.includes('768px') ||
    mq.params.includes('max-width: 768') ||
    mq.params.includes('max-width: 600')
  )

  assert(
    hasMobileBreakpoint,
    `CSS file ${cssPath} must define responsive media queries for mobile viewports (<=768px)`
  )

  return mediaQueries
}

function verifyNoHorizontalOverflowRule (cssPath) {
  const { cssContent } = loadCss(cssPath)
  const hasOverflowProtection =
    cssContent.includes('box-sizing: border-box') ||
    cssContent.includes('overflow-x: hidden') ||
    cssContent.includes('max-width: 100%')

  assert(
    hasOverflowProtection,
    `CSS file ${cssPath} must include horizontal overflow protection (border-box, max-width: 100%, or overflow-x: hidden)`
  )
  return true
}

function simulateViewport (width, height) {
  return {
    width,
    height,
    isMobile: width <= BREAKPOINTS.mobileMax,
    isTablet: width >= BREAKPOINTS.tabletMin && width <= BREAKPOINTS.tabletMax,
    isDesktop: width >= BREAKPOINTS.desktopMin,
    devicePixelRatio: width > 1200 ? 1 : 2,
    scrollWidth: width
  }
}

module.exports = {
  BREAKPOINTS,
  verifyMobileBreakpointRules,
  verifyNoHorizontalOverflowRule,
  simulateViewport
}
