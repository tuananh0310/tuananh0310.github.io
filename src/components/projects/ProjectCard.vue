<template>
  <div class="glass-card glass-card-hover project-card">
    <!-- Body -->
    <div class="project-card-body">
      <div class="project-meta-badges mb-3">
        <span class="tag-pill tag-pill--emerald">{{ project.categoryLabel || project.category }}</span>
        <span class="tag-pill tag-pill--sky font-mono">{{ project.period }}</span>
      </div>
      <h3 class="project-title">{{ project.title }}</h3>
      <div class="project-role text-accent-gradient mb-2">{{ project.role }}</div>
      <p class="project-summary mb-3">{{ project.summary }}</p>

      <!-- Highlights -->
      <ul v-if="project.highlights && project.highlights.length" class="project-highlights mb-3">
        <li
          v-for="(hl, i) in project.highlights.slice(0, 3)"
          :key="i"
          class="highlight-bullet"
        >
          {{ hl }}
        </li>
      </ul>

      <!-- Tech Tags -->
      <div class="project-tech-tags mb-4">
        <span
          v-for="tag in (project.tech || []).slice(0, 8)"
          :key="tag"
          class="tag-pill"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Action Links -->
      <div v-if="project.demoUrl" class="project-actions">
        <a
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary-gradient btn-sm"
        >
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.project-meta-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}
.project-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.project-title {
  font-size: var(--fs-h3, 1.35rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}
.project-role {
  font-size: var(--fs-sm, 0.875rem);
  font-weight: 600;
}
.project-summary {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-secondary);
  line-height: var(--lh-normal, 1.4);
}
.project-highlights {
  padding-left: 1.1rem;
  margin: 0;
}
.highlight-bullet {
  font-size: var(--fs-xs, 0.75rem);
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}
.project-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
}
.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
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
