import api from '@/api/product'
import * as types from '../mutation-types'

// initial state
const pdState = {
  loading: true,
  currentCode: '',
  info: {},
  error: null,
  success: false,
}

const getters = {
}

// actions
const actions = {
  setCurrentCode({ commit }, Code) {
    commit(types.PRODUCT_DETAIL_SET_CURRENTCODE, Code)
  },
  getProductDetail({ commit }, params) {
    commit(types.PRODUCT_DETAIL_GET_START)
    return api.getProductDetail(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.PRODUCT_DETAIL_GET_SUCCESS, res.data)
      } else {
        commit(types.PRODUCT_DETAIL_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.PRODUCT_DETAIL_GET_FAIL, error)
    }).finally(() => {
      commit(types.PRODUCT_DETAIL_GET_END)
    })
  },
  resetProductDetail({ commit }) {
    commit(types.PRODUCT_DETAIL_RESET_INFO)
  },
  loadProductDetailSuccess({ commit }) {
    commit(types.PRODUCT_DETAIL_LOADER_SUCCESS)
  },
}

// mutations
const mutations = {
  [types.PRODUCT_DETAIL_SET_CURRENTCODE](state, code) {
    state.currentCode = code
  },
  [types.PRODUCT_DETAIL_RESET_INFO](state) {
    state.loading = false
    state.info = {}
    state.error = null
    state.success = false
  },
  [types.PRODUCT_DETAIL_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.PRODUCT_DETAIL_GET_SUCCESS](state, data) {
    const product = data.resultContent
    state.info = product
  },
  [types.PRODUCT_DETAIL_GET_FAIL](state, error) {
    state.error = (error === null || typeof error === 'string') ?
      { status: false, message: error || '产品已经下架' } : error
    state.info = {}
  },
  [types.PRODUCT_DETAIL_GET_END](state) {
    state.loading = false
  },
  [types.PRODUCT_DETAIL_LOADER_SUCCESS](state) {
    state.success = true
  },
}

export default {
  state: pdState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
