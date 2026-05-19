<template>
  <v-container grid-list-xl>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h2 class="pl-4">
          <span>My</span>
          <span class="green--text">Services</span>
        </h2>
      </v-flex>
      <v-flex v-for="service in services" :key="service.title" xs6 sm3 md3 lg3 xl3>
        <v-card hover flat color="transparent" :style="{'cursor':'context-menu'}">
          <v-card-title></v-card-title>
          <v-card-text class="text-xs-center">
            <v-icon x-large color="green">{{service.icon}}</v-icon>
          </v-card-text>
          <v-card-title class="justify-center">
            <v-flex text-xs-center subheading font-weight-bold>{{service.title}}</v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h2 class="pl-4">
          <span>Work</span>
          <span class="green--text">Domains</span>
        </h2>
      </v-flex>

      <v-flex v-for="domain in domains" :key="domain.title" xs12 sm6 md3 lg3 xl3>
        <v-card hover flat color="transparent" :style="{'cursor':'context-menu'}">
          <v-card-title class="justify-center">
            <v-flex text-xs-center subheading font-weight-bold>{{domain.title}}</v-flex>
          </v-card-title>
          <v-card-text class="text-xs-center caption">{{domain.summary}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Services',
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [

    ]
  },
  data () {
    return {
      domains: [
        {
          title: 'Partner Management',
          summary: 'Channel partner onboarding, deal registration, MDF workflows, approval states, SSO, and CRM synchronization.'
        },
        {
          title: 'CRM / Payroll',
          summary: 'Opportunities, quotes, subcontract, contract, invoice, KPI, incentive rate, RBAC, Azure AD SSO, CRM/Vtiger synchronization, and financial reporting flows.'
        },
        {
          title: 'Asset Management',
          summary: 'Assets, models, tickets, transactions, journals, audit, export, and recursive processing.'
        },
        {
          title: 'Reservation Systems',
          summary: 'CRS and FIT business logic, site controller integration, crawling, and release support.'
        },
        {
          title: 'Manufacturing',
          summary: 'Product, order, fulfillment, stock, production, and import-export management modules.'
        }
      ],
      services: [
        {
          icon: 'fas fa-code',
          title: 'Full-stack Development'
        },
        {
          icon: 'fas fa-sitemap',
          title: 'System Architecture'
        },
        {
          icon: 'fab fa-aws',
          title: 'Cloud & DevOps'
        },
        {
          icon: 'fas fa-users',
          title: 'DevOps Engineering'
        }
      ]
    }
  }
}
</script>
<style >
</style>
