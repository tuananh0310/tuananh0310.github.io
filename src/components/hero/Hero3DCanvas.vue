<template>
  <div
    ref="canvasContainer"
    class="hero-3d-container"
    aria-label="Interactive 3D Distributed Cloud Platform Mesh Visualization"
    role="img"
  >
    <canvas
      ref="threeCanvas"
      class="hero-3d-canvas"
    />
    <div class="hero-3d-vignette" aria-hidden="true" />
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'Hero3DCanvas',
  props: {
    reducedMotion: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isWebGLSupported: true,
      isVisible: true,
      isInteracting: false
    }
  },
  watch: {
    reducedMotion (val) {
      if (val) {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId)
          this.animationFrameId = null
        }
        this.renderStaticFrame()
      } else if (!this.animationFrameId && this.isVisible) {
        if (this.clock) this.clock.start()
        this.animate()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initScene()
    })
  },
  beforeDestroy () {
    this.teardownScene()
  },
  methods: {
    initScene () {
      const container = this.$refs.canvasContainer
      const canvas = this.$refs.threeCanvas

      if (!container || !canvas) return

      // 1. Initialize Scene, Camera, and Fog
      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.FogExp2(0x0B0F19, 0.035)

      const initialWidth = container.clientWidth || 400
      const initialHeight = container.clientHeight || 400
      const isMobile = initialWidth <= 768

      this.camera = new THREE.PerspectiveCamera(
        45,
        initialWidth / initialHeight,
        0.1,
        1000
      )
      this.camera.position.set(0, 0, isMobile ? 18.0 : 14.0)

      // 2. Initialize WebGLRenderer with Context Loss Detection
      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        })
      } catch (err) {
        this.isWebGLSupported = false
        this.$emit('webgl-failed', err)
        return
      }

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      this.renderer.setPixelRatio(pixelRatio)
      this.renderer.setSize(initialWidth, initialHeight, false)

      // 3. Build 3D Objects
      this.clock = new THREE.Clock()
      this.buildLighting()
      this.buildCyberCore()
      this.buildOrbitingNodes(isMobile)
      this.buildDynamicMeshLines(isMobile)
      this.buildBackgroundParticles(isMobile)

      // 4. Setup Interaction State
      this.mouse = {
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0
      }
      this.drag = {
        isDragging: false,
        startX: 0,
        startY: 0,
        velocityX: 0,
        velocityY: 0,
        baseRotationY: 0,
        baseRotationX: 0,
        damping: 0.92,
        sensitivity: 0.005
      }

      // 5. Attach Event Listeners
      this.setupEventListeners(canvas, container)

      // 6. Start Animation Loop
      this.isAnimating = true
      if (this.isMotionReduced()) {
        this.renderStaticFrame()
      } else {
        this.animate()
      }
    },

    buildLighting () {
      const ambientLight = new THREE.AmbientLight(0x0F172A, 1.2)
      this.scene.add(ambientLight)

      const dirLight = new THREE.DirectionalLight(0x00E676, 1.4)
      dirLight.position.set(10, 15, 10)
      this.scene.add(dirLight)

      const pointLight = new THREE.PointLight(0x38BDF8, 1.8, 25)
      pointLight.position.set(-5, -5, 5)
      this.scene.add(pointLight)
    },

    buildCyberCore () {
      this.coreGroup = new THREE.Group()

      // Outer Wireframe Cage (Geodesic Dome / Cluster Shell)
      const outerGeo = new THREE.IcosahedronGeometry(2.3, 1)
      const wireframeGeo = new THREE.WireframeGeometry(outerGeo)
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x00E676,
        transparent: true,
        opacity: 0.65
      })
      this.outerWireframe = new THREE.LineSegments(wireframeGeo, wireMat)
      this.coreGroup.add(this.outerWireframe)

      // Core Vertex Points (Constellation Nodes)
      const pointsMat = new THREE.PointsMaterial({
        color: 0x00E676,
        size: 0.16,
        transparent: true,
        opacity: 0.9
      })
      this.corePoints = new THREE.Points(outerGeo, pointsMat)
      this.coreGroup.add(this.corePoints)

      // Inner Solid Core Polyhedron
      const innerGeo = new THREE.IcosahedronGeometry(1.6, 0)
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x0B1F2A,
        transparent: true,
        opacity: 0.75
      })
      this.innerCore = new THREE.Mesh(innerGeo, innerMat)
      this.coreGroup.add(this.innerCore)

      // Nested Kernel Octahedron (Workload Engine)
      const kernelGeo = new THREE.OctahedronGeometry(0.75, 0)
      const kernelMat = new THREE.MeshBasicMaterial({
        color: 0x38BDF8,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      })
      this.kernelMesh = new THREE.Mesh(kernelGeo, kernelMat)
      this.coreGroup.add(this.kernelMesh)

      this.scene.add(this.coreGroup)
    },

    buildOrbitingNodes (isMobile) {
      this.nodesGroup = new THREE.Group()
      this.nodeList = []

      const count = isMobile ? 5 : 8
      const nodeGeo = new THREE.SphereGeometry(0.18, 8, 8)

      // Color scheme: Emerald (Healthy), Sky Blue (Gateway), Amber (Canary)
      const colors = [
        0x00E676, 0x00E676, 0x38BDF8, 0x00E676,
        0x38BDF8, 0x00E676, 0xF59E0B, 0x00E676
      ]

      for (let i = 0; i < count; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.95
        })
        const mesh = new THREE.Mesh(nodeGeo, mat)

        const orbitRadius = 3.6 + (i % 3) * 0.7
        const inclination = (i * 0.45) - 0.9
        const speed = 0.5 + (i * 0.12)
        const phase = (i * Math.PI * 2) / count

        this.nodeList.push({
          mesh,
          orbitRadius,
          inclination,
          speed,
          phase,
          yOffsetAmp: 0.35 + (i * 0.08),
          position: new THREE.Vector3()
        })

        this.nodesGroup.add(mesh)
      }

      this.scene.add(this.nodesGroup)
    },

    buildDynamicMeshLines (isMobile) {
      const nodeCount = isMobile ? 5 : 8
      // Node-to-core lines + node-to-node proximity lines
      const maxLines = nodeCount + (nodeCount * (nodeCount - 1)) / 2
      const maxVertices = maxLines * 2

      this.linePositions = new Float32Array(maxVertices * 3)
      this.linesGeometry = new THREE.BufferGeometry()
      this.linesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(this.linePositions, 3)
      )
      this.linesGeometry.attributes.position.setUsage(THREE.DynamicDrawUsage)

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00E676,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      })

      this.meshLines = new THREE.LineSegments(this.linesGeometry, lineMat)
      this.scene.add(this.meshLines)
    },

    buildBackgroundParticles (isMobile) {
      const particleCount = isMobile ? 150 : 350
      const positions = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 36
        positions[i * 3 + 1] = (Math.random() - 0.5) * 28
        positions[i * 3 + 2] = (Math.random() - 0.5) * 32 - 5
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      // Procedural soft-glow canvas texture
      const texture = this.createParticleTexture()
      const mat = new THREE.PointsMaterial({
        size: 0.45,
        map: texture,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })

      this.particles = new THREE.Points(geo, mat)
      this.scene.add(this.particles)
    },

    createParticleTexture () {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.3, 'rgba(0, 230, 118, 0.8)')
      gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(canvas)
    },

    setupEventListeners (canvas, container) {
      // Mouse Parallax & Drag
      this.onPointerDownHandler = this.onPointerDown.bind(this)
      this.onPointerMoveHandler = this.onPointerMove.bind(this)
      this.onPointerUpHandler = this.onPointerUp.bind(this)

      canvas.addEventListener('pointerdown', this.onPointerDownHandler)
      window.addEventListener('pointermove', this.onPointerMoveHandler, { passive: true })
      window.addEventListener('pointerup', this.onPointerUpHandler, { passive: true })
      window.addEventListener('pointercancel', this.onPointerUpHandler, { passive: true })

      // Touch Events for gesture support
      this.onTouchStartHandler = this.onTouchStart.bind(this)
      this.onTouchMoveHandler = this.onTouchMove.bind(this)
      this.onTouchEndHandler = this.onTouchEnd.bind(this)

      canvas.addEventListener('touchstart', this.onTouchStartHandler, { passive: true })
      canvas.addEventListener('touchmove', this.onTouchMoveHandler, { passive: true })
      canvas.addEventListener('touchend', this.onTouchEndHandler, { passive: true })
      canvas.addEventListener('touchcancel', this.onTouchEndHandler, { passive: true })

      // WebGL Context Loss Handler
      this.onContextLostHandler = (event) => {
        if (event && typeof event.preventDefault === 'function') {
          event.preventDefault()
        }
        this.isWebGLSupported = false
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId)
          this.animationFrameId = null
        }
        this.$emit('webgl-failed', new Error('WebGL context lost'))
      }
      canvas.addEventListener('webglcontextlost', this.onContextLostHandler, false)

      // WebGL Context Restored Handler
      this.onContextRestoredHandler = () => {
        this.teardownScene()
        this.initScene()
      }
      canvas.addEventListener('webglcontextrestored', this.onContextRestoredHandler, false)

      // Container ResizeObserver
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver((entries) => {
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i]
            const width = entry.contentRect.width
            const height = entry.contentRect.height
            if (width > 0 && height > 0) {
              this.handleResize(width, height)
            }
          }
        })
        this.resizeObserver.observe(container)
      } else {
        this.onWindowResizeHandler = () => {
          if (container) {
            this.handleResize(container.clientWidth, container.clientHeight)
          }
        }
        window.addEventListener('resize', this.onWindowResizeHandler, { passive: true })
      }

      // IntersectionObserver (Auto-sleep when scrolled out of view)
      if (window.IntersectionObserver) {
        this.intersectionObserver = new IntersectionObserver(([entry]) => {
          this.isVisible = entry.isIntersecting
          if (this.isVisible && !this.isAnimating) {
            this.isAnimating = true
            if (this.clock) this.clock.start()
            this.animate()
          } else if (!this.isVisible && this.isAnimating) {
            this.isAnimating = false
            if (this.animationFrameId) {
              cancelAnimationFrame(this.animationFrameId)
              this.animationFrameId = null
            }
          }
        }, { threshold: 0.05 })
        this.intersectionObserver.observe(container)
      }

      // Reduced motion media query listener
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      this.onMotionChangeHandler = (e) => {
        this.$emit('motion-preference-changed', e.matches)
        if (this.isMotionReduced()) {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
          }
          this.renderStaticFrame()
        } else if (!this.animationFrameId && this.isVisible) {
          if (this.clock) this.clock.start()
          this.animate()
        }
      }
      if (this.motionQuery.addEventListener) {
        this.motionQuery.addEventListener('change', this.onMotionChangeHandler)
      } else if (this.motionQuery.addListener) {
        this.motionQuery.addListener(this.onMotionChangeHandler)
      }
    },

    isMotionReduced () {
      return this.reducedMotion || (this.motionQuery && this.motionQuery.matches)
    },

    onPointerDown (event) {
      if (!event || !Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return
      this.drag.isDragging = true
      this.drag.startX = event.clientX
      this.drag.startY = event.clientY
      this.drag.velocityX = 0
      this.drag.velocityY = 0
      if (!this.animationFrameId && this.isAnimating && this.isVisible) {
        if (this.clock) this.clock.start()
        this.animate()
      }
    },

    onPointerMove (event) {
      if (!event || !Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return

      const container = this.$refs.canvasContainer
      if (!container) return

      const rect = container.getBoundingClientRect()
      const rawX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const rawY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      this.mouse.targetX = Math.max(-1, Math.min(1, rawX))
      this.mouse.targetY = Math.max(-1, Math.min(1, rawY))

      if (this.drag.isDragging) {
        const deltaX = event.clientX - this.drag.startX
        const deltaY = event.clientY - this.drag.startY
        this.drag.startX = event.clientX
        this.drag.startY = event.clientY

        this.drag.velocityX = deltaX * this.drag.sensitivity
        this.drag.velocityY = deltaY * this.drag.sensitivity

        this.drag.baseRotationY += this.drag.velocityX
        this.drag.baseRotationX += this.drag.velocityY
      }
    },

    onPointerUp () {
      this.drag.isDragging = false
    },

    onTouchStart (event) {
      if (event.touches && event.touches.length === 1) {
        const touch = event.touches[0]
        if (!Number.isFinite(touch.clientX) || !Number.isFinite(touch.clientY)) return
        this.drag.isDragging = true
        this.drag.startX = touch.clientX
        this.drag.startY = touch.clientY
        this.drag.velocityX = 0
        this.drag.velocityY = 0
        if (!this.animationFrameId && this.isAnimating && this.isVisible) {
          if (this.clock) this.clock.start()
          this.animate()
        }
      }
    },

    onTouchMove (event) {
      if (!this.drag.isDragging || !event.touches || event.touches.length !== 1) return
      const touch = event.touches[0]
      if (!Number.isFinite(touch.clientX) || !Number.isFinite(touch.clientY)) return
      const deltaX = touch.clientX - this.drag.startX
      const deltaY = touch.clientY - this.drag.startY
      this.drag.startX = touch.clientX
      this.drag.startY = touch.clientY

      this.drag.velocityX = deltaX * this.drag.sensitivity
      this.drag.velocityY = deltaY * this.drag.sensitivity

      this.drag.baseRotationY += this.drag.velocityX
      this.drag.baseRotationX += this.drag.velocityY
    },

    onTouchEnd () {
      this.drag.isDragging = false
    },

    handleResize (width, height) {
      if (!this.camera || !this.renderer) return
      if (!width || !height || width <= 0 || height <= 0) return

      const isMobile = width <= 768
      this.camera.aspect = width / height
      this.camera.position.z = isMobile ? 18.0 : 14.0
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(width, height, false)
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      this.renderer.setPixelRatio(pixelRatio)

      if (this.isMotionReduced()) {
        this.renderStaticFrame()
      }
    },

    updateSceneObjects (elapsed) {
      // 1. Idle Breathing scale
      const breath = 1.0 + Math.sin(elapsed * 1.5) * 0.035
      this.coreGroup.scale.set(breath, breath, breath)

      // 2. Differential counter-rotations
      this.outerWireframe.rotation.y += 0.003
      this.outerWireframe.rotation.x -= 0.0015

      this.innerCore.rotation.y -= 0.005
      this.innerCore.rotation.z += 0.002

      this.kernelMesh.rotation.y += 0.012
      this.kernelMesh.rotation.x += 0.008

      // 3. Orbiting Nodes motion
      const isMobile = (this.$refs.canvasContainer && this.$refs.canvasContainer.clientWidth <= 768)
      let vertexIndex = 0

      for (let i = 0; i < this.nodeList.length; i++) {
        const item = this.nodeList[i]
        const angle = elapsed * item.speed + item.phase
        const x = Math.cos(angle) * item.orbitRadius
        const z = Math.sin(angle) * item.orbitRadius
        const y = Math.sin(elapsed * 1.2 + item.phase) * item.yOffsetAmp

        // Apply orbital inclination tilt
        const cosInc = Math.cos(item.inclination)
        const sinInc = Math.sin(item.inclination)
        const finalX = x
        const finalY = y * cosInc - z * sinInc
        const finalZ = y * sinInc + z * cosInc

        item.mesh.position.set(finalX, finalY, finalZ)
        item.position.set(finalX, finalY, finalZ)

        // Radial Line from Core (0, 0, 0) to Node
        this.linePositions[vertexIndex++] = 0
        this.linePositions[vertexIndex++] = 0
        this.linePositions[vertexIndex++] = 0
        this.linePositions[vertexIndex++] = finalX
        this.linePositions[vertexIndex++] = finalY
        this.linePositions[vertexIndex++] = finalZ
      }

      // 4. Proximity Links between adjacent nodes (desktop only)
      if (!isMobile) {
        const len = this.nodeList.length
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const posA = this.nodeList[i].position
            const posB = this.nodeList[j].position
            const dx = posA.x - posB.x
            const dy = posA.y - posB.y
            const dz = posA.z - posB.z
            const distSq = dx * dx + dy * dy + dz * dz

            if (distSq < 18.0) {
              this.linePositions[vertexIndex++] = posA.x
              this.linePositions[vertexIndex++] = posA.y
              this.linePositions[vertexIndex++] = posA.z
              this.linePositions[vertexIndex++] = posB.x
              this.linePositions[vertexIndex++] = posB.y
              this.linePositions[vertexIndex++] = posB.z
            }
          }
        }
      }

      this.linesGeometry.setDrawRange(0, vertexIndex / 3)
      this.linesGeometry.attributes.position.needsUpdate = true

      // 5. Background Particles Drift
      if (this.particles) {
        this.particles.rotation.y += 0.0006
        this.particles.rotation.x += 0.0003
      }
    },

    animate () {
      if (!this.isAnimating) return

      const reduced = this.isMotionReduced()
      if (reduced) {
        if (this.drag.isDragging || Math.abs(this.drag.velocityX) > 0.0001 || Math.abs(this.drag.velocityY) > 0.0001) {
          this.applyDragInertia()
          const rotY = this.drag.baseRotationY + this.mouse.currentX * 0.35
          const rotX = this.drag.baseRotationX - this.mouse.currentY * 0.25
          if (this.coreGroup) this.coreGroup.rotation.set(rotX, rotY, 0)
          if (this.nodesGroup) this.nodesGroup.rotation.set(rotX, rotY, 0)
          if (this.meshLines) this.meshLines.rotation.set(rotX, rotY, 0)
          this.renderFrame()
          this.animationFrameId = requestAnimationFrame(this.animate.bind(this))
        } else {
          this.animationFrameId = null
        }
        return
      }

      this.animationFrameId = requestAnimationFrame(this.animate.bind(this))

      const elapsed = this.clock ? this.clock.getElapsedTime() : 0

      // Mouse Parallax Lerp Damping
      this.mouse.currentX += (this.mouse.targetX - this.mouse.currentX) * 0.05
      this.mouse.currentY += (this.mouse.targetY - this.mouse.currentY) * 0.05

      // Inertia decay & idle spin
      this.applyDragInertia()
      if (!this.drag.isDragging) {
        this.drag.baseRotationY += 0.002
      }

      // Apply combined orientation to scene groups
      const rotY = this.drag.baseRotationY + this.mouse.currentX * 0.35
      const rotX = this.drag.baseRotationX - this.mouse.currentY * 0.25
      if (this.coreGroup) this.coreGroup.rotation.set(rotX, rotY, 0)
      if (this.nodesGroup) this.nodesGroup.rotation.set(rotX, rotY, 0)
      if (this.meshLines) this.meshLines.rotation.set(rotX, rotY, 0)

      this.updateSceneObjects(elapsed)
      this.renderFrame()
    },

    applyDragInertia () {
      if (!this.drag.isDragging) {
        this.drag.baseRotationY += this.drag.velocityX
        this.drag.baseRotationX += this.drag.velocityY
        this.drag.velocityX *= this.drag.damping
        this.drag.velocityY *= this.drag.damping

        if (Math.abs(this.drag.velocityX) < 0.0001) this.drag.velocityX = 0
        if (Math.abs(this.drag.velocityY) < 0.0001) this.drag.velocityY = 0
      }
    },

    renderFrame () {
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera)
      }
    },

    renderStaticFrame () {
      if (this.nodeList && this.nodeList.length > 0) {
        this.updateSceneObjects(0)
      }
      if (this.coreGroup) {
        this.coreGroup.scale.set(1, 1, 1)
      }
      this.renderFrame()
    },

    teardownScene () {
      // 1. Stop animation loop
      this.isAnimating = false
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }

      // 2. Disconnect Observers
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }

      // 3. Remove Event Listeners
      const canvas = this.$refs.threeCanvas
      if (canvas && this.onPointerDownHandler) {
        canvas.removeEventListener('pointerdown', this.onPointerDownHandler)
      }
      if (this.onPointerMoveHandler) {
        window.removeEventListener('pointermove', this.onPointerMoveHandler)
      }
      if (this.onPointerUpHandler) {
        window.removeEventListener('pointerup', this.onPointerUpHandler)
        window.removeEventListener('pointercancel', this.onPointerUpHandler)
      }
      if (canvas && this.onTouchStartHandler) {
        canvas.removeEventListener('touchstart', this.onTouchStartHandler)
        canvas.removeEventListener('touchmove', this.onTouchMoveHandler)
        canvas.removeEventListener('touchend', this.onTouchEndHandler)
        canvas.removeEventListener('touchcancel', this.onTouchEndHandler)
      }
      if (canvas && this.onContextLostHandler) {
        canvas.removeEventListener('webglcontextlost', this.onContextLostHandler)
      }
      if (canvas && this.onContextRestoredHandler) {
        canvas.removeEventListener('webglcontextrestored', this.onContextRestoredHandler)
      }
      if (this.onWindowResizeHandler) {
        window.removeEventListener('resize', this.onWindowResizeHandler)
      }
      if (this.motionQuery && this.onMotionChangeHandler) {
        if (this.motionQuery.removeEventListener) {
          this.motionQuery.removeEventListener('change', this.onMotionChangeHandler)
        } else if (this.motionQuery.removeListener) {
          this.motionQuery.removeListener(this.onMotionChangeHandler)
        }
      }

      // 4. Dispose Scene Graph Geometries, Materials, and Textures
      if (this.scene) {
        this.scene.traverse((obj) => {
          if (obj.geometry && typeof obj.geometry.dispose === 'function') {
            obj.geometry.dispose()
          }
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => this.disposeMaterial(mat))
            } else {
              this.disposeMaterial(obj.material)
            }
          }
        })
        while (this.scene.children.length > 0) {
          this.scene.remove(this.scene.children[0])
        }
      }

      // 5. Dispose WebGL Renderer and force context release
      if (this.renderer) {
        if (typeof this.renderer.dispose === 'function') {
          this.renderer.dispose()
        }
        if (typeof this.renderer.forceContextLoss === 'function') {
          this.renderer.forceContextLoss()
        }
        if (this.renderer.domElement) {
          this.renderer.domElement = null
        }
        this.renderer = null
      }

      // 6. Nullify all references
      this.scene = null
      this.camera = null
      this.clock = null
      this.coreGroup = null
      this.outerWireframe = null
      this.corePoints = null
      this.innerCore = null
      this.kernelMesh = null
      this.nodesGroup = null
      this.nodeList = []
      this.meshLines = null
      this.linesGeometry = null
      this.linePositions = null
      this.particles = null
    },

    disposeMaterial (material) {
      if (!material) return
      const textureProps = [
        'map', 'alphaMap', 'bumpMap', 'normalMap', 'displacementMap',
        'roughnessMap', 'metalnessMap', 'specularMap', 'envMap', 'lightMap', 'aoMap'
      ]
      for (let i = 0; i < textureProps.length; i++) {
        const prop = textureProps[i]
        if (material[prop] && typeof material[prop].dispose === 'function') {
          material[prop].dispose()
        }
      }
      if (typeof material.dispose === 'function') {
        material.dispose()
      }
    }
  }
}
</script>

<style scoped>
.hero-3d-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
  max-height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  cursor: grab;
}

.hero-3d-container:active {
  cursor: grabbing;
}

.hero-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
  outline: none;
  touch-action: pan-y;
}

.hero-3d-vignette {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    transparent 45%,
    rgba(11, 15, 25, 0.40) 80%,
    var(--bg-canvas, #0B0F19) 100%
  );
}

@media (max-width: 768px) {
  .hero-3d-container {
    min-height: 320px;
    max-height: 420px;
  }
}
</style>
