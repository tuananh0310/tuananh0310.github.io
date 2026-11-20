<template>
  <div class="hero-fallback-container" :class="{ 'reduced-motion': reducedMotion }">
    <!-- Ambient Radial Glow Backdrop -->
    <div class="fallback-glow-backdrop" aria-hidden="true" />

    <!-- Glowing Cyber Orb Structure -->
    <div class="cyber-orb-wrapper">
      <!-- Outer Rotating Gradient Ring -->
      <div class="cyber-ring-outer" aria-hidden="true" />

      <!-- Middle Counter-Rotating Techno Orbital Ring -->
      <div class="techno-ring-middle" aria-hidden="true" />

      <!-- Inner Glass Avatar Mask -->
      <div class="avatar-frame">
        <img
          :src="currentAvatarUrl"
          :alt="identityName + ' - Senior Backend & Platform Engineer'"
          class="avatar-image"
          loading="eager"
          decoding="async"
          @error="handleAvatarError"
        />
        <!-- Monogram Fallback if both remote and local images fail -->
        <div v-if="avatarFailedBoth" class="avatar-monogram" aria-hidden="true">
          <span>LA</span>
        </div>
      </div>
    </div>

    <!-- Floating Tech Satellites / Badges -->
    <!-- Badge 1: Kubernetes & Platform -->
    <div class="tech-badge badge-k8s" role="img" aria-label="Kubernetes Platform">
      <div class="badge-icon-wrap k8s-color">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.2l7.8 4.3-3.1 1.7-4.7-2.6V4.2zm-1 3.4v3.4l-4.7 2.6-3.1-1.7L11 7.6zm-7 7.7v-4.5l3 1.7v4.5l-3-1.7zm8 4.5l-7.8-4.3 3.1-1.7 4.7 2.6v3.4zm1-3.4v-3.4l4.7-2.6 3.1 1.7-7.8 4.3zm7-7.7l-3-1.7v-4.5l3 1.7v4.5z" />
        </svg>
      </div>
      <span class="badge-text">Kubernetes / K8s</span>
    </div>

    <!-- Badge 2: AWS Cloud Architecture -->
    <div class="tech-badge badge-aws" role="img" aria-label="AWS Solutions Architect">
      <div class="badge-icon-wrap aws-color">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      </div>
      <span class="badge-text">AWS Solutions Architect</span>
    </div>

    <!-- Badge 3: Go & Distributed Systems -->
    <div class="tech-badge badge-go" role="img" aria-label="Go & High Concurrency">
      <div class="badge-icon-wrap go-color">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
      <span class="badge-text">Go &amp; Distributed</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroFallback',
  props: {
    avatarUrl: {
      type: String,
      default: 'https://i.postimg.cc/Qjw5Vq48/SUN68591.jpg'
    },
    avatarFallbackUrl: {
      type: String,
      default: '/_SUN68591.JPG'
    },
    identityName: {
      type: String,
      default: 'Le Xuan Tuan Anh'
    },
    reducedMotion: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentAvatarUrl: this.avatarUrl,
      avatarFailedBoth: false
    }
  },
  watch: {
    avatarUrl (newVal) {
      this.currentAvatarUrl = newVal
      this.avatarFailedBoth = false
    }
  },
  methods: {
    handleAvatarError () {
      if (this.currentAvatarUrl !== this.avatarFallbackUrl && this.avatarFallbackUrl) {
        // Switch to local static avatar
        this.currentAvatarUrl = this.avatarFallbackUrl
      } else {
        // Both primary and fallback failed, show monogram
        this.avatarFailedBoth = true
      }
    }
  }
}
</script>

<style scoped>
.hero-fallback-container {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 auto;
}

/* Ambient Halo */
.fallback-glow-backdrop {
  position: absolute;
  width: 320px;
  height: 320px;
  background: radial-gradient(
    circle,
    var(--accent-primary-glow, rgba(0, 230, 118, 0.25)) 0%,
    var(--accent-secondary-glow, rgba(56, 189, 248, 0.15)) 50%,
    transparent 75%
  );
  filter: blur(40px);
  pointer-events: none;
  z-index: 1;
}

/* Cyber Orb Container */
.cyber-orb-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* Outer Conic Cyber Ring */
.cyber-ring-outer {
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--accent-primary, #00E676),
    var(--accent-secondary, #38BDF8),
    transparent 65%,
    var(--accent-primary, #00E676)
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  animation: orb-spin 14s linear infinite;
  opacity: 0.85;
}

/* Middle Techno Dashed Orbital Ring */
.techno-ring-middle {
  position: absolute;
  top: -24px;
  left: -24px;
  right: -24px;
  bottom: -24px;
  border-radius: 50%;
  border: 1.5px dashed var(--border-glow, rgba(0, 230, 118, 0.35));
  animation: orb-spin-reverse 24s linear infinite;
  opacity: 0.65;
}

/* Avatar Frame */
.avatar-frame {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-primary, #00E676);
  box-shadow: var(--shadow-card, 0 10px 30px -10px rgba(0, 0, 0, 0.5)),
              0 0 25px var(--accent-primary-glow, rgba(0, 230, 118, 0.3));
  background: var(--bg-surface-elevated, #1E293B);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.4s ease;
}

.avatar-image:hover {
  transform: scale(1.04);
}

.avatar-monogram {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, monospace);
  font-size: 3rem;
  font-weight: 800;
  color: var(--accent-primary, #00E676);
  background: var(--bg-surface-elevated, #1E293B);
}

/* Floating Tech Badges (Glassmorphic Satellites) */
.tech-badge {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-full, 9999px);
  background: var(--bg-surface-glass, rgba(15, 23, 42, 0.75));
  backdrop-filter: var(--glass-blur, blur(16px));
  -webkit-backdrop-filter: var(--glass-blur, blur(16px));
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.12));
  box-shadow: var(--shadow-card, 0 10px 25px -5px rgba(0, 0, 0, 0.4));
  font-size: 0.8125rem;
  font-family: var(--font-mono, monospace);
  font-weight: 500;
  color: var(--text-primary, #F8FAFC);
  z-index: 3;
  user-select: none;
  white-space: nowrap;
}

.badge-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.k8s-color { color: #326CE5; }
.aws-color { color: #FF9900; }
.go-color { color: #00ACD7; }

/* Badge Positions & Animations */
.badge-k8s {
  top: 8%;
  right: -2%;
  animation: float-satellite-1 5s ease-in-out infinite alternate;
}

.badge-aws {
  bottom: 12%;
  left: -4%;
  animation: float-satellite-2 6s ease-in-out infinite alternate;
}

.badge-go {
  bottom: 6%;
  right: 2%;
  animation: float-satellite-3 5.5s ease-in-out infinite alternate;
}

/* Keyframe Animations */
@keyframes orb-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orb-spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes float-satellite-1 {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes float-satellite-2 {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(10px) rotate(-1deg); }
}

@keyframes float-satellite-3 {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-8px) rotate(1.5deg); }
}

/* Narrow Viewport Safety (<=768px, <=480px, and <=320px) */
@media (max-width: 768px) {
  .badge-k8s {
    right: 0%;
  }

  .badge-aws {
    left: 0%;
  }

  .badge-go {
    right: 0%;
  }
}

@media (max-width: 480px) {
  .hero-fallback-container {
    max-width: 100%;
    height: 340px;
  }

  .cyber-orb-wrapper {
    width: 220px;
    height: 220px;
  }

  .avatar-frame {
    width: 195px;
    height: 195px;
  }

  .tech-badge {
    padding: 0.35rem 0.65rem;
    font-size: 0.725rem;
  }

  .badge-k8s {
    top: 4%;
    right: 0%;
  }

  .badge-aws {
    bottom: 16%;
    left: 0%;
  }

  .badge-go {
    bottom: 2%;
    right: 0%;
  }
}

@media (max-width: 320px) {
  .hero-fallback-container {
    height: 300px;
  }

  .cyber-orb-wrapper {
    width: 180px;
    height: 180px;
  }

  .avatar-frame {
    width: 160px;
    height: 160px;
  }

  .tech-badge {
    display: none;
  }
}

/* Reduced Motion Override */
.reduced-motion .cyber-ring-outer,
.reduced-motion .techno-ring-middle,
.reduced-motion .tech-badge {
  animation: none !important;
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .cyber-ring-outer,
  .techno-ring-middle,
  .tech-badge {
    animation: none !important;
    transform: none !important;
  }
  .avatar-image:hover {
    transform: none !important;
  }
}
</style>
