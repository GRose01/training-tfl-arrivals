import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lineId: "not selected", 
    stopPoint: "not selected",
    platform: "not selected",
    timetable: []
  },
  getters: {
  },
  mutations: {
    // mutations are the only way to alter the state
    changeLine(state, line) {
      state.lineId = line
    },
    changeStation(state, station) {
      state.stopPoint = station
    },
    changePlatform(state, platform) {
      state.platform = platform
    },
    setTimetable(state, timetable) {
      state.timetable = timetable
    }
  },
  actions: {
    // actions interact with the mutations
    changeLine({ commit }, line) {
      commit('changeLine', line)
    },
    changeStation({ commit }, station) {
      commit('changeStation', station)
    },
    changePlatform({ commit }, platform) {
      commit('changePlatform', platform)
    },
    setTimetable({ commit }, timetable) {
      commit('setTimetable', timetable)
    }
  },
  modules: {
  }
})
