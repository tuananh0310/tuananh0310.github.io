/**
 * tests/e2e/helpers/test-harness.js
 * Standalone E2E Test Runner Harness & Assertion Engine
 */

'use strict'

const util = require('util')

// Filter typeless package.json warning in Node 24 when dynamically importing ESM from CommonJS
process.on('warning', warning => {
  if (warning.code === 'MODULE_TYPELESS_PACKAGE_JSON' || warning.name === 'ExperimentalWarning') {
    return
  }
  console.warn(warning)
})

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m'
}

class AssertionError extends Error {
  constructor (message, actual, expected, operator) {
    super(message)
    this.name = 'AssertionError'
    this.actual = actual
    this.expected = expected
    this.operator = operator || '==='
    Error.captureStackTrace(this, this.constructor)
  }
}

// Assertions
function assert (condition, message) {
  if (!condition) {
    throw new AssertionError(
      message || 'Assertion failed: expected condition to be truthy',
      condition,
      true,
      '=='
    )
  }
}

function assertEqual (actual, expected, message) {
  if (actual !== expected) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Expected: ${util.inspect(expected)}, Actual: ${util.inspect(actual)}`,
      actual,
      expected,
      '==='
    )
  }
}

function assertNotEqual (actual, expected, message) {
  if (actual === expected) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Expected value not to strictly equal: ${util.inspect(expected)}`,
      actual,
      expected,
      '!=='
    )
  }
}

function assertDeepEqual (actual, expected, message) {
  const isDeepEqual = util.isDeepStrictEqual(actual, expected)
  if (!isDeepEqual) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Objects not deeply equal:\n  Expected: ${util.inspect(expected, { depth: 4 })}\n  Actual:   ${util.inspect(actual, { depth: 4 })}`,
      actual,
      expected,
      'deepStrictEqual'
    )
  }
}

function assertMatch (actual, regex, message) {
  if (typeof actual !== 'string' || !regex.test(actual)) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Value ${util.inspect(actual)} did not match pattern ${regex}`,
      actual,
      regex,
      'match'
    )
  }
}

function assertContains (container, item, message) {
  let contains = false
  if (typeof container === 'string') {
    contains = container.includes(item)
  } else if (Array.isArray(container)) {
    contains = container.some(el => el === item || util.isDeepStrictEqual(el, item))
  } else if (container && typeof container === 'object') {
    contains = Object.prototype.hasOwnProperty.call(container, item) || Object.values(container).includes(item)
  }
  if (!contains) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Container did not contain item: ${util.inspect(item)}`,
      container,
      item,
      'contains'
    )
  }
}

function assertGreaterThanOrEqual (actual, expected, message) {
  if (typeof actual !== 'number' || actual < expected) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Expected ${actual} >= ${expected}`,
      actual,
      expected,
      '>='
    )
  }
}

function assertLessThanOrEqual (actual, expected, message) {
  if (typeof actual !== 'number' || actual > expected) {
    const detail = message ? `${message} - ` : ''
    throw new AssertionError(
      `${detail}Expected ${actual} <= ${expected}`,
      actual,
      expected,
      '<='
    )
  }
}

class TestSuite {
  constructor (name, number) {
    this.name = name
    this.number = number
    this.tests = []
    this.currentFeature = ''
  }

  describe (featureName, fn) {
    const previous = this.currentFeature
    this.currentFeature = featureName
    try {
      fn()
    } finally {
      this.currentFeature = previous
    }
  }

  test (idOrName, nameOrFn, maybeFn) {
    let id = ''
    let name = ''
    let fn = null

    if (typeof maybeFn === 'function') {
      id = idOrName
      name = nameOrFn
      fn = maybeFn
    } else if (typeof nameOrFn === 'function') {
      name = idOrName
      fn = nameOrFn
      id = `T${this.number}-${this.tests.length + 1}`
    } else {
      throw new Error(`Invalid test registration for ${idOrName}`)
    }

    this.tests.push({
      id,
      name,
      feature: this.currentFeature,
      fn
    })
  }
}

function createSuite (tierName, tierNumber) {
  return new TestSuite(tierName, tierNumber)
}

async function runSuite (suite, options = {}) {
  const { filter = '', bail = false, verbose = false, scenario = null } = options
  const results = {
    name: suite.name,
    number: suite.number,
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    durationMs: 0,
    tests: []
  }

  const startTime = Date.now()

  for (const testCase of suite.tests) {
    // Scenario filtering
    if (scenario !== null && scenario !== undefined && scenario !== '') {
      const sNum = String(scenario).padStart(2, '0')
      const isMatch = testCase.id === `T4-${sNum}` ||
                      testCase.id === `SC-${sNum}` ||
                      testCase.name.toLowerCase().includes(`scenario ${scenario}`.toLowerCase())
      if (!isMatch) {
        continue
      }
    }

    // Keyword filtering
    if (filter) {
      const filterLower = filter.toLowerCase()
      const isMatch = testCase.id.toLowerCase().includes(filterLower) ||
                      testCase.name.toLowerCase().includes(filterLower) ||
                      testCase.feature.toLowerCase().includes(filterLower)
      if (!isMatch) {
        continue
      }
    }

    results.total++
    const testStart = Date.now()
    let status = 'pass'
    let error = null

    try {
      await testCase.fn()
    } catch (err) {
      status = 'fail'
      error = err
    }

    const duration = Date.now() - testStart

    const testResult = {
      id: testCase.id,
      name: testCase.name,
      feature: testCase.feature,
      status,
      duration,
      error
    }

    results.tests.push(testResult)

    if (status === 'pass') {
      results.passed++
    } else {
      results.failed++
    }

    // Live reporter line
    if (status === 'pass') {
      console.log(`    ${colors.green}✔${colors.reset} ${colors.bold}${testCase.id}:${colors.reset} ${testCase.name} ${colors.dim}(${duration}ms)${colors.reset}`)
    } else {
      console.log(`    ${colors.red}✖${colors.reset} ${colors.bold}${testCase.id}:${colors.reset} ${testCase.name} ${colors.dim}(${duration}ms)${colors.reset}`)
      console.log(`      ${colors.red}${error.name}: ${error.message}${colors.reset}`)
      if (verbose && error.stack) {
        const stackLines = error.stack.split('\n').slice(1, 4).join('\n')
        console.log(`      ${colors.dim}${stackLines}${colors.reset}`)
      }
    }

    if (bail && status === 'fail') {
      console.log(`\n${colors.yellow}[BAIL] Stopping suite execution after first failure.${colors.reset}`)
      break
    }
  }

  results.durationMs = Date.now() - startTime
  return results
}

function formatTierReport (suiteResult) {
  const { name, total, passed, failed, durationMs } = suiteResult
  const statusColor = failed === 0 ? colors.green : colors.red
  return `  ${statusColor}[${name} Summary: ${passed}/${total} passed (${failed} failed) in ${durationMs}ms]${colors.reset}\n`
}

function formatSummaryReport (allResults) {
  let totalTests = 0
  let totalPassed = 0
  let totalFailed = 0
  let totalDurationMs = 0

  for (const r of allResults) {
    totalTests += r.total
    totalPassed += r.passed
    totalFailed += r.failed
    totalDurationMs += r.durationMs
  }

  const durationSec = (totalDurationMs / 1000).toFixed(2)
  const success = totalFailed === 0
  const bannerColor = success ? colors.green : colors.red

  let report = '\n' + '='.repeat(80) + '\n'
  report += `${colors.bold}E2E TEST SUITE EXECUTION SUMMARY${colors.reset}\n`
  report += '='.repeat(80) + '\n'

  for (const r of allResults) {
    const tierStatus = r.failed === 0 ? `${colors.green}PASSED${colors.reset}` : `${colors.red}FAILED (${r.failed})${colors.reset}`
    report += `  • ${r.name.padEnd(45)}: ${r.passed}/${r.total} [${tierStatus}] (${r.durationMs}ms)\n`
  }

  report += '-'.repeat(80) + '\n'
  report += `${bannerColor}${colors.bold}TOTAL: ${totalPassed}/${totalTests} PASSED (${totalFailed} FAILED) — DURATION: ${durationSec}s${colors.reset}\n`
  report += `${bannerColor}${colors.bold}GLOBAL STATUS: ${success ? 'ALL TESTS PASSED (EXIT CODE 0)' : 'TEST FAILURES DETECTED (EXIT CODE 1)'}${colors.reset}\n`
  report += '='.repeat(80) + '\n'

  return report
}

module.exports = {
  colors,
  AssertionError,
  assert,
  assertEqual,
  assertNotEqual,
  assertDeepEqual,
  assertMatch,
  assertContains,
  assertGreaterThanOrEqual,
  assertLessThanOrEqual,
  createSuite,
  runSuite,
  formatTierReport,
  formatSummaryReport
}
