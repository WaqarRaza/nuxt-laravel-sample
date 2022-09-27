<template>
  <v-list>
    <v-list-item
        :to="`dashboard`"
        router
        exact
    >
      <v-list-item-action>
        TM
      </v-list-item-action>
      <v-list-item-content>
        <h3>Task Manager</h3>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
        :to="`dashboard`"
        router
        exact
    >
      <v-list-item-action>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="`Dashboard`"/>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
        :to="`tasks`"
        router
        exact
    >
      <v-list-item-action>
        <v-icon>mdi-view-module</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="`Tasks`"/>
      </v-list-item-content>
    </v-list-item>
    <v-list-item
        @click="logout"
        router
        exact
    >
      <v-list-item-action>
        <v-icon>mdi-power</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="`Logout`"/>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "site-sidebar",
  methods: {
    ...mapActions({
      logoutAction: 'auth/logout',
    }),
    logout() {
      this.logoutAction()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>