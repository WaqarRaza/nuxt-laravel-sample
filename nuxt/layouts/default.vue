<template>
  <v-app dark>
    <v-navigation-drawer
        :mini-variant="min_menu"
        fixed
        app
    >
      <site-sidebar></site-sidebar>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="min_menu = !min_menu"/>
      <v-spacer></v-spacer>
      <v-btn fab small class="mr-2" elevation="0" @click="$vuetify.theme.dark=!$vuetify.theme.dark">
        <v-icon v-if="$vuetify.theme.dark">mdi-brightness-2</v-icon>
        <v-icon v-if="!$vuetify.theme.dark">mdi-brightness-6</v-icon>
      </v-btn>
      <span>{{ $moment().format('D MMM, YYYY') }}</span>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
      <site-footer></site-footer>
    </v-main>
  </v-app>
</template>

<script>
import SiteFooter from "../components/SiteFooter";
import SiteSidebar from "../components/SiteSidebar";

export default {
  name: 'DefaultLayout',
  components: {SiteSidebar, SiteFooter},
  data() {
    return {
      min_menu: false,
      theme: 0,
    }
  }
}
</script>
