<template>
  <v-layout row justify-center align-center wrap class="mt-4 pt-2">
    <v-flex xs12 sm12 md5 lg6 xl6 class="mt-4 pt-4">
      <h2 class="mb-4 pl-4 pt-2">Education</h2>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">SEP 2017 -</div>
                <div class="caption font-weight-bold green--text">MAY 2022</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>Computer Electronics Engineer</strong>
                <div class="caption mb-2">Posts and Telecommunications Institute of Technology (PTIT)</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

<!--          <v-timeline-item color="green" small>-->
<!--            <v-layout pt-3>-->
<!--              <v-flex xs4>-->
<!--                <div class="caption font-weight-bold green&#45;&#45;text">SEP 2003 -</div>-->
<!--                <div class="caption font-weight-bold green&#45;&#45;text">MAY 2007</div>-->
<!--              </v-flex>-->
<!--              <v-flex class="pl-2">-->
<!--                <strong>Electrical Technician for Computers</strong>-->
<!--                <div class="caption mb-2">Electro-technical school Doboj</div>-->
<!--              </v-flex>-->
<!--            </v-layout>-->
<!--          </v-timeline-item>-->
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
                <div class="caption font-weight-bold green--text">AUG 2022 -</div>
                <div class="caption font-weight-bold green--text">AUG 2024 </div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>The First One Jsc</strong>
                <div class="caption mb-2">Software Development Engineer</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">FEB 2022 -</div>
                <div class="caption font-weight-bold green--text">JULY 2022</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>Misa</strong>
                <div class="caption mb-2">Intern Software Development Engineer</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="green" small>
            <v-layout pt-3>
              <v-flex xs4>
                <div class="caption font-weight-bold green--text">AUG 2018 -</div>
                <div class="caption font-weight-bold green--text">APR 1019</div>
              </v-flex>
              <v-flex class="pl-2">
                <strong>IT Technician</strong>
                <div class="caption mb-2">Vietel</div>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-flex>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-flex xs12 sm12 md4 lg5 xl5 class="mx-2 pt-4">
        <h2>
          <span>Coding</span>
          <span class="green--text">Skills</span>
        </h2>
        <br>
        <strong>VUE/NUXT, </strong>
        <strong>HTML/CSS/JavaScript, </strong>
        <strong>PHP/LARAVEL, </strong>
        <strong>AWS</strong>
      </v-flex>
      <div class="mt-4 pt-2">
        <v-btn
          href=""
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
    titleTemplate: "%s ← Tuan anhLee",
    meta: [
      {
        name: 'description',
        content: 'Resume of Tuan anh Lee'
      },
      {
        name: 'keywords',
        content: 'Resume, Tuan anh Lee, Frontend Developer, Vue, Nuxt, JavaScript, HTML, CSS, Photoshop, Adobe XD, Zeplin'
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
