import createStore from '@/store'
// import comment from '@/store/indexStore/modules/comment'
// import createPersistedState from 'vuex-persistedstate'

// import premiumCondition from './modules/premiumCondition'
import productDetail from './modules/productDetail'
// import policy from './modules/policy'
// import citys from './modules/citys'
// import securityCode from './modules/securityCode'
// import profession from './modules/profession'
// import launchPay from './modules/launchPay'
// import productShare from './modules/productShare'
// import star from './modules/star'

// const plugins = createPersistedState({
//   paths: ['premiumCondition', 'policy', 'productDetail', 'profession', 'citys'],
// })

export default createStore({
//   citys,
//   launchPay,
//   policy,
//   premiumCondition,
  productDetail,
//   productShare,
//   profession,
//   securityCode,
//   // star,
//   comment,
}, 
// plugins
)
