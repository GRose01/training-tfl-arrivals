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
    // Here we will create Jenny
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
    // Here we will create Larry
    changeLine({ commit }, line) {
      commit('changeLine', line)
    },
    changeStation(context, station) {
      context.commit('changeStation', station)
    },
    changePlatform(context, platform) {
      context.commit('changePlatform', platform)
    },
    setTimetable(context, timetable) {
      context.commit('setTimetable', timetable)
    }
  },
  modules: {
  }
})
