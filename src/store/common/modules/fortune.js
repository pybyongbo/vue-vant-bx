import api from '@/api/mine'
import * as types from '../mutation-types'

// initial state
const fortuneState = {
  loading: true,
  result: {}, // totalProFee累计推广费 totalMonthFee当月推广费 balanceFee可提现
  error: null,
  total: [],
}

// getters
const getters = {
}

// actions
const actions = {
  queryBalance({ commit }, params) {
    commit(types.QUERY_TOTAL_MONEY_START)
    return api.getFortuneData(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.QUERY_TOTAL_MONEY_SUCCESS, res.data)
      } else {
        commit(types.QUERY_TOTAL_MONEY_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.QUERY_TOTAL_MONEY_FAIL, error)
    }).finally(() => {
      commit(types.QUERY_TOTAL_MONEY_END)
    })
  },
  clearFortuneInfo({ commit }) {
    commit(types.FORTUNE_CLEAR_STATE)
  },
}

// mutations
const mutations = {
  [types.QUERY_TOTAL_MONEY_START](state) {
    state.loading = true
    state.error = null
  },
  [types.QUERY_TOTAL_MONEY_SUCCESS](state, data) {
    state.result = data.resultContent || {}
  },
  [types.QUERY_TOTAL_MONEY_FAIL](state, error) {
    state.error = error
    state.result = {}
  },
  [types.QUERY_TOTAL_MONEY_END](state) {
    state.loading = false
  },
  [types.FORTUNE_CLEAR_STATE](state) {
    state.result = {}
  },
  totalFrotune(state, data) {
    state.total = data
  },
}

export default {
  state: fortuneState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
