<template>
  <v-container grid-list-xl>
    <h2 class="pl-4">
      <span>Graphic</span>
      <span class="green--text">Portfolio</span>
    </h2>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-dialog
        v-model="image.dialog"
        lazy
        max-width="800"
        v-for="image in images"
        :key="image.title"
      >
        <template v-slot:activator="{ on }">
          <v-flex xs12 sm6 md4 lg4 xl4 v-on="on">
            <v-card hover flat color="transparent">
              <v-img
                :src="image.poster"
                height="230"
                :alt="image.title"
                lazy-src="https://cdn.dribbble.com/users/503653/screenshots/3143656/fluid-loader.gif"
              ></v-img>
              <v-card-title primary-title class="justify-center">{{image.title}}</v-card-title>
            </v-card>
          </v-flex>
        </template>
        <v-card v-if="image.dialog">
          <v-img :src="image.poster"></v-img>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Graphic Portfolio ',
    titleTemplate: '%s ← Le Xuan Tuan Anh',
    meta: [

    ]
  },
  data () {
    return {
      dialog: false,
      images: [
        {
          dialog: false,
          title: 'VilaShirts Logo'
        },
        {
          dialog: false,
          title: 'BlackBird Property Group Logo'
        },
        {
          dialog: false,
          title: 'TeeLock Consulting Logo'
        },
        {
          dialog: false,
          title: 'SEA||WA||MMXI'
        },
        {
          dialog: false,
          title: 'Alpine365 Logo'
        },
        {
          dialog: false,
          title: 'Josefine Product Pack'
        },
        {
          dialog: false,
          title: 'Next Party Flayer'
        },
        {
          dialog: false,
          title: 'VilaShirts T-Shirts'
        },
        {
          dialog: false,
          title: 'BAB Coin'
        }
      ]
    }
  }
}
</script>

<style  scoped>
</style>
