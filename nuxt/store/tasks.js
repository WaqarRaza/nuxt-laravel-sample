import ls from 'localstorage-slim';

export const getters = {
    getTasks(state) {
        return state.tasks
    },
    getSelectedTask(state) {
        return state.task
    },
    getError(state) {
        return state.error
    }
}

export const state = () => ({
    tasks: ls.get('tasks') ?? [],
    task: ls.get('task') ?? null,
    error: null
})

export const mutations = {
    setError(state, payload) {
        state.error = payload
    },
    setTasks(state, payload) {
        state.tasks = payload
    },
    setTask(state, payload) {
        state.task = payload
    },
    pushTask(state, payload) {
        // const max = state.tasks.length ? state.tasks.reduce(function (prev, current) {
        //     return (prev.id > current.id) ? prev.id : current.id
        // }) : 0
        // payload['id'] = max + 1
        // payload['is_completed'] = false
        state.tasks.push(payload)
    },
    updateTask(state, payload) {
        state.tasks.find(x => x.id === payload.id).title = payload.title
        state.tasks.find(x => x.id === payload.id).detail = payload.detail
    },
    markComplete(state, payload) {
        state.tasks.find(x => x.id === payload.id).is_completed = payload.is_completed
    },
    removeTask(state, payload) {
        state.tasks.splice(state.tasks.findIndex(x => x.id == payload), 1)
    }
}

export const actions = {
    async load({commit}) {
        try {
            const {data: {data}} = await this.$axios.get(`/tasks`)
            commit('setError', null)
            commit('setTasks', data)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }
    },
    async create({commit}, payload) {
        try {
            const {data: {data}} = await this.$axios.post(`/tasks`, payload)
            commit('setError', null)
            commit('pushTask', data)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }
    },
    async update({commit, state}, payload) {
        try {
            const {data: {data}} = await this.$axios.patch(`/tasks/${state.task.id}`, payload)
            commit('setError', null)
            commit('updateTask', data)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }
    },
    async toggleComplete({commit, state}, payload) {
        try {
            const {data: {data}} = await this.$axios.patch(`/tasks/${payload}`, {
                is_completed: !state.tasks.find(x => x.id === payload).is_completed
            })
            commit('setError', null)
            commit('markComplete', data)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }
    },
    async destroy({commit}, payload) {
        try {
            await this.$axios.delete(`/tasks/${payload}`)
            commit('setError', null)
            commit('removeTask', payload)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }

    }
}

export const Task = {
    namespace: true,
    getters, state, mutations, actions
}

export default Task