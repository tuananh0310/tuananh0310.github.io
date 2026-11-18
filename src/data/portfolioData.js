/**
 * portfolioData.js - Centralized Single Source of Truth
 *
 * Captures 100% of authentic career data, identity, experiences,
 * projects, certifications, skills, domains, and contact channels.
 * Formatted to comply strictly with @vue/standard style guide.
 */

/**
 * Recursively freeze an object and all nested objects/arrays to guarantee immobility.
 * Prevents runtime tampering and optimizes Vue 2 reactivity overhead.
 */
function deepFreeze (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = obj[prop]
    if (value !== null && typeof value === 'object') {
      deepFreeze(value)
    }
  })
  return Object.freeze(obj)
}

export const portfolioData = deepFreeze({
  identity: {
    fullName: 'Le Xuan Tuan Anh',
    handle: 'tuananh0310',
    headline: 'Senior Backend Engineer | SRE & Platform',
    subtitles: [
      'Senior Backend Engineer',
      'Platform & SRE Engineer',
      'AWS Certified Developer / Solutions Architect'
    ],
    bio: 'Senior Backend Engineer with 5 years of experience building and running production systems: API and data design, third-party integrations, background jobs, and real-time messaging. Hands-on SRE practice across Kubernetes and GitOps releases, secrets management, monitoring and error tracking, incident debugging, and security hardening. Works across Node.js/NestJS, PHP, Go, and .NET. AWS Certified Solutions Architect and Developer - Associate.',
    shortBio: "Hello! I'm Le Xuan Tuan Anh. I'm a Senior Backend & Platform Engineer with 5 years of experience in distributed systems, Laravel, NestJS, and AWS, focused on scalable systems, clean architecture, cloud deployment, CI/CD, and high-reliability enterprise platforms.",
    careerGoal: 'In the next 3-5 years, aim to grow into a Principal Engineer role - driving system architecture and reliability strategy (SLOs, observability, incident response) across teams, while mentoring senior engineers and shaping long-term technology direction.',
    avatarUrl: 'https://i.postimg.cc/Qjw5Vq48/SUN68591.jpg',
    avatarFallbackUrl: '/_SUN68591.JPG',
    ogImageUrl: 'https://i.imgur.com/Dcz2PGx.jpg',
    resumePdfUrl: '/le-xuan-tuan-anh-cv.pdf',
    resumeHtmlUrl: '/le-xuan-tuan-anh-cv.html'
  },

  contact: {
    email: 'tuananhptit0310@gmail.com',
    phone: '+84 967 983 582',
    phoneRaw: '+84967983582',
    location: 'No. 42, Lane 230, Me Tri Thuong Street, Me Tri Ward, Nam Tu Liem District, Hanoi City, Vietnam',
    locationShort: 'Hanoi, Vietnam',
    github: 'https://github.com/tuananh0310',
    linkedin: 'https://www.linkedin.com/in/anhlxt',
    website: 'https://anhlxt.dev',
    githubPages: 'https://tuananh0310.github.io/',
    formspreeEndpoint: 'https://formspree.io/f/xanwjdrr'
  },

  stats: {
    yearsOfExperience: 5,
    enterpriseSystems: 8,
    awsCertifications: 2,
    completedProjects: 12
  },

  experiences: [
    {
      company: 'FPT Corporation (FCI)',
      role: 'Senior Backend / Platform Engineer',
      period: 'Jan 2026 - Present',
      location: 'Hanoi, Vietnam',
      scope: "Partner Portal V2 - Enterprise Channel Partner Management platform for FPT Cloud International's global distribution network; Microsoft 365 CSP Portal - microservices platform for Microsoft 365 CSP resale and operations.",
      highlights: [
        'Rated A in the Q1 2026 performance review.',
        'Owned the backend of Partner Portal V2 end to end: REST APIs, data model, and multi-stage approval workflows for partner onboarding, deal registration, marketing fund (MDF) claims, and revenue dashboards, with queue workers, schedulers, and a WebSocket server for async and real-time work.',
        'Integrated FPT ID SSO (OAuth2), LMS webhooks with user sync, S3, and CRM/Vtiger; built API-key auth, RBAC, and audit logging for partner access, and led remediation of three external penetration-test rounds (private S3 with presigned URLs, IDOR checks, rate limiting, upload validation).',
        'Building the Microsoft 365 CSP Portal on NestJS microservices: API gateway in front of 4 domain services with database-per-service on PostgreSQL, event-driven messaging via transactional outbox to RabbitMQ (publisher confirms, retry with backoff, DLQ), BullMQ workers, RS256/JWKS service-to-service auth, and Microsoft Partner Center integration.',
        "Shipped staging and production releases through the SRE team's ArgoCD GitOps repository (config maps, Vault-backed secrets, ingress including WebSocket routing), built the non-root container images with health probes, and wrote the SRE handover runbook (deploy, scaling, troubleshooting, go-live checklist).",
        'Set up Sentry error tracking and cron monitoring for scheduled jobs, routed application logs to the central Grafana stack, resolved SonarQube findings, and mentored engineers.'
      ],
      tech: [
        'Laravel 12',
        'PHP 8.2',
        'Vue 3',
        'TypeScript',
        'MySQL 8.0',
        'Redis',
        'Docker',
        'Kubernetes',
        'ArgoCD',
        'HashiCorp Vault',
        'Nginx',
        'Sentry',
        'Grafana',
        'Laravel Reverb',
        'AWS S3',
        'NestJS',
        'PostgreSQL',
        'RabbitMQ',
        'BullMQ'
      ]
    },
    {
      company: 'FPT Smart Cloud',
      role: 'Fullstack Engineer',
      period: 'Dec 2024 - Dec 2025',
      location: 'Hanoi, Vietnam',
      scope: 'CRM (Vtiger), Asset Management (Snipe-IT), and Payroll/Sales Incentive systems under Agile Scrum.',
      highlights: [
        'Received multiple awards in 2025, including an award at AIverse Hackathon 2025.',
        'Built backend features for CRM (Vtiger), Asset Management (Snipe-IT), and Payroll/Sales Incentive systems under Agile Scrum, including the Opportunity to Quote, Contract, and Invoice flow that improved financial reporting.',
        'Built the Payroll/Sales Incentive service with NestJS, TypeScript, MySQL, and TypeORM: Azure AD SSO, JWT, RBAC, KPI and incentive-rate modules, CRM user synchronization, and a React dashboard.',
        'Extended GitLab CI for the Asset Management service: tag-triggered image builds pushed to a private registry, merge-request-gated test runs, and corporate proxy support.',
        'Mentored interns and freshers, reviewed code, and shared knowledge on AWS, SOLID, and scalable design.'
      ],
      tech: [
        'NestJS',
        'TypeScript',
        'PHP',
        'MySQL',
        'TypeORM',
        'React',
        'Vite',
        'Tailwind CSS',
        'Docker',
        'GitLab CI',
        'Azure AD SSO',
        'JWT',
        'Snipe-IT',
        'Vtiger'
      ]
    },
    {
      company: 'The First One JSC (CNCTOR Japan Co., Ltd.)',
      role: 'Software Engineer',
      period: 'Aug 2022 - Dec 2024',
      location: 'Hanoi, Vietnam',
      scope: 'Enterprise web platforms, reservation systems, manufacturing, and uniform rental services for Japanese clients.',
      highlights: [
        'Received MVP Employee of Q3 2023 and 1st Place Tra Da Team at CnctorJapan Hackathon and The First One 2024.',
        'Built backend services and business workflows across multiple domains using PHP, .NET, MySQL, and PostgreSQL, including query optimization for data-heavy screens.',
        'Operated AWS production environments (EC2, S3, CloudFront, Linux, Nginx): deployments, server configuration, SSL/domain setup, log investigation, and release support.',
        'Collaborated with leaders and PMs to develop and implement practical solutions.',
        'Participated in internal technology talks on JavaScript, Data Science, backend frameworks, and more.'
      ],
      tech: [
        'PHP',
        'Laravel',
        '.NET',
        'MySQL',
        'PostgreSQL',
        'AWS (EC2, S3, CloudFront)',
        'Linux',
        'Nginx',
        'Vue.js',
        'Docker'
      ]
    },
    {
      company: 'MISA',
      role: 'Intern',
      period: 'May 2022 - Jul 2022',
      location: 'Hanoi, Vietnam',
      scope: 'Enterprise software exploration and development.',
      highlights: [
        'Passed internal technical evaluation exam and contributed to codebase exploration, UI design, and bug fixing using .NET and JavaScript.'
      ],
      tech: [
        '.NET',
        'C#',
        'JavaScript',
        'HTML/CSS'
      ]
    }
  ],

  projects: [
    {
      id: 'microsoft-365-csp-portal',
      title: 'Microsoft 365 CSP Portal',
      category: 'microservices',
      categoryLabel: 'Microservices & Distributed Systems',
      period: 'Sep 2026 - Present',
      role: 'Senior Backend & SRE Engineer',
      team: 'Microsoft 365 Cloud Solution Provider (CSP) resale and operations portal',
      summary: 'NestJS microservices platform for Microsoft 365 CSP resale: an API gateway in front of 4 domain services with database-per-service, event-driven messaging over RabbitMQ, and Microsoft Partner Center integration.',
      highlights: [
        'Split the backend into an API gateway (JWT, CORS, rate limiting, API keys) and 4 domain services (CSP, identity, integration, audit), each owning its own PostgreSQL database.',
        'Built event-driven communication with a transactional outbox relayed to RabbitMQ, using publisher confirms, retry with exponential backoff, and dead-letter queues.',
        'Ran BullMQ workers for background jobs, a ticket state machine, and outbox relay, separated from the HTTP API processes.',
        'Secured service-to-service calls with RS256 tokens verified through JWKS, and integrated Microsoft Partner Center APIs and webhooks with Entra ID login.'
      ],
      tech: [
        'NestJS',
        'TypeScript',
        'PostgreSQL',
        'Prisma',
        'RabbitMQ',
        'BullMQ',
        'Redis',
        'Docker',
        'Microsoft Entra ID',
        'Partner Center API'
      ],
      demoUrl: ''
    },
    {
      id: 'partner-portal-v2',
      title: 'Partner Portal V2',
      category: 'enterprise',
      categoryLabel: 'Enterprise & Cloud',
      period: 'Jan 2026 - Present',
      role: 'Senior Backend / Platform Engineer',
      team: "Enterprise Channel Partner Management System for FPT Cloud International's distribution network",
      summary: 'Architected and led a full-stack partner management platform with Laravel 12 backend, Vue 3 TypeScript SPA, real-time workflows, external integrations, and Kubernetes/GitOps delivery.',
      highlights: [
        'Designed layered backend architecture with Controller, Service, and Repository boundaries.',
        'Designed MySQL 8.0 data model with 55+ migrations, 33+ Eloquent models, polymorphic relationships, and JSON columns.',
        'Built multi-step approval workflows for Partner Applications, Deal Registration, and Marketing Development Fund (MDF).',
        'Implemented real-time notifications using Laravel Reverb, Laravel Echo, and private channel authorization.',
        'Integrated FPT ID SSO (OAuth2), LMS webhooks, S3, CRM/Vtiger, and E-Contract digital signing.',
        'Led GitOps migration from Jenkins push-based CI/CD to ArgoCD pull-based deployment on Kubernetes with Vault secrets.',
        'Implemented RBAC with 10+ roles using Spatie Permission and CASL frontend authorization.',
        'Led remediation of 3 external penetration-test rounds (private S3 presigned URLs, IDOR checks, rate limiting).'
      ],
      tech: [
        'Laravel 12',
        'PHP 8.2',
        'Vue 3',
        'TypeScript',
        'Vuetify 3',
        'Pinia',
        'MySQL 8.0',
        'Redis',
        'Docker',
        'Kubernetes',
        'ArgoCD',
        'HashiCorp Vault',
        'Nginx',
        'Laravel Reverb',
        'Sentry',
        'Grafana',
        'AWS S3'
      ],
      poster: 'https://i.imgur.com/9Ww2bvm.png',
      demoUrl: ''
    },
    {
      id: 'asset-management-snipe-it',
      title: 'Asset Management (Snipe-IT)',
      category: 'enterprise',
      categoryLabel: 'Enterprise System',
      period: 'Apr 2025 - Dec 2025',
      role: 'Fullstack Engineer',
      team: 'Team size: 7 members (Developers, BA, Tester, PM)',
      summary: 'Customized and extended enterprise open-source asset management platform (Snipe-IT) with policy-based authorization, high-performance data export, and GitLab CI image build pipelines.',
      highlights: [
        'Developed asset, model, ticket, transaction, journal, and audit modules with policy-based authorization.',
        'Implemented large data export and recursive data processing algorithms for enterprise hardware audits.',
        'Extended GitLab CI with tag-triggered image builds pushed to private container registry and merge-request-gated tests.',
        'Applied design patterns: Template Method, Realtime Facade, Singleton, and Data Transfer Objects (DTO).'
      ],
      tech: [
        'PHP',
        'JavaScript',
        'MySQL',
        'Docker',
        'GitLab CI',
        'Snipe-IT'
      ],
      poster: 'https://i.imgur.com/9Ww2bvm.png',
      demoUrl: ''
    },
    {
      id: 'sales-crm-vtiger',
      title: 'Sales CRM (Vtiger Customization)',
      category: 'enterprise',
      categoryLabel: 'Enterprise System',
      period: 'Dec 2024 - Sep 2026',
      role: 'Backend Engineer',
      team: 'FPT Smart Cloud',
      summary: 'Delivered 60+ tickets across Opportunity to Quote, Contract, and Invoice flows; built Partner Portal sync APIs and hardened CRM security.',
      highlights: [
        'Delivered 60+ tickets on Opportunity to Quote, Subcontract, Contract, and Invoice flows with stage rules and validations.',
        'Implemented dynamic tax and price calculation by product category, resell quote auto-processing, and Azure/GCP invoice export configuration.',
        'Integrated with Jira (ticket submission with audit logging) and Microsoft 365 online validation checks.',
        'Built Partner Portal integration: sync API with field mapping, push logs, and raw-data API feeding partner dashboards.',
        'Hardened CRM against XSS and SQL injection (output encoding, parameterized queries) and restricted ~20 cron scripts to CLI-only execution.'
      ],
      tech: [
        'PHP',
        'MySQL',
        'jQuery',
        'Jira API',
        'Microsoft 365',
        'Partner Sync API'
      ],
      poster: 'https://i.imgur.com/nVqtTAf.png',
      demoUrl: ''
    },
    {
      id: 'payroll-sales-incentive',
      title: 'Payroll / Sales Incentive',
      category: 'enterprise',
      categoryLabel: 'Enterprise System',
      period: 'Dec 2024 - Dec 2025',
      role: 'Fullstack Engineer',
      team: 'FPT Smart Cloud',
      summary: 'Architected and developed a fullstack Payroll and Sales Incentive calculation platform with NestJS backend, Azure AD SSO, and React/Tailwind dashboard.',
      highlights: [
        'Built modular NestJS backend with TypeScript, TypeORM, and MySQL.',
        'Integrated Microsoft Azure AD SSO, JWT token issuance, and granular role-based access control (RBAC).',
        'Engineered KPI computation engines, flexible incentive-rate calculation tiers, and automated CRM user synchronization.',
        'Built responsive analytical dashboard UI using React, Vite, and Tailwind CSS.'
      ],
      tech: [
        'NestJS',
        'TypeScript',
        'MySQL',
        'TypeORM',
        'Microsoft Azure AD SSO',
        'JWT',
        'React',
        'Vite',
        'Tailwind CSS'
      ],
      poster: 'https://i.imgur.com/nVqtTAf.png',
      demoUrl: ''
    },
    {
      id: 'factory-operation',
      title: 'Factory Operation - Print-on-Demand Fulfillment',
      category: 'enterprise',
      categoryLabel: 'Manufacturing & Fulfillment',
      period: 'Jun 2024 - Nov 2024',
      role: 'Backend & Frontend Developer',
      team: 'Team size: 7 members (Developers, BA, Tester, PM)',
      summary: 'High-throughput order fulfillment and SKU management platform for an industrial print factory with real-time tracking, barcode printing, and batch export.',
      highlights: [
        'Contributed to base architecture and developed Product, Order, Fulfillment, and Stock modules.',
        'Built order cancellation, shipment tracking, bulk Excel import/export, and printer-tag print layouts.',
        'Optimized query workloads using eager loading, chunking, and lazy collections, eliminating memory bottlenecks.',
        'Configured containerized backend environment with Docker and Nginx, with automated feature test suites.'
      ],
      tech: [
        'PHP 8.2',
        'Laravel',
        'Vue 3',
        'TypeScript',
        'MySQL',
        'Docker',
        'Nginx'
      ],
      poster: 'https://i.imgur.com/GOIIL06.png',
      demoUrl: ''
    },
    {
      id: 'peerto-booking-system',
      title: 'Peerto Booking System (STAYNAVI)',
      category: 'enterprise',
      categoryLabel: 'Hospitality & OTA Booking',
      period: 'Nov 2023 - Jun 2024',
      role: 'Backend & Frontend Developer',
      team: 'Team size: 20 members (Developers, BA, Tester, PM)',
      summary: 'Hotel booking engine and central reservation system (CRS) connecting major Japanese Online Travel Agencies (OTAs) with real-time room availability, inventory sync, and GMO payment.',
      highlights: [
        'Built reservation, cancellation, and quotation flows for FIT (Free Independent Travelers) bookings.',
        'Integrated OTA channels (Rakutsu, Temairazu, Neppan, TL Lincoln) via SOAP/XML push jobs for bookings, inventory, and prices.',
        'Handled GMO payment gateway transactions and webhooks with automated reconciliation.',
        'Scheduled and monitored OTA crawler background jobs for hotel and room catalog updates.',
        'Optimized complex database queries across massive reservation datasets.'
      ],
      tech: [
        'Laravel',
        'jQuery',
        'MySQL',
        'SOAP/XML OTA',
        'GMO Payment',
        'Nginx'
      ],
      poster: 'https://i.imgur.com/rXHBs36.png',
      demoUrl: ''
    },
    {
      id: 'kakutenya',
      title: 'Kakutenya - Uniform Rental & Laundry Management',
      category: 'enterprise',
      categoryLabel: 'B2B Logistics & Operations',
      period: 'Jan 2023 - Oct 2023',
      role: 'Backend & Frontend Developer',
      team: 'Team size: 10 members (Developers, BA, Tester, PM)',
      summary: 'B2B uniform rental and commercial laundry operation backend with barcode scanning, shelf-position warehouse inventory, scheduled billing batches, and Infomart export.',
      highlights: [
        'Architected REST API backend with PHP 8, MySQL, and JWT role-based access for admin, customer, laundry, and warehouse roles.',
        'Built contracts, quotations, warehouse inventory tracking by shelf position, barcode scanning, and laundry lifecycle tracking.',
        'Engineered scheduled cron batches: 6-times-a-month invoicing, monthly purchasing, and daily contract/staff status updates.',
        'Exported invoices to Excel/PDF with specialized Infomart format compliance.',
        'Implemented Repository, Dependency Injection, and Service Container patterns.'
      ],
      tech: [
        'PHP 8',
        'Laravel',
        'Vue.js',
        'MySQL',
        'JWT',
        'Barcode Scanning',
        'Infomart'
      ],
      poster: 'https://i.imgur.com/kCN1CFH.png',
      demoUrl: ''
    },
    {
      id: 'sanpo-kaisen',
      title: 'Sanpo Kaisen',
      category: 'enterprise',
      categoryLabel: 'Manufacturing & Logistics',
      period: 'Aug 2022 - Dec 2022',
      role: 'Frontend Developer',
      team: 'Team size: 20 members (Developers, BA, Tester, PM)',
      summary: 'Enterprise manufacturing resource and logistics system managing production workflows, orders, and international import-export operations.',
      highlights: [
        'Participated in base UI architecture and developed production, order, and import-export management features.',
        'Implemented clean UI views in Vue.js communicating with .NET backend and PostgreSQL database.',
        'Applied design patterns, SOLID principles, and clean code guidelines for maintainable code.'
      ],
      tech: [
        '.NET',
        'Vue.js',
        'PostgreSQL'
      ],
      poster: 'https://i.imgur.com/wK5dqP7.png',
      demoUrl: ''
    },
    {
      id: 'k8s-platform-learning4uk',
      title: 'Self-hosted Kubernetes Platform (learning4.uk)',
      category: 'cloud',
      categoryLabel: 'Cloud & GitOps Platform',
      period: 'Dec 2025 - Present',
      role: 'Platform / SRE Engineer',
      team: 'Personal / Platform',
      summary: 'Self-hosted Kubernetes cluster running production workloads with GitOps self-healing, HPA autoscaling, automated Velero backups, k6 load testing, and sandboxed code execution.',
      highlights: [
        'Designed and deployed bare-metal / cloud Kubernetes cluster managed via ArgoCD GitOps repository.',
        'Configured Horizontal Pod Autoscalers (HPA) and Pod Disruption Budgets (PDB) for zero-downtime rolling updates.',
        'Integrated Prometheus, Grafana, Alertmanager, and Loki for comprehensive observability and metrics alerting.',
        'Built automated disaster recovery runbooks and scheduled snapshot backups using Velero.',
        'Implemented sandboxed code-execution environment with strict Linux cgroup resource limits and NetworkPolicies.'
      ],
      tech: [
        'Kubernetes',
        'ArgoCD',
        'Prometheus',
        'Grafana',
        'Loki',
        'HashiCorp Vault',
        'Docker',
        'k6',
        'Linux'
      ],
      poster: 'https://i.imgur.com/9Ww2bvm.png',
      demoUrl: 'https://learning4.uk'
    }
  ],

  skills: [
    {
      category: 'Backend',
      items: [
        'Node.js (NestJS)',
        'PHP (Laravel)',
        'Go',
        'C# (.NET)',
        'Python',
        'RESTful API Design',
        'OAuth2 / SSO',
        'JWT',
        'RBAC',
        'Queues & Background Jobs',
        'WebSocket'
      ]
    },
    {
      category: 'Microservices & Distributed Systems',
      items: [
        'Microservice Architecture',
        'API Gateway',
        'Database-per-Service',
        'RabbitMQ (Exchanges, Routing, DLQ)',
        'Retry & Exponential Backoff',
        'Publisher Confirms',
        'Transactional Outbox',
        'Idempotent Consumers',
        'Event-Driven Architecture',
        'BullMQ',
        'Service-to-Service Auth (JWKS)'
      ]
    },
    {
      category: 'Database',
      items: [
        'MySQL 8.0',
        'PostgreSQL',
        'Redis',
        'Schema Design',
        'Indexing & Query Optimization',
        'TypeORM',
        'Eloquent ORM'
      ]
    },
    {
      category: 'SRE & Observability',
      items: [
        'Prometheus',
        'Grafana',
        'Loki',
        'Alertmanager',
        'OpenTelemetry',
        'Jaeger',
        'Sentry',
        'Health Probes',
        'HPA Autoscaling',
        'PDBs',
        'Backup & Restore (Velero)',
        'k6 Load Testing',
        'Incident Runbooks'
      ]
    },
    {
      category: 'Cloud & Platform',
      items: [
        'AWS (EC2, S3, CloudFront, RDS, Lambda, API Gateway, SNS, SQS, CloudWatch)',
        'Kubernetes',
        'Docker',
        'ArgoCD (GitOps)',
        'HashiCorp Vault',
        'Jenkins',
        'GitLab CI',
        'GitHub Actions',
        'Nginx',
        'Linux'
      ]
    },
    {
      category: 'Security',
      items: [
        'OWASP Remediation (IDOR, XSS, SQLi, Rate Limiting)',
        'SonarQube',
        'Trivy',
        'govulncheck',
        'gitleaks',
        'Kubernetes NetworkPolicy',
        'securityContext Non-Root'
      ]
    },
    {
      category: 'Software Engineering',
      items: [
        'OOP',
        'System Design',
        'Clean Architecture',
        'SOLID Principles',
        'Design Patterns',
        'Microservices',
        'Message Queues',
        'Event-Driven Architecture'
      ]
    },
    {
      category: 'Frontend',
      items: [
        'Vue 3',
        'Vue.js (2.x)',
        'React',
        'TypeScript',
        'JavaScript (ES6+)',
        'Pinia',
        'Vuetify',
        'Tailwind CSS',
        'Vite',
        'HTML5 / CSS3'
      ]
    },
    {
      category: 'AI & Productivity Tools',
      items: [
        'Claude',
        'ChatGPT',
        'Cursor',
        'Jira',
        'Confluence',
        'Slack',
        'Backlog',
        'Git'
      ]
    }
  ],

  certifications: [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      period: 'Sep 2025 - Sep 2028',
      badgeUrl: 'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
      verifyUrl: 'https://www.credly.com/badges/f058f6b0-1c47-43fa-86ed-a025cdaeaf7a'
    },
    {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      period: 'Aug 2024 - Aug 2027',
      badgeUrl: 'https://images.credly.com/size/340x340/images/0e284c41-3ad9-4e7d-a46c-045090f18635/image.png',
      verifyUrl: 'https://www.credly.com/badges/ed81cbeb-fe6d-4312-b7c3-907387071fa4'
    }
  ],

  education: [
    {
      institution: 'Posts and Telecommunications Institute of Technology (PTIT)',
      degree: 'Engineering in Computer Electronics',
      period: 'Oct 2017 - Mar 2022',
      classification: 'Good',
      location: 'Hanoi, Vietnam',
      description: 'Major: Engineering in Computer Electronics. Classification: Good.'
    }
  ],

  services: [
    {
      title: 'Backend Engineering',
      icon: 'fas fa-server',
      description: 'Design and implementation of robust, scalable RESTful APIs, microservices, background job queues, and real-time WebSocket event architectures.'
    },
    {
      title: 'System Architecture',
      icon: 'fas fa-sitemap',
      description: 'High-availability distributed system design, clean hexagonal architecture, database schema optimization, and secure enterprise integration patterns.'
    },
    {
      title: 'Cloud & Infrastructure',
      icon: 'fab fa-aws',
      description: 'Production AWS infrastructure engineering, Kubernetes container orchestration, secure networking, and automated infrastructure as code.'
    },
    {
      title: 'Platform Engineering',
      icon: 'fas fa-cogs',
      description: 'GitOps continuous delivery with ArgoCD, end-to-end CI pipelines, centralized observability (Prometheus/Grafana/Loki), and DevSecOps compliance.'
    }
  ],

  domains: [
    {
      title: 'Partner Management',
      description: 'Enterprise channel partner onboarding, deal registration, MDF claims workflows, approval states, FPT ID SSO, and bi-directional CRM synchronization.',
      summary: 'Channel partner onboarding, deal registration, MDF workflows, approval states, SSO, and CRM synchronization.'
    },
    {
      title: 'CRM & Payroll Systems',
      description: 'Opportunity to Quote, Contract, and Invoice pipelines; KPI calculations, multi-tier incentive rate engines, Azure AD SSO, and financial reporting.',
      summary: 'Opportunities, quotes, subcontract, contract, invoice, KPI, incentive rate, RBAC, Azure AD SSO, CRM/Vtiger synchronization, and financial reporting flows.'
    },
    {
      title: 'Asset Management',
      description: 'Enterprise hardware/software asset lifecycle, model inventories, checkout tickets, audit logs, and recursive large-scale data exports.',
      summary: 'Assets, models, tickets, transactions, journals, audit, export, and recursive processing.'
    },
    {
      title: 'Reservation Systems',
      description: 'Hotel booking engines and central reservation systems (CRS), OTA XML/SOAP channel managers (Rakutsu, Temairazu, Neppan), and payment gateways.',
      summary: 'CRS and FIT business logic, site controller integration, crawling, and release support.'
    },
    {
      title: 'Industrial Manufacturing',
      description: 'Print-on-demand fulfillment platforms, order routing, barcode scanning, shelf-position warehouse inventory, and automated tag generation.',
      summary: 'Product, order, fulfillment, stock, production, and import-export management modules.'
    }
  ],

  achievements: [
    {
      title: 'Rated A - Q1 2026 Performance Review',
      organization: 'FPT Corporation (FCI)',
      year: '2026',
      description: 'Rated A for exceptional ownership of Partner Portal V2 backend delivery and GitOps rollout.'
    },
    {
      title: 'Award Winner - AIverse Hackathon 2025',
      organization: 'FPT Smart Cloud',
      year: '2025',
      description: 'Awarded for innovative AI integration in cloud software workflows.'
    },
    {
      title: '1st Place Tra Da Team - CnctorJapan Hackathon 2024',
      organization: 'The First One JSC / CNCTOR Japan',
      year: '2024',
      url: 'https://sg.wantedly.com/companies/cnctor/post_articles/889574',
      description: 'First place winning team developing high-impact tech solutions.'
    },
    {
      title: 'MVP Employee of Q3 2023',
      organization: 'The First One JSC',
      year: '2023',
      description: 'Recognized as outstanding quarterly contributor for core platform development and AWS operations.'
    }
  ],

  community: [
    {
      name: 'AWS Study Group, Google Developer Group Hanoi, Laravel Viet Nam',
      role: 'Member',
      period: '2022 - Present',
      description: 'Attend events to learn new skills and share knowledge about AWS SAA-C03 and AWS Certified Developer exam preparation, distributed systems, and backend best practices.'
    }
  ]
})

// Named exports for convenient destructuring
export const identity = portfolioData.identity
export const contact = portfolioData.contact
export const stats = portfolioData.stats
export const experiences = portfolioData.experiences
export const projects = portfolioData.projects
export const skills = portfolioData.skills
export const certifications = portfolioData.certifications
export const education = portfolioData.education
export const services = portfolioData.services
export const domains = portfolioData.domains
export const achievements = portfolioData.achievements
export const community = portfolioData.community

export default portfolioData
