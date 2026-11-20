<template>
  <v-app :dark="goDark" :data-theme="goDark ? 'dark' : 'light'" class="portfolio-app-root">
    <!-- 1. Full-Width Sticky Glassmorphic Navbar -->
    <TheNavbar
      :is-dark="goDark"
      :go-dark="goDark"
      @toggle-theme="toggleTheme"
    />

    <!-- 2. Main Content Wrapper (Without constricting v-container) -->
    <v-content class="app-content-wrapper">
      <main role="main" class="main-page-flow">
        <transition
          name="router-animation"
          mode="out-in"
          enter-active-class="animated fadeIn fast"
          leave-active-class="animated fadeOut faster"
        >
          <!-- Preserves component tree across theme changes; NO :key binding -->
          <router-view :is-dark="goDark" />
        </transition>
      </main>
    </v-content>

    <!-- 3. Full-Width Modern Footer -->
    <TheFooter />
  </v-app>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: "Le Xuan Tuan Anh's Senior Backend & Platform Portfolio" },
      { charset: 'utf-8' },
      { property: 'og:title', content: 'Le Xuan Tuan Anh | Senior Backend & Platform Engineer' },
      { property: 'og:site_name', content: 'Le Xuan Tuan Anh' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://tuananh0310.github.io/' },
      { property: 'og:image', content: 'https://i.imgur.com/Dcz2PGx.jpg' },
      { property: 'og:description', content: 'Senior Backend Engineer with 5 years experience in distributed systems, Kubernetes, and AWS.' }
    ]
  },
  components: {
    TheNavbar,
    TheFooter
  },
  data () {
    return {
      goDark: true
    }
  },
  created () {
    this.syncTheme()
  },
  mounted () {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme')
      if (savedTheme === 'light') {
        this.goDark = false
      } else if (savedTheme === 'dark') {
        this.goDark = true
      }
    } catch (e) {
      // Ignore localStorage access failures
    }
    this.syncTheme()
  },
  methods: {
    toggleTheme () {
      this.goDark = !this.goDark
      this.syncTheme()
    },
    updateTheme (updatedTheme) {
      if (typeof updatedTheme === 'boolean') {
        this.goDark = updatedTheme
      } else {
        this.goDark = !this.goDark
      }
      this.syncTheme()
    },
    syncTheme () {
      const themeName = this.goDark ? 'dark' : 'light'
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', themeName)
        if (this.goDark) {
          document.documentElement.classList.add('theme--dark')
          document.documentElement.classList.remove('theme--light')
        } else {
          document.documentElement.classList.add('theme--light')
          document.documentElement.classList.remove('theme--dark')
        }
      }
      try {
        localStorage.setItem('portfolio-theme', themeName)
      } catch (e) {
        // Ignore storage errors in sandboxed environments
      }
    }
  }
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";

.portfolio-app-root {
  background-color: var(--bg-canvas) !important;
  color: var(--text-primary) !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content-wrapper {
  padding: 0 !important;
  width: 100%;
  max-width: 100% !important;
  flex: 1 0 auto;
}

.main-page-flow {
  width: 100%;
  max-width: 100%;
  position: relative;
}
</style>
