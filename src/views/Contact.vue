<template>
  <v-container grid-list-xl>
    <v-layout row justify-center align-center wrap class="mt-4 pt-2">
      <v-flex xs12 sm12 md6 lg6 xl6>
        <h2 class="pb-4 mt-2">
          <span>GetIn</span>
          <span class="green--text">Touch</span>
        </h2>
        <div class="py-4 subheading font-weight-bold">
          <v-icon large color="green" left>fas fa-map-marker-alt</v-icon>
          <span>Ha Noi</span>
          <span class="green--text">Viet Nam</span>
        </div>
        <div class="py-4 subheading font-weight-bold">
          <v-icon large color="green" left>fas fa-envelope</v-icon>
          <span>tuananhptit0310@</span>
          <span class="green--text">gmail.com</span>
        </div>
        <div class="py-4 subheading font-weight-bold">
          <v-icon large color="green" left>fas fa-phone</v-icon>
          <span>+8496</span>
          <span class="green--text">798 3582</span>
        </div>
        <div class="py-4 subheading font-weight-bold">
          <v-icon large color="green" left>fas fa-check</v-icon>
          <span>Freelance</span>
          <span class="green--text">Available</span>
        </div>
      </v-flex>

      <v-flex xs12 sm12 md6 lg6 xl6>
        <h2 class="pb-4 mb-4">
          <span>Contact</span>
          <span class="green--text">Form</span>
        </h2>

        <form method="POST" action="https://formspree.io/f/xanwjdrr">
          <v-text-field
            name="name"
            color="green"
            background-color="transparent"
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            type="email"
            color="green"
            background-color="transparent"
            name="email"
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-textarea
            color="green"
            background-color="transparent"
            :counter="200"
            :error-messages="bodyErrors"
            v-model="body"
            label="Textarea"
            name="body"
            @blur="$v.body.$touch()"
          ></v-textarea>
          <v-btn
            @click="submit"
            type="submit"
            color="green"
            class="white--text"
            :disabled=" (body.length<=20)"
          >SEND MESSAGE</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  email,
  minLength
} from 'vuelidate/lib/validators'
export default {
  metaInfo: {
    title: 'Contact',
    titleTemplate: "%s ← Tuan anhLee",
    meta: [
      {
        name: 'description',
        content: 'Contact me'
      },
      {
        name: 'keywords',
        content: 'contact, me, email, phone, address'
      }
    ]
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    body: { required, minLength: minLength(20) }
  },
  data () {
    return {
      name: '',
      email: '',
      body: ''
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.body = ''
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 20 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    bodyErrors () {
      const errors = []
      if (!this.$v.body.$dirty) return errors
      !this.$v.body.minLength &&
        errors.push('Text must be at least 20 characters long')
      !this.$v.body.required && errors.push('Text is required')
      return errors
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
