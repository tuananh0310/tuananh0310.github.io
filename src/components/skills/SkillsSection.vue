<template>
  <section id="skills" class="skills-section section-wrapper">
    <div class="glass-container">
      <!-- Section Header -->
      <div class="section-header text-center mb-10">
        <span class="tag-pill tag-pill--emerald mb-3">Expertise &amp; Credentials</span>
        <h2 class="section-title">
          <span>Skills, Certifications &amp;</span>
          <span class="text-accent-gradient"> Services</span>
        </h2>
        <p class="section-subtitle">
          Comprehensive technical matrix spanning backend languages, cloud infrastructure, SRE observability, certifications, and consulting domains.
        </p>
      </div>

      <!-- 1. Skills Matrix Grid -->
      <div class="skills-matrix-wrapper mb-12">
        <h3 class="subsection-title mb-6">Categorized Technical Matrix</h3>
        <div class="glass-grid glass-grid-cols-2">
          <div
            v-for="cat in skills"
            :key="cat.category"
            class="glass-card glass-card-hover skill-card"
          >
            <div class="skill-category-header mb-3">
              <h4 class="skill-category-title">{{ cat.category }}</h4>
              <span class="skill-count text-muted font-mono">{{ cat.items.length }} skills</span>
            </div>
            <div class="skill-pills-container">
              <span
                v-for="item in cat.items"
                :key="item"
                class="tag-pill skill-pill"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Certifications & Education Grid -->
      <div class="credentials-wrapper mb-12">
        <h3 class="subsection-title mb-6">AWS Certifications &amp; Academic Degree</h3>
        <div class="glass-grid glass-grid-cols-3">
          <!-- AWS Certification Cards -->
          <div
            v-for="cert in certifications"
            :key="cert.name"
            class="glass-card glass-card-hover cert-card"
          >
            <div class="cert-badge-wrapper mb-3">
              <img
                v-if="cert.badgeUrl && !badgeErrors[cert.name]"
                :src="cert.badgeUrl"
                :alt="cert.name"
                class="cert-badge-img"
                loading="lazy"
                @error="onBadgeError(cert.name)"
              >
              <div v-else class="cert-badge-fallback">
                <span class="fallback-icon">☁️</span>
              </div>
            </div>
            <h4 class="cert-name mb-2">{{ cert.name }}</h4>
            <div class="cert-issuer text-accent-gradient font-weight-bold mb-1">{{ cert.issuer }}</div>
            <div class="cert-period text-muted font-mono mb-4">{{ cert.period }}</div>
            <a
              v-if="cert.verifyUrl"
              :href="cert.verifyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-glass-outline btn-sm cert-verify-btn"
            >
              Verify on Credly
            </a>
          </div>

          <!-- Education Card (PTIT) -->
          <div
            v-for="edu in education"
            :key="edu.institution"
            class="glass-card glass-card-hover edu-card"
          >
            <div class="edu-badge-wrapper mb-3">
              <span class="edu-icon">🎓</span>
            </div>
            <h4 class="edu-degree mb-2">{{ edu.degree }}</h4>
            <div class="edu-institution text-accent-gradient font-weight-bold mb-1">{{ edu.institution }}</div>
            <div class="edu-period text-muted font-mono mb-2">{{ edu.period }}</div>
            <div class="edu-meta mb-2">
              <span class="tag-pill tag-pill--emerald">Classification: {{ edu.classification }}</span>
            </div>
            <div class="edu-location text-muted">{{ edu.location }}</div>
          </div>
        </div>
      </div>

      <!-- 3. Engineering Services Offerings -->
      <div class="services-wrapper mb-12">
        <h3 class="subsection-title mb-6">Core Engineering Services</h3>
        <div class="glass-grid glass-grid-cols-4">
          <div
            v-for="service in services"
            :key="service.title"
            class="glass-card glass-card-hover service-card"
          >
            <div class="service-icon mb-3">
              <i :class="service.icon" class="text-accent-gradient" />
            </div>
            <h4 class="service-title mb-2">{{ service.title }}</h4>
            <p class="service-desc text-secondary">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- 4. Industry Business Domains -->
      <div class="domains-wrapper">
        <h3 class="subsection-title mb-6">Industry Business Domains</h3>
        <div class="glass-grid glass-grid-cols-3 domain-grid-cols">
          <div
            v-for="domain in domains"
            :key="domain.title"
            class="glass-card glass-card-hover domain-card"
          >
            <h4 class="domain-title text-accent-gradient mb-2">{{ domain.title }}</h4>
            <p class="domain-desc text-secondary">{{ domain.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioData, skills, certifications, education, services, domains } from '@/data/portfolioData'

export default {
  name: 'SkillsSection',
  data () {
    return {
      portfolioData,
      skills: skills || [],
      certifications: certifications || [],
      education: education || [],
      services: services || [],
      domains: domains || [],
      badgeErrors: {}
    }
  },
  methods: {
    onBadgeError (certName) {
      this.$set(this.badgeErrors, certName, true)
    }
  }
}
</script>

<style scoped>
.subsection-title {
  font-size: var(--fs-h3, 1.35rem);
  font-weight: 700;
  color: var(--text-primary);
  border-left: 3px solid var(--accent-primary, #00E676);
  padding-left: 0.75rem;
}
.skill-card {
  padding: 1.5rem;
}
.skill-category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.skill-category-title {
  font-size: var(--fs-h4, 1.15rem);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.skill-count {
  font-size: var(--fs-xs, 0.75rem);
}
.skill-pills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
}
.skill-pills-container .skill-pill {
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: left;
}
.cert-card,
.edu-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.cert-badge-wrapper,
.edu-badge-wrapper {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cert-badge-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cert-badge-fallback,
.edu-icon {
  font-size: 3rem;
}
.cert-name,
.edu-degree {
  font-size: var(--fs-h4, 1.15rem);
  font-weight: 700;
  color: var(--text-primary);
}
.cert-issuer,
.edu-institution {
  font-size: var(--fs-sm, 0.875rem);
}
.cert-verify-btn {
  margin-top: auto;
}
.service-card {
  padding: 1.5rem;
}
.service-icon {
  font-size: 2rem;
}
.service-title {
  font-size: var(--fs-h4, 1.15rem);
  font-weight: 700;
  color: var(--text-primary);
}
.service-desc {
  font-size: var(--fs-sm, 0.875rem);
  line-height: var(--lh-normal, 1.4);
}
.domain-card {
  padding: 1.5rem;
}
.domain-title {
  font-size: var(--fs-h4, 1.15rem);
  font-weight: 700;
}
.domain-desc {
  font-size: var(--fs-sm, 0.875rem);
  line-height: var(--lh-relaxed, 1.6);
}
.btn-sm {
  padding: 0.4rem 1rem !important;
  font-size: var(--fs-xs, 0.75rem) !important;
  min-height: 36px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .btn-sm {
    min-height: 44px !important;
  }
}
.text-accent-gradient {
  background: var(--accent-gradient, linear-gradient(135deg, #00E676 0%, #38BDF8 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
