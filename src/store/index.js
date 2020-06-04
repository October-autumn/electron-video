import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogined: false,
    realname: '小博美'
  },
  mutations: {
    login(state) {
      state.isLogined = true
    },
    noLogin(state) {
      state.isLogined = false
    },
    setRealname(state, name) {
      state.realname = name
    }
  },
  actions: {
  },
  modules: {
  }
})
