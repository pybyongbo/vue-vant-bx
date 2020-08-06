// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './node_modules/vue'
import App from './App'
import { objStore, objRouter } from './router'
import Vant from './node_modules/vant'
import './node_modules/vant/lib/index.css';
import VeeValidate from './node_modules/vee-validate'
import "./node_modules/@/utils/validator/extends"
import messagesCN from './node_modules/@/utils/validator/message_CN'
import attrCN from './node_modules/@/utils/validator/attr_CN'

//引入icon字体文件

import "./node_modules/@/assets/font/iconfont.css"

Vue.config.productionTip = false



const veeConfig = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0.5,
    locale: 'cn',
    messages: null,
    strict: true,
    inject: false,
    dictionary: {
        cn: {
            messages: messagesCN,
            attributes: attrCN,
        },
    },
}


Vue.use(Vant);

Vue.use(VeeValidate, veeConfig)
/* eslint-disable no-new */
// console.log('objRouter',router)
new Vue({
    el: '#app',
    router: objRouter,

    components: { App },
    template: '<App/>'
})
