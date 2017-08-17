import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    selectedLanguage: {},
    results: {},
    token: null,
    user: null
  },
  mutations: {
    setSelectedLanguage (state, selectedLanguage) {
      state.selectedLanguage = selectedLanguage
    },
    setResults (state, results) {
      state.results = results;
    },
    setToken (state, token) {
      state.token = token;
    },
    setUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    setSelectedLanguage ({commit}, selectedLanguage) {
      commit('setSelectedLanguage', selectedLanguage)
    },
    setResults ({commit}, results) {
      commit('setResults', results);
    },
    setToken ({commit}, token) {
      commit('setToken', token);
    },
    setUser ({commit}, user) {
      commit('setUser', user);
    }
  }
})

export default store;
