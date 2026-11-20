<template>
  <section id="contact" class="contact-section section-wrapper">
    <div class="glass-container">
      <!-- Section Header -->
      <div class="section-header text-center mb-10">
        <span class="tag-pill tag-pill--emerald mb-3">Get In Touch</span>
        <h2 class="section-title">
          <span>Let's</span>
          <span class="text-accent-gradient"> Connect</span>
        </h2>
        <p class="section-subtitle">
          Have an architectural challenge, platform opportunity, or engineering leadership role? Drop a message or reach out directly.
        </p>
      </div>

      <!-- Two-Column Contact Layout -->
      <div class="contact-grid">
        <!-- Column 1: Direct Contact Hub -->
        <div class="contact-info-col">
          <!-- Email Card with 1-Click Copy -->
          <div class="glass-card glass-card-hover contact-item-card mb-4">
            <div class="contact-item-icon">
              <i class="fas fa-envelope text-accent-gradient" />
            </div>
            <div class="contact-item-content">
              <div class="contact-label text-muted">Email Address</div>
              <a :href="'mailto:' + contact.email" class="contact-value font-mono">{{ contact.email }}</a>
            </div>
            <button
              type="button"
              class="btn-glass-outline btn-copy"
              :class="{ 'is-copied': copiedField === 'email' }"
              aria-label="Copy Email Address"
              @click="copyEmail"
            >
              <span>{{ copiedField === 'email' ? '✓ Copied' : 'Copy' }}</span>
            </button>
          </div>

          <!-- Phone Card with 1-Click Copy -->
          <div class="glass-card glass-card-hover contact-item-card mb-4">
            <div class="contact-item-icon">
              <i class="fas fa-phone text-accent-gradient" />
            </div>
            <div class="contact-item-content">
              <div class="contact-label text-muted">Phone / WhatsApp</div>
              <a :href="'tel:' + (contact.phoneRaw || contact.phone)" class="contact-value font-mono">{{ contact.phone }}</a>
            </div>
            <button
              type="button"
              class="btn-glass-outline btn-copy"
              :class="{ 'is-copied': copiedField === 'phone' }"
              aria-label="Copy Phone Number"
              @click="copyPhone"
            >
              <span>{{ copiedField === 'phone' ? '✓ Copied' : 'Copy' }}</span>
            </button>
          </div>

          <!-- Location & Live Hanoi Clock -->
          <div class="glass-card glass-card-hover contact-item-card mb-4">
            <div class="contact-item-icon">
              <i class="fas fa-map-marker-alt text-accent-gradient" />
            </div>
            <div class="contact-item-content">
              <div class="contact-label text-muted">Location &amp; Local Time</div>
              <div class="contact-value font-weight-bold">{{ contact.locationShort || 'Hanoi, Vietnam' }}</div>
              <div class="hanoi-clock-wrapper mt-1">
                <span class="status-beacon-dot mr-2" />
                <span class="hanoi-clock font-mono">{{ hanoiTime }} (GMT+7)</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="glass-card glass-card-hover contact-item-card">
            <div class="contact-item-icon">
              <i class="fas fa-globe text-accent-gradient" />
            </div>
            <div class="contact-item-content">
              <div class="contact-label text-muted">Online Channels</div>
              <div class="social-links-row mt-2">
                <a
                  v-if="contact.linkedin"
                  :href="contact.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-glass-outline btn-sm"
                >
                  <i class="fab fa-linkedin mr-1" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2: Formspree Interactive Contact Form -->
        <div class="contact-form-col">
          <div class="glass-panel form-panel">
            <h3 class="form-title mb-4">Send a Direct Message</h3>

            <!-- Form Status Alerts -->
            <div v-if="submitStatus === 'success'" class="alert-banner alert-success mb-4" role="alert">
              <strong>✓ Message Sent!</strong> Thank you for reaching out. I will get back to you shortly.
            </div>

            <div v-if="submitStatus === 'error'" class="alert-banner alert-error mb-4" role="alert">
              <strong>Submission Failed:</strong> {{ errorMessage }}
            </div>

            <form
              method="POST"
              action="https://formspree.io/f/xanwjdrr"
              @submit.prevent="handleSubmit"
            >
              <!-- Name Input -->
              <div class="form-group mb-4">
                <label for="contact-name" class="form-label">Your Name <span class="required">*</span></label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  class="glass-input"
                  :class="{ 'is-invalid': $v.form.name.$dirty && $v.form.name.$invalid }"
                  placeholder="e.g. Alex Morgan"
                  required
                  @blur="$v.form.name.$touch()"
                >
                <div v-if="$v.form.name.$dirty && !$v.form.name.required" class="field-error">
                  Name is required.
                </div>
                <div v-if="$v.form.name.$dirty && !$v.form.name.maxLength" class="field-error">
                  Name must be at most 50 characters long.
                </div>
              </div>

              <!-- Email Input -->
              <div class="form-group mb-4">
                <label for="contact-email" class="form-label">Email Address <span class="required">*</span></label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  class="glass-input"
                  :class="{ 'is-invalid': $v.form.email.$dirty && $v.form.email.$invalid }"
                  placeholder="alex@company.com"
                  required
                  @blur="$v.form.email.$touch()"
                >
                <div v-if="$v.form.email.$dirty && !$v.form.email.required" class="field-error">
                  Email is required.
                </div>
                <div v-if="$v.form.email.$dirty && !$v.form.email.email" class="field-error">
                  Must be a valid email address.
                </div>
              </div>

              <!-- Message Input -->
              <div class="form-group mb-4">
                <div class="textarea-header mb-1">
                  <label for="contact-message" class="form-label">Message <span class="required">*</span></label>
                  <span
                    class="char-counter font-mono"
                    :class="{ 'limit-exceeded': form.message.length > 5000 }"
                  >
                    {{ form.message.length }} / 5000 characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  maxlength="5000"
                  class="glass-input textarea-input"
                  :class="{ 'is-invalid': $v.form.message.$dirty && $v.form.message.$invalid }"
                  placeholder="Describe your project, team requirements, or role scope (minimum 20 characters)..."
                  required
                  @blur="$v.form.message.$touch()"
                />
                <div v-if="$v.form.message.$dirty && !$v.form.message.required" class="field-error">
                  Message is required.
                </div>
                <div v-if="$v.form.message.$dirty && !$v.form.message.minLength" class="field-error">
                  Message must be at least 20 characters long.
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button
                  type="submit"
                  class="btn-primary-gradient submit-btn"
                  :disabled="isSubmitting || ($v.$dirty && $v.$invalid)"
                >
                  <span v-if="isSubmitting" class="spinner mr-2" />
                  <span>{{ isSubmitting ? 'Sending Message...' : 'Send Message' }}</span>
                </button>
                <button
                  type="button"
                  class="btn-glass-outline"
                  @click="clearForm"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { portfolioData, contact } from '@/data/portfolioData'

export default {
  name: 'ContactSection',
  mixins: [validationMixin],
  data () {
    return {
      portfolioData,
      contact: contact || {},
      copiedField: null,
      copyTimeout: null,
      hanoiTime: '',
      clockInterval: null,
      isSubmitting: false,
      submitStatus: null,
      errorMessage: '',
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  validations: {
    form: {
      name: { required, maxLength: maxLength(50) },
      email: { required, email },
      message: { required, minLength: minLength(20), maxLength: maxLength(5000) }
    }
  },
  mounted () {
    this.updateHanoiTime()
    this.clockInterval = setInterval(this.updateHanoiTime, 1000)
  },
  beforeDestroy () {
    if (this.clockInterval) clearInterval(this.clockInterval)
    if (this.copyTimeout) clearTimeout(this.copyTimeout)
  },
  methods: {
    updateHanoiTime () {
      const now = new Date()
      // Hanoi is UTC+7
      const options = {
        timeZone: 'Asia/Bangkok',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      try {
        this.hanoiTime = new Intl.DateTimeFormat('en-US', options).format(now)
      } catch (e) {
        // Fallback calculation for older engines
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
        const hanoiDate = new Date(utc + (3600000 * 7))
        const pad = n => String(n).padStart(2, '0')
        this.hanoiTime = `${pad(hanoiDate.getHours())}:${pad(hanoiDate.getMinutes())}:${pad(hanoiDate.getSeconds())}`
      }
    },
    copyEmail () {
      this.copyToClipboard(this.contact.email, 'email')
    },
    copyPhone () {
      this.copyToClipboard(this.contact.phone, 'phone')
    },
    copyToClipboard (text, type) {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          this.setCopied(type)
        }).catch(() => {
          this.fallbackCopy(text, type)
        })
      } else {
        this.fallbackCopy(text, type)
      }
    },
    fallbackCopy (text, type) {
      if (typeof document === 'undefined') return
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.setAttribute('readonly', '')
      textArea.style.position = 'absolute'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        this.setCopied(type)
      } catch (err) {
        // Fallback alert
      }
      document.body.removeChild(textArea)
    },
    setCopied (type) {
      this.copiedField = type
      if (this.copyTimeout) clearTimeout(this.copyTimeout)
      this.copyTimeout = setTimeout(() => {
        this.copiedField = null
      }, 2500)
    },
    async handleSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.isSubmitting = true
      this.submitStatus = null
      this.errorMessage = ''

      try {
        const endpoint = (this.contact && this.contact.formspreeEndpoint) || 'https://formspree.io/f/xanwjdrr'
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.form.name,
            email: this.form.email,
            message: this.form.message
          })
        })

        if (response.ok) {
          this.submitStatus = 'success'
          this.clearForm()
        } else {
          this.submitStatus = 'error'
          this.errorMessage = 'Failed to submit form. Please try again or reach out via email directly.'
        }
      } catch (err) {
        this.submitStatus = 'error'
        this.errorMessage = 'Network error occurred. Please try again or send an email.'
      } finally {
        this.isSubmitting = false
      }
    },
    clearForm () {
      this.form.name = ''
      this.form.email = ''
      this.form.message = ''
      this.$v.$reset()
    }
  }
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
}
.contact-info-col,
.contact-form-col {
  min-width: 0;
}
.contact-item-content {
  min-width: 0;
  overflow-wrap: anywhere;
}
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }
}
.contact-item-card {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  gap: 1.25rem;
}
.contact-item-icon {
  font-size: 1.5rem;
  min-width: 40px;
}
.contact-item-content {
  flex-grow: 1;
}
.contact-label {
  font-size: var(--fs-xs, 0.75rem);
  text-transform: uppercase;
  letter-spacing: var(--ls-wider, 0.05em);
}
.contact-value {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-primary);
  text-decoration: none;
}
.hanoi-clock-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: var(--fs-xs, 0.75rem);
  color: var(--accent-primary, #00E676);
}
.social-links-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn-copy {
  padding: 0.35rem 0.85rem !important;
  font-size: var(--fs-xs, 0.75rem) !important;
  min-height: 34px;
}
.btn-copy.is-copied {
  border-color: var(--accent-primary, #00E676) !important;
  color: var(--accent-primary, #00E676) !important;
  background: var(--accent-primary-dim, rgba(0, 230, 118, 0.12)) !important;
}
.form-panel {
  padding: 2rem;
}
.form-title {
  font-size: var(--fs-h3, 1.35rem);
  font-weight: 700;
  color: var(--text-primary);
}
.form-label {
  display: block;
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.required {
  color: var(--accent-primary, #00E676);
}
.textarea-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.char-counter {
  font-size: var(--fs-xs, 0.75rem);
  color: var(--text-muted);
}
.limit-exceeded {
  color: var(--accent-error, #EF4444);
}
.textarea-input {
  resize: vertical;
  min-height: 120px;
}
.is-invalid {
  border-color: var(--accent-error, #EF4444) !important;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25) !important;
}
.field-error {
  color: var(--accent-error, #EF4444);
  font-size: var(--fs-xs, 0.75rem);
  margin-top: 0.25rem;
}
.alert-banner {
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-md, 8px);
  font-size: var(--fs-sm, 0.875rem);
}
.alert-success {
  background: rgba(0, 230, 118, 0.12);
  border: 1px solid var(--accent-primary, #00E676);
  color: var(--accent-primary, #00E676);
}
.alert-error {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid var(--accent-error, #EF4444);
  color: var(--accent-error, #EF4444);
}
.form-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.submit-btn {
  flex-grow: 1;
}
.btn-sm {
  padding: 0.4rem 1rem !important;
  font-size: var(--fs-xs, 0.75rem) !important;
  min-height: 36px;
}
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-rotate 0.75s linear infinite;
  vertical-align: middle;
}
@keyframes spinner-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@media (max-width: 768px) {
  .btn-copy,
  .btn-sm,
  .form-actions button {
    min-height: 44px !important;
  }
}
@media (max-width: 600px) {
  .contact-item-card {
    flex-wrap: wrap;
    padding: 1rem;
  }
  .form-panel {
    padding: 1.25rem;
  }
}
@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
    width: 100%;
  }
  .form-actions button,
  .submit-btn {
    width: 100%;
  }
}
.text-accent-gradient {
  background: var(--accent-gradient, linear-gradient(135deg, #00E676 0%, #38BDF8 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
