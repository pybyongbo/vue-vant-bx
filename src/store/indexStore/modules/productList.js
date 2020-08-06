import api from '@/api/home'
import * as types from '../mutation-types'

// initial state
const intialState = {
  loading: true,
  error: null,
  page: 1,
  rows: 10,
  total: 0,
  list: [],
  activeTab: '',
  tabList: [],
}

// getters
const getters = {
}

// actions
const actions = {
  // 获取全部产品列表
  getProductList({ commit }, params) {
    commit(types.PRODUCT_LIST_GET_START)
    return api.getProductList(params).then((res) => {
      if (params.page === 1) {
        commit(types.PRODUCT_LIST_CLEAR)
      }
      const { rows } = res.data && res.data.resultContent.resultContent
      if (res.data.resultFlag) {
        commit(types.PRODUCT_LIST_GET_SUCCESS, res.data.resultContent.resultContent)
      } else {
        commit(types.PRODUCT_LIST_GET_FAIL, res.data.resultMsg)
      }
      return rows.length
    }).catch((error) => {
      commit(types.PRODUCT_LIST_GET_FAIL, error)
      return false
    }).finally(() => {
      // commit(types.PRODUCT_LIST_FILTER, state.activeTab)
      commit(types.PRODUCT_LIST_GET_END)
    })
  },
  setActiveTab({ commit }, index) {
    commit(types.PRODUCT_LIST_CURRENT_TAB_SET, index)
  },
  clearProductList({ commit }) {
    commit(types.PRODUCT_LIST_CLEAR)
  },
}

// mutations
const mutations = {
  // 获取列表
  [types.PRODUCT_LIST_GET_START](state) {
    state.loading = true
    state.error = null
    // state.list = []
  },
  [types.PRODUCT_LIST_GET_SUCCESS](state, data) {
    const { rows, total } = data;
    state.list = state.list.concat(rows || []);
    state.total = total || 0
  },
  [types.PRODUCT_LIST_GET_FAIL](state, error) {
    state.error = error
    // state.list = []
  },
  [types.PRODUCT_LIST_GET_END](state) {
    state.loading = false
  },
  [types.PRODUCT_LIST_CLEAR](state) {
    state.list = []
  },
  [types.PRODUCT_LIST_CURRENT_TAB_SET](state, index) {
    state.activeTab = index
    state.list = []
  },
}

export default {
  state: intialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
