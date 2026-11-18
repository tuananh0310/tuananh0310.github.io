<template>
  <header
    class="glass-nav"
    :class="{ 'is-scrolled': isScrolled }"
    role="banner"
  >
    <div class="glass-container navbar-inner">
      <!-- 1. Brand Monogram & Title -->
      <a
        href="#hero"
        class="brand-link"
        aria-label="Le Xuan Tuan Anh Portfolio - Back to top"
        @click.prevent="scrollTo('#hero')"
      >
        <div class="brand-monogram" aria-hidden="true">
          <span class="monogram-bracket">[</span>
          <span class="monogram-text">LA</span>
          <span class="monogram-bracket">]</span>
        </div>
        <div class="brand-info">
          <span class="brand-title">Le Xuan Tuan Anh</span>
          <span class="brand-subtitle hidden-xs-only">Backend &amp; Platform</span>
        </div>
      </a>

      <!-- 2. Live Status Beacon (Desktop/Tablet) -->
      <div class="navbar-beacon-wrap hidden-sm-and-down">
        <span class="status-beacon-pill" role="status" aria-live="polite">
          <span class="status-beacon-dot" aria-hidden="true" />
          <span class="beacon-label">Open to Senior Roles</span>
        </span>
      </div>

      <!-- 3. Desktop Navigation Links -->
      <nav class="navbar-links hidden-sm-and-down" aria-label="Section navigation">
        <a
          v-for="link in desktopNavLinks"
          :key="link.id"
          :href="link.target"
          class="navbar-link"
          :class="{ 'is-active': activeSection === link.id }"
          @click.prevent="scrollTo(link.target)"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- 4. Quick Actions: CV Download, Theme Toggle, Mobile Hamburger -->
      <div class="navbar-actions">
        <!-- CV Download Button -->
        <a
          :href="resumePdfUrl"
          download="Le-Xuan-Tuan-Anh-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-glass-outline btn-download-cv hidden-xs-only"
          aria-label="Download CV (PDF)"
        >
          <svg
            class="btn-icon"
            viewBox="0 0 24 24"
            width="15"
            height="15"
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

        <!-- Animated Theme Toggle -->
        <button
          type="button"
          class="btn-theme-toggle"
          :aria-label="currentDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
          :title="currentDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
          @click="toggleTheme"
        >
          <transition name="theme-rotate" mode="out-in">
            <i
              v-if="currentDark"
              key="sun"
              class="fas fa-sun theme-icon sun-icon"
              aria-hidden="true"
            />
            <i
              v-else
              key="moon"
              class="fas fa-moon theme-icon moon-icon"
              aria-hidden="true"
            />
          </transition>
        </button>

        <!-- Mobile Hamburger Button -->
        <button
          type="button"
          class="btn-hamburger hidden-md-and-up"
          aria-label="Toggle navigation drawer"
          :aria-expanded="drawer ? 'true' : 'false'"
          @click="drawer = !drawer"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner" :class="{ 'is-active': drawer }" />
          </span>
        </button>
      </div>
    </div>

    <!-- 5. Mobile Slide-Over Drawer Sheet -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
      width="290"
      class="glass-drawer mobile-nav-drawer"
      :dark="currentDark"
      @keydown.esc="drawer = false"
    >
      <div class="drawer-header pa-4">
        <div class="drawer-brand">
          <span class="monogram-bracket">[</span>
          <span class="monogram-text">LA</span>
          <span class="monogram-bracket">]</span>
          <span class="drawer-title pl-2">Le Xuan Tuan Anh</span>
        </div>
        <button
          type="button"
          class="drawer-close-btn"
          aria-label="Close navigation menu"
          @click="drawer = false"
        >
          <i class="fas fa-times" aria-hidden="true" />
        </button>
      </div>

      <div class="drawer-status px-4 pb-3">
        <span class="status-beacon-pill">
          <span class="status-beacon-dot" aria-hidden="true" />
          <span class="beacon-label">Open to Senior Roles</span>
        </span>
      </div>

      <v-divider class="drawer-divider" />

      <v-list class="drawer-nav-list py-2" dense>
        <v-list-tile
          v-for="item in allNavLinks"
          :key="item.id"
          class="drawer-nav-item"
          @click="navigateTo(item.target)"
        >
          <v-list-tile-action>
            <i :class="item.icon" class="drawer-tile-icon" aria-hidden="true" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="drawer-tile-title">
              {{ item.label }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider class="drawer-divider my-2" />

      <div class="drawer-actions pa-4">
        <a
          :href="resumePdfUrl"
          download="Le-Xuan-Tuan-Anh-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary-gradient drawer-cv-btn mb-3"
          @click="drawer = false"
        >
          <svg
            class="btn-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
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

        <div class="drawer-socials mt-3">
          <a
            :href="contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="drawer-social-btn"
            aria-label="LinkedIn Profile"
          >
            <i class="fab fa-linkedin-in" aria-hidden="true" />
          </a>
          <a
            :href="'mailto:' + contact.email"
            class="drawer-social-btn"
            aria-label="Send Email"
          >
            <i class="fas fa-envelope" aria-hidden="true" />
          </a>
        </div>
      </div>
    </v-navigation-drawer>
  </header>
</template>

<script>
import { portfolioData } from '@/data/portfolioData'

export default {
  name: 'TheNavbar',
  props: {
    isDark: {
      type: Boolean,
      default: true
    },
    goDark: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      drawer: false,
      isScrolled: false,
      activeSection: 'hero',
      headerOffset: 68,
      navLinks: [
        { id: 'hero', label: 'Home', target: '#hero', icon: 'fas fa-home' },
        { id: 'about', label: 'About', target: '#about', icon: 'fas fa-user-circle' },
        { id: 'experience', label: 'Experience', target: '#experience', icon: 'fas fa-briefcase' },
        { id: 'projects', label: 'Projects', target: '#projects', icon: 'fas fa-code-branch' },
        { id: 'skills', label: 'Skills', target: '#skills', icon: 'fas fa-layer-group' },
        { id: 'contact', label: 'Contact', target: '#contact', icon: 'fas fa-paper-plane' }
      ]
    }
  },
  computed: {
    currentDark () {
      if (typeof this.isDark === 'boolean') {
        return this.isDark
      }
      return this.goDark
    },
    desktopNavLinks () {
      return this.navLinks.filter(l => l.id !== 'hero')
    },
    allNavLinks () {
      return this.navLinks
    },
    resumePdfUrl () {
      return (portfolioData && portfolioData.identity && portfolioData.identity.resumePdfUrl) || '/le-xuan-tuan-anh-cv.pdf'
    },
    contact () {
      return (portfolioData && portfolioData.contact) || {}
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
      window.addEventListener('keydown', this.handleKeydown)
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('keydown', this.handleKeydown)
    }
  },
  methods: {
    toggleTheme () {
      const nextTheme = !this.currentDark
      this.$emit('toggle-theme', nextTheme)
      this.$emit('changeTheme', nextTheme)
    },
    scrollTo (target) {
      if (this.drawer) {
        this.drawer = false
      }
      if (this.$route && this.$route.path !== '/') {
        this.$router.push({ path: '/', hash: target })
        return
      }
      const el = document.querySelector(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        if (typeof history !== 'undefined' && history.pushState) {
          history.pushState(null, null, target)
        } else if (typeof window !== 'undefined') {
          window.location.hash = target
        }
      }
    },
    navigateTo (target) {
      this.scrollTo(target)
      this.drawer = false
    },
    handleScroll () {
      if (typeof window === 'undefined') return
      this.isScrolled = window.pageYOffset > 20
      const scrollPos = window.pageYOffset + this.headerOffset + 40
      const sections = ['contact', 'skills', 'projects', 'experience', 'about', 'hero']
      for (let i = 0; i < sections.length; i++) {
        const id = sections[i]
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          this.activeSection = id
          break
        }
      }
    },
    handleKeydown (e) {
      if (e.key === 'Escape' && this.drawer) {
        this.drawer = false
      }
    }
  }
}
</script>

<style scoped>
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  gap: 1.5rem;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  transition: opacity 0.2s ease;
}

.brand-link:hover {
  opacity: 0.9;
}

.brand-monogram {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono, monospace);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.monogram-bracket {
  color: var(--accent-primary, #00E676);
}

.monogram-text {
  color: var(--text-primary);
  margin: 0 1px;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-primary);
}

.brand-subtitle {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-family: var(--font-mono, monospace);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-sm, 6px);
  position: relative;
  transition: color 0.2s ease;
}

.navbar-link:hover,
.navbar-link.is-active {
  color: var(--text-primary);
}

.navbar-link.is-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0.5rem;
  right: 0.5rem;
  height: 2px;
  background: var(--accent-primary, #00E676);
  border-radius: var(--radius-full, 9999px);
  box-shadow: 0 0 8px var(--accent-primary, #00E676);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-download-cv {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.95rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-full, 9999px);
  text-decoration: none;
}

.btn-icon {
  flex-shrink: 0;
}

.btn-theme-toggle {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-theme-toggle:hover {
  color: var(--text-primary);
  border-color: var(--border-glow, rgba(0, 230, 118, 0.35));
  background: rgba(0, 230, 118, 0.08);
}

.theme-icon.sun-icon {
  color: #FBBF24;
}

.theme-icon.moon-icon {
  color: #38BDF8;
}

.btn-hamburger {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  color: var(--text-primary);
}

.hamburger-box {
  width: 20px;
  height: 14px;
  position: relative;
  display: inline-block;
}

.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 20px;
  height: 2px;
  background-color: currentColor;
  border-radius: 2px;
  position: absolute;
  left: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hamburger-inner {
  top: 6px;
}

.hamburger-inner::before {
  content: '';
  top: -6px;
}

.hamburger-inner::after {
  content: '';
  bottom: -6px;
}

.hamburger-inner.is-active {
  transform: rotate(45deg);
}

.hamburger-inner.is-active::before {
  opacity: 0;
}

.hamburger-inner.is-active::after {
  transform: rotate(-90deg) translate(6px, 0);
}

/* Mobile Drawer Styling */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-brand {
  display: flex;
  align-items: center;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  font-size: 0.95rem;
}

.drawer-title {
  font-family: var(--font-sans, sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
}

.drawer-close-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.15rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.drawer-close-btn:hover {
  color: var(--text-primary);
}

.drawer-divider {
  border-color: var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
}

.drawer-tile-icon {
  color: var(--accent-primary, #00E676);
  font-size: 1rem;
}

.drawer-tile-title {
  font-size: 0.9rem;
  font-weight: 500;
}

.drawer-cv-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-md, 8px);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
}

.drawer-socials {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.drawer-social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.drawer-social-btn:hover {
  color: var(--accent-primary, #00E676);
  border-color: var(--accent-primary, #00E676);
}

@media (max-width: 768px) {
  .navbar-inner {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
