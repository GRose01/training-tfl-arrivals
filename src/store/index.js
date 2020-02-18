import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineId: "not selected", 
    stopPoint: "not selected",
    platform: "ot selected"
  },
  getters: {
  },
  mutations: {
    // Here we will create Jenny
    changeLine(state, line) {
      state.lineId = line
    },
    changeStation(state, station) {
      state.stopPoint = station
    },
    changePlatform(state, platform) {
      state.platform = platform
    }
  },
  actions: {
    // Here we will create Larry
    changeLine(context, line) {
      context.commit('changeLine', line)
    },
    changeStation(context, station) {
      context.commit('changeStation', station)
    },
    changePlatform(context, platform) {
      context.commit('changePlatform', platform)
    }
  },
  modules: {
  }
})
