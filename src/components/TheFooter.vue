<template>
  <footer class="site-footer section-wrapper" role="contentinfo">
    <div class="glass-container footer-container">
      <div class="footer-grid">
        <!-- Col 1: Brand & Bio -->
        <div class="footer-col footer-col-brand">
          <a
            href="#hero"
            class="brand-link mb-3"
            aria-label="Back to top"
            @click.prevent="scrollToTop"
          >
            <div class="brand-monogram" aria-hidden="true">
              <span class="monogram-bracket">[</span>
              <span class="monogram-text">LA</span>
              <span class="monogram-bracket">]</span>
            </div>
            <span class="brand-title">Le Xuan Tuan Anh</span>
          </a>
          <p class="footer-tagline">
            Senior Backend &amp; Platform Engineer specializing in high-reliability distributed systems, Kubernetes, and AWS cloud architectures.
          </p>
        </div>

        <!-- Col 2: Section Navigation -->
        <div class="footer-col footer-col-links">
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-nav-list">
            <li v-for="link in navLinks" :key="link.target">
              <a
                :href="link.target"
                class="footer-nav-link"
                @click.prevent="scrollTo(link.target)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Channels & Back-to-Top -->
        <div class="footer-col footer-col-actions">
          <h4 class="footer-heading">Connect</h4>
          <div class="footer-socials mb-4">
            <a
              :href="contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-btn"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin-in" aria-hidden="true" />
            </a>
            <a
              :href="'mailto:' + contact.email"
              class="footer-social-btn"
              aria-label="Email"
            >
              <i class="fas fa-envelope" aria-hidden="true" />
            </a>
          </div>

          <!-- Smooth Back-to-Top Button -->
          <button
            type="button"
            class="btn-glass-outline btn-back-to-top"
            aria-label="Scroll back to top of page"
            @click="scrollToTop"
          >
            <span>Back to Top</span>
            <i class="fas fa-arrow-up ml-2" aria-hidden="true" />
          </button>
        </div>
      </div>

      <v-divider class="footer-divider my-4" />

      <!-- Bottom Bar: Tech Stack & Copyright -->
      <div class="footer-bottom">
        <div class="footer-tech-tag">
          <span class="tech-stack-badge">
            <i class="fab fa-vuejs mr-1" aria-hidden="true" />
            Crafted with Vue.js &amp; Three.js
          </span>
        </div>
        <div class="footer-copyright">
          &copy; {{ currentYear }} Le Xuan Tuan Anh. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { portfolioData } from '@/data/portfolioData'

export default {
  name: 'TheFooter',
  data () {
    return {
      currentYear: new Date().getFullYear(),
      navLinks: [
        { label: 'Home', target: '#hero' },
        { label: 'About', target: '#about' },
        { label: 'Experience', target: '#experience' },
        { label: 'Projects', target: '#projects' },
        { label: 'Skills', target: '#skills' },
        { label: 'Contact', target: '#contact' }
      ]
    }
  },
  computed: {
    contact () {
      return (portfolioData && portfolioData.contact) || {}
    }
  },
  methods: {
    scrollToTop () {
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },
    scrollTo (target) {
      if (this.$route && this.$route.path !== '/') {
        this.$router.push({ path: '/', hash: target })
        return
      }
      const el = document.querySelector(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  background: var(--bg-surface, rgba(17, 24, 39, 0.85));
  padding-top: 3.5rem;
  padding-bottom: 2rem;
  margin-top: auto;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  gap: 2.5rem;
}
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.1rem;
}
.brand-monogram {
  font-family: var(--font-mono, monospace);
  font-weight: 800;
  font-size: 1.25rem;
}
.monogram-bracket {
  color: var(--accent-primary, #00E676);
}
.monogram-text {
  color: var(--text-primary);
}
.brand-title {
  color: var(--text-primary);
}
.footer-tagline {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-secondary);
  line-height: var(--lh-relaxed, 1.6);
  max-width: 420px;
}
.footer-heading {
  font-size: var(--fs-sm, 0.875rem);
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: var(--ls-wider, 0.05em);
  margin-bottom: 1rem;
}
.footer-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.footer-nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--fs-sm, 0.875rem);
  transition: color 0.2s ease;
}
.footer-nav-link:hover {
  color: var(--accent-primary, #00E676);
}
.footer-socials {
  display: flex;
  gap: 0.75rem;
}
.footer-social-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
}
.footer-social-btn:hover {
  color: var(--accent-primary, #00E676);
  border-color: var(--accent-primary, #00E676);
  background: var(--accent-primary-dim, rgba(0, 230, 118, 0.12));
}
.btn-back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full, 9999px);
  font-size: var(--fs-xs, 0.75rem);
  font-weight: 600;
  cursor: pointer;
}
@media (max-width: 768px) {
  .btn-back-to-top {
    min-height: 44px !important;
  }
}
.footer-divider {
  border-color: var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: var(--fs-xs, 0.75rem);
  color: var(--text-muted);
}
.tech-stack-badge {
  display: inline-flex;
  align-items: center;
  color: var(--text-secondary);
}
</style>
