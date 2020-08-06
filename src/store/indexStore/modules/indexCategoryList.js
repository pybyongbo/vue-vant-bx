import cloneDeep from 'lodash/cloneDeep'

import request from '@/api/home'
import * as types from '../mutation-types'
// initial state
const categoryState = {
  loading: true,
  indexRecommentList: [],
  categoryList: [],
  insuranceTypesList: [],
}

// getters
const getters = {
}

// actions
const actions = {
// 首页ICON图标
//   getIndexCategoryIcon({ commit }, params) {
//     return request.getCategoryIndexIcon(params).then((res) => {
//       if (res.data.resultFlag) {
//         commit(types.INDEX_CATEGORYLIST_ICON_GET_SUCCESS, res.data.resultContent)
//       } else {
//         commit(types.INDEX_CATEGORYLIST_ICON_GET_FAIL, res.data.resultMsg)
//       }
//     }, (error) => {
//       commit(types.INDEX_CATEGORYLIST_ICON_GET_FAIL, error)
//     })
//   },

//   getIndexRecomment({ commit }, params) {
//     return request.getIndexProductrecommend(params).then((res) => {
//       console.log('首页特色产品推荐数据', res.data)
//       if (res.data.resultFlag) {
//         commit(types.INDEX_CATEGORY_RECOMMENT_GET_SUCCESS, res.data.resultContent)
//       } else {
//         commit(types.INDEX_CATEGORY_RECOMMENT_GET_FAIL, res.data.resultMsg)
//       }
//     }, (error) => {
//       commit(types.INDEX_CATEGORY_RECOMMENT_GET_FAIL, error)
//     })
//   },

// 首页特色分类点击更多数据
  getCategoryProducts({ commit }, params) {
    commit(types.INDEX_CATEGORY_GET_START)
    return request.getIndexCatelist(params).then((res) => {
      console.log('首页特色分类点击更多数据', res.data);
      const { rows } = res.data && res.data.resultContent.resultContent
      if (res.data.resultFlag) {
        commit(types.INDEX_CATEGORY_GET_SUCCESS, res.data.resultContent)
      } else {
        commit(types.INDEX_CATEGORY_GET_FAIL, res.data.resultMsg)
      }
      return rows.length
    }, (error) => {
      commit(types.INDEX_CATEGORY_GET_FAIL, error);
      return false
    }).finally(() => {
      commit(types.INDEX_CATEGORY_GET_END)
    })
  },

  clearProductCategoryList({ commit }) {
    commit(types.PRODUCT_CATEGORY_LIST_CLEAR)
  },
}

// mutations
const mutations = {
  // ICON 数据
  [types.INDEX_CATEGORYLIST_ICON_GET_SUCCESS](state, data) {
    state.insuranceTypesList = cloneDeep(data.resultContent) || [];
  },
  // 首页特色分类数据
  [types.INDEX_CATEGORY_RECOMMENT_GET_SUCCESS](state, data) {
    state.indexRecommentList = cloneDeep(data.resultContent) || [];
  },
  [types.INDEX_CATEGORY_RECOMMENT_GET_FAIL](state) {
    state.indexRecommentList = []
  },
  [types.INDEX_CATEGORY_GET_START](state) {
    state.categoryList = []
  },
  // 特色分类点击更多数据
  [types.INDEX_CATEGORY_GET_SUCCESS](state, data) {
    console.log('data', data);
    const { rows } = data.resultContent;
    state.categoryList = cloneDeep(rows) || [];

    console.log('rows.length', rows.length)
    return rows.length
  },
  [types.PRODUCT_CATEGORY_LIST_CLEAR](state) {
    state.categoryList = []
  },
  [types.INDEX_CATEGORY_GET_FAIL](state) {
    state.insuranceTypesList = []
    state.categoryList = []
  },
  [types.INDEX_CATEGORY_GET_END](state) {
    // state.categoryList = []
    state.loading = false
  },
}

console.log('categoryState', categoryState)
export default {
  state: categoryState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
