<template>
  <section id="experience" class="experience-section section-wrapper">
    <div class="glass-container">
      <!-- Section Header -->
      <div class="section-header text-center mb-10">
        <span class="tag-pill tag-pill--emerald mb-3">Track Record</span>
        <h2 class="section-title">
          <span>Work</span>
          <span class="text-accent-gradient"> Experience</span>
        </h2>
        <p class="section-subtitle">
          Chronological engineering timeline across enterprise platforms, cloud migrations, and high-load production systems.
        </p>
      </div>

      <!-- Timeline Rail -->
      <div class="timeline-container">
        <div class="timeline-rail" aria-hidden="true" />

        <div
          v-for="(exp, index) in experiences"
          :key="exp.company + index"
          class="timeline-item"
          :class="{ 'is-current': isCurrentRole(exp) }"
        >
          <!-- Timeline Node Marker -->
          <div
            class="timeline-node"
            :class="{ 'is-active': isCurrentRole(exp) }"
            aria-hidden="true"
          >
            <span class="node-inner" />
          </div>

          <!-- Timeline Card -->
          <div
            class="glass-card glass-card-hover timeline-card"
            :class="{ 'glow-border-emerald is-current-card': isCurrentRole(exp) }"
          >
            <!-- Card Header -->
            <div class="timeline-card-header mb-3">
              <div class="timeline-role-meta">
                <span v-if="isCurrentRole(exp)" class="status-beacon-pill mb-2">
                  <span class="status-beacon-dot" />
                  Present Role
                </span>
                <span v-else class="tag-pill tag-pill--sky mb-2">{{ exp.period }}</span>
                <h3 class="timeline-company">{{ exp.company }}</h3>
                <div class="timeline-role text-accent-gradient">{{ exp.role }}</div>
                <div class="timeline-location text-muted">{{ exp.location }}</div>
              </div>
              <div v-if="isCurrentRole(exp)" class="timeline-period-badge">
                <span class="tag-pill tag-pill--emerald font-mono">{{ exp.period }}</span>
              </div>
            </div>

            <!-- Scope -->
            <p v-if="exp.scope" class="timeline-scope mb-3">
              <strong>Scope:</strong> {{ exp.scope }}
            </p>

            <!-- Highlights List -->
            <ul v-if="exp.highlights && exp.highlights.length" class="timeline-highlights mb-4">
              <li
                v-for="(highlight, hIndex) in exp.highlights"
                :key="hIndex"
                class="timeline-highlight-item"
              >
                {{ highlight }}
              </li>
            </ul>

            <!-- Tech Stack Tags Container (Wrap-enabled for >15 tags) -->
            <div class="timeline-tech-tags">
              <span
                v-for="tag in exp.tech"
                :key="tag"
                class="tag-pill"
                :class="{ 'tag-pill--emerald': isCurrentRole(exp) }"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioData, experiences } from '@/data/portfolioData'

export default {
  name: 'ExperienceSection',
  data () {
    return {
      portfolioData,
      experiences: experiences || []
    }
  },
  methods: {
    isCurrentRole (exp) {
      if (!exp || !exp.period) return false
      return exp.period.toLowerCase().includes('present')
    }
  }
}
</script>

<style scoped>
.timeline-container {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 0;
}
.timeline-rail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 24px;
  width: 2px;
  background: linear-gradient(180deg, var(--accent-primary, #00E676) 0%, var(--accent-secondary, #38BDF8) 100%);
  opacity: 0.35;
}
.timeline-item {
  position: relative;
  display: flex;
  margin-bottom: 2.5rem;
}
.timeline-node {
  position: absolute;
  left: 17px;
  top: 24px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-canvas, #0a0f1d);
  border: 2px solid var(--accent-secondary, #38BDF8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.timeline-node.is-active {
  border-color: var(--accent-primary, #00E676);
  box-shadow: 0 0 12px var(--accent-primary, #00E676);
}
.node-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-secondary, #38BDF8);
}
.timeline-node.is-active .node-inner {
  background: var(--accent-primary, #00E676);
}
.timeline-card {
  margin-left: 56px;
  width: 100%;
  padding: 1.75rem;
}
.timeline-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.timeline-company {
  font-size: var(--fs-h3, 1.35rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.25rem 0;
}
.timeline-role {
  font-size: var(--fs-body, 0.95rem);
  font-weight: 600;
}
.timeline-location {
  font-size: var(--fs-xs, 0.75rem);
}
.timeline-scope {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-secondary);
  border-left: 2px solid var(--accent-primary, #00E676);
  padding-left: 0.75rem;
}
.timeline-highlights {
  padding-left: 1.25rem;
  margin: 0;
}
.timeline-highlight-item {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-secondary);
  line-height: var(--lh-relaxed, 1.6);
  margin-bottom: 0.5rem;
}
.timeline-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.text-accent-gradient {
  background: var(--accent-gradient, linear-gradient(135deg, #00E676 0%, #38BDF8 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (max-width: 768px) {
  .timeline-rail {
    left: 12px;
  }
  .timeline-node {
    left: 5px;
  }
  .timeline-card {
    margin-left: 32px;
    padding: 1.25rem;
  }
}
@media (max-width: 480px) {
  .timeline-card {
    margin-left: 28px;
    padding: 1rem;
  }
  .timeline-highlights {
    padding-left: 1rem;
  }
}
@media (max-width: 320px) {
  .timeline-card {
    margin-left: 24px;
    padding: 0.875rem;
  }
}
</style>
