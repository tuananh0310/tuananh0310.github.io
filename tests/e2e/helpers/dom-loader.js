/**
 * tests/e2e/helpers/dom-loader.js
 * Vue SFC & HTML DOM Loader using htmlparser2, domutils, css-select, vue-template-compiler
 */

'use strict'

const fs = require('fs')
const path = require('path')
const htmlparser2 = require('htmlparser2')
const domutils = require('domutils')
const cssSelect = require('css-select')
const compiler = require('vue-template-compiler')
const { AssertionError } = require('./test-harness')

function createDomQueryWrapper (domAst, rawSource = '') {
  return {
    domAst,
    rawSource,

    query (selector) {
      if (!domAst) return null
      try {
        return cssSelect.selectOne(selector, domAst)
      } catch (e) {
        return null
      }
    },

    queryAll (selector) {
      if (!domAst) return []
      try {
        return cssSelect.selectAll(selector, domAst)
      } catch (e) {
        return []
      }
    },

    hasElement (selector) {
      return this.query(selector) !== null
    },

    count (selector) {
      return this.queryAll(selector).length
    },

    getText (selector) {
      const node = typeof selector === 'string' ? this.query(selector) : selector
      if (!node) return ''
      return domutils.getText(node).trim()
    },

    getAttr (selector, attrName) {
      const node = typeof selector === 'string' ? this.query(selector) : selector
      if (!node) return null
      return domutils.getAttributeValue(node, attrName)
    }
  }
}

function loadVueComponent (relativeFilePath) {
  const fullPath = path.isAbsolute(relativeFilePath)
    ? relativeFilePath
    : path.resolve(process.cwd(), relativeFilePath)

  if (!fs.existsSync(fullPath)) {
    throw new AssertionError(
      `Vue SFC file not found: ${relativeFilePath} (Pending component implementation)`,
      false,
      true
    )
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const parsed = compiler.parseComponent(fileContent)

  const templateContent = parsed.template ? parsed.template.content : ''
  const scriptContent = parsed.script ? parsed.script.content : ''
  const styles = parsed.styles || []

  let domAst = null
  if (templateContent) {
    domAst = htmlparser2.parseDOM(templateContent, {
      recognizeSelfClosing: true,
      lowerCaseTags: false,
      lowerCaseAttributeNames: false
    })
  }

  const queryWrapper = createDomQueryWrapper(domAst, fileContent)

  return {
    ...queryWrapper,
    templateContent,
    scriptContent,
    styles,
    fileContent,
    fullPath
  }
}

function loadHtml (relativeFilePath) {
  const fullPath = path.isAbsolute(relativeFilePath)
    ? relativeFilePath
    : path.resolve(process.cwd(), relativeFilePath)

  if (!fs.existsSync(fullPath)) {
    throw new AssertionError(
      `HTML file not found: ${relativeFilePath}`,
      false,
      true
    )
  }

  const htmlContent = fs.readFileSync(fullPath, 'utf8')
  const domAst = htmlparser2.parseDOM(htmlContent, {
    recognizeSelfClosing: true,
    lowerCaseTags: true
  })

  const queryWrapper = createDomQueryWrapper(domAst, htmlContent)

  return {
    ...queryWrapper,
    htmlContent,
    fullPath
  }
}

module.exports = {
  loadVueComponent,
  loadHtml,
  createDomQueryWrapper
}
