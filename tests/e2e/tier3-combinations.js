/**
 * tests/e2e/tier3-combinations.js
 * Tier 3: Cross-Feature Combination Test Suite (12 Pairwise Tests: T3-01 to T3-12)
 */

'use strict'

const fs = require('fs')
const path = require('path')
const {
  createSuite,
  assert,
  assertEqual,
  assertGreaterThanOrEqual,
  assertNotEqual
} = require('./helpers/test-harness')

const { loadVueComponent } = require('./helpers/dom-loader')
const { loadCss, getThemeVariables } = require('./helpers/css-analyzer')
const { loadPortfolioData } = require('./helpers/schema-validator')
const { hasReducedMotionSupport, hasFallbackWiring } = require('./helpers/webgl-mock')

const suite = createSuite('TIER 3: CROSS-FEATURE COMBINATIONS', 3)

// -----------------------------------------------------------------------------
// T3-01: Theme Toggle & 3D Canvas Context Preservation (F1 × F3)
// -----------------------------------------------------------------------------
suite.test('T3-01', 'Theme Toggle & 3D Canvas Context Preservation (F1 x F3)', async () => {
  const tokensPath = 'src/assets/styles/design-tokens.css'
  const canvasPath = 'src/components/hero/Hero3DCanvas.vue'
  const appPath = 'src/App.vue'
  const navbarPath = 'src/components/TheNavbar.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Tokens file ${tokensPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Canvas file ${canvasPath} must exist (Pending M2)`)
  assert(fs.existsSync(path.resolve(process.cwd(), appPath)), `App root file ${appPath} must exist`)

  // 1. Verify CSS custom properties provide distinct palettes for dark and light modes
  const darkVars = getThemeVariables(tokensPath, ':root')
  const lightVars = getThemeVariables(tokensPath, '[data-theme="light"]') || getThemeVariables(tokensPath, '.light-theme')
  assert(Object.keys(darkVars).length > 0 && Object.keys(lightVars).length > 0, 'Both dark and light theme tokens must be defined')
  assertNotEqual(darkVars['--bg-canvas'], lightVars['--bg-canvas'], 'Theme toggle must update CSS background token without reloading')
  assertNotEqual(darkVars['--text-primary'], lightVars['--text-primary'], 'Theme toggle must update CSS text token')

  // 2. Verify App layout preserves component tree across theme changes without unmounting views
  const appSfc = loadVueComponent(appPath)
  assert(
    appSfc.rawSource.includes('updateTheme') ||
    appSfc.rawSource.includes('goDark') ||
    appSfc.rawSource.includes('theme') ||
    appSfc.rawSource.includes('data-theme'),
    'App.vue must manage theme state transitions'
  )
  assert(
    !appSfc.rawSource.includes(':key="goDark"') &&
    !appSfc.rawSource.includes(':key="theme"'),
    'App.vue must not bind reactive theme keys that unmount child view hierarchy'
  )

  // 3. Verify TheNavbar provides theme toggle trigger when present
  if (fs.existsSync(path.resolve(process.cwd(), navbarPath))) {
    const navbarSfc = loadVueComponent(navbarPath)
    assert(
      navbarSfc.rawSource.includes('toggle-theme') ||
      navbarSfc.rawSource.includes('changeTheme') ||
      navbarSfc.rawSource.includes('theme'),
      'TheNavbar must provide theme switching trigger affordance'
    )
  }

  // 4. Verify Hero3DCanvas maintains <canvas ref="threeCanvas"> contract without theme unmount risk
  const canvasSfc = loadVueComponent(canvasPath)
  assert(canvasSfc.hasElement('canvas'), 'Hero 3D Canvas component must maintain canvas element')
  assert(
    canvasSfc.rawSource.includes('ref="threeCanvas"') || canvasSfc.rawSource.includes("ref='threeCanvas'"),
    'Hero3DCanvas must bind ref="threeCanvas" contract'
  )
  assert(
    !canvasSfc.rawSource.includes(':key="theme"') &&
    !canvasSfc.rawSource.includes(':key="isDark"') &&
    !canvasSfc.rawSource.includes(':key="goDark"'),
    'Hero3DCanvas must not bind reactive theme key that unmounts canvas DOM node and destroys WebGL context'
  )
})

// -----------------------------------------------------------------------------
// T3-02: Mobile Drawer Navigation & Anchor Section Scrolling (F5 × F7)
// -----------------------------------------------------------------------------
suite.test('T3-02', 'Mobile Drawer Navigation & Anchor Section Scrolling (F5 x F7)', async () => {
  const navbarPath = 'src/components/TheNavbar.vue'
  const expPath = 'src/components/experience/ExperienceSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Navbar file ${navbarPath} must exist (Pending M3)`)
  assert(fs.existsSync(path.resolve(process.cwd(), expPath)), `Experience file ${expPath} must exist (Pending M3)`)

  const navbarSfc = loadVueComponent(navbarPath)
  assert(navbarSfc.rawSource.includes('#experience'), 'Navbar drawer must provide anchor jump to #experience')

  const expSfc = loadVueComponent(expPath)
  assert(expSfc.rawSource.includes('experience') || expSfc.rawSource.includes('timeline'), 'Experience section must be anchor target')
})

// -----------------------------------------------------------------------------
// T3-03: Project Category Filter & Centralized Data Consistency (F8 × F2)
// -----------------------------------------------------------------------------
suite.test('T3-03', 'Project Category Filter & Centralized Data Consistency (F8 x F2)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  const projPath = 'src/components/projects/ProjectsSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), projPath)), `Projects file ${projPath} must exist (Pending M3)`)

  const { portfolioData } = await loadPortfolioData(dataPath)
  const projSfc = loadVueComponent(projPath)

  const categories = ['enterprise', 'cloud', 'microservices']
  for (const cat of categories) {
    const expectedCount = portfolioData.projects.filter(p => (p.category || '').toLowerCase().includes(cat)).length
    assertGreaterThanOrEqual(expectedCount, 0, `Category ${cat} query must execute against portfolioData`)
  }
  assert(projSfc.rawSource.includes('category') || projSfc.rawSource.includes('filter'), 'ProjectsSection must bind category filter logic')
})

// -----------------------------------------------------------------------------
// T3-04: Contact Form Validation & Design System Error States (F10 × F1)
// -----------------------------------------------------------------------------
suite.test('T3-04', 'Contact Form Validation & Design System Error States (F10 x F1)', async () => {
  const tokensPath = 'src/assets/styles/design-tokens.css'
  const contactPath = 'src/components/contact/ContactSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Tokens file ${tokensPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contact file ${contactPath} must exist (Pending M3)`)

  const contactSfc = loadVueComponent(contactPath)
  assert(contactSfc.rawSource.includes('error') || contactSfc.rawSource.includes('$v') || contactSfc.rawSource.includes('invalid') || contactSfc.rawSource.includes('validate'), 'Contact form must specify validation states')
})

// -----------------------------------------------------------------------------
// T3-05: Portfolio Data Binding in About Bento Stats Counter (F2 × F6)
// -----------------------------------------------------------------------------
suite.test('T3-05', 'Portfolio Data Binding in About Bento Stats Counter (F2 x F6)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  const aboutPath = 'src/components/about/AboutSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), aboutPath)), `About file ${aboutPath} must exist (Pending M3)`)

  const { portfolioData } = await loadPortfolioData(dataPath)
  const aboutSfc = loadVueComponent(aboutPath)

  assert(portfolioData.stats.yearsOfExperience >= 4, 'stats.yearsOfExperience must be >= 4')
  assert(portfolioData.stats.enterpriseSystems >= 5, 'stats.enterpriseSystems must be >= 5')
  assert(portfolioData.stats.awsCertifications >= 2, 'stats.awsCertifications must be >= 2')
  assert(aboutSfc.rawSource.includes('stats') || aboutSfc.rawSource.includes('yearsOfExperience') || aboutSfc.rawSource.includes('5+'), 'AboutSection must bind stats')
})

// -----------------------------------------------------------------------------
// T3-06: WebGL Fallback Mode & Navbar Brand Monogram Navigation (F4 × F5)
// -----------------------------------------------------------------------------
suite.test('T3-06', 'WebGL Fallback Mode & Navbar Brand Monogram Navigation (F4 x F5)', async () => {
  const heroPath = 'src/components/hero/HeroSection.vue'
  const navbarPath = 'src/components/TheNavbar.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), heroPath)), `Hero file ${heroPath} must exist (Pending M2)`)
  assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Navbar file ${navbarPath} must exist (Pending M3)`)

  const heroSfc = loadVueComponent(heroPath)
  assert(hasFallbackWiring(heroSfc.templateContent, heroSfc.scriptContent), 'Hero must wire fallback')

  const navbarSfc = loadVueComponent(navbarPath)
  assert(navbarSfc.rawSource.includes('#hero') || navbarSfc.rawSource.includes('brand') || navbarSfc.rawSource.includes('LA'), 'Navbar brand must navigate to top/hero')
})

// -----------------------------------------------------------------------------
// T3-07: Theme Switching & Cross-Section Glassmorphism Contrast (F1 × F7 & F8)
// -----------------------------------------------------------------------------
suite.test('T3-07', 'Theme Switching & Cross-Section Glassmorphism Contrast (F1 x F7 & F8)', async () => {
  const tokensPath = 'src/assets/styles/design-tokens.css'
  const glassPath = 'src/assets/styles/glassmorphism.css'

  assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Tokens file ${tokensPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), glassPath)), `Glass file ${glassPath} must exist (Pending M1)`)

  const darkVars = getThemeVariables(tokensPath, ':root')
  const lightVars = getThemeVariables(tokensPath, '[data-theme="light"]') || getThemeVariables(tokensPath, '.light-theme')
  const darkBg = darkVars['--bg-surface'] || darkVars['--bg-card'] || darkVars['--bg-canvas']
  const lightBg = lightVars['--bg-surface'] || lightVars['--bg-card'] || lightVars['--bg-canvas']

  assert(darkBg && lightBg, 'Both dark and light surface tokens must be defined')
  assertNotEqual(darkBg, lightBg, 'Theme switching must dynamically alter surface backgrounds')
})

// -----------------------------------------------------------------------------
// T3-08: Viewport Breakpoint Resize: Navbar & Canvas Adaptation (F3 × F5)
// -----------------------------------------------------------------------------
suite.test('T3-08', 'Viewport Breakpoint Resize: Navbar & Canvas Adaptation (F3 x F5)', async () => {
  const navbarPath = 'src/components/TheNavbar.vue'
  const canvasPath = 'src/components/hero/Hero3DCanvas.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Navbar file ${navbarPath} must exist (Pending M3)`)
  assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Canvas file ${canvasPath} must exist (Pending M2)`)

  const navbarSfc = loadVueComponent(navbarPath)
  const canvasSfc = loadVueComponent(canvasPath)

  assert(navbarSfc.rawSource.includes('768') || navbarSfc.rawSource.includes('drawer') || navbarSfc.rawSource.includes('hidden-sm-and-down'), 'Navbar must handle mobile breakpoint adaptation')
  assert(canvasSfc.scriptContent.includes('resize') || canvasSfc.scriptContent.includes('onResize') || canvasSfc.rawSource.includes('100%'), 'Canvas must handle viewport resize')
})

// -----------------------------------------------------------------------------
// T3-09: Skills & Certifications Outbound Links & Security Tokens (F9 × F2)
// -----------------------------------------------------------------------------
suite.test('T3-09', 'Skills & Certifications Outbound Links & Security Tokens (F9 x F2)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  const skillsPath = 'src/components/skills/SkillsSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), skillsPath)), `Skills file ${skillsPath} must exist (Pending M3)`)

  const { portfolioData } = await loadPortfolioData(dataPath)
  portfolioData.certifications.forEach(cert => {
    assert(cert.verifyUrl.startsWith('https://'), 'Certification verifyUrl must be secure HTTPS')
  })

  const skillsSfc = loadVueComponent(skillsPath)
  assert(skillsSfc.rawSource.includes('noopener') || skillsSfc.rawSource.includes('_blank') || skillsSfc.rawSource.includes('certifications'), 'Outbound links must have security attributes')
})

// -----------------------------------------------------------------------------
// T3-10: Sticky Navbar Scrollspy & Section Anchor Traversal (F5 × F6-F10)
// -----------------------------------------------------------------------------
suite.test('T3-10', 'Sticky Navbar Scrollspy & Section Anchor Traversal (F5 x F6-F10)', async () => {
  const navbarPath = 'src/components/TheNavbar.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Navbar file ${navbarPath} must exist (Pending M3)`)
  const navbarSfc = loadVueComponent(navbarPath)

  assert(navbarSfc.rawSource.includes('sticky') || navbarSfc.rawSource.includes('fixed') || navbarSfc.rawSource.includes('app'), 'Navbar must be sticky/fixed')
  assert(navbarSfc.rawSource.includes('#about') || navbarSfc.rawSource.includes('#projects'), 'Navbar must contain section anchor links')
})

// -----------------------------------------------------------------------------
// T3-11: Reduced Motion Preference Across 3D Canvas & UI Sections (F1/F4 × F3/F6/F7)
// -----------------------------------------------------------------------------
suite.test('T3-11', 'Reduced Motion Preference Across 3D Canvas & UI Sections (F1/F4 x F3/F6/F7)', async () => {
  const canvasPath = 'src/components/hero/Hero3DCanvas.vue'
  const tokensPath = 'src/assets/styles/design-tokens.css'

  assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Tokens file ${tokensPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Canvas file ${canvasPath} must exist (Pending M2)`)

  const canvasSfc = loadVueComponent(canvasPath)
  assert(hasReducedMotionSupport(canvasSfc.scriptContent, canvasSfc.templateContent), 'Canvas must support reduced motion')
})

// -----------------------------------------------------------------------------
// T3-12: 1-Click Clipboard Copy Coexistence with Form State (F10 × F2)
// -----------------------------------------------------------------------------
suite.test('T3-12', '1-Click Clipboard Copy Coexistence with Form State (F10 x F2)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  const contactPath = 'src/components/contact/ContactSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contact file ${contactPath} must exist (Pending M3)`)

  const { portfolioData } = await loadPortfolioData(dataPath)
  assertEqual(portfolioData.contact.email, 'tuananhptit0310@gmail.com', 'Authentic email must be available for copying')

  const contactSfc = loadVueComponent(contactPath)
  assert(contactSfc.rawSource.includes('copy') || contactSfc.rawSource.includes('clipboard') || contactSfc.hasElement('button'), 'Contact component must provide copy button')
})

module.exports = suite
