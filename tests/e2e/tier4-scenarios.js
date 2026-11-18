/**
 * tests/e2e/tier4-scenarios.js
 * Tier 4: Real-World Application Scenario Test Suite (6 End-to-End Journeys: T4-01 to T4-06)
 */

'use strict'

const fs = require('fs')
const path = require('path')
const {
  createSuite,
  assert,
  assertEqual,
  assertGreaterThanOrEqual,
  assertContains
} = require('./helpers/test-harness')

const { loadVueComponent, loadHtml } = require('./helpers/dom-loader')
const { loadPortfolioData } = require('./helpers/schema-validator')
const { loadCss, getMediaQueries, getCssVariables } = require('./helpers/css-analyzer')
const { verifyNoHorizontalOverflowRule } = require('./helpers/viewport-simulator')
const { hasFallbackWiring } = require('./helpers/webgl-mock')

const suite = createSuite('TIER 4: REAL-WORLD APPLICATION SCENARIOS', 4)

// -----------------------------------------------------------------------------
// Scenario 1: T4-01 - Tech Recruiter Rapid Candidate Evaluation Journey
// -----------------------------------------------------------------------------
suite.test('T4-01', 'Tech Recruiter Rapid Candidate Evaluation Journey (F1, F2, F3, F5, F7, F9)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  const cvPath = fs.existsSync(path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.pdf'))
    ? path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.pdf')
    : path.resolve(process.cwd(), 'public/le-xuan-tuan-anh-cv.pdf')

  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)
  assert(fs.existsSync(cvPath), `CV PDF must exist in public/ or dist/`)

  // 1. Verify candidate identity
  const { portfolioData } = await loadPortfolioData(dataPath)
  assertEqual(portfolioData.identity.fullName, 'Le Xuan Tuan Anh', 'Recruiter must observe authentic name')
  assert(portfolioData.identity.headline.includes('Backend') || portfolioData.identity.headline.includes('Platform') || portfolioData.identity.headline.includes('SRE'), 'Recruiter must observe Senior Backend/Platform/SRE title')

  // 2. Verify experience chronological timeline
  assertGreaterThanOrEqual(portfolioData.experiences.length, 4, 'Recruiter must inspect 4+ career roles')
  const companies = portfolioData.experiences.map(e => e.company.toLowerCase())
  assert(companies[0].includes('fci') || companies[0].includes('fpt corporation'), 'Most recent role must be FCI')

  // 3. Verify AWS credentials and Credly verification links
  assertGreaterThanOrEqual(portfolioData.certifications.length, 2, 'Recruiter must inspect 2 AWS certifications')
  portfolioData.certifications.forEach(cert => {
    assert(cert.verifyUrl && cert.verifyUrl.startsWith('https://'), 'Cert verification link must be HTTPS')
  })

  // 4. Verify resume file download availability
  const cvStat = fs.statSync(path.resolve(process.cwd(), cvPath))
  assertGreaterThanOrEqual(cvStat.size, 100000, 'CV PDF must be a non-corrupt document > 100KB')
})

// -----------------------------------------------------------------------------
// Scenario 2: T4-02 - Mobile Smartphone Visitor End-to-End Navigation & Filtering Flow
// -----------------------------------------------------------------------------
suite.test('T4-02', 'Mobile Smartphone Visitor End-to-End Navigation & Filtering Flow (F1, F5, F8)', async () => {
  const glassCssPath = 'src/assets/styles/glassmorphism.css'
  const tokensCssPath = 'src/assets/styles/design-tokens.css'
  const navbarPath = 'src/components/TheNavbar.vue'
  const projPath = 'src/components/projects/ProjectsSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), glassCssPath)), `Glass styling ${glassCssPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), tokensCssPath)), `Tokens ${tokensCssPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Navbar ${navbarPath} must exist (Pending M3)`)
  assert(fs.existsSync(path.resolve(process.cwd(), projPath)), `Projects ${projPath} must exist (Pending M3)`)

  // 1. Verify CSS media queries enforce mobile breakpoint (<=768px) and horizontal overflow safety
  const mediaQueries = getMediaQueries(glassCssPath)
  const hasMobileBreakpoint = mediaQueries.some(mq =>
    mq.params.includes('768px') ||
    mq.params.includes('max-width: 768') ||
    mq.params.includes('max-width: 600')
  )
  assert(hasMobileBreakpoint, 'glassmorphism.css must define responsive media queries for mobile viewports (<=768px)')
  verifyNoHorizontalOverflowRule(glassCssPath)

  // 2. Verify fluid typography scale adapts to mobile screens via clamp()
  const tokens = getCssVariables(tokensCssPath)
  assert(tokens['--fs-display'] && tokens['--fs-display'].includes('clamp('), 'Fluid display typography token must use clamp() for mobile responsiveness')
  assert(tokens['--fs-h1'] && tokens['--fs-h1'].includes('clamp('), 'Fluid h1 typography token must use clamp() for mobile responsiveness')

  // 3. Verify mobile navigation drawer and section anchor in TheNavbar
  const navbarSfc = loadVueComponent(navbarPath)
  const hasMobileDrawer =
    navbarSfc.rawSource.includes('drawer') ||
    navbarSfc.rawSource.includes('v-navigation-drawer') ||
    navbarSfc.rawSource.includes('mobileMenu') ||
    navbarSfc.rawSource.includes('v-app-bar-nav-icon') ||
    navbarSfc.rawSource.includes('menu')
  assert(hasMobileDrawer, 'TheNavbar must provide mobile navigation drawer or hamburger trigger')
  assert(navbarSfc.rawSource.includes('#projects'), 'Mobile navigation drawer must provide anchor jump to #projects')

  // 4. Verify project filtering affordances on mobile in ProjectsSection
  const projSfc = loadVueComponent(projPath)
  assert(
    projSfc.rawSource.includes('category') ||
    projSfc.rawSource.includes('filter') ||
    projSfc.rawSource.includes('selectedCategory'),
    'ProjectsSection must provide interactive category filtering on mobile viewports'
  )
  assert(
    projSfc.rawSource.includes('projects') || projSfc.rawSource.includes('portfolioData'),
    'ProjectsSection must bind to portfolio project items'
  )
})

// -----------------------------------------------------------------------------
// Scenario 3: T4-03 - Legacy Browser / Low-End Device WebGL Fallback Experience
// -----------------------------------------------------------------------------
suite.test('T4-03', 'Legacy Browser / Low-End Device WebGL Fallback Experience (F1, F3, F4, F5)', async () => {
  const heroPath = 'src/components/hero/HeroSection.vue'
  const fallbackPath = 'src/components/hero/HeroFallback.vue'
  const canvasPath = 'src/components/hero/Hero3DCanvas.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), heroPath)), `Hero container ${heroPath} must exist (Pending M2)`)
  assert(fs.existsSync(path.resolve(process.cwd(), fallbackPath)), `Fallback visual ${fallbackPath} must exist (Pending M2)`)
  assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `3D Canvas ${canvasPath} must exist (Pending M2)`)

  // 1. Inspect HeroSection template for conditional rendering between 3D canvas and fallback
  const heroSfc = loadVueComponent(heroPath)
  const template = heroSfc.templateContent
  const script = heroSfc.scriptContent

  const hasConditionalFallback =
    template.includes('HeroFallback') ||
    template.includes('hero-fallback') ||
    template.includes(':is=')
  assert(hasConditionalFallback, 'HeroSection template must declare HeroFallback visual component')

  const hasConditionalSwitch =
    /v-if\s*=\s*["'][^"']*(fallback|!hasWebGL|!isWebGL|hasWebGL\s*===?\s*false)/i.test(template) ||
    /<hero-?fallback[^>]*v-else/i.test(template) ||
    /<component\s+:[iI]s=/i.test(template)
  assert(hasConditionalSwitch, 'HeroSection template must conditionally render HeroFallback via v-if/v-else or dynamic component')

  // 2. Verify HeroSection captures WebGL failure event from Hero3DCanvas
  const catchesFailureEvent =
    template.includes('@webgl-failed') ||
    template.includes('v-on:webgl-failed') ||
    script.includes('webgl-failed')
  assert(catchesFailureEvent, 'HeroSection must capture @webgl-failed event from Hero3DCanvas to activate fallback')

  // 3. Verify HeroSection script registers fallback state and component imports
  assert(
    script.includes('HeroFallback') || script.includes('./HeroFallback'),
    'HeroSection script must import HeroFallback component'
  )
  assert(
    script.includes('hasWebGL') ||
    script.includes('isWebGLAvailable') ||
    script.includes('fallback') ||
    script.includes('webglFailed'),
    'HeroSection must manage reactive WebGL availability / fallback state'
  )

  // 4. Verify HeroFallback presents authentic avatar and CSS glowing orb
  const fallbackSfc = loadVueComponent(fallbackPath)
  assert(
    fallbackSfc.hasElement('img') ||
    fallbackSfc.rawSource.includes('avatar') ||
    fallbackSfc.rawSource.includes('_SUN68591'),
    'HeroFallback must present authentic avatar image'
  )
  assert(
    fallbackSfc.rawSource.includes('orb') ||
    fallbackSfc.rawSource.includes('glow') ||
    fallbackSfc.rawSource.includes('halo'),
    'HeroFallback must render CSS-styled glowing cyber orb visual'
  )

  // 5. Verify text narrative and CTAs remain accessible and rendered in fallback mode
  assert(
    template.includes('headline') ||
    heroSfc.rawSource.includes('identity.headline') ||
    heroSfc.rawSource.includes('Le Xuan Tuan Anh'),
    'Hero headline and identity must remain readable when WebGL is unavailable'
  )
  assert(
    template.includes('contact') ||
    heroSfc.rawSource.includes('#contact') ||
    heroSfc.rawSource.includes('resume'),
    'Hero CTAs must remain accessible in fallback mode'
  )
})

// -----------------------------------------------------------------------------
// Scenario 4: T4-04 - Enterprise Hiring Manager & Principal Architect Inspection
// -----------------------------------------------------------------------------
suite.test('T4-04', 'Enterprise Hiring Manager & Principal Architect Inspection (F1, F2, F6, F7, F8, F9)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)

  const { portfolioData } = await loadPortfolioData(dataPath)

  // 1. Engineering Philosophy & Reliability verification
  assert(portfolioData.identity.bio.length > 50, 'Bio must articulate architectural background')

  // 2. Principal Engineer Roadmap check
  if (portfolioData.identity.careerGoal) {
    assert(portfolioData.identity.careerGoal.length > 20, 'Career goal must articulate technical leadership vision')
  }

  // 3. Enterprise projects review
  const enterpriseProjects = portfolioData.projects.filter(p => (p.category || '').toLowerCase().includes('enterprise'))
  assertGreaterThanOrEqual(enterpriseProjects.length, 2, 'Must catalog enterprise projects (Partner Portal, Vtiger, etc.)')

  // 4. Skills depth audit
  const skillsCategories = portfolioData.skills.map(s => s.category.toLowerCase())
  assert(skillsCategories.some(c => c.includes('backend') || c.includes('cloud') || c.includes('sre')), 'Must include core architecture/backend skill categories')
})

// -----------------------------------------------------------------------------
// Scenario 5: T4-05 - Prospective Client Consulting Inquiry & Contact Hub Flow
// -----------------------------------------------------------------------------
suite.test('T4-05', 'Prospective Client Consulting Inquiry & Contact Hub Flow (F1, F2, F9, F10)', async () => {
  const dataPath = 'src/data/portfolioData.js'
  const contactPath = 'src/components/contact/ContactSection.vue'

  assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Data file ${dataPath} must exist (Pending M1)`)
  assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contact ${contactPath} must exist (Pending M3)`)

  const { portfolioData } = await loadPortfolioData(dataPath)

  // 1. Services offerings review
  assertGreaterThanOrEqual(portfolioData.services.length, 3, 'Must offer consulting services')

  // 2. Direct contact & 1-click clipboard
  assertEqual(portfolioData.contact.email, 'tuananhptit0310@gmail.com', 'Client can reach direct email')

  // 3. Contact Form validation check
  const contactSfc = loadVueComponent(contactPath)
  assert(contactSfc.rawSource.includes('formspree') || contactSfc.rawSource.includes('xanwjdrr') || contactSfc.hasElement('form'), 'Contact hub must provide active submission form')
})

// -----------------------------------------------------------------------------
// Scenario 6: T4-06 - Production Build & Asset Integrity Verification
// -----------------------------------------------------------------------------
suite.test('T4-06', 'Production Build & Asset Integrity Verification (F1, F2, F11)', async () => {
  // 1. Verify index.html exists
  const entryIndex = fs.existsSync(path.resolve(process.cwd(), 'dist/index.html'))
    ? path.resolve(process.cwd(), 'dist/index.html')
    : path.resolve(process.cwd(), 'public/index.html')
  assert(fs.existsSync(entryIndex), 'Entrypoint index.html must exist')

  // 2. Verify static resume documents
  const cvPdf = fs.existsSync(path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.pdf'))
    ? path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.pdf')
    : path.resolve(process.cwd(), 'public/le-xuan-tuan-anh-cv.pdf')
  const cvHtml = fs.existsSync(path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.html'))
    ? path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.html')
    : path.resolve(process.cwd(), 'public/le-xuan-tuan-anh-cv.html')
  assert(fs.existsSync(cvPdf), 'le-xuan-tuan-anh-cv.pdf must exist in public/ or dist/')
  assert(fs.existsSync(cvHtml), 'le-xuan-tuan-anh-cv.html must exist in public/ or dist/')

  // 3. Verify routing rewrite rules
  const redirects = path.resolve(process.cwd(), 'dist/_redirects')
  const redirectsPublic = path.resolve(process.cwd(), 'public/_redirects')
  assert(fs.existsSync(redirects) || fs.existsSync(redirectsPublic), 'Routing redirect rule file (_redirects) must exist')

  // 4. Verify package.json build command includes openssl legacy provider
  const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))
  assert(pkg.scripts.build.includes('--openssl-legacy-provider'), 'Build script must maintain legacy OpenSSL provider flag')
})

module.exports = suite
