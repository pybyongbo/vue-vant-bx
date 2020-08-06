import axiosInstance from './config'

const qs = require('qs')

// 获取用户信息
const getUser = params => axiosInstance.get('user/info', { params })
// 获取短信验证码
const getMsgAuthCode = params => axiosInstance.post('user/genMsgAuthCode', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
// 更新用户信息
const userUpdateInfo = params => axiosInstance.post('user/completionInfo', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
// 用户登录
const userLoginByAccount = params => axiosInstance.post('user/login', params)
// 用户手机号码登录
const userLoginByMobile = params => axiosInstance.post('user/code/login', params)
// 用户注册
const userRegister = params => axiosInstance.post('user/register', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
// 忘记密码
const userForgetPassword = params => axiosInstance.post('user/forgetPassword', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
// 用户退出
const userLogout = params => axiosInstance.post('user/logout', params)

// 获取图形验证码
const userGetImgCode = params => axiosInstance.post('user/checkImg', params)
// 修改密码
const userModifyPassword = params => axiosInstance.post('user/resetPassword', params)
// 验证短信验证码
const checkMsgAuthCode = params => axiosInstance.post('user/check/msgAuthCode', params)

export default {
  userLoginByAccount,
  userLoginByMobile,
  getUser,
  userRegister,
  userGetImgCode,
  userModifyPassword,
  userForgetPassword,
  getMsgAuthCode,
  checkMsgAuthCode,
  userUpdateInfo,
  userLogout,
}
