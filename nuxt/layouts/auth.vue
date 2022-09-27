<template>
  <v-app dark class="app">
    <v-main>
      <div class="auth-container">
        <Nuxt/>
      </div>
      <site-footer class="transparent"/>
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

<style scoped>
.app {
  background: rgb(63, 94, 251);
  background: linear-gradient(27deg, rgba(57, 30, 255, 1) 0%, rgba(200, 20, 200, 1) 65%, rgba(252, 70, 107, 0.7) 100%);
}

.auth-container {
  margin: 5rem auto;
  max-width: 50rem;
  height: fit-content;
}

/*.align-center {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*}*/

@media (max-width: 480px) {
  .auth-container {
    padding: 5px;
  }
}
</style>
