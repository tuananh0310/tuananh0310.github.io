<template>
  <section id="about" class="about-section section-wrapper">
    <div class="glass-container">
      <!-- Section Header -->
      <div class="section-header text-center mb-10">
        <span class="tag-pill tag-pill--emerald mb-3">About Me</span>
        <h2 class="section-title">
          <span>Engineering Journey &amp;</span>
          <span class="text-accent-gradient"> Philosophy</span>
        </h2>
        <p class="section-subtitle">
          Senior Backend &amp; Platform Engineer with 5 years of experience building resilient distributed systems, clean architecture, and observability-first platforms.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="glass-bento-grid">
        <!-- Tile 1: Engineering Background & PTIT Degree -->
        <div class="glass-col-7">
          <div class="glass-card glass-card-hover bento-card h-full">
            <div class="bento-badge mb-3">
              <span class="tag-pill tag-pill--emerald">Background &amp; Education</span>
            </div>
            <h3 class="bento-title mb-3">Distributed Systems &amp; Platform Engineering</h3>
            <p class="bento-text mb-4">
              Formal engineering background from <strong>Posts and Telecommunications Institute of Technology (PTIT)</strong> (Engineering in Computer Electronics, 2017 - 2022, Classification: Good). Over the past 5 years, progressed from core software engineering to leading backend architecture and SRE initiatives.
            </p>
            <p class="bento-text mb-4">
              {{ identity.bio }}
            </p>
            <div class="bento-tech-pills">
              <span v-for="tag in backgroundTags" :key="tag" class="tag-pill">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- Tile 2: Quantitative Stats Counter -->
        <div class="glass-col-5">
          <div class="glass-card glass-card-hover bento-card stats-bento-card h-full">
            <div class="bento-badge mb-3">
              <span class="tag-pill tag-pill--sky">Track Record</span>
            </div>
            <h3 class="bento-title mb-4">Impact by the Numbers</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number text-accent-gradient">{{ (stats && stats.yearsOfExperience) || 5 }}+</div>
                <div class="stat-label">Years in Production</div>
              </div>
              <div class="stat-item">
                <div class="stat-number text-accent-gradient">{{ (stats && stats.awsCertifications) || 2 }}x</div>
                <div class="stat-label">AWS Certifications</div>
              </div>
              <div class="stat-item">
                <div class="stat-number text-accent-gradient">{{ (stats && stats.enterpriseSystems) || 8 }}+</div>
                <div class="stat-label">Enterprise Systems</div>
              </div>
              <div class="stat-item">
                <div class="stat-number text-accent-gradient">Rated A</div>
                <div class="stat-label">FCI Q1 2026 Review</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tile 3: Clean Architecture & SRE Philosophy -->
        <div class="glass-col-6">
          <div class="glass-card glass-card-hover bento-card h-full">
            <div class="bento-badge mb-3">
              <span class="tag-pill tag-pill--emerald">Engineering Tenets</span>
            </div>
            <h3 class="bento-title mb-3">Clean Architecture &amp; SRE Philosophy</h3>
            <div class="philosophy-list">
              <div class="philosophy-item mb-3">
                <strong class="philosophy-headline">Modular Domain Boundaries:</strong>
                <p class="philosophy-desc">Strict separation of concerns via Hexagonal/Clean Architecture, Controller-Service-Repository patterns, and SOLID principles.</p>
              </div>
              <div class="philosophy-item mb-3">
                <strong class="philosophy-headline">Observability-First Reliability:</strong>
                <p class="philosophy-desc">Actionable SLOs, automated Prometheus metrics, Loki log streams, Jaeger distributed tracing, and Sentry error alerting.</p>
              </div>
              <div class="philosophy-item">
                <strong class="philosophy-headline">Zero-Trust &amp; DevSecOps:</strong>
                <p class="philosophy-desc">ArgoCD GitOps deployment, non-root Kubernetes containers, Vault-backed secret injection, and automated vulnerability scans.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tile 4: Principal Engineer Roadmap -->
        <div class="glass-col-6">
          <div class="glass-card glass-card-hover bento-card h-full">
            <div class="bento-badge mb-3">
              <span class="tag-pill tag-pill--warning">Career Vision</span>
            </div>
            <h3 class="bento-title mb-3">Principal Engineer Roadmap (3-5 Years)</h3>
            <p class="bento-text mb-4">
              {{ (identity && identity.careerGoal) || 'In the next 3-5 years, aim to grow into a Principal Engineer role - driving system architecture and reliability strategy (SLOs, observability, incident response) across teams, while mentoring senior engineers and shaping long-term technology direction.' }}
            </p>
            <div class="roadmap-milestones">
              <div class="roadmap-step mb-2">
                <span class="step-num">01</span>
                <span>Cross-team platform &amp; multi-cloud architecture governance</span>
              </div>
              <div class="roadmap-step mb-2">
                <span class="step-num">02</span>
                <span>Enterprise site reliability, error budgets &amp; DR runbooks</span>
              </div>
              <div class="roadmap-step">
                <span class="step-num">03</span>
                <span>Engineering culture, code excellence &amp; technical mentorship</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tile 5: Honors & Recognitions -->
        <div v-if="achievements && achievements.length" class="glass-col-12">
          <div class="glass-card glass-card-hover bento-card">
            <div class="bento-badge mb-3">
              <span class="tag-pill tag-pill--emerald">Recognition</span>
            </div>
            <h3 class="bento-title mb-4">Awards &amp; Professional Ratings</h3>
            <div class="achievements-grid">
              <div v-for="item in achievements" :key="item.title" class="achievement-card">
                <div class="achievement-year text-accent-gradient">{{ item.year }}</div>
                <div class="achievement-title">{{ item.title }}</div>
                <div class="achievement-org text-secondary">{{ item.organization }}</div>
                <div class="achievement-desc text-muted">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioData, identity, stats, achievements, education } from '@/data/portfolioData'

export default {
  name: 'AboutSection',
  data () {
    return {
      portfolioData,
      identity: identity || {},
      stats: stats || {},
      achievements: achievements || [],
      education: education || [],
      backgroundTags: [
        'Kubernetes', 'ArgoCD', 'AWS', 'Laravel 12',
        'NestJS', 'Go', 'Redis', 'MySQL 8.0',
        'Prometheus', 'Grafana', 'Docker', 'Vault'
      ]
    }
  }
}
</script>

<style scoped>
.bento-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}
.bento-title {
  font-size: var(--fs-h3, 1.35rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: var(--lh-snug, 1.25);
}
.bento-text {
  font-size: var(--fs-body, 0.95rem);
  color: var(--text-secondary);
  line-height: var(--lh-relaxed, 1.6);
}
.bento-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: auto;
}
.stat-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: var(--radius-md, 8px);
  text-align: center;
}
.stat-number {
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  font-weight: 800;
  line-height: 1.1;
  font-family: var(--font-mono, monospace);
}
.stat-label {
  font-size: var(--fs-xs, 0.75rem);
  color: var(--text-secondary);
  margin-top: 0.25rem;
}
.philosophy-headline {
  color: var(--text-primary);
  font-size: var(--fs-sm, 0.875rem);
}
.philosophy-desc {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-secondary);
  margin: 0.25rem 0 0;
}
.roadmap-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-secondary);
}
.step-num {
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  color: var(--accent-primary, #00E676);
  background: var(--accent-primary-dim, rgba(0, 230, 118, 0.12));
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm, 6px);
}
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media (max-width: 1024px) {
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
.achievement-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: var(--radius-md, 8px);
}
.achievement-year {
  font-family: var(--font-mono, monospace);
  font-size: var(--fs-xs, 0.75rem);
  font-weight: 700;
}
.achievement-title {
  font-size: var(--fs-sm, 0.875rem);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.25rem 0;
}
.achievement-org {
  font-size: var(--fs-xs, 0.75rem);
  margin-bottom: 0.25rem;
}
.achievement-desc {
  font-size: var(--fs-xs, 0.75rem);
  line-height: var(--lh-snug, 1.25);
}
.text-accent-gradient {
  background: var(--accent-gradient, linear-gradient(135deg, #00E676 0%, #38BDF8 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.h-full {
  height: 100%;
}

@media (max-width: 768px) {
  .bento-card {
    padding: 1.25rem;
  }
}

@media (max-width: 340px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
