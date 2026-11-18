/**
 * tests/e2e/helpers/css-analyzer.js
 * Design Tokens, CSS Custom Properties & Media Query Analyzer using PostCSS
 */

'use strict'

const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const { AssertionError } = require('./test-harness')

function loadCss (relativeFilePath) {
  const fullPath = path.isAbsolute(relativeFilePath)
    ? relativeFilePath
    : path.resolve(process.cwd(), relativeFilePath)

  if (!fs.existsSync(fullPath)) {
    throw new AssertionError(
      `CSS file not found: ${relativeFilePath} (Pending style implementation)`,
      false,
      true
    )
  }

  const cssContent = fs.readFileSync(fullPath, 'utf8')
  const root = postcss.parse(cssContent, { from: fullPath })

  return {
    root,
    cssContent,
    fullPath
  }
}

function getCssVariables (cssPath) {
  const { root } = loadCss(cssPath)
  const variables = {}

  root.walkDecls(decl => {
    if (decl.prop.startsWith('--')) {
      variables[decl.prop] = decl.value.trim()
    }
  })

  return variables
}

function getThemeVariables (cssPath, themeSelector = ':root') {
  const { root } = loadCss(cssPath)
  const variables = {}

  root.walkRules(rule => {
    // Selector can contain commas, e.g. ":root, [data-theme='dark']"
    const selectors = rule.selectors || [rule.selector]
    const matches = selectors.some(s => s.trim().toLowerCase().includes(themeSelector.toLowerCase()))

    if (matches) {
      rule.walkDecls(decl => {
        if (decl.prop.startsWith('--')) {
          variables[decl.prop] = decl.value.trim()
        }
      })
    }
  })

  return variables
}

function getMediaQueries (cssPath) {
  const { root } = loadCss(cssPath)
  const mediaQueries = []

  root.walkAtRules('media', atRule => {
    mediaQueries.push({
      params: atRule.params.trim(),
      raw: atRule.toString()
    })
  })

  return mediaQueries
}

function getKeyframes (cssPath) {
  const { root } = loadCss(cssPath)
  const keyframes = []

  root.walkAtRules(/keyframes$/, atRule => {
    keyframes.push(atRule.params.trim())
  })

  return keyframes
}

function hasSelector (cssPath, targetSelector) {
  const { root } = loadCss(cssPath)
  let found = false

  root.walkRules(rule => {
    const selectors = rule.selectors || [rule.selector]
    if (selectors.some(s => s.trim() === targetSelector || s.includes(targetSelector))) {
      found = true
    }
  })

  return found
}

function getRuleDeclarations (cssPath, targetSelector) {
  const { root } = loadCss(cssPath)
  const declarations = {}

  root.walkRules(rule => {
    const selectors = rule.selectors || [rule.selector]
    if (selectors.some(s => s.trim() === targetSelector || s.includes(targetSelector))) {
      rule.walkDecls(decl => {
        declarations[decl.prop] = decl.value.trim()
      })
    }
  })

  return declarations
}

module.exports = {
  loadCss,
  getCssVariables,
  getThemeVariables,
  getMediaQueries,
  getKeyframes,
  hasSelector,
  getRuleDeclarations
}
