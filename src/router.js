import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ selector: to.hash, offset: { x: 0, y: 68 } })
          } else {
            resolve({ x: 0, y: 0 })
          }
        }, 150)
      })
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: () =>
        import(/* webpackChunkName: "contact" */ './views/Contact.vue')
    },
    {
      path: '/resume',
      name: 'resume',
      component: () =>
        import(/* webpackChunkName: "resume" */ './views/Resume.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () =>
        import(/* webpackChunkName: "blog" */ './views/Blog.vue')
    },
    {
      path: '/blog/:id',
      name: 'blogPost',
      component: () =>
        import(/* webpackChunkName: "blog" */ './views/BlogPost.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () =>
        import(/* webpackChunkName: "services" */ './views/Services.vue')
    },
    {
      path: '*',
      name: 'Error',
      component: () =>
        import(/* webpackChunkName: "error" */ './views/Error.vue')
    }
  ]
})
