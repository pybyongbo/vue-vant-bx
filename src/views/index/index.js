// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../../App'
import { objStore, objRouter } from './router'
import Vant,{Lazyload} from 'vant'
import 'vant/lib/index.css';
import VeeValidate from 'vee-validate'
import "@/utils/validator/extends"
import messagesCN from '@/utils/validator/message_CN'
import attrCN from '@/utils/validator/attr_CN'
import "@/filter"
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

// Vue.use(Lazyload)
Vue.use(Vant);
Vue.use(Lazyload, {
    lazyComponent: true,
    preLoad: 1.3,
    error: 'static/img/error.jpg',
    loading: require("@/assets/image/common/banner-loading.png"),
    attempt: 3
});
Vue.use(VeeValidate, veeConfig)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: objRouter,
    store: objStore,
    components: { App },
    template: '<App/>'
})
