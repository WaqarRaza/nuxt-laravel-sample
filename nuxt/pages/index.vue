<template>
  <v-card>
    <v-form @submit.prevent="login">
      <v-card-title class="text-uppercase">Sign In</v-card-title>
      <v-card-text>
        <v-text-field v-model="email"
                      :error-messages="$v.email.$dirty && !$v.email.required ? 'Email is required' : ($v.email.$dirty && !$v.email.email ? 'Please enter a valid email' : '')" label="Email"
                      outlined placeholder="Enter your email here" type="email" @blur="$v.email.$touch"/>
        <v-text-field v-model="password" :append-icon="password_visible ? 'mdi-eye' : 'mdi-eye-off'"
                      :error-messages="$v.password.$dirty && !$v.password.required ? 'Password is required' : ''" :type="password_visible ? 'text' : 'password'" label="Password"
                      outlined placeholder="Enter your password here" @blur="$v.password.$touch()" @click:append="password_visible = !password_visible"/>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn :to="`signup`" block color="primary" text>Not Already Sign up? Sign up now</v-btn>
        <v-btn :loading="btn_loading" block color="primary" dark type="submit">Sign in</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {email, required} from "vuelidate/lib/validators"

export default {
  name: 'SignInPage',
  layout: 'auth',
  middleware: 'guest',
  head() {
    return {
      title: 'Sign In'
    }
  },
  validations: {
    email: {email, required},
    password: {required},
  },
  data() {
    return {
      email: null,
      password: null,
      password_visible: false,
      btn_loading: false,
    }
  },
  computed: {
    ...mapGetters({
      error: 'auth/getError'
    })
  },
  methods: {
    ...mapActions({
      loginAction: "auth/login",
    }),
    async login() {
      this.$v.$touch();
      if (!this.$v.email.$invalid && !this.$v.password.$invalid) {
        this.btn_loading = true
        await this.loginAction({
          email: this.email,
          password: this.password,
        })
        if (this.error) {
          this.toast(this.error.message, 'error')
        } else {
          this.toast('Login successfully')
          await this.$router.push('/dashboard')
        }

        this.btn_loading = false

      }
    }
  }
}
</script>
