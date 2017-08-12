import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  trict: true,
  state: {
    selectedLanguage: {}
  },
  mutations: {
    setSelectedLanguage (state, selectedLanguage) {
      state.selectedLanguage = selectedLanguage
    }
  },
  actions: {
    setSelectedLanguage ({commit}, selectedLanguage) {
      commit('setSelectedLanguage', selectedLanguage)
    }
  },
  getters: {
  }
})

export default store;
