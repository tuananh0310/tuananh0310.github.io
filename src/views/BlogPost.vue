<template>
  <v-container class="safe-layout">
    <v-layout
      v-if="result && result.date"
      column
      justify-center
      class="mt-4 pt-2"
      v-editable="result.blok"
    >
      <h1 class="text-xs-center mb-4 pb-2">{{ result.title }}</h1>
      <span>{{ result.date.getDate() }}.{{ result.date.getMonth() + 1 }}.{{ result.date.getFullYear() }}</span>
      <v-img :src="result.image" aspect-ratio="2.75" height="330" contain :alt="result.title" />
      <v-layout column justify-center align-center class="mt-4 pt-2">
        <p v-html="body" />
      </v-layout>
      <br>
      <br>
      <v-btn large flat to="/blog" class="green--text">
        <v-icon>arrow_back</v-icon>Back to Blog
      </v-btn>
    </v-layout>
    <div v-else class="text-xs-center py-5">
      <p class="subheading text-muted">Loading article...</p>
      <v-btn flat to="/blog" class="green--text mt-3">
        <v-icon>arrow_back</v-icon>Back to Blog
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { marked } from 'marked'
import StoryblokClient from 'storyblok-js-client'
const token = 'iyPj3vEKmPladyz3zeqKuwtt'
let storyapi = new StoryblokClient({
  accessToken: token
})

export default {
  data () {
    return {
      posts: [],
      result: {}
    }
  },
  metaInfo () {
    return {
      title: (this.result && this.result.title) || 'Blog Post',
      titleTemplate: '%s ← Le Xuan Tuan Anh',
      meta: []
    }
  },
  computed: {
    body () {
      return this.result && this.result.content ? marked(this.result.content) : ''
    }
  },

  created () {
    if (typeof window !== 'undefined' && window.storyblok) {
      window.storyblok.init({
        accessToken: token
      })
      window.storyblok.on('change', () => {
        this.getStory('home', 'draft')
      })
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getStory('home', 'draft')
        } else {
          this.getStory('home', 'published')
        }
      })
    } else {
      this.getStory('home', 'published')
    }
  },

  methods: {
    getStory (version) {
      storyapi
        .get('cdn/stories', {
          version: 'draft',
          starts_with: 'blog/'
        })
        .then(res => {
          this.posts = res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              blok: bp.content,
              image: bp.content.thumbnail,
              content: bp.content.content,
              date: new Date(bp.content.date)
            }
          })
          this.result = this.posts.find(
            rightPost => rightPost.id === this.$route.params.id
          )
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
</style>
