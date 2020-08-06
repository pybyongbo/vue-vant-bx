import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'
// import Cookie from 'js-cookie'
import Vue from 'vue'
import { ROOT_URI,ROUTER_BASE } from '@/constants'

// const hidePopUp = () => {
//   // 路由跳转的时候关闭弹窗
//   forEach(document.querySelectorAll('.vux-popup-mask'), (item) => {
//     if (item.style.zIndex > 0) {
//       item.click()
//     }
//   })
//   Vue.$vux.alert.hide()
//   Vue.$vux.confirm.hide()
//   Vue.$vux.toast.hide()
//   Vue.$vux.loading.hide()

//   Vue.$vux.alert.hide()
//   Vue.$vux.confirm.hide()
// }

export default (store, router, needAuth = true) => {
  // 需要授权的页面，如果发现用户信息为空，就跳转到登录页面
  const sniffRoute = (isFreeAuth, to, cb) => {
    const user = store.state.user.info
    console.log('isFreeAuth',isFreeAuth)

    const { extensionCode, visitor } = to.query
    const fromUrl = router.resolve({ name: to.name, query: { ...to.query } }).href
    const toFullPath = window.encodeURIComponent(fromUrl)
    if (!isFreeAuth && isEmpty(user)) {
      // 如果不是别人分享过来的 并且 不是以游客身份进入的
      if (isEmpty(extensionCode) && !visitor) {
        console.log('toFullPath',toFullPath)
        //如果不加这个判断,不知道为什么会不停的重定向???
        if(window.location.href.indexOf('auth')>0){
            return
        }
        window.location.href = `${ROOT_URI}${ROUTER_BASE}/auth/login?fromUrl=${toFullPath}`
        cb(false)
        return
      }
    }
    cb()
  }

  
  if (needAuth) {
    router.beforeEach((to, from, next) => {
      // 有preview弹框的话，回退首先消失弹框
      const { isFreeAuth } = to.meta
      // 只有在刷新页面或者第一次进入App时候， 才需要先请求getUserInfo接口
      // 然后再进行鉴权， 其他情况（ajax跳转）默认视为已经请求过getUserInfo
      if (from.matched.length === 0) {
        // 如果localStorage里面有值，先从localStorage里面取出来，同步到cookie
        // 主要为了解决ios微信强退会清除cookie的问题
        // const loginCookie = localStorage.getItem('loginCookie')
        // if (loginCookie && !this.isInApp) {
        //   Cookie.set('ZATECH1000100', loginCookie)
        // }
        store.dispatch('user/getUserInfo').finally(() => {
          sniffRoute(isFreeAuth, to, next)
        })
        console.log(111);
      } else {
        sniffRoute(isFreeAuth, to, next)
        console.log(2222);
      }
    })
  }
  router.afterEach(() => {
    // hidePopUp()
    window.scrollTo(0, 0)
  })

  // router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => { // eslint-disable-line
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => { //eslint-disable-line
      return diffed || (diffed = (prevMatched[i] !== c)) //eslint-disable-line
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    // Vue.$vux.loading.show({
    //   text: '数据加载中...',
    // })
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // Vue.$vux.loading.hide()
        next()
      })
      .catch(next)
  })
}
