import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    selectedLanguage: {},
    results: {}
  },
  mutations: {
    setSelectedLanguage (state, selectedLanguage) {
      state.selectedLanguage = selectedLanguage
    },
    setResults (state, results) {
      state.results = results;
    }
  },
  actions: {
    setSelectedLanguage ({commit}, selectedLanguage) {
      commit('setSelectedLanguage', selectedLanguage)
    },
    setResults ({commit}, results) {
      commit('setResults', results);
    }
  },
  getters: {
  }
})

export default store;
