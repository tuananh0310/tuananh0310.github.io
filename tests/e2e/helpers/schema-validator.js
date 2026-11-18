/**
 * tests/e2e/helpers/schema-validator.js
 * Data Contract and Schema Validator for portfolioData.js
 */

'use strict'

const fs = require('fs')
const path = require('path')
const { pathToFileURL } = require('url')
const {
  assert,
  assertEqual,
  assertGreaterThanOrEqual,
  assertContains,
  AssertionError
} = require('./test-harness')

async function loadPortfolioData (customPath) {
  const targetPath = customPath || 'src/data/portfolioData.js'
  const fullPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(process.cwd(), targetPath)

  if (!fs.existsSync(fullPath)) {
    throw new AssertionError(
      `Portfolio data file not found: ${targetPath} (Pending M1 implementation)`,
      false,
      true
    )
  }

  try {
    const fileUrl = pathToFileURL(fullPath).href + `?t=${Date.now()}`
    const module = await import(fileUrl)
    const data = module.portfolioData || module.default

    if (!data || typeof data !== 'object') {
      throw new AssertionError(
        `File ${targetPath} does not export a valid portfolioData object`,
        data,
        'object'
      )
    }

    return {
      portfolioData: data,
      rawModule: module,
      fullPath
    }
  } catch (err) {
    if (err instanceof AssertionError) throw err
    throw new AssertionError(
      `Failed to import ${targetPath}: ${err.message}`,
      null,
      null
    )
  }
}

function validateIdentity (identity) {
  assert(identity && typeof identity === 'object', 'identity must be a non-null object')
  assertEqual(typeof identity.fullName, 'string', 'identity.fullName must be a string')
  assert(identity.fullName.length > 0, 'identity.fullName must not be empty')
  assertEqual(typeof identity.headline, 'string', 'identity.headline must be a string')
  assert(identity.headline.length > 0, 'identity.headline must not be empty')

  assert(Array.isArray(identity.subtitles), 'identity.subtitles must be an array')
  assertGreaterThanOrEqual(identity.subtitles.length, 1, 'identity.subtitles must have at least 1 item')

  assertEqual(typeof identity.bio, 'string', 'identity.bio must be a string')
  assert(identity.bio.length > 0, 'identity.bio must not be empty')

  if (identity.careerGoal !== undefined) {
    assertEqual(typeof identity.careerGoal, 'string', 'identity.careerGoal must be a string')
  }

  assertEqual(typeof identity.avatarUrl, 'string', 'identity.avatarUrl must be a string')
  assertEqual(typeof identity.resumePdfUrl, 'string', 'identity.resumePdfUrl must be a string')
}

function validateContact (contact) {
  assert(contact && typeof contact === 'object', 'contact must be a non-null object')
  assertEqual(typeof contact.email, 'string', 'contact.email must be a string')
  assert(contact.email.includes('@'), 'contact.email must be a valid email format')

  assertEqual(typeof contact.phone, 'string', 'contact.phone must be a string')
  assertEqual(typeof contact.location, 'string', 'contact.location must be a string')
  assertEqual(typeof contact.github, 'string', 'contact.github must be a string')
  assertEqual(typeof contact.linkedin, 'string', 'contact.linkedin must be a string')
  assertEqual(typeof contact.formspreeEndpoint, 'string', 'contact.formspreeEndpoint must be a string')
}

function validateStats (stats) {
  assert(stats && typeof stats === 'object', 'stats must be a non-null object')
  assertEqual(typeof stats.yearsOfExperience, 'number', 'stats.yearsOfExperience must be a number')
  assertGreaterThanOrEqual(stats.yearsOfExperience, 1, 'stats.yearsOfExperience must be >= 1')

  assertEqual(typeof stats.enterpriseSystems, 'number', 'stats.enterpriseSystems must be a number')
  assertGreaterThanOrEqual(stats.enterpriseSystems, 1, 'stats.enterpriseSystems must be >= 1')

  assertEqual(typeof stats.awsCertifications, 'number', 'stats.awsCertifications must be a number')
  assertGreaterThanOrEqual(stats.awsCertifications, 1, 'stats.awsCertifications must be >= 1')
}

function validateExperiences (experiences) {
  assert(Array.isArray(experiences), 'experiences must be an array')
  assertGreaterThanOrEqual(experiences.length, 4, 'experiences must contain at least 4 company entries')

  const requiredCompanies = ['fci', 'fpt smart cloud', 'the first one', 'misa']
  const foundCompanies = experiences.map(e => (e.company || '').toLowerCase())

  for (const req of requiredCompanies) {
    const matched = foundCompanies.some(c => c.includes(req) || (req === 'fci' && c.includes('fpt corporation')))
    assert(matched, `experiences must include entry for "${req}"`)
  }

  experiences.forEach((exp, idx) => {
    assert(exp.company && typeof exp.company === 'string', `exp[${idx}].company must be non-empty string`)
    assert(exp.role && typeof exp.role === 'string', `exp[${idx}].role must be non-empty string`)
    assert(exp.period && typeof exp.period === 'string', `exp[${idx}].period must be non-empty string`)
    assert(Array.isArray(exp.highlights) && exp.highlights.length >= 1, `exp[${idx}].highlights must have at least 1 item`)
    assert(Array.isArray(exp.tech) && exp.tech.length >= 1, `exp[${idx}].tech must have at least 1 item`)
  })
}

function validateProjects (projects) {
  assert(Array.isArray(projects), 'projects must be an array')
  assertGreaterThanOrEqual(projects.length, 10, 'projects must contain at least 10 entries')

  const validCategories = ['enterprise', 'cloud', 'microservices', 'cloud/gitops', 'platform', 'personal']

  projects.forEach((proj, idx) => {
    assert(proj.title && typeof proj.title === 'string', `proj[${idx}].title must be string`)
    assert(proj.summary && typeof proj.summary === 'string', `proj[${idx}].summary must be string`)
    assert(Array.isArray(proj.tech) && proj.tech.length >= 1, `proj[${idx}].tech must have >= 1 item`)

    const cat = (proj.category || '').toLowerCase()
    const isValidCategory = validCategories.some(c => cat.includes(c))
    assert(isValidCategory, `proj[${idx}].category "${proj.category}" must be valid category`)
  })

  const titles = projects.map(p => p.title.toLowerCase())
  const requiredProjects = ['partner portal', 'snipe-it', 'vtiger']
  for (const req of requiredProjects) {
    assert(titles.some(t => t.includes(req)), `projects must include authentic project "${req}"`)
  }
}

function validateCertifications (certifications) {
  assert(Array.isArray(certifications), 'certifications must be an array')
  assertGreaterThanOrEqual(certifications.length, 2, 'certifications must contain at least 2 AWS certs')

  const credlyLinks = certifications.map(c => c.verifyUrl || '')
  const hasDevCert = credlyLinks.some(url => url.includes('f058f6b0-1c47-43fa-86ed-a025cdaeaf7a') || url.includes('credly.com'))
  const hasSaCert = credlyLinks.some(url => url.includes('ed81cbeb-fe6d-4312-b7c3-907387071fa4') || url.includes('credly.com'))

  assert(hasDevCert, 'certifications must contain AWS Developer Associate with Credly verification URL')
  assert(hasSaCert, 'certifications must contain AWS Solutions Architect Associate with Credly verification URL')
}

function validateSkills (skills) {
  assert(Array.isArray(skills), 'skills must be an array')
  assertGreaterThanOrEqual(skills.length, 3, 'skills must contain at least 3 categories')

  skills.forEach((cat, idx) => {
    assert(cat.category && typeof cat.category === 'string', `skill[${idx}].category must be string`)
    assert(Array.isArray(cat.items) && cat.items.length >= 1, `skill[${idx}].items must have >= 1 tag`)
  })
}

function validateServices (services) {
  assert(Array.isArray(services), 'services must be an array')
  assertGreaterThanOrEqual(services.length, 3, 'services must contain at least 3 offerings')

  services.forEach((s, idx) => {
    assert(s.title && typeof s.title === 'string', `services[${idx}].title must be string`)
    assert(s.description && typeof s.description === 'string', `services[${idx}].description must be string`)
  })
}

function validateDomains (domains) {
  assert(Array.isArray(domains), 'domains must be an array')
  assertGreaterThanOrEqual(domains.length, 3, 'domains must contain at least 3 domain cards')

  domains.forEach((d, idx) => {
    assert(d.title && typeof d.title === 'string', `domains[${idx}].title must be string`)
    assert(d.description && typeof d.description === 'string', `domains[${idx}].description must be string`)
  })
}

function validateFullSchema (portfolioData) {
  assert(portfolioData && typeof portfolioData === 'object', 'portfolioData must be an object')

  const requiredKeys = [
    'identity',
    'contact',
    'stats',
    'experiences',
    'projects',
    'skills',
    'certifications',
    'services',
    'domains'
  ]

  for (const key of requiredKeys) {
    assert(Object.prototype.hasOwnProperty.call(portfolioData, key), `portfolioData missing required key: "${key}"`)
  }

  validateIdentity(portfolioData.identity)
  validateContact(portfolioData.contact)
  validateStats(portfolioData.stats)
  validateExperiences(portfolioData.experiences)
  validateProjects(portfolioData.projects)
  validateCertifications(portfolioData.certifications)
  validateSkills(portfolioData.skills)
  validateServices(portfolioData.services)
  validateDomains(portfolioData.domains)
}

module.exports = {
  loadPortfolioData,
  validateIdentity,
  validateContact,
  validateStats,
  validateExperiences,
  validateProjects,
  validateCertifications,
  validateSkills,
  validateServices,
  validateDomains,
  validateFullSchema
}
