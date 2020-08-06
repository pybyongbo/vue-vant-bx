import axiosInstance from './config'
import axios from 'axios'

const qs = require('qs')

// 保费试算
const premiumCalc = params => axiosInstance.post('premium/calculate', params, {
  headers: { 'Content-Type': 'application/json' },
  emulateJSON: false,
})
// 获取产品信息
const getProductDetail = params => axiosInstance.get(`product/query/productCode/${params.productCode}`, params)

// 获取产品信息
const getProductDetailInfo = params => axiosInstance.get(`product/${params}?terminal=0`)
// 订单确认
const sendOrderSubmit = params => axiosInstance.post('order/submit', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

// 获取支付方式
const getPayType = params => axiosInstance.get('fingard/getPaymentWay', { params })

// 请求支付
const launchPay = ({ paymentType, paymentCode }, options) => axiosInstance.post(`fingard/payment/${paymentType}/${paymentCode}`, null, options)


// 出单接口
const getOutOrder = params => axiosInstance.post('order/issue', params, {
  timeout: 15000,
})
// h5支付出单接口
const getPayOrderInfo = params => axiosInstance.post('order/queryIssueOrder', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

// 海报中心
const getProductImages = params => axiosInstance.post('/posterBazaar/queryUserToPasters', params)
// 产品海报
const getProductPoster = params => axiosInstance.get(`posterBazaar/queryPosterByProduct/${params.productCode}`, params)
// 产品分享统计
const productShareCount = ({ productCode, extensionCode }) => axiosInstance.get(`share/product/callback/${productCode}/${extensionCode}`)
// 产品分享被查看的次数
const productShareViewCount = ({ productCode, extensionCode }) => axiosInstance.get(`share/click/product/${productCode}/${extensionCode}`)
// 获取职业列表
const getProfessionList = params => axiosInstance.get('codeTale/profession', { params })
// 获取省市列表
const getCityList = params => axiosInstance.get(`codeTale/${params.code}`, {})
// 获取全国省市区
const getCityListAll = params => axiosInstance.post('provinceCity/getByLevel/3', params)
// 产品搜藏
const setStar = params => axiosInstance.post('user/favorite/addOrCancelFavorite', qs.stringify(params), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
// 产品详情计算保费接口
const getPremium = params => axios.post('/calculation/product/v1/quotation', params
)
// 支付成功跳转页面
const getCallBackUrl = params => axiosInstance.post('/insurance/callBackPaying', params)
// 分享转发统计
const getShareForward = (productCode, extensionCode) => axiosInstance.get(`/share/product/callback/${productCode}/${extensionCode}`)
// 浏览次数
const getBrowseCount = (productCode, extensionCode) => axiosInstance.get(`/share/click/product/${productCode}/${extensionCode}`)
// 海报浏览
const getPosterBrowseCount = (productCode, posterId, extensionCode) => axiosInstance.get(`/share/poster/browse/${productCode}/${posterId}/${extensionCode}`)
// 海报分享统计
const getPosterShareForward = (productCode, posterId, extensionCode) => axiosInstance.get(`/share/poster/callback/${productCode}/${posterId}/${extensionCode}`)

export default {
  premiumCalc,
  getProductDetail,
  sendOrderSubmit,
  getPayType,
  launchPay,
  getOutOrder,
  getPayOrderInfo,
  getProductPoster,
  productShareCount,
  productShareViewCount,
  getProfessionList,
  getCityList,
  getCityListAll,
  setStar,
  getProductDetailInfo,
  getProductImages,
  getCallBackUrl,
  getPremium,
  getShareForward,
  getBrowseCount,
  getPosterBrowseCount,
  getPosterShareForward
}
