<template>
  <v-layout row justify-center align-center wrap class="mt-4 pt-2">
    <v-flex xs12 sm12 md5 lg6 xl6 class="mt-4 pt-4">
      <h2 class="mb-4 pl-4 pt-2">Education</h2>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">OCT 2017 -</div>
                <div class="caption font-weight-bold green--text">MAR 2022</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>Engineering in Computer Electronics</strong>
                <div class="caption mb-2">Posts and Telecommunications Institute of Technology (PTIT)</div>
                <div class="caption mb-2">Classification: Good</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-flex>
    <v-flex xs12 sm12 md4 lg6 xl6 class="mt-4 pt-2">
      <h2 class="mb-4 pl-4">Experience</h2>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">JAN 2026 -</div>
                <div class="caption font-weight-bold green--text">PRESENT</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>FPT Corporation (FCI)</strong>
                <div class="caption mb-2">Senior Backend / Platform Engineer</div>
                <ul class="caption mb-2 pl-3">
                  <li>Rated A in the Q1 2026 performance review.</li>
                  <li>Owned the backend of Partner Portal V2 end to end: REST APIs, data model, and multi-stage approval workflows for partner onboarding, deal registration, marketing fund (MDF) claims, and revenue dashboards, with queue workers, schedulers, and a WebSocket server for async and real-time work.</li>
                  <li>Integrated FPT ID SSO (OAuth2), LMS webhooks with user sync, S3, and CRM/Vtiger; built API-key auth, RBAC, and audit logging for partner access, and led remediation of three external penetration-test rounds (private S3 with presigned URLs, IDOR checks, rate limiting, upload validation).</li>
                  <li>Shipped staging and production releases through the SRE team's ArgoCD GitOps repository (config maps, Vault-backed secrets, ingress including WebSocket routing), built the non-root container images with health probes, and wrote the SRE handover runbook (deploy, scaling, troubleshooting, go-live checklist).</li>
                  <li>Set up Sentry error tracking and cron monitoring for scheduled jobs, routed application logs to the central Grafana stack, resolved SonarQube findings, and mentored engineers.</li>
                </ul>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">DEC 2024 -</div>
                <div class="caption font-weight-bold green--text">DEC 2025</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>FPT Smart Cloud</strong>
                <div class="caption mb-2">Fullstack Engineer</div>
                <ul class="caption mb-2 pl-3">
                  <li>Received multiple awards in 2025, including an award at AIverse Hackathon 2025.</li>
                  <li>Built backend features for CRM (Vtiger), Asset Management (Snipe-IT), and Payroll/Sales Incentive systems under Agile Scrum, including the Opportunity to Invoice flow.</li>
                  <li>Built the Payroll/Sales Incentive service with NestJS, TypeScript, MySQL, and TypeORM: Azure AD SSO, JWT, RBAC, KPI and incentive-rate modules, and CRM user synchronization.</li>
                  <li>Extended GitLab CI for the Asset Management service: tag-triggered image builds to a private registry and merge-request-gated test runs.</li>
                  <li>Mentored interns and freshers, reviewed code, and shared AWS/SOLID knowledge.</li>
                </ul>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">AUG 2022 -</div>
                <div class="caption font-weight-bold green--text">DEC 2024</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>The First One JSC</strong>
                <div class="caption mb-2">Software Engineer</div>
                <ul class="caption mb-2 pl-3">
                  <li>Built backend services and business workflows across multiple domains using PHP, .NET, MySQL, and PostgreSQL.</li>
                  <li>Operated AWS production environments (EC2, S3, CloudFront, Linux, Nginx): deployments, server configuration, SSL/domain setup, log investigation, and release support.</li>
                  <li>Collaborated with leaders and PMs to design and implement practical solutions.</li>
                  <li>
                    Received MVP Employee Q3 2023 and 1st place at
                    <a href="https://sg.wantedly.com/companies/cnctor/post_articles/889574" target="_blank" rel="noopener">CnctorJapan Hackathon 2024</a>.
                  </li>
                </ul>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">MAY 2022 -</div>
                <div class="caption font-weight-bold green--text">JUL 2022</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>MISA</strong>
                <div class="caption mb-2">Intern</div>
                <div class="caption mb-2">Explored code, designed UI, and fixed bugs with .NET and JavaScript.</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-flex>
    <v-flex xs12 sm12 md5 lg6 xl6 class="mt-4 pt-4">
      <h2 class="mb-4 pl-4 pt-2">Certifications</h2>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">SEP 2025 -</div>
                <div class="caption font-weight-bold green--text">SEP 2028</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>AWS Certified Developer - Associate</strong>
                <div class="caption mb-2">
                  <a
                    href="https://www.credly.com/badges/f058f6b0-1c47-43fa-86ed-a025cdaeaf7a"
                    target="_blank"
                    rel="noopener"
                  >Verify on Credly</a>
                </div>
              </v-flex>
            </v-layout>
          </v-timeline-item>
          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">AUG 2024 -</div>
                <div class="caption font-weight-bold green--text">AUG 2027</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>AWS Certified Solutions Architect - Associate</strong>
                <div class="caption mb-2">
                  <a
                    href="https://www.credly.com/badges/ed81cbeb-fe6d-4312-b7c3-907387071fa4"
                    target="_blank"
                    rel="noopener"
                  >Verify on Credly</a>
                </div>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-flex>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-flex xs12 sm12 md8 lg8 xl8 class="mx-2 pt-4">
        <h2>
          <span>Career</span>
          <span class="green--text">Goal</span>
        </h2>
        <br>
        <p>
          In the next 3-5 years, aim to grow into a <strong>Principal Engineer</strong> role -
          driving system architecture and reliability strategy (SLOs, observability,
          incident response) across teams, while mentoring senior engineers and shaping
          long-term technology direction.
        </p>
      </v-flex>
      <v-flex xs12 sm12 md8 lg8 xl8 class="mx-2 pt-4">
        <h2>
          <span>Coding</span>
          <span class="green--text">Skills</span>
        </h2>
        <br>
        <p><strong>Backend:</strong> Node.js (NestJS), PHP, Go, C# (.NET), Python, RESTful API design, OAuth2/SSO, JWT, RBAC, queues and background jobs, WebSocket. Willing to switch to another language (Java, Rust, etc.)</p>
        <p><strong>Database:</strong> MySQL 8.0, PostgreSQL, Redis, schema design, indexing, query optimization</p>
        <p><strong>SRE &amp; Observability:</strong> Prometheus, Grafana, Loki, Alertmanager, OpenTelemetry, Jaeger, Sentry, health checks and probes, autoscaling (HPA), PDBs, backup and restore, load testing (k6), runbooks</p>
        <p><strong>Cloud &amp; Platform:</strong> AWS (EC2, S3, CloudFront, RDS, Lambda, API Gateway, SNS, SQS, CloudWatch), Kubernetes, Docker, ArgoCD (GitOps), HashiCorp Vault, Jenkins, GitLab CI, GitHub Actions, Nginx, Linux</p>
        <p><strong>Security:</strong> OWASP remediation (IDOR, XSS, SQL injection, rate limiting), SonarQube, Trivy, govulncheck, gitleaks, Kubernetes NetworkPolicy and securityContext</p>
        <p><strong>Software Engineering:</strong> OOP, System Design, Clean Code, SOLID, Design Patterns, Microservices, Message Queues, Event-driven design</p>
        <p><strong>Frontend:</strong> Vue 3, React, TypeScript, Pinia, Vuetify</p>
        <p><strong>Tools:</strong> Jira, Confluence, Slack, Backlog, Sentry, ChatGPT, Cursor, Claude</p>
      </v-flex>
      <div class="mt-4 pt-2">
        <v-btn
          href="/le-xuan-tuan-anh-cv.pdf"
          target="_blank"
          color="green"
          dark
          large
        >
          Download Resume
          <v-icon right dark>fas fa-file-download</v-icon>
        </v-btn>
      </div>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Resume',
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [
      {
        name: 'description',
        content: 'Resume of Le Xuan Tuan Anh'
      },
      {
        name: 'keywords',
        content: 'Resume, Le Xuan Tuan Anh, Backend Engineer, SRE, Site Reliability Engineering, Platform Engineer, AWS, Kubernetes, ArgoCD, GitOps, Observability, NestJS, Go, Docker, MySQL, System Design'
      }
    ]
  },
  data () {
    return {
      value: 0,
      buffer1: 0,
      buffer2: 0,
      buffer3: 0,
      buffer4: 0,
      buffer5: 0,
      buffer6: 0,
      bufferValue: 100,
      interval: 0
    }
  },
  mounted () {
    this.startBuffer()
  },

  beforeDestroy () {
    clearInterval(this.interval)
  },

  methods: {
    startBuffer () {
      this.interval = setInterval(() => {
        this.buffer1 = 90
        this.buffer2 = 85
        this.buffer3 = 80
        this.buffer4 = 80
        this.buffer5 = 90
        this.buffer6 = 70
      }, 800)
    }
  }
}
</script>
<style >
</style>
