<template>
  <v-card>
    <v-form autocomplete="off" @submit.prevent="register">
      <v-card-title class="text-uppercase">Sign up</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" :error-messages="$v.name.$dirty && !$v.name.required ? 'Name is required' : ''"
                      label="Name" outlined placeholder="Enter your name here" @blur="$v.name.$touch"/>
        <v-text-field v-model="email" :error-messages="$v.email.$dirty && !$v.email.required ? 'Email is required' : ($v.email.$dirty && !$v.email.email ? 'Please enter a valid email' : '')"
                      label="Email" outlined placeholder="Enter your email here" type="email" @blur="$v.email.$touch"/>
        <v-text-field v-model="password" :error-messages="$v.password.$dirty && !$v.password.required ? 'Password is required' : ''"
                      label="Password" outlined placeholder="Enter your password here" type="password" @blur="$v.password.$touch"/>
        <v-text-field v-model="password_confirmation" :error-messages="$v.password_confirmation.$dirty && !$v.password_confirmation.required ? 'Confirm Password is required' : ($v.password_confirmation.$dirty && !$v.password_confirmation.sameAs ? 'Confirm Password is not same as password' : '')"
                      label="Confirm Password" outlined placeholder="Enter again your password here" type="password" @blur="$v.password_confirmation.$touch"/>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn :to="`/`" block color="primary" text>Go to Sign in</v-btn>
        <v-btn type="submit" block color="primary" dark>Sign Up</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>

import {email, required, sameAs} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SignUpPage',
  layout: 'auth',
  middleware: 'guest',
  head() {
    return {
      title: 'Sign Up'
    }
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
    }
  },
  validations: {
    name: {required},
    email: {email, required},
    password: {required},
    password_confirmation: {required, sameAs: sameAs('password')},
  },
  computed: {
    ...mapGetters({
      error: 'auth/getError'
    })
  },
  methods: {
    ...mapActions({
      registerAction: "auth/register",
    }),
    async register() {
      this.$v.$touch();
      if (!this.$v.name.$invalid && !this.$v.email.$invalid && !this.$v.password.$invalid && !this.$v.password_confirmation.$invalid) {
        await this.registerAction({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        if (this.error) {
          this.toast(this.error.message, 'error')
        } else {
          this.toast('Register successfully')
          await this.$router.push('/dashboard')
        }
      }
    }
  }
}
</script>
