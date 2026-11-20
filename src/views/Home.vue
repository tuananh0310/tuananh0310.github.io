<template>
  <div class="home-spa-view">
    <!-- Section 1: Hero with 3D WebGL / Fallback -->
    <HeroSection id="hero" :is-dark="isDark" />

    <!-- Section 2: About & Engineering Philosophy Bento -->
    <AboutSection id="about" />

    <!-- Section 3: Work Experience Timeline -->
    <ExperienceSection id="experience" />

    <!-- Section 4: Projects Showcase Grid -->
    <ProjectsSection id="projects" />

    <!-- Section 5: Skills, Certifications & Services -->
    <SkillsSection id="skills" />

    <!-- Section 6: Contact Hub & Form -->
    <ContactSection id="contact" />
  </div>
</template>

<script>
import HeroSection from '@/components/hero/HeroSection.vue'
import AboutSection from '@/components/about/AboutSection.vue'
import ExperienceSection from '@/components/experience/ExperienceSection.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import SkillsSection from '@/components/skills/SkillsSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'

export default {
  name: 'Home',
  props: {
    isDark: {
      type: Boolean,
      default: true
    }
  },
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [
      { name: 'description', content: 'Senior Backend & Platform Engineer portfolio of Le Xuan Tuan Anh' }
    ]
  },
  components: {
    HeroSection,
    AboutSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    ContactSection
  }
}
</script>

<style scoped>
.home-spa-view {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}
</style>
