const { host, protocol } = window.location
// api 请求前缀
export const BASE_API = process.env.NODE_ENV === 'development' ? '/' : '/api'
// 网站根域名
export const ROOT_URI = `${protocol}//${host}`
// ROUTER_BASE
export const ROUTER_BASE = '/mobile'
// export const ROUTER_BASE = '/'

// 网站静态资源路径
export const STATIC_PATH = process.env.NODE_ENV === 'development' ? '/static/' : '/bundle/'
// 分享默认图标地址
export const SHARE_ICON_URI = `${ROOT_URI}${ROUTER_BASE}/static/img/logo1.png`
// 平分奖池分享图标
export const PRIZEPOOL_ICON_URI = `${ROOT_URI}${ROUTER_BASE}/static/img/pfjc_share_pic.png`


// 新闻资讯没有缩略图,分享出去
export const NEWS_ICON_URI = `${ROOT_URI}${ROUTER_BASE}/static/img/news_share_pic.png`
