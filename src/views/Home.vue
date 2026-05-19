<template>
  <v-layout column justify-center align-center class="mt-4 pt-2">
    <v-img
      class="home-main-image"
      :src="homeImage"
      alt="Le Xuan Tuan Anh"
      aspect-ratio="1"
    ></v-img>

    <br>

    <vue-typer class="headline" :repeat="0" text="Le Xuan Tuan Anh"></vue-typer>
    <vue-typer
      :text="text1"
      :repeat="Infinity"
      :shuffle="false"
      initial-action="erasing"
      :pre-type-delay="70"
      :type-delay="70"
      :pre-erase-delay="1980"
      :erase-delay="150"
      erase-style="select-back"
      :erase-on-complete="false"
      caret-animation="smooth"
    ></vue-typer>
    <br>
    <v-flex xs12 sm6 md4 lg4 xl4>
      <v-card flat color="transparent" max-width="500">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              <span>About</span>
              <span class="green--text">Me</span>
            </h3>
            <div>
              <p>
                Hello! I’m Le Xuan Tuan Anh. I'm a senior full-stack developer
                and devops engineer with 4+ years of experience in Vue.js/React,
                Laravel, NestJS, and AWS, focused on scalable systems, clean
                architecture, cloud deployment, CI/CD, code review, and
                observability.
              </p>
            </div>
          </div>
        </v-card-title>
        <v-card-actions class="hidden-sm-and-down justify-center">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            fab
            dark
            outline
            color="green"
            :href="icon.href"
            target="_blank"
          >
            <v-icon dark>{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="hidden-md-and-up justify-center">
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            small
            fab
            dark
            outline
            color="green"
            :href="icon.href"
            target="_blank"
          >
            <v-icon dark>{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Full-stack Engineer portfolio of Le Xuan Tuan Anh' },
      { charset: 'utf-8' },
      { property: 'og:title', content: 'Le Xuan Tuan Anh' },
      { property: 'og:site_name', content: 'Le Xuan Tuan Anh' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://tuananh0310.github.io/' },
      {
        property: 'og:image',
        content: 'https://i.imgur.com/Dcz2PGx.jpg'
      },
      { property: 'og:description', content: 'Full-stack Engineer portfolio of Le Xuan Tuan Anh' }
    ]
  },
  components: {
    'vue-typer': VueTyper
  },
  data () {
    return {
      icons: [
        { href: 'https://github.com/tuananh0310', icon: 'fab fa-github' },
        { href: 'https://www.linkedin.com/in/anhlxt', icon: 'fab fa-linkedin-in' },
        { href: 'mailto:tuananhptit0310@gmail.com', icon: 'fas fa-envelope' },
        { href: 'tel:+84967983582', icon: 'fas fa-phone' }
      ],
      text1: ['Senior Full-stack Developer', 'DevOps Engineer', 'AWS Certified Developer/Architect']
    }
  },
  computed: {
    homeImage () {
      return 'https://i.postimg.cc/Qjw5Vq48/SUN68591.jpg'
    }
  }
}
</script>
<style>
@keyframes rocking {
  0%,
  100% {
    transform: rotateZ(-10deg);
  }

  50% {
    transform: rotateZ(10deg);
  }
}

.vue-typer {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.home-main-image {
  width: 277px;
  max-width: 100%;
  border-radius: 45%;
  overflow: hidden;
}

.home-main-image .v-image__image {
  height: 127%;
}

@media (max-width: 1263px) {
  .home-main-image {
    width: 400px;
  }
}

.vue-typer .custom.char.typed {
  color: green;
}
.vue-typer .custom.char.selected {
  color: #e91e63;
}

.vue-typer .custom.caret {
  animation: rocking 1s ease-in-out 0s infinite;
}
.vue-typer .custom.caret.typing {
  background-color: green;
}
.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: #e91e63;
}
</style>
