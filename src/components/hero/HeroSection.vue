<template>
  <section id="hero" class="hero-section section-wrapper">
    <!-- Ambient Background Lighting -->
    <div class="hero-ambient-glow" aria-hidden="true" />

    <div class="glass-container hero-container">
      <div class="hero-grid">
        <!-- ========================================================= -->
        <!-- LEFT COLUMN: Narrative, Typography & Action CTAs          -->
        <!-- ========================================================= -->
        <div class="hero-content">
          <!-- Status Beacon Pill -->
          <div class="hero-status-wrapper">
            <span class="status-beacon-pill" role="status" aria-live="polite">
              <span class="status-beacon-dot" aria-hidden="true" />
              Available for Backend &amp; Platform Opportunities
            </span>
          </div>

          <!-- Semantic H1 Name with High-Impact Gradient Typography -->
          <h1 class="hero-title">
            <span class="hero-greeting">Hi, I'm</span>
            <span class="hero-name-gradient">{{ identity.fullName || 'Le Xuan Tuan Anh' }}</span>
          </h1>

          <!-- Headline & Typewriter Roles -->
          <div class="hero-headline-wrapper">
            <div class="hero-headline-label">
              {{ identity.headline }}
            </div>
            <div class="hero-typewriter" aria-live="polite">
              <span class="typewriter-prefix" aria-hidden="true">&gt;&nbsp;</span>
              <span class="typewriter-text">{{ displayedRole }}</span>
              <span
                v-if="!prefersReducedMotion"
                class="typewriter-cursor"
                aria-hidden="true"
              />
            </div>
          </div>

          <!-- Concise Architectural Bio -->
          <p class="hero-bio">
            {{ identity.bio }}
          </p>

          <!-- Action CTAs -->
          <div class="hero-actions">
            <!-- Primary CTA: Anchor Scroll to Projects -->
            <a
              href="#projects"
              class="btn-primary-gradient hero-cta-btn"
              aria-label="View Projects Section"
            >
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>View Projects</span>
            </a>

            <!-- Secondary CTA: Direct PDF Resume Download -->
            <a
              :href="identity.resumePdfUrl || '/le-xuan-tuan-anh-cv.pdf'"
              download
              target="_blank"
              rel="noopener noreferrer"
              class="btn-glass-outline hero-cta-btn"
              aria-label="Download CV (PDF)"
            >
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download CV</span>
            </a>

            <!-- Tertiary CTA: Anchor Scroll to Contact -->
            <a
              href="#contact"
              class="btn-glass-outline hero-cta-btn"
              aria-label="Navigate to Contact Section"
            >
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Contact Me</span>
            </a>
          </div>

          <!-- Social Quick Links -->
          <div class="hero-socials">
            <a
              :href="contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              aria-label="LinkedIn Profile"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              :href="'mailto:' + contact.email"
              class="social-icon-btn"
              aria-label="Send Email"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- RIGHT COLUMN: 3D WebGL Canvas OR High-Fidelity Fallback   -->
        <!-- ========================================================= -->
        <div class="hero-visual" aria-live="polite">
          <hero-3-d-canvas
            v-if="webglAvailable && !webglFailed"
            :reduced-motion="prefersReducedMotion"
            :is-dark="isDark"
            @webgl-failed="handleWebGLFailed"
          />
          <hero-fallback
            v-else
            :avatar-url="identity.avatarUrl"
            :avatar-fallback-url="identity.avatarFallbackUrl"
            :identity-name="identity.fullName"
            :reduced-motion="prefersReducedMotion"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioData } from '@/data/portfolioData'
import { isWebGLAvailable } from '@/utils/webgl'
import HeroFallback from './HeroFallback.vue'

export default {
  name: 'HeroSection',
  props: {
    isDark: {
      type: Boolean,
      default: true
    }
  },
  components: {
    HeroFallback,
    // Dynamically lazy-load 3D Canvas only if WebGL is supported
    Hero3DCanvas: () => import(/* webpackChunkName: "hero-3d" */ './Hero3DCanvas.vue')
  },
  data () {
    return {
      identity: portfolioData.identity,
      contact: portfolioData.contact,
      webglAvailable: true,
      webglFailed: false,
      prefersReducedMotion: false,
      mediaQueryList: null,

      // Typewriter roles
      roles: [
        'Senior Backend Engineer',
        'Kubernetes & Cloud Platform',
        'Go & Distributed Systems',
        'AWS Solutions Architect',
        'ArgoCD & GitOps Automation'
      ],
      currentRoleIndex: 0,
      displayedRole: '',
      isDeleting: false,
      typingSpeed: 70,
      deletingSpeed: 35,
      pauseDelay: 2200,
      typewriterTimer: null
    }
  },
  created () {
    // Proactive Tier-1 WebGL check
    this.webglAvailable = isWebGLAvailable()
  },
  mounted () {
    this.initReducedMotion()
    this.initTypewriter()
  },
  beforeDestroy () {
    this.cleanupTypewriter()
    this.cleanupReducedMotion()
  },
  methods: {
    handleWebGLFailed () {
      console.warn('[HeroSection] WebGL rendering failed. Switching to HeroFallback component.')
      this.webglFailed = true
    },
    initReducedMotion () {
      if (typeof window !== 'undefined' && window.matchMedia) {
        this.mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)')
        this.prefersReducedMotion = this.mediaQueryList.matches

        this.handleMotionChange = (e) => {
          this.prefersReducedMotion = e.matches
          if (this.prefersReducedMotion) {
            this.cleanupTypewriter()
            this.displayedRole = this.roles[0]
          } else {
            this.initTypewriter()
          }
        }

        if (this.mediaQueryList.addEventListener) {
          this.mediaQueryList.addEventListener('change', this.handleMotionChange)
        } else if (this.mediaQueryList.addListener) {
          this.mediaQueryList.addListener(this.handleMotionChange)
        }
      }
    },
    cleanupReducedMotion () {
      if (this.mediaQueryList && this.handleMotionChange) {
        if (this.mediaQueryList.removeEventListener) {
          this.mediaQueryList.removeEventListener('change', this.handleMotionChange)
        } else if (this.mediaQueryList.removeListener) {
          this.mediaQueryList.removeListener(this.handleMotionChange)
        }
      }
    },
    initTypewriter () {
      if (this.prefersReducedMotion) {
        this.displayedRole = this.roles[0]
        return
      }
      this.tickTypewriter()
    },
    tickTypewriter () {
      const fullText = this.roles[this.currentRoleIndex]

      if (!this.isDeleting) {
        this.displayedRole = fullText.substring(0, this.displayedRole.length + 1)
        if (this.displayedRole === fullText) {
          this.typewriterTimer = setTimeout(() => {
            this.isDeleting = true
            this.tickTypewriter()
          }, this.pauseDelay)
          return
        }
      } else {
        this.displayedRole = fullText.substring(0, this.displayedRole.length - 1)
        if (this.displayedRole === '') {
          this.isDeleting = false
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length
          this.typewriterTimer = setTimeout(() => {
            this.tickTypewriter()
          }, 350)
          return
        }
      }

      const nextDelay = this.isDeleting ? this.deletingSpeed : this.typingSpeed
      this.typewriterTimer = setTimeout(this.tickTypewriter, nextDelay)
    },
    cleanupTypewriter () {
      if (this.typewriterTimer) {
        clearTimeout(this.typewriterTimer)
        this.typewriterTimer = null
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: calc(100vh - var(--header-height, 68px));
  min-height: calc(100dvh - var(--header-height, 68px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  overflow: hidden;
  box-sizing: border-box;
}

.hero-ambient-glow {
  position: absolute;
  top: 15%;
  left: 10%;
  width: 50vw;
  height: 50vw;
  max-width: 600px;
  max-height: 600px;
  background: var(--hero-mesh-1, radial-gradient(circle, rgba(0, 230, 118, 0.12) 0%, transparent 60%));
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

/* Left Column */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 620px;
}

.hero-status-wrapper {
  margin-bottom: 0.25rem;
}

.hero-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: var(--lh-tight, 1.15);
  letter-spacing: var(--ls-tighter, -0.035em);
}

.hero-greeting {
  font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
  font-weight: var(--fw-medium, 500);
  color: var(--text-secondary, #94A3B8);
  margin-bottom: 0.25rem;
}

.hero-name-gradient {
  font-size: var(--fs-display, clamp(2.5rem, 5vw + 1rem, 4.25rem));
  font-weight: var(--fw-extrabold, 800);
  background: var(--accent-gradient, linear-gradient(135deg, #00E676 0%, #38BDF8 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-headline-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.hero-headline-label {
  font-size: var(--fs-h4, 1.15rem);
  font-weight: var(--fw-semibold, 600);
  color: var(--text-primary, #F8FAFC);
}

.hero-typewriter {
  font-family: var(--font-mono, monospace);
  font-size: var(--fs-h4, 1.1rem);
  font-weight: var(--fw-medium, 500);
  color: var(--accent-primary, #00E676);
  min-height: 1.6em;
  display: inline-flex;
  align-items: center;
}

.typewriter-prefix {
  color: var(--accent-secondary, #38BDF8);
  font-weight: 700;
}

.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1.15em;
  background-color: var(--accent-primary, #00E676);
  margin-left: 4px;
  vertical-align: middle;
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-bio {
  font-size: var(--fs-body-lg, 1.1rem);
  line-height: var(--lh-relaxed, 1.65);
  color: var(--text-secondary, #94A3B8);
  margin: 0;
}

/* Action CTAs */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.hero-cta-btn {
  text-decoration: none;
}

.btn-icon {
  flex-shrink: 0;
}

/* Social Quick Links */
.hero-socials {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-top: 0.75rem;
}

.social-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: var(--radius-full, 9999px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
  color: var(--text-secondary, #94A3B8);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.social-icon-btn:hover {
  color: var(--accent-primary, #00E676);
  border-color: var(--border-glow, rgba(0, 230, 118, 0.35));
  background: rgba(0, 230, 118, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 0 16px -2px var(--accent-primary-glow, rgba(0, 230, 118, 0.25));
}

/* Right Column */
.hero-visual {
  position: relative;
  width: 100%;
  min-height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Tablet Layout (<=1024px) */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-content {
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }

  .hero-title {
    align-items: center;
  }

  .hero-headline-wrapper {
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-socials {
    justify-content: center;
  }

  .hero-visual {
    min-height: 380px;
  }
}

/* Mobile Layout (<=768px) */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
    min-height: auto;
  }

  .hero-grid {
    gap: 2rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .hero-cta-btn {
    width: 100%;
  }

  .hero-visual {
    min-height: 320px;
    max-height: 360px;
  }
}

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none !important;
    opacity: 1 !important;
  }

  .social-icon-btn:hover {
    transform: none !important;
  }
}
</style>
