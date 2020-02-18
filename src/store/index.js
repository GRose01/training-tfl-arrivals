import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineId: "not selected", 
    stopPoint: "not selected"
  },
  getters: {
  },
  mutations: {
    // Here we will create Jenny
    changeLine(state, line) {
      state.lineId = line
    }
  },
  actions: {
    // Here we will create Larry
    changeLine(context, line) {
      context.commit('changeLine', line)
    }
  },
  modules: {
  }
})
