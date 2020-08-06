// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../../App'
import { objStore, objRouter } from './router'
import Vant from 'vant'
import 'vant/lib/index.css';
import VeeValidate from 'vee-validate'
import "@/utils/validator/extends"
import messagesCN from '@/utils/validator/message_CN'
import attrCN from '@/utils/validator/attr_CN'

//引入icon字体文件

import "@/assets/font/iconfont.css"

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
    el: '#login-app',
    router: objRouter,
    components: { App },
    template: '<App/>'
})
