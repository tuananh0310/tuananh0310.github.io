/**
 * tests/e2e/helpers/webgl-mock.js
 * WebGL Detection, Fallback Wiring, and Three.js Lifecycle Contract Inspector
 */

'use strict'

const fs = require('fs')
const path = require('path')
const { loadVueComponent } = require('./dom-loader')
const { AssertionError } = require('./test-harness')

function hasWebGLDetection (scriptContent) {
  if (!scriptContent) return false
  const checks = [
    /getContext\s*\(\s*['"]webgl['"]\s*\)/i,
    /getContext\s*\(\s*['"]experimental-webgl['"]\s*\)/i,
    /WebGLRenderingContext/i,
    /isWebGLAvailable/i
  ]
  return checks.some(pattern => pattern.test(scriptContent))
}

function hasFallbackWiring (templateContent, scriptContent = '') {
  if (!templateContent) return false
  const patterns = [
    /webgl-failed/i,
    /HeroFallback/i,
    /hero-fallback/i,
    /isWebGL/i,
    /hasWebGL/i,
    /useFallback/i,
    /fallback/i
  ]
  return patterns.some(p => p.test(templateContent) || p.test(scriptContent))
}

function hasThreeLifecycleCleanup (scriptContent) {
  if (!scriptContent) return false
  const hasDispose = /dispose\s*\(\s*\)/i.test(scriptContent)
  const hasCancelAnim = /cancelAnimationFrame/i.test(scriptContent)
  const hasBeforeDestroy = /beforeDestroy\s*\(\s*\)/i.test(scriptContent) || /destroyed\s*\(\s*\)/i.test(scriptContent)

  return hasDispose && (hasCancelAnim || hasBeforeDestroy)
}

function hasReducedMotionSupport (scriptContent = '', templateOrStyle = '') {
  const combined = scriptContent + ' ' + templateOrStyle
  const patterns = [
    /prefers-reduced-motion/i,
    /reducedMotion/i,
    /reduced-motion/i
  ]
  return patterns.some(p => p.test(combined))
}

function createMockWebGLContext (options = {}) {
  let contextLost = options.initiallyLost || false
  const listeners = {}

  return {
    addEventListener (event, fn) {
      if (!listeners[event]) listeners[event] = []
      listeners[event].push(fn)
    },
    removeEventListener (event, fn) {
      if (!listeners[event]) return
      listeners[event] = listeners[event].filter(l => l !== fn)
    },
    dispatchEvent (event) {
      const type = event.type || event
      if (listeners[type]) {
        listeners[type].forEach(fn => fn(event))
      }
    },
    loseContext () {
      contextLost = true
      const event = {
        type: 'webglcontextlost',
        defaultPrevented: false,
        preventDefault () {
          this.defaultPrevented = true
        }
      }
      this.dispatchEvent(event)
      return event
    },
    restoreContext () {
      contextLost = false
      const event = { type: 'webglcontextrestored' }
      this.dispatchEvent(event)
      return event
    },
    isContextLost () {
      return contextLost
    }
  }
}

function inspectHeroArchitecture () {
  const heroSectionPath = 'src/components/hero/HeroSection.vue'
  const hero3DPath = 'src/components/hero/Hero3DCanvas.vue'
  const heroFallbackPath = 'src/components/hero/HeroFallback.vue'

  return {
    heroSectionExists: fs.existsSync(path.resolve(process.cwd(), heroSectionPath)),
    hero3DExists: fs.existsSync(path.resolve(process.cwd(), hero3DPath)),
    heroFallbackExists: fs.existsSync(path.resolve(process.cwd(), heroFallbackPath)),

    loadHeroSection () {
      return loadVueComponent(heroSectionPath)
    },
    loadHero3D () {
      return loadVueComponent(hero3DPath)
    },
    loadHeroFallback () {
      return loadVueComponent(heroFallbackPath)
    }
  }
}

/**
 * AST & Contract Inspector for WebGL Context Loss & Restoration Lifecycle
 * Inspects parsed Vue SFC script content for standard WebGL context restoration compliance.
 */
function inspectWebGLContextLifecycle (scriptContent) {
  if (!scriptContent) return { valid: false, details: 'Missing script content' }

  const hasContextLost = /addEventListener\s*\(\s*['"]webglcontextlost['"]/i.test(scriptContent) ||
                         /['"]webglcontextlost['"]/.test(scriptContent)
  const hasPreventDefault = /preventDefault\s*\(\s*\)/i.test(scriptContent)
  const hasCancelAnim = /cancelAnimationFrame/i.test(scriptContent) || /isContextLost/i.test(scriptContent)
  const hasContextRestored = /addEventListener\s*\(\s*['"]webglcontextrestored['"]/i.test(scriptContent) ||
                            /['"]webglcontextrestored['"]/.test(scriptContent)
  const hasLoopResume = /requestAnimationFrame/i.test(scriptContent) ||
                        /animate\s*\(\s*\)/i.test(scriptContent) ||
                        /initScene\s*\(\s*\)/i.test(scriptContent)
  const hasListenerRemoval = /removeEventListener/i.test(scriptContent)

  return {
    valid: hasContextLost && hasPreventDefault && hasCancelAnim && hasContextRestored && hasLoopResume && hasListenerRemoval,
    hasContextLost,
    hasPreventDefault,
    hasCancelAnim,
    hasContextRestored,
    hasLoopResume,
    hasListenerRemoval
  }
}

module.exports = {
  hasWebGLDetection,
  hasFallbackWiring,
  hasThreeLifecycleCleanup,
  hasReducedMotionSupport,
  createMockWebGLContext,
  inspectHeroArchitecture,
  inspectWebGLContextLifecycle
}
