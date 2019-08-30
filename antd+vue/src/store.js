import Vue from 'vue'
import Vuex from 'vuex'
import { fetch, urls } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allItem: []
  },
  getters: {
    getAllItem: state => {
      state.allItem = state.allItem.length === 0 ? JSON.parse(localStorage.getItem('all')) || [] : state.allItem
      return state.allItem
    },
    getCompleteItem: state => {
      state.allItem = state.allItem.length === 0 ? JSON.parse(localStorage.getItem('all')) || [] : state.allItem
      const complete = state.allItem.filter(item => item.complete)
      return complete
    },
    getUnCompleteItem: state => {
      state.allItem = state.allItem.length === 0 ? JSON.parse(localStorage.getItem('all')) || [] : state.allItem
      const unComplete = state.allItem.filter(item => !item.complete)
      return unComplete
    }
  },
  mutations: {
    setAllItem (state, data) {
      state.allItem = data
    },
    setCompleteItem (state, data) {
      // 全部完成
      if (data === 'all') {
        state.allItem.forEach(item => item.complete = true)
      } else {
        // 单个完成时
        state.allItem.find(item => item.index === data).complete = true
      }
      localStorage.setItem('all', JSON.stringify(state.allItem))
    },
    setUnCompleteItem (state, data) {
      if (typeof data === 'string') {
        // 全部更改
        if (data === 'all') {
          state.allItem.forEach(item => item.complete = false)
        } else {
          // 单个修改
          state.allItem.find(item => item.index === data).complete = false
        }
      } else {
        // 添加时判断是否存在
        const allValue = state.allItem.map(item => item.value)
        if (!allValue.includes(data.value)) {
          state.allItem.push(data)
        }
      }
      localStorage.setItem('all', JSON.stringify(state.allItem))
    },
    deleteItem (state, data) {
      state.allItem = state.allItem.filter(item => item.index !== data)
      localStorage.setItem('all', JSON.stringify(state.allItem))
    },
    deleteComplete (state) {
      state.allItem = state.allItem.filter(item => !item.complete)
      localStorage.setItem('all', JSON.stringify(state.allItem))
    },
    changeItem (state, data) {
      state.allItem.find(item => item.index === data.index).value = data.value
      localStorage.setItem('all', JSON.stringify(state.allItem))
    }
  },
  actions: {
    setAllItem ({commit}) {
      fetch(urls.getAll, { type: 'add' })
        .then(res => {
          const data = res.data.responseBody
          commit('setAllItem', data)
        })
    }
  }
})

// getters: {
//   getAllItem: state => {
//     state.allItem = state.allItem.length === 0 ? JSON.parse(localStorage.getItem('all')) || [] : state.allItem
//     return state.allItem
//   },
//   getCompleteItem: state => {
//     state.completeItem = state.completeItem.length === 0 ? JSON.parse(localStorage.getItem('complete')) || [] : state.completeItem
//     return state.completeItem
//   },
//   getUnCompleteItem: state => {
//     state.unCompleteItem = state.unCompleteItem.length === 0 ? JSON.parse(localStorage.getItem('unComplete')) || [] : state.unCompleteItem
//     return state.unCompleteItem
//   }
// },
// mutations: {
//   setAllItem (state, data) {
//     state.allItem = data
//   },
//   setCompleteItem (state, data) {
//     if (typeof data === 'string') {
//       state.allItem.map(item => item.complete = true)
//       state.completeItem = state.allItem
//       state.unCompleteItem = []
//     } else if (typeof data === 'object' && data.length) {
//       state.completeItem = data
//     } else {
//       state.completeItem.push(data)
//       state.allItem.splice(state.allItem.indexOf(data), 1, data)
//       state.unCompleteItem.splice(state.unCompleteItem.indexOf(data), 1)
//     }
//     localStorage.setItem('complete', JSON.stringify(state.completeItem))
//     localStorage.setItem('all', JSON.stringify(state.allItem))
//     localStorage.setItem('unComplete', JSON.stringify(state.unCompleteItem))
//   },
//   setUnCompleteItem (state, data) {
//     if (typeof data === 'string') {
//       state.allItem.map(item => item.complete = false)
//       state.unCompleteItem = state.allItem
//       state.completeItem = []
//     } else if (typeof data === 'object' && data.length) {
//       state.unCompleteItem = data
//     } else {
//       if (state.completeItem.indexOf(data) > -1) {
//         state.allItem.splice(state.allItem.indexOf(data), 1, data)
//         state.completeItem.splice(state.completeItem.indexOf(data), 1)
//       } else {
//         state.allItem.push(data)
//       }
//       state.unCompleteItem.push(data)
//     }
//     localStorage.setItem('complete', JSON.stringify(state.completeItem))
//     localStorage.setItem('unComplete', JSON.stringify(state.unCompleteItem))
//     localStorage.setItem('all', JSON.stringify(state.allItem))
//   }
// },
// actions: {
//   setAllItem ({commit}) {
//     return new Promise(resolve => {
//       fetch(urls.getAll)
//       .then(res => {
//         const data = res.data.responseBody
//         commit('setAllItem', data)
//         resolve(data)
//       })
//     })
//   }
// }