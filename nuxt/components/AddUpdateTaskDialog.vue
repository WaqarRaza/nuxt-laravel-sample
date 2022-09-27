<template>
  <v-dialog
      v-model="dialog"
      max-width="70%"
      persistent
  >
    <v-sheet>
      <v-form>
        <v-card>
          <v-card-title class="text-h5">
            {{ selectedTask ? 'Update task' : 'Add new task' }}
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="title" :error-messages="$v.title.$dirty && !$v.title.required ? 'Title is required' : ''" label="Title"
                          outlined placeholder="Enter task title" @blur="$v.title.$touch"/>
            <v-textarea v-model="detail" :error-messages="$v.detail.$dirty && !$v.detail.required ? 'Details are required' : ''" label="Detail"
                        outlined placeholder="Enter detail description here" @blur="$v.detail.$touch"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="red darken-1"
                outlined
                rounded
                text
                @click="$emit('close')"
            >
              Close
            </v-btn>
            <v-btn
                :loading="loading"
                color="green darken-1"
                outlined
                rounded
                text
                @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {required} from "vuelidate/lib/validators";

export default {
  name: "AddUpdateTaskDialog",
  props: {
    dialog: {
      default: false
    },
  },
  data() {
    return {
      title: '',
      detail: '',
      loading: false,
    }
  },
  validations: {
    title: {required},
    detail: {required},
  },
  watch: {
    dialog() {
      this.$v.$reset()
      this.title = this.selectedTask ? this.selectedTask.title : ''
      this.detail = this.selectedTask ? this.selectedTask.detail : ''
      this.loading = false
    }
  },
  computed: {
    ...mapGetters({
      selectedTask: 'tasks/getSelectedTask',
      error: 'tasks/getError',
    })
  },
  methods: {
    ...mapActions({
      saveAction: 'tasks/create',
      updateAction: 'tasks/update',
    }),
    async save() {
      this.$v.$touch();
      if (!this.$v.title.$invalid && !this.$v.detail.$invalid) {
        this.loading = true
        this.selectedTask ? await this.updateTask() : await this.addTask()
        if (!this.error) {
          this.$emit('close')
        } else {
          this.toast(this.error.message, 'error')
        }
        this.loading = false
      }
    },
    async addTask() {
      await this.saveAction({
        title: this.title,
        detail: this.detail,
      })
      if (!this.error) {
        this.toast('Task created successfully')
      }
    },
    async updateTask() {
      await this.updateAction({
        title: this.title,
        detail: this.detail,
      })
      if (!this.error) {
        this.toast('Task updated successfully')
      }
    }
  }
}
</script>

<style scoped>

</style>