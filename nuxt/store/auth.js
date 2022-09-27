import ls from 'localstorage-slim'
import VuexPersistence from 'vuex-persist'

ls.config.encrypt = true;

export const getters = {
    getUser(state) {
        return state.user
    },
    getToken(state) {
        return ls.get('access_token') ?? state.access_token
    },
    getError(state) {
        return state.error
    }
}

export const state = () => ({
    access_token: ls.get('access_token') ?? '',
    user: ls.get('user') ?? null,
    error: null
})

export const mutations = {
    setToken(state, payload) {
        if (payload) ls.set('access_token', payload)
        else ls.remove('access_token')
        state.access_token = payload
    },
    setUser(state, payload) {
        if (payload) ls.set('user', payload)
        else ls.remove('user')
        state.user = payload
    },
    setError(state, payload) {
        state.error = payload
    },
}

export const actions = {
    async login({commit}, payload) {
        try {
            const response = await this.$axios.post(`/login`, payload)
            commit('setUser', response.data.data.user)
            commit('setToken', response.data.data.access_token)
            commit('setError', null)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }
    },
    async register({commit}, payload) {
        try {
            const response = await this.$axios.post(`/register`, payload)
            commit('setUser', response.data.data.user)
            commit('setToken', response.data.data.access_token)
            commit('setError', null)
        } catch (err) {
            commit('setError', {
                code: err.response.data.status,
                message: err.response.data.message,
            })
        }
    },
    logout({commit}, payload) {
        commit('setUser', null)
        commit('setToken', null)
    }
}

export const plugins = [new VuexPersistence().plugin]

export const Auth = {
    namespace: true,
    getters, state, mutations, actions, plugins
}

export default Auth