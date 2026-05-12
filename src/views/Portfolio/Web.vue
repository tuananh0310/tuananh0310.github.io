<template>
  <v-container grid-list-xl>
    <h2 class="pl-4">
      <span>Web</span>
      <span class="green--text">Portfolio</span>
    </h2>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-dialog
        v-model="project.dialog"
        lazy
        max-width="1000"
        v-for="project in projects"
        :key="project.title"
      >
        <template v-slot:activator="{ on }">
          <v-flex xs12 sm6 md4 lg4 xl4 v-on="on">
            <v-card hover flat color="transparent">
              <v-img
                :src="project.poster"
                :alt="project.title"
                height="230"
                lazy-src="https://cdn.dribbble.com/users/503653/screenshots/3143656/fluid-loader.gif"
              ></v-img>
              <v-card-title primary-title class="justify-center">{{project.title}}</v-card-title>
            </v-card>
          </v-flex>
        </template>
        <v-card v-if="project.dialog">
          <v-img :src="project.poster"></v-img>
          <v-card-text>
            <h3 class="headline mb-0">{{project.title}}</h3>
            <div class="caption font-weight-bold green--text mb-2">{{project.period}}</div>
            <div class="subheading mb-2">{{project.role}}</div>
            <p>{{project.summary}}</p>
            <p class="caption mb-2" v-if="project.team">{{project.team}}</p>
            <ul v-if="project.highlights" class="caption mb-2 pl-3">
              <li v-for="highlight in project.highlights" :key="highlight">{{highlight}}</li>
            </ul>
            <h3 class="headline mb-0">
              <span>Technology</span>
            </h3>
            <v-chip
              v-for="tech in project.tech"
              :key="tech"
              color="green"
              text-color="white"
            >{{tech}}</v-chip>
          </v-card-text>
          <v-card-actions v-if="project.git || project.demo">
            <v-btn v-if="project.git" flat large dark color="green" :href="project.git" target="_blank">
              <v-icon left>fab fa-github</v-icon>GitHub
            </v-btn>
            <v-btn v-if="project.demo" large flat dark color="green" :href="project.demo" target="_blank">
              <v-icon left>fas fa-desktop</v-icon>Demo
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Web Portfolio',
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [
      {
        name: 'description',
        content: 'Web Portfolio'
      },
      {
        name: 'keywords',
        content: 'Web Portfolio'
      }
    ]
  },
  data () {
    return {
      dialog: false,
      projects: [
        {
          dialog: false,
          title: 'Partner Portal V2',
          period: 'JAN 2026 - Present',
          role: 'Senior Full-Stack Developer | DevOps Engineer',
          team: "Enterprise-grade Channel Partner Management System for FPT Cloud International's distribution network",
          summary: 'Architected and led a full-stack partner management platform with Laravel 12 backend, Vue 3 TypeScript SPA, real-time workflows, external integrations, and Kubernetes/GitOps delivery.',
          highlights: [
            'Designed layered backend architecture with Controller, Service, and Repository boundaries.',
            'Designed MySQL 8.0 data model with 55+ migrations, 33+ Eloquent models, polymorphic relationships, and JSON columns.',
            'Built multi-step approval workflows for Partner Applications, Deal Registration, and Marketing Development Fund.',
            'Implemented real-time notifications using Laravel Reverb, Laravel Echo, and private channel authorization.',
            'Integrated FPT ID SSO, FPT Cloud S3, E-Contract digital signing, and CRM synchronization.',
            'Designed Docker infrastructure with PHP-FPM, Queue Worker, Scheduler, WebSocket, Nginx, MySQL, and Redis services.',
            'Led GitOps migration from Jenkins push-based CI/CD to ArgoCD pull-based deployment.',
            'Deployed multi-environment Kubernetes workloads with Ingress routing and resource management.',
            'Implemented RBAC with 10+ roles using Spatie Permission and CASL frontend authorization.',
            'Built async email jobs, broadcast events, mailable classes, and technical handover documentation.'
          ],
          tech: ['Laravel 12', 'PHP 8.2', 'Vue 3', 'TypeScript', 'Vuetify 3', 'Pinia', 'MySQL 8.0', 'Redis', 'Docker', 'Kubernetes', 'ArgoCD', 'Jenkins', 'Nginx', 'Laravel Reverb', 'Laravel Echo', 'JWT', 'Sentry', 'S3', 'Maatwebsite Excel', 'TCPDF'],
          poster: 'https://i.imgur.com/9Ww2bvm.png'
        },
        {
          dialog: false,
          title: 'Asset Management (Snipe-IT)',
          period: 'APR 2025 - DEC 2025',
          role: 'Fullstack Engineer',
          team: 'Team size: 7 members including Developers, BA, Tester, and PM',
          summary: 'Developed assets, models, tickets, transactions, journals, and audit modules. Implemented auditing, large data export, recursive processing, documentation, tests, code review, and patterns such as Template Method, Realtime Facade, Singleton, and DTO.',
          tech: ['PHP', 'JavaScript', 'MySQL'],
          poster: 'https://i.imgur.com/9Ww2bvm.png'
        },
        {
          dialog: false,
          title: 'CRM (Vtiger)',
          period: 'DEC 2024 - DEC 2025',
          role: 'Fullstack Engineer',
          team: 'Team size: 9 members including Developers, BA, Tester, and PM',
          summary: 'Participated in Opportunities, Quotes, Subcontract, Contracts, and Invoices modules. Reviewed team code and applied SOLID principles, Strategy, Builder, Dependency Injection, and Factory Operation patterns.',
          tech: ['PHP', 'JavaScript', 'MySQL'],
          poster: 'https://i.imgur.com/nVqtTAf.png'
        },
        {
          dialog: false,
          title: 'Factory Operation',
          period: 'JUN 2024 - NOV 2024',
          role: 'Backend and Front End Developer',
          team: 'Team size: 7 members including Developers, BA, Tester, and PM',
          summary: 'Contributed to base architecture, built UI from Figma, and developed Product, Order, Fulfillment, and Stock modules with Clean Code, SOLID, DRY, and Strategy pattern practices.',
          tech: ['Laravel', 'Vue.js', 'TypeScript', 'MySQL'],
          poster: 'https://i.imgur.com/GOIIL06.png'
        },
        {
          dialog: false,
          title: 'Peerto CRS (STAYNAVI)',
          period: 'NOV 2023 - JUN 2024',
          role: 'Backend and Front End Developer',
          team: 'Team size: 20 members including Developers, BA, Tester, and PM',
          summary: 'Developed CRS and FIT business logic, integrated site controllers, crawled data, fixed production issues, optimized database queries, reviewed code, and wrote release notes.',
          tech: ['Laravel', 'jQuery', 'MySQL'],
          poster: 'https://i.imgur.com/rXHBs36.png'
        },
        {
          dialog: false,
          title: 'Kakutenya',
          period: 'JAN 2023 - OCT 2023',
          role: 'Backend and Front End Developer',
          team: 'Team size: 10 members including Developers, BA, Tester, and PM',
          summary: 'Built a uniform rental management system, supported interns and freshers, developed new features, optimized queries, and added barcode scanning with Repository, Dependency Injection, and Service Container patterns.',
          tech: ['Laravel', 'Vue.js', 'MySQL'],
          poster: 'https://i.imgur.com/kCN1CFH.png'
        },
        {
          dialog: false,
          title: 'Sanpo Kaisen',
          period: 'AUG 2022 - DEC 2022',
          role: 'Front End Developer',
          team: 'Team size: 20 members including Developers, BA, Tester, and PM',
          summary: 'Participated in project base architecture, developed production, order, and import-export management features, fixed bugs, maintained the system, and applied design patterns and clean code principles.',
          tech: ['.NET', 'Vue.js', 'PostgreSQL'],
          poster: 'https://i.imgur.com/wK5dqP7.png'
        }
      ]
    }
  }
}
</script>

<style  scoped>
</style>
