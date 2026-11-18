<template>
  <section id="projects" class="projects-section section-wrapper">
    <div class="glass-container">
      <!-- Section Header -->
      <div class="section-header text-center mb-8">
        <span class="tag-pill tag-pill--emerald mb-3">Portfolio</span>
        <h2 class="section-title">
          <span>Featured</span>
          <span class="text-accent-gradient"> Projects</span>
        </h2>
        <p class="section-subtitle">
          10 enterprise platforms, cloud GitOps environments, and microservices architectures built for production scale.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="project-filter-tabs mb-8" role="tablist">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          class="filter-tab-btn"
          :class="{ 'is-active': activeFilter === tab.key }"
          role="tab"
          :aria-selected="activeFilter === tab.key"
          @click="setFilter(tab.key)"
        >
          <span>{{ tab.label }}</span>
          <span class="tab-count-pill">{{ getCategoryCount(tab.key) }}</span>
        </button>
      </div>

      <!-- Projects Grid -->
      <!-- ProjectCard handles card uniform heights, and conditional demoUrl action link -->
      <div v-if="filteredProjects.length > 0" class="glass-grid glass-grid-cols-3 projects-cards-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Empty State Fallback -->
      <div v-else class="glass-panel text-center py-10">
        <p class="empty-text mb-4">No projects found in this category.</p>
        <button class="btn-primary-gradient" @click="setFilter('all')">
          View All Projects
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioData, projects } from '@/data/portfolioData'
import ProjectCard from './ProjectCard.vue'

export default {
  name: 'ProjectsSection',
  components: {
    ProjectCard
  },
  data () {
    return {
      portfolioData,
      projects: projects || [],
      activeFilter: 'all',
      filterTabs: [
        { key: 'all', label: 'All Projects' },
        { key: 'enterprise', label: 'Enterprise Platforms' },
        { key: 'cloud', label: 'Cloud & GitOps' },
        { key: 'microservices', label: 'Microservices & Open Source' }
      ]
    }
  },
  computed: {
    filteredProjects () {
      if (this.activeFilter === 'all') {
        return this.projects
      }
      return this.projects.filter(project => {
        const cat = (project.category || '').toLowerCase()
        return cat.includes(this.activeFilter.toLowerCase())
      })
    }
  },
  methods: {
    setFilter (categoryKey) {
      this.activeFilter = categoryKey
    },
    getCategoryCount (categoryKey) {
      if (categoryKey === 'all') {
        return this.projects.length
      }
      return this.projects.filter(p => (p.category || '').toLowerCase().includes(categoryKey.toLowerCase())).length
    }
  }
}
</script>

<style scoped>
.project-filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
@media (max-width: 600px) {
  .project-filter-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-left: -1rem;
    margin-right: -1rem;
    padding: 0.25rem 1rem;
    gap: 0.5rem;
  }
  .project-filter-tabs::-webkit-scrollbar {
    display: none;
  }
  .filter-tab-btn {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0.45rem 1rem;
  }
}
.filter-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: var(--radius-full, 9999px);
  color: var(--text-secondary);
  font-family: var(--font-sans, sans-serif);
  font-size: var(--fs-sm, 0.875rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}
.filter-tab-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-glow, rgba(0, 230, 118, 0.35));
  background: rgba(0, 230, 118, 0.06);
}
.filter-tab-btn.is-active {
  color: var(--accent-primary, #00E676);
  border-color: var(--accent-primary, #00E676);
  background: var(--accent-primary-dim, rgba(0, 230, 118, 0.12));
  box-shadow: 0 0 16px -2px var(--accent-primary-glow, rgba(0, 230, 118, 0.3));
}
.tab-count-pill {
  font-family: var(--font-mono, monospace);
  font-size: var(--fs-xs, 0.75rem);
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-full, 9999px);
  background: rgba(255, 255, 255, 0.08);
}
.filter-tab-btn.is-active .tab-count-pill {
  background: var(--accent-primary, #00E676);
  color: var(--text-inverse, #0a0f1d);
}
.empty-text {
  color: var(--text-secondary);
  font-size: var(--fs-body, 0.95rem);
}
.text-accent-gradient {
  background: var(--accent-gradient, linear-gradient(135deg, #00E676 0%, #38BDF8 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
