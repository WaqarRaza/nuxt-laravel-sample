<template>
  <v-footer
      :absolute="true"
  >
    All rights are reserved
    <span>&nbsp; &copy; {{ new Date().getFullYear() }}</span>
    <slot></slot>
  </v-footer>
</template>

<script>
export default {
  name: "SiteFooter"
}
</script>

<style scoped>

</style>