<template>
  <highchart
      :options="chartOptions"
      :update="['options.xAxis', 'options.series']"
  />
</template>

<script>

export default {
  name: 'BarChart',
  data() {
    return {}
  },
  props: {
    categories: {
      default: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    completedTasks: {
      default: []
    },
    remainingTasks: {
      default: []
    },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Tasks'
        },
        xAxis: {
          categories: this.categories
        },
        yAxis: {
          title: {
            text: 'Number of tasks'
          }
        },
        series: [{
          name: 'Completed',
          data: this.completedTasks
        }, {
          name: 'Remaining',
          data: this.remainingTasks
        }]
      }
    }
  },
}
</script>
