#!/usr/bin/env node

/**
 * tests/e2e/run-tests.js
 * Master CLI Runner for tuananh0310.github.io E2E Test Suite
 *
 * Usage:
 *   node tests/e2e/run-tests.js
 *   node tests/e2e/run-tests.js --tier=1
 *   node tests/e2e/run-tests.js --scenario=1
 *   node tests/e2e/run-tests.js --filter=F11
 *   node tests/e2e/run-tests.js --bail
 *   node tests/e2e/run-tests.js --verbose
 */

'use strict'

// Suppress runtime experimental / typeless package warnings in Node 24
process.removeAllListeners('warning')
process.on('warning', () => {})

const {
  colors,
  runSuite,
  formatTierReport,
  formatSummaryReport
} = require('./helpers/test-harness')

const tier1Suite = require('./tier1-features')
const tier2Suite = require('./tier2-boundaries')
const tier3Suite = require('./tier3-combinations')
const tier4Suite = require('./tier4-scenarios')

// Parse CLI flags
const args = process.argv.slice(2)
let targetTier = null
let targetScenario = null
let filterKeyword = ''
let bailMode = false
let verboseMode = false

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    targetTier = parseInt(arg.split('=')[1], 10)
  } else if (arg.startsWith('--scenario=')) {
    targetScenario = arg.split('=')[1]
  } else if (arg.startsWith('--filter=')) {
    filterKeyword = arg.split('=')[1]
  } else if (arg === '--bail') {
    bailMode = true
  } else if (arg === '--verbose' || arg === '-v') {
    verboseMode = true
  }
}

async function main () {
  console.log('\n' + '='.repeat(80))
  console.log(`${colors.bold}${colors.cyan}TUANANH0310.GITHUB.IO — OPAQUE-BOX E2E TEST RUNNER${colors.reset}`)
  console.log('='.repeat(80))

  const allSuites = [
    tier1Suite,
    tier2Suite,
    tier3Suite,
    tier4Suite
  ]

  const suitesToRun = targetTier
    ? allSuites.filter(s => s.number === targetTier)
    : (targetScenario ? [tier4Suite] : allSuites)

  if (suitesToRun.length === 0) {
    console.error(`${colors.red}Error: No suites matched --tier=${targetTier}${colors.reset}`)
    process.exit(1)
  }

  const allResults = []
  let shouldBail = false

  for (const suite of suitesToRun) {
    console.log(`\n${colors.bold}${colors.blue}[${suite.name}]${colors.reset}`)

    const result = await runSuite(suite, {
      filter: filterKeyword,
      scenario: targetScenario,
      bail: bailMode,
      verbose: verboseMode
    })

    allResults.push(result)
    console.log(formatTierReport(result))

    if (bailMode && result.failed > 0) {
      shouldBail = true
      break
    }
  }

  const summary = formatSummaryReport(allResults)
  console.log(summary)

  const totalFailed = allResults.reduce((acc, r) => acc + r.failed, 0)
  const exitCode = totalFailed === 0 ? 0 : 1

  process.exit(exitCode)
}

main().catch(err => {
  console.error(`\n${colors.red}${colors.bold}Fatal runner exception:${colors.reset}`, err)
  process.exit(1)
})
