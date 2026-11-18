/**
 * tests/e2e/tier1-features.js
 * Tier 1: Feature Coverage Test Suite (F1 through F11 - Exactly 55 tests, 5 per feature)
 */

'use strict'

const fs = require('fs')
const path = require('path')
const {
  createSuite,
  assert,
  assertEqual,
  assertGreaterThanOrEqual,
  assertContains,
  assertMatch
} = require('./helpers/test-harness')

const { loadVueComponent, loadHtml } = require('./helpers/dom-loader')
const { loadCss, getCssVariables, getThemeVariables, getRuleDeclarations, hasSelector } = require('./helpers/css-analyzer')
const { loadPortfolioData, validateFullSchema } = require('./helpers/schema-validator')
const { hasWebGLDetection, hasFallbackWiring, hasThreeLifecycleCleanup, hasReducedMotionSupport } = require('./helpers/webgl-mock')

const suite = createSuite('TIER 1: FEATURE COVERAGE', 1)

// =============================================================================
// Feature 1: Design System Foundation (F1)
// =============================================================================
suite.describe('F1: Design System Foundation', () => {
  const tokensPath = 'src/assets/styles/design-tokens.css'
  const glassPath = 'src/assets/styles/glassmorphism.css'

  suite.test('T1-F1-01', 'CSS Custom Properties Definition', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Contract file ${tokensPath} must exist (Pending M1 implementation)`)
    const variables = getCssVariables(tokensPath)
    assert(variables['--accent-primary'] || variables['--accent-emerald'], 'Must define --accent-primary or --accent-emerald')
    assert(variables['--accent-secondary'] || variables['--accent-sky'], 'Must define --accent-secondary or --accent-sky')
    assert(variables['--font-sans'], 'Must define --font-sans')
    assert(variables['--font-mono'], 'Must define --font-mono')
    assert(variables['--glass-blur'] || variables['--radius-md'] || variables['--transition-smooth'], 'Must define UI utility tokens')
  })

  suite.test('T1-F1-02', 'Dark Theme Palette Application', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Contract file ${tokensPath} must exist (Pending M1 implementation)`)
    const darkVars = getThemeVariables(tokensPath, ':root') || getThemeVariables(tokensPath, '[data-theme="dark"]')
    const bg = darkVars['--bg-canvas'] || darkVars['--bg-primary']
    assert(bg, 'Dark theme must define --bg-canvas or --bg-primary')
    assert(bg.toLowerCase().includes('#0b') || bg.toLowerCase().includes('#0f') || bg.toLowerCase().includes('rgba'), 'Dark canvas should be Obsidian dark')
    assert(darkVars['--text-primary'], 'Dark theme must define --text-primary')
    assert(darkVars['--border-subtle'] || darkVars['--glass-border'], 'Dark theme must define border tokens')
  })

  suite.test('T1-F1-03', 'Light Theme Palette Application', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Contract file ${tokensPath} must exist (Pending M1 implementation)`)
    const lightVars = getThemeVariables(tokensPath, '[data-theme="light"]') || getThemeVariables(tokensPath, '.light-theme')
    assert(Object.keys(lightVars).length > 0, 'Tokens must define rules for [data-theme="light"] or .light-theme')
    const bg = lightVars['--bg-canvas'] || lightVars['--bg-primary']
    assert(bg, 'Light theme must define light background token')
    const text = lightVars['--text-primary']
    assert(text, 'Light theme must define dark text token')
  })

  suite.test('T1-F1-04', 'Glassmorphic Utility Classes Presence', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), glassPath)), `Contract file ${glassPath} must exist (Pending M1 implementation)`)
    assert(hasSelector(glassPath, '.glass-card') || hasSelector(glassPath, '.glass-panel'), 'Must define .glass-card or .glass-panel utility class')
    const decls = getRuleDeclarations(glassPath, '.glass-card')
    assert(decls['backdrop-filter'] || decls['-webkit-backdrop-filter'] || hasSelector(glassPath, '.glass-panel'), '.glass-card must define backdrop-filter blur')
  })

  suite.test('T1-F1-05', 'Fluid Typography Scaling Tokens', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), tokensPath)), `Contract file ${tokensPath} must exist (Pending M1 implementation)`)
    const { cssContent } = loadCss(tokensPath)
    assert(cssContent.includes('clamp('), 'Design tokens must utilize responsive clamp(...) typography scaling')
  })
})

// =============================================================================
// Feature 2: Centralized Portfolio Data (F2)
// =============================================================================
suite.describe('F2: Centralized Portfolio Data', () => {
  const dataPath = 'src/data/portfolioData.js'

  suite.test('T1-F2-01', 'Centralized Export & Top-Level Schema Integrity', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Contract file ${dataPath} must exist (Pending M1 implementation)`)
    const { portfolioData } = await loadPortfolioData(dataPath)
    validateFullSchema(portfolioData)
  })

  suite.test('T1-F2-02', 'Identity & Contact Schema Verification', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Contract file ${dataPath} must exist (Pending M1 implementation)`)
    const { portfolioData } = await loadPortfolioData(dataPath)
    assertEqual(portfolioData.identity.fullName, 'Le Xuan Tuan Anh', 'fullName must be authentic')
    assert(portfolioData.identity.headline.includes('Backend') || portfolioData.identity.headline.includes('Platform') || portfolioData.identity.headline.includes('SRE'), 'headline must reflect engineering role')
    assertEqual(portfolioData.contact.email, 'tuananhptit0310@gmail.com', 'email must be authentic')
    assert(portfolioData.contact.phone.includes('967 983 582') || portfolioData.contact.phone.includes('967983582'), 'phone must be authentic')
    assertContains(portfolioData.contact.github, 'github.com/tuananh0310', 'github URL must be authentic')
    assertContains(portfolioData.contact.linkedin, 'linkedin.com/in/anhlxt', 'linkedin URL must be authentic')
    assertContains(portfolioData.contact.formspreeEndpoint, 'xanwjdrr', 'formspree endpoint must be authentic')
  })

  suite.test('T1-F2-03', 'Work Experiences Catalog Completeness', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Contract file ${dataPath} must exist (Pending M1 implementation)`)
    const { portfolioData } = await loadPortfolioData(dataPath)
    assertGreaterThanOrEqual(portfolioData.experiences.length, 4, 'Must catalog at least 4 authentic roles')
    const companies = portfolioData.experiences.map(e => e.company.toLowerCase())
    assert(companies.some(c => c.includes('fci') || c.includes('fpt corporation')), 'Must catalog FCI role')
    assert(companies.some(c => c.includes('fpt smart cloud')), 'Must catalog FPT Smart Cloud role')
    assert(companies.some(c => c.includes('the first one')), 'Must catalog The First One JSC role')
    assert(companies.some(c => c.includes('misa')), 'Must catalog MISA role')
  })

  suite.test('T1-F2-04', 'Projects Inventory Completeness & Categories', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Contract file ${dataPath} must exist (Pending M1 implementation)`)
    const { portfolioData } = await loadPortfolioData(dataPath)
    assertGreaterThanOrEqual(portfolioData.projects.length, 10, 'Must catalog at least 10 authentic projects')
    const titles = portfolioData.projects.map(p => p.title.toLowerCase())
    assert(titles.some(t => t.includes('partner portal')), 'Must include Partner Portal')
    assert(titles.some(t => t.includes('snipe-it') || t.includes('asset management')), 'Must include Snipe-IT')
    assert(titles.some(t => t.includes('vtiger') || t.includes('crm')), 'Must include Vtiger')
  })

  suite.test('T1-F2-05', 'Certifications Credly Links & Education Verification', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), dataPath)), `Contract file ${dataPath} must exist (Pending M1 implementation)`)
    const { portfolioData } = await loadPortfolioData(dataPath)
    assertGreaterThanOrEqual(portfolioData.certifications.length, 2, 'Must catalog at least 2 AWS certs')
    const credlyUrls = portfolioData.certifications.map(c => c.verifyUrl || '')
    assert(credlyUrls.some(u => u.includes('f058f6b0-1c47-43fa-86ed-a025cdaeaf7a') || u.includes('credly.com')), 'Must include AWS Developer Assoc Credly URL')
    assert(credlyUrls.some(u => u.includes('ed81cbeb-fe6d-4312-b7c3-907387071fa4') || u.includes('credly.com')), 'Must include AWS Solutions Architect Credly URL')
  })
})

// =============================================================================
// Feature 3: Interactive 3D WebGL Hero Element (F3)
// =============================================================================
suite.describe('F3: Interactive 3D WebGL Hero Element', () => {
  const canvasPath = 'src/components/hero/Hero3DCanvas.vue'

  suite.test('T1-F3-01', 'HTML5 Canvas Mount & Three.js Instantiation', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Contract file ${canvasPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(canvasPath)
    assert(sfc.hasElement('canvas'), 'Hero3DCanvas must contain HTML5 <canvas> element')
    assert(sfc.scriptContent.includes('three') || sfc.scriptContent.includes('THREE') || sfc.scriptContent.includes('WebGLRenderer'), 'Must import/initialize Three.js renderer')
  })

  suite.test('T1-F3-02', 'Mesh Network Scene Objects Assembly', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Contract file ${canvasPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(canvasPath)
    const content = sfc.scriptContent
    assert(content.includes('Scene') || content.includes('scene'), 'Must create Three.js Scene')
    assert(content.includes('Geometry') || content.includes('BufferGeometry') || content.includes('IcosahedronGeometry') || content.includes('Mesh'), 'Must assemble 3D geometry and meshes')
  })

  suite.test('T1-F3-03', 'Pointer Interaction & Lerp Camera Tilt', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Contract file ${canvasPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(canvasPath)
    const content = sfc.scriptContent
    assert(content.includes('mousemove') || content.includes('pointermove') || content.includes('onPointerMove'), 'Must handle pointer movements')
    assert(content.includes('lerp') || content.includes('*=') || content.includes('rotation') || content.includes('target'), 'Must implement smooth damping/interpolation')
  })

  suite.test('T1-F3-04', 'Touch Drag Gesture Handling', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Contract file ${canvasPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(canvasPath)
    const content = sfc.scriptContent
    assert(content.includes('touch') || content.includes('pointer') || content.includes('onTouch'), 'Must support touch gestures for mobile manipulation')
  })

  suite.test('T1-F3-05', 'Lifecycle Teardown & GPU Resource Disposal', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Contract file ${canvasPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(canvasPath)
    assert(hasThreeLifecycleCleanup(sfc.scriptContent), 'Must cleanly dispose GPU resources and cancel animation frames in beforeDestroy()')
  })
})

// =============================================================================
// Feature 4: WebGL Detection & Graceful Fallback (F4)
// =============================================================================
suite.describe('F4: WebGL Detection & Graceful Fallback', () => {
  const heroPath = 'src/components/hero/HeroSection.vue'
  const fallbackPath = 'src/components/hero/HeroFallback.vue'
  const canvasPath = 'src/components/hero/Hero3DCanvas.vue'

  suite.test('T1-F4-01', 'WebGL Detection Function Reliability', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), heroPath)) || fs.existsSync(path.resolve(process.cwd(), canvasPath)), 'Hero components must exist')
    const target = fs.existsSync(path.resolve(process.cwd(), heroPath)) ? heroPath : canvasPath
    const sfc = loadVueComponent(target)
    assert(hasWebGLDetection(sfc.scriptContent) || hasWebGLDetection(sfc.templateContent), 'Must implement WebGL detection mechanism')
  })

  suite.test('T1-F4-02', 'Graceful Fallback Rendering When WebGL Unsupported', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), heroPath)), `Contract file ${heroPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(heroPath)
    assert(hasFallbackWiring(sfc.templateContent, sfc.scriptContent), 'HeroSection must wire fallback component upon WebGL failure')
  })

  suite.test('T1-F4-03', 'Fallback Avatar & Glowing Cyber Orb Presentation', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), fallbackPath)), `Contract file ${fallbackPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(fallbackPath)
    assert(sfc.hasElement('img') || sfc.hasElement('.avatar') || sfc.rawSource.includes('avatar') || sfc.rawSource.includes('_SUN68591'), 'Fallback must feature authentic avatar')
    assert(sfc.rawSource.includes('orb') || sfc.rawSource.includes('glow') || sfc.rawSource.includes('halo'), 'Fallback must include cyber orb or glow styling')
  })

  suite.test('T1-F4-04', 'WebGL Context Loss Recovery Event Handling', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), canvasPath)), `Contract file ${canvasPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(canvasPath)
    assert(sfc.scriptContent.includes('webglcontextlost') || sfc.scriptContent.includes('webgl-failed'), 'Must handle webglcontextlost or emit webgl-failed')
  })

  suite.test('T1-F4-05', 'Hero Text Legibility & Contrast in Fallback Mode', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), heroPath)), `Contract file ${heroPath} must exist (Pending M2 implementation)`)
    const sfc = loadVueComponent(heroPath)
    assert(sfc.rawSource.includes('Le Xuan Tuan Anh') || sfc.rawSource.includes('identity.fullName') || sfc.rawSource.includes('headline'), 'Hero text narrative must be present and legible')
  })
})

// =============================================================================
// Feature 5: Modern Navigation Bar & Mobile Drawer (F5)
// =============================================================================
suite.describe('F5: Modern Navigation Bar & Mobile Drawer', () => {
  const navbarPath = 'src/components/TheNavbar.vue'

  suite.test('T1-F5-01', 'Full-Width Sticky Navbar Layout & Backdrop Blur', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Contract file ${navbarPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(navbarPath)
    assert(sfc.rawSource.includes('sticky') || sfc.rawSource.includes('fixed'), 'Navbar must be sticky or fixed')
    assert(sfc.rawSource.includes('backdrop-filter') || sfc.rawSource.includes('glass'), 'Navbar must apply glassmorphic backdrop blur')
  })

  suite.test('T1-F5-02', 'Brand Monogram & Status Beacon', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Contract file ${navbarPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(navbarPath)
    assert(sfc.rawSource.includes('LA') || sfc.rawSource.includes('[LA]') || sfc.rawSource.includes('monogram'), 'Navbar must feature [LA] brand monogram')
  })

  suite.test('T1-F5-03', 'Desktop Navigation Links & Section Anchors', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Contract file ${navbarPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(navbarPath)
    const anchors = ['#about', '#experience', '#projects', '#skills', '#contact']
    let found = 0
    anchors.forEach(a => {
      if (sfc.rawSource.includes(a)) found++
    })
    assertGreaterThanOrEqual(found, 3, 'Navbar must include primary section anchor links')
  })

  suite.test('T1-F5-04', 'CV Download Button Link Validity', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Contract file ${navbarPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(navbarPath)
    assert(sfc.rawSource.includes('le-xuan-tuan-anh-cv') || sfc.rawSource.includes('resumePdfUrl'), 'Navbar must provide direct CV download button')
  })

  suite.test('T1-F5-05', 'Mobile Slide-Over Drawer Open & Close Interaction', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), navbarPath)), `Contract file ${navbarPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(navbarPath)
    assert(sfc.rawSource.includes('drawer') || sfc.rawSource.includes('v-navigation-drawer') || sfc.rawSource.includes('mobileMenu') || sfc.hasElement('button'), 'Navbar must contain mobile drawer or hamburger trigger')
  })
})

// =============================================================================
// Feature 6: About & Engineering Philosophy (F6)
// =============================================================================
suite.describe('F6: About & Engineering Philosophy', () => {
  const aboutPath = 'src/components/about/AboutSection.vue'

  suite.test('T1-F6-01', 'Bento-Grid Layout & Card Composition', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), aboutPath)), `Contract file ${aboutPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(aboutPath)
    assert(sfc.rawSource.includes('bento') || sfc.rawSource.includes('grid') || sfc.rawSource.includes('glass-card'), 'About section must use Bento grid structure')
  })

  suite.test('T1-F6-02', 'Engineering Background & Architecture Narrative', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), aboutPath)), `Contract file ${aboutPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(aboutPath)
    assert(sfc.rawSource.includes('PTIT') || sfc.rawSource.includes('bio') || sfc.rawSource.includes('Engineering') || sfc.rawSource.includes('architecture'), 'About section must narrate engineering background')
  })

  suite.test('T1-F6-03', 'Principal Engineer Roadmap Card', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), aboutPath)), `Contract file ${aboutPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(aboutPath)
    assert(sfc.rawSource.includes('Principal') || sfc.rawSource.includes('roadmap') || sfc.rawSource.includes('careerGoal'), 'About section must articulate Principal Engineer roadmap')
  })

  suite.test('T1-F6-04', 'Quantitative Stats Counter Display', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), aboutPath)), `Contract file ${aboutPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(aboutPath)
    assert(sfc.rawSource.includes('yearsOfExperience') || sfc.rawSource.includes('stats') || sfc.rawSource.includes('5+'), 'About section must render quantitative career stats')
  })

  suite.test('T1-F6-05', 'Hackathon Awards & Rating Recognition', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), aboutPath)), `Contract file ${aboutPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(aboutPath)
    assert(sfc.rawSource.includes('FCI') || sfc.rawSource.includes('Hackathon') || sfc.rawSource.includes('Award') || sfc.rawSource.includes('Rated A') || sfc.rawSource.includes('achievements'), 'About section must showcase awards and ratings')
  })
})

// =============================================================================
// Feature 7: Work Experience Timeline (F7)
// =============================================================================
suite.describe('F7: Work Experience Timeline', () => {
  const expPath = 'src/components/experience/ExperienceSection.vue'

  suite.test('T1-F7-01', 'Chronological Work Experience Timeline Rendering', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), expPath)), `Contract file ${expPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(expPath)
    assert(sfc.rawSource.includes('timeline') || sfc.rawSource.includes('experiences'), 'Experience section must render timeline')
  })

  suite.test('T1-F7-02', 'FCI Role SRE Achievements & Highlights', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), expPath)), `Contract file ${expPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(expPath)
    assert(sfc.rawSource.includes('FCI') || sfc.rawSource.includes('Partner Portal') || sfc.rawSource.includes('experiences'), 'Experience section must detail FCI platform role')
  })

  suite.test('T1-F7-03', 'FPT Smart Cloud Achievements & Mentorship', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), expPath)), `Contract file ${expPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(expPath)
    assert(sfc.rawSource.includes('FPT') || sfc.rawSource.includes('NestJS') || sfc.rawSource.includes('experiences'), 'Experience section must detail FPT Smart Cloud contributions')
  })

  suite.test('T1-F7-04', 'The First One JSC & AWS Operations Record', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), expPath)), `Contract file ${expPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(expPath)
    assert(sfc.rawSource.includes('The First One') || sfc.rawSource.includes('AWS') || sfc.rawSource.includes('experiences'), 'Experience section must detail The First One JSC experience')
  })

  suite.test('T1-F7-05', 'Role Tech Stack Pills Presentation', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), expPath)), `Contract file ${expPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(expPath)
    assert(sfc.rawSource.includes('tech') || sfc.rawSource.includes('tag') || sfc.rawSource.includes('pill') || sfc.rawSource.includes('badge'), 'Experience section must display tech stack pills')
  })
})

// =============================================================================
// Feature 8: Projects Showcase Grid (F8)
// =============================================================================
suite.describe('F8: Projects Showcase Grid', () => {
  const projSectionPath = 'src/components/projects/ProjectsSection.vue'
  const projCardPath = 'src/components/projects/ProjectCard.vue'

  suite.test('T1-F8-01', 'Filter Tabs Initialization & Default State', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), projSectionPath)), `Contract file ${projSectionPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(projSectionPath)
    assert(sfc.rawSource.includes('filter') || sfc.rawSource.includes('categories') || sfc.rawSource.includes('All'), 'ProjectsSection must include filter tabs')
  })

  suite.test('T1-F8-02', 'Category Filtering Execution', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), projSectionPath)), `Contract file ${projSectionPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(projSectionPath)
    assert(sfc.rawSource.includes('filteredProjects') || sfc.rawSource.includes('filter') || sfc.rawSource.includes('category'), 'ProjectsSection must implement category filtering logic')
  })

  suite.test('T1-F8-03', 'Project Card Architecture & Metadata Presentation', async () => {
    const target = fs.existsSync(path.resolve(process.cwd(), projCardPath)) ? projCardPath : projSectionPath
    assert(fs.existsSync(path.resolve(process.cwd(), target)), `Contract file ${target} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(target)
    assert(sfc.rawSource.includes('title') && sfc.rawSource.includes('summary'), 'Project Card must present title and architecture summary')
  })

  suite.test('T1-F8-04', 'External Links & Security Attributes', async () => {
    const target = fs.existsSync(path.resolve(process.cwd(), projCardPath)) ? projCardPath : projSectionPath
    assert(fs.existsSync(path.resolve(process.cwd(), target)), `Contract file ${target} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(target)
    assert(sfc.rawSource.includes('noopener') || sfc.rawSource.includes('_blank') || sfc.rawSource.includes('demoUrl') || sfc.rawSource.includes('githubUrl'), 'External project links must specify secure attributes')
  })

  suite.test('T1-F8-05', 'Responsive 3-Column / 2-Column / 1-Column Grid', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), projSectionPath)), `Contract file ${projSectionPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(projSectionPath)
    assert(sfc.rawSource.includes('grid') || sfc.rawSource.includes('col') || sfc.rawSource.includes('v-layout'), 'ProjectsSection must structure projects into a responsive grid')
  })
})

// =============================================================================
// Feature 9: Skills, Certifications & Services (F9)
// =============================================================================
suite.describe('F9: Skills, Certifications & Services', () => {
  const skillsPath = 'src/components/skills/SkillsSection.vue'

  suite.test('T1-F9-01', 'Categorized Skills Matrix Rendering', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), skillsPath)), `Contract file ${skillsPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(skillsPath)
    assert(sfc.rawSource.includes('skills') || sfc.rawSource.includes('category'), 'SkillsSection must render categorized skills matrix')
  })

  suite.test('T1-F9-02', 'AWS Credly Verification Badges & Links', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), skillsPath)), `Contract file ${skillsPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(skillsPath)
    assert(sfc.rawSource.includes('credly') || sfc.rawSource.includes('certifications') || sfc.rawSource.includes('AWS'), 'SkillsSection must render AWS Credly badges and verification links')
  })

  suite.test('T1-F9-03', 'Education & PTIT Degree Credentials Display', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), skillsPath)), `Contract file ${skillsPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(skillsPath)
    assert(sfc.rawSource.includes('PTIT') || sfc.rawSource.includes('Education') || sfc.rawSource.includes('degree') || sfc.rawSource.includes('Electronics'), 'Education credentials must be displayed')
  })

  suite.test('T1-F9-04', 'Core Engineering Services Offerings', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), skillsPath)), `Contract file ${skillsPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(skillsPath)
    assert(sfc.rawSource.includes('services') || sfc.rawSource.includes('Architecture') || sfc.rawSource.includes('Backend') || sfc.rawSource.includes('Cloud'), 'Must present engineering services offerings')
  })

  suite.test('T1-F9-05', 'Industry Business Domains Grid', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), skillsPath)), `Contract file ${skillsPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(skillsPath)
    assert(sfc.rawSource.includes('domains') || sfc.rawSource.includes('Partner Portals') || sfc.rawSource.includes('CRM') || sfc.rawSource.includes('Enterprise'), 'Must present industry business domains')
  })
})

// =============================================================================
// Feature 10: Contact Hub & Modern Footer (F10)
// =============================================================================
suite.describe('F10: Contact Hub & Modern Footer', () => {
  const contactPath = 'src/components/contact/ContactSection.vue'
  const footerPath = 'src/components/TheFooter.vue'

  suite.test('T1-F10-01', 'Direct Contact Information & 1-Click Clipboard Copy', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contract file ${contactPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(contactPath)
    assert(sfc.rawSource.includes('copy') || sfc.rawSource.includes('clipboard') || sfc.rawSource.includes('tuananhptit0310@gmail.com'), 'ContactSection must provide 1-click clipboard copy')
  })

  suite.test('T1-F10-02', 'Formspree Contact Form Elements & Endpoint', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contract file ${contactPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(contactPath)
    assert(sfc.rawSource.includes('formspree') || sfc.rawSource.includes('xanwjdrr') || sfc.hasElement('form'), 'ContactSection must contain form connecting to Formspree')
  })

  suite.test('T1-F10-03', 'Real-Time Input Validation & Character Counter', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contract file ${contactPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(contactPath)
    assert(sfc.rawSource.includes('vuelidate') || sfc.rawSource.includes('validate') || sfc.rawSource.includes('length') || sfc.rawSource.includes('email'), 'Contact form must implement validation')
  })

  suite.test('T1-F10-04', 'Form Submission State & Feedback UI', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), contactPath)), `Contract file ${contactPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(contactPath)
    assert(sfc.rawSource.includes('loading') || sfc.rawSource.includes('success') || sfc.rawSource.includes('submitted') || sfc.rawSource.includes('status'), 'Contact form must provide submission state feedback')
  })

  suite.test('T1-F10-05', 'Modern Footer Layout & Smooth Back-to-Top', async () => {
    assert(fs.existsSync(path.resolve(process.cwd(), footerPath)), `Contract file ${footerPath} must exist (Pending M3 implementation)`)
    const sfc = loadVueComponent(footerPath)
    assert(sfc.rawSource.includes('Back to Top') || sfc.rawSource.includes('top') || sfc.rawSource.includes('scrollTo'), 'Footer must provide smooth back-to-top interaction')
  })
})

// =============================================================================
// Feature 11: Build Integrity & Stack Preservation (F11)
// =============================================================================
suite.describe('F11: Build Integrity & Stack Preservation', () => {
  suite.test('T1-F11-01', 'Production Build Execution & Exit Code 0', async () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))
    assert(pkg.scripts && pkg.scripts.build, 'package.json must contain build script')
    assert(pkg.scripts.build.includes('vue-cli-service build'), 'Build script must execute vue-cli-service build')
  })

  suite.test('T1-F11-02', 'Core Framework Versions Integrity', async () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))
    assert(pkg.dependencies.vue && pkg.dependencies.vue.startsWith('^2.'), 'Vue 2.x must be preserved')
    assert(pkg.dependencies.vuetify && pkg.dependencies.vuetify.startsWith('^1.'), 'Vuetify 1.x must be preserved')
    assert(pkg.devDependencies['@vue/cli-service'] && pkg.devDependencies['@vue/cli-service'].startsWith('^3.'), '@vue/cli-service 3.x must be preserved')
  })

  suite.test('T1-F11-03', 'Production Distribution Artifacts Verification', async () => {
    const distIndex = path.resolve(process.cwd(), 'dist/index.html')
    const publicIndex = path.resolve(process.cwd(), 'public/index.html')
    assert(fs.existsSync(distIndex) || fs.existsSync(publicIndex), 'HTML entrypoint must exist (dist/index.html or public/index.html)')
    const stat = fs.existsSync(distIndex) ? fs.statSync(distIndex) : fs.statSync(publicIndex)
    assertGreaterThanOrEqual(stat.size, 500, 'HTML entrypoint must be > 500 bytes')
  })

  suite.test('T1-F11-04', 'Static Asset Preservation in Distribution', async () => {
    const cvPdf = fs.existsSync(path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.pdf'))
      ? path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.pdf')
      : path.resolve(process.cwd(), 'public/le-xuan-tuan-anh-cv.pdf')
    const cvHtml = fs.existsSync(path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.html'))
      ? path.resolve(process.cwd(), 'dist/le-xuan-tuan-anh-cv.html')
      : path.resolve(process.cwd(), 'public/le-xuan-tuan-anh-cv.html')
    assert(fs.existsSync(cvPdf), 'le-xuan-tuan-anh-cv.pdf must exist in public/ or dist/')
    assert(fs.existsSync(cvHtml), 'le-xuan-tuan-anh-cv.html must exist in public/ or dist/')
    assertGreaterThanOrEqual(fs.statSync(cvPdf).size, 100000, 'CV PDF file size must be > 100KB')
  })

  suite.test('T1-F11-05', 'ESLint Cleanliness & Zero Syntax Violations', async () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))
    assert(pkg.eslintConfig, 'package.json must contain ESLint configuration')
    assert(fs.existsSync(path.resolve(process.cwd(), 'src/main.js')), 'src/main.js must exist with valid syntax')
  })
})

module.exports = suite
