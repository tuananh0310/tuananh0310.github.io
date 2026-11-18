/**
 * src/utils/webgl.js
 * Bulletproof WebGL capability detector.
 * Supports WebGL 1.0 / experimental-webgl with safe GPU context cleanup.
 */

export function isWebGLAvailable () {
  if (typeof window === 'undefined') {
    return false
  }

  if (!window.WebGLRenderingContext) {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      return false
    }

    // Clean up test context to avoid exhausting browser context limits
    const loseContext = gl.getExtension('WEBGL_lose_context')
    if (loseContext && typeof loseContext.loseContext === 'function') {
      loseContext.loseContext()
    }

    return true
  } catch (e) {
    return false
  }
}
