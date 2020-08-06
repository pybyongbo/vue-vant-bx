import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/indexStore'
// import IndexHome from "@/views/Index/index"
// import loginApp from '@/views/Auth/loginApp'
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
    mode: 'history',
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
                    center: () =>
                        import( /* webpackChunkName: "mainIndex" */ '../pages/Index').catch(),
                    bottom: Menu,
                },
                meta: {
                    isFreeAuth: true,
                },
            },
            {
                path: 'productList',
                name: 'productList',
                components: {
                    center: () =>
                        import( /* webpackChunkName: "productList" */ '../pages/ProductList').catch(),
                    bottom: Menu,
                },
                meta: {
                    isFreeAuth: true,
                },
            },
            {
                path: 'find',
                name: 'find',
                components: {
                    center: () =>
                        import( /* webpackChunkName: "findList" */ '../pages/Cms').catch(),
                    bottom: Menu,
                },
                meta: {
                    isFreeAuth: true,
                },
            },

            {
                path: 'news',
                name: 'news',
                components: {
                    center: () =>
                        import( /* webpackChunkName: "findList" */ '../pages/Testpage').catch(),
                    bottom: Menu,
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
                        import('../pages/User').catch(),
                    bottom: Menu,
                },
            },

            ]
        },

        {//分类产品列表
            path:'/categoryList',
            name:'categoryList',
            components: {
                default: () =>
                    import( /* webpackChunkName: "categoryList" */ '../pages/ProductList/category').catch(),
            },
            meta: {
                isFreeAuth: true,
            },
        },
        { // 精选资讯
            path: '/findDetail/:id',
            name: 'findDetail',
            components: {
                default: () =>
                    import( /* webpackChunkName: "findDetail" */ '../pages/Cms/detail').catch(),
            },
            meta: {
                isFreeAuth: true,
            },
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


// sync(store, router)
Vue.use(Router)

initGuards(store, router, true)

export const objRouter = router
export const objStore = store
