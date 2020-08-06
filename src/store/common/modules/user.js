import api from '@/api/account'
import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes'
import * as types from '../mutation-types'

console.log(api)

// initial state
const initialState = {
  // 获取用户信息
  loading: false,
  info: {},
  error: null,
  // 用户登录
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  loginErrorCode: null,
  // 用户登出
  logoutLoading: false,
  logoutSuccess: false,
  logoutError: null,
}
// accountType {
//   普通用户: 2,
//   代理人: 1,
// }
const getters = {
  isLogin(state) {
    return !isEmpty(state.info)
  },
  // 个人用户
  isPersonal(state) {
    return includes(['2', '1'], state.info.userType)
  },
  // 认证用户
  isProfessional(state) {
    return state.info.userType === '1'
  },
  // 普通会员
  isNormalPerson(state) {
    return state.info.userType === '2'
  },
  // 代理会员
  isApprove(state) {
    return state.info.userType === '7'
  },
  // 渠道会员
  isChannel(state) {
    return state.info.userType === '3'
  },
  // 渠道员工
  isChannelstaff(state) {
    return state.info.userType === '5'
  },
  isUsrList(state) {
    return state.info.userType
  },
  // 是否实名认证的用户
  isIdentifyUser(state) {
    return !isEmpty(state.info.certiNo) && !isEmpty(state.info.userName)
  },
  // 是否是资质认证的用户
  isAptitudeUser(state) {
    return state.info.aptitudeCertiNo
  },
  getUserId(state) {
    return state.info.userId
  }
}

// actions
const actions = {
  // 获取用户信息
  getUserInfo({ commit }, params) {
    commit(types.USER_INFO_GET_START)
    return api.getUser({ ...params, t: Date.now() }).then((res) => {
      if (res.data.success) {
        commit(types.USER_INFO_GET_SUCCESS, res.data)
      } else {
        commit(types.USER_INFO_GET_FAIL, res.data.errorMsg)
      }
      return res.data.success
    }, (error) => {
      commit(types.USER_INFO_GET_FAIL, error)
    }).finally(() => {
      commit(types.USER_INFO_GET_END)
    })
  },
  // 帐号密码登录
  loginByAccount({ commit, dispatch }, params) {
    commit(types.USER_LOGIN_START)
    return api.userLoginByAccount(params).then((res) => {
      if (res.data.success) {
        commit(types.USER_LOGIN_SUCCESS, res.data)
        // // 登录成功立即调用getUserInfo
        dispatch('getUserInfo')
      } else {
        commit(types.USER_LOGIN_FAIL, res.data)
      }
      return res.data.success
    }, (error) => {
      commit(types.USER_LOGIN_FAIL, error)
      return false
    }).finally(() => {
      commit(types.USER_LOGIN_END)
    })
  },
  // 用户退出
  loginOut({ commit }, params) {
    commit(types.USER_LOGOUT_START)
    console.log("test123")
    return api.userLogout(params).then((res) => {
      if (res.data.success) {
        commit(types.USER_LOGOUT_SUCCESS)
      } else {
        commit(types.USER_LOGOUT_FAIL, res.data.errorMsg)
      }
      return res.data;
    }, (error) => {
      commit(types.USER_LOGOUT_FAIL, error)
    }).finally(() => {
      commit(types.USER_LOGOUT_END)
    })
  },
}

// mutations
const mutations = {
  // 获取用户信息
  [types.USER_INFO_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.USER_INFO_GET_SUCCESS](state, data) {
    state.info = data.value
    state.logoutSuccess = false
  },
  [types.USER_INFO_GET_FAIL](state, error) {
    state.error = error
    state.info = {}
  },
  [types.USER_INFO_GET_END](state) {
    state.loading = false
  },
  // 用户登录
  [types.USER_LOGIN_START](state) {
    state.loginLoading = true
    state.info = {}
    state.loginError = null
    state.loginErrorCode = null
  },
  [types.USER_LOGIN_SUCCESS](state) {
    state.loginSuccess = true
    state.logoutSuccess = false
  },
  [types.USER_LOGIN_FAIL](state, error) {
    const resultMsg = typeof error === 'object' ? error.statusText : error
    state.loginError = resultMsg || '网络异常'
    state.loginSuccess = false
    state.loginErrorCode = error.errorCode
  },
  [types.USER_LOGIN_END](state) {
    state.loginLoading = false
  },
  // 用户退出
  [types.USER_LOGOUT_START](state) {
    state.logoutLoading = true
    state.logoutError = null
  },
  [types.USER_LOGOUT_SUCCESS](state) {
    state.logoutSuccess = true
    // 清空用户信息和登录成功状态
    state.loginSuccess = false
    state.info = {}
  },
  [types.USER_LOGOUT_FAIL](state, error) {
    state.logoutError = error
    state.logoutSuccess = false
  },
  [types.USER_LOGOUT_END](state) {
    state.logoutLoading = false
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
