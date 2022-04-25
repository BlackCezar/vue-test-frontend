import { createStore } from 'vuex'

export default createStore({
  state: {
    filters: {
      transferCounts: [],
      company: null
    }
  },
  getters: {
  },
  mutations: {
    setCompanyFilter: (state, company) => {
      state.filters.company = company
    },
    updateTransferCount: (state, count) => {
      let index = state.filters.transferCounts.indexOf(count)
      if (index === -1) {
        state.filters.transferCounts.push(count)
      } else {
        state.filters.transferCounts.splice(index, 1)
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
