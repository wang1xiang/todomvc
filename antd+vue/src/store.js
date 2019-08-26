import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allItem: [],
    completeItem: [],
    unCompleteItem: []
  },
  getters: {
    getAllItem: state => {
      state.allItem = state.allItem.length === 0 ? JSON.parse(localStorage.getItem('all')) || [] : state.allItem
      return state.allItem
    },
    getCompleteItem: state => {
      state.completeItem = state.completeItem.length === 0 ? JSON.parse(localStorage.getItem('complete')) || [] : state.completeItem
      return state.completeItem
    },
    getUnCompleteItem: state => {
      state.unCompleteItem = state.unCompleteItem.length === 0 ? JSON.parse(localStorage.getItem('unComplete')) || [] : state.unCompleteItem
      return state.unCompleteItem
    }
  },
  mutations: {
    setAllItem (state, data) {
      state.all = data
    },
    setCompleteItem (state, data) {
      if (typeof data === 'string') {
        state.allItem.map(item => item.complete = true)
        state.completeItem = state.allItem
        state.unCompleteItem = []
      } else if (typeof data === 'object' && data.length) {
        state.completeItem = data
      } else {
        state.completeItem.push(data)
        state.allItem.splice(state.allItem.indexOf(data), 1, data)
        state.unCompleteItem.splice(state.unCompleteItem.indexOf(data), 1)
      }
      localStorage.setItem('complete', JSON.stringify(state.completeItem))
      localStorage.setItem('all', JSON.stringify(state.allItem))
      localStorage.setItem('unComplete', JSON.stringify(state.unCompleteItem))
    },
    setUnCompleteItem (state, data) {
      if (typeof data === 'string') {
        state.allItem.map(item => item.complete = false)
        state.unCompleteItem = state.allItem
        state.completeItem = []
      } else if (typeof data === 'object' && data.length) {
        state.unCompleteItem = data
      } else {
        if (state.completeItem.indexOf(data) > -1) {
          state.allItem.splice(state.allItem.indexOf(data), 1, data)
          state.completeItem.splice(state.completeItem.indexOf(data), 1)
        } else {
          state.allItem.push(data)
        }
        state.unCompleteItem.push(data)
      }
      localStorage.setItem('complete', JSON.stringify(state.completeItem))
      localStorage.setItem('unComplete', JSON.stringify(state.unCompleteItem))
      localStorage.setItem('all', JSON.stringify(state.allItem))
    }
  }
})
