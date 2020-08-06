import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/indexStore'
// import IndexHome from "@/views/Index/index"

// import HelloWorld from '@/components/HelloWorld'

// import loginApp from '@/views/Auth/loginApp'
// import registerApp from '@/views/Auth/register'

// import registAgreement from '@/views/Auth/agreement'
import initGuards from '@/utils/guards'
import {
    sync,
} from 'vuex-router-sync'

import Menu from '@/components/Menu'
import MainPage from '@/views/Main'

Vue.use(Router)

const router = new Router({
// export default new Router({
    mode:'history',
    base: '/mobile/index',
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: {
                name: 'indexPage'
            }
        },
        {
            path: '/main',
            name: 'MainPage',
            components: {
                default: MainPage,
            },
            children: [{
                path: 'index',
                name: 'indexPage',
                //component: loginApp,
                components: {
                    // center: () =>
                    //     import( /* webpackChunkName: "mainIndex" */ '../views/index').catch(),
                    // bottom: Menu,
                },
                meta: {
                    isFreeAuth: true,
                },
            },
            {
                path: 'productList',
                name: 'productList',
                components: {
                    // center: () =>
                    //     import ( /* webpackChunkName: "productList" */ '../views/ProductList').catch(),
                    // bottom: Menu,
                },
                meta: {
                    isFreeAuth: true,
                },
            },
            {
                path: 'find',
                name: 'find',
                components: {
                    // center: () =>
                    //     import ( /* webpackChunkName: "findList" */ '../views/Newslist').catch(),
                    // bottom: Menu,
                },
                meta: {
                    isFreeAuth: true,
                },
            },

            {
                path: 'user',
                name: 'user',
                components: {
                    center: () =>
                        import ( '').catch(),
                    // bottom: Menu,
                },
                // meta: {
                //     isFreeAuth: true,
                // },
            },
        
          ]
            // components: {
            //         default: () => 
            //             import ( /* webpackChunkName: "mainIndex" */ '../views/Index').catch(),
            //         bottom: Menu,
            //     },
        },

        // {
        //     path: '/login',
        //     name: 'login',
        //     component: loginApp
        // },
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: registerApp
        // }, {
        //     path: '/registAgreement',
        //     name: 'registAgreement',
        //     component: registAgreement
        // }
    ]
})


sync(store, router)
Vue.use(Router)

initGuards(store, router, true)
// console.log(router)
export const objRouter = router
export const objStore = store
