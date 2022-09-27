<template>
  <v-container fluid>
    <v-card class="mb-10">
      <v-card-title>Tasks List</v-card-title>
      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                class="mr-2"
                color="primary"
                dark
                elevation="2"
                fab
                small
                @click="addDialog=true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add new</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">

            <v-btn
                v-bind="attrs"
                v-on="on"
                :loading="refresh_loading"
                elevation="2"
                fab
                small
                @click="refresh"
            >
              <v-icon>mdi-progress-download</v-icon>
            </v-btn>
          </template>
          <span>refresh data</span>
        </v-tooltip>

        <add-update-task-dialog :dialog="addDialog" @close="closeDialog"/>
      </v-card-actions>
      <v-simple-table>
        <template v-slot:default>
          <colgroup>
            <col width="10">
            <col>
            <col>
            <col width="50">
            <col width="150">
          </colgroup>
          <thead>
          <tr>
            <th>Action</th>
            <th>Title</th>
            <th>Detail</th>
            <th>Status</th>
            <th>Remove</th>
          </tr>
          </thead>
          <tbody v-if="list.length">
          <tr v-for="(item, index) in list" :key="item.name">
            <td>
              <v-checkbox :input-value="item.is_completed" @click="toggleComplete(item.id)"/>
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.detail }}</td>
            <td>
              <v-icon v-if="item.is_completed" color="green">mdi-check</v-icon>
              <v-icon v-if="!item.is_completed" color="red">mdi-close</v-icon>
            </td>
            <td class="flex-row">
              <v-btn color="transparent" elevation="0" fab small @click="editTask(item)">
                <v-icon color="info">mdi-circle-edit-outline</v-icon>
              </v-btn>
              <v-btn color="transparent" elevation="0" fab small @click="destroyTask(item.id)">
                <v-icon color="red">mdi-trash-can-outline</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
          <tfoot v-else>
          <tr>
            <td colspan="5">No data found</td>
          </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card>
    <v-card>

    </v-card>
  </v-container>
</template>

<script>
import AddUpdateTaskDialog from "../../components/AddUpdateTaskDialog";
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'IndexPage',
  components: {AddUpdateTaskDialog},
  head() {
    return {
      title: 'Tasks'
    }
  },
  computed: {
    ...mapGetters({
      list: 'tasks/getTasks',
    })
  },
  data() {
    return {
      addDialog: false,
      refresh_loading: false
    }
  },
  methods: {
    ...mapMutations({
      setTask: 'tasks/setTask'
    }),
    ...mapActions({
      loadAll: 'tasks/load',
      toggleComplete: 'tasks/toggleComplete',
      destroyTaskAction: 'tasks/destroy'
    }),
    async refresh() {
      this.refresh_loading = true
      await this.loadAll()
      this.refresh_loading = false

    },
    editTask(item) {
      this.setTask(item)
      this.addDialog = true
    },
    async destroyTask(id) {
      await this.destroyTaskAction(id)
      if (!this.error) {
        this.toast('Task deleted')
      } else {
        this.toast(this.error.message, 'error')
      }
    },
    closeDialog() {
      this.setTask(null)
      this.addDialog = false
    }
  },
  async created() {
    await this.loadAll()
  }
}
</script>
