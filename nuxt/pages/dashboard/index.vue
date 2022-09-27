<template>
  <v-container fluid>
    <v-card class="line-chart-card">
      <bar-chart :completed-tasks="[5,2,3]" :remaining-tasks="[2,2,3]" :categories="['Jul-2022', 'Aug-2022', 'Sep-2022']"/>
    </v-card>

  </v-container>
</template>

<script>

import BarChart from "../../components/charts/BarChart";

export default {
  name: 'IndexPage',
  components: {BarChart},
  head() {
    return {
      title: 'Dashboard'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.line-chart-card {
  max-height: 20rem;
}

.line-chart-card > * {
  height: 100%;
}

.line-chart {
  height: 100%;
}
</style>