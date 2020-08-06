import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/indexStore'
import { sync } from 'vuex-router-sync';
import initGuards from '@/utils/guards';
import { ROUTER_BASE } from '@/constants'

const router = new Router({
    mode: 'history',
    base: `${ROUTER_BASE}/auth`,
    routes: [
        {
            path: '/login',
            name: 'login',
            components: {
                default:() =>
                    import ( /* webpackChunkName: "login" */ '../pages/loginApp').catch(),

            },
            meta: {
                isFreeAuth: true,
              },
        },
        {
            path: '/register',
            name: 'register',
            components: {
                default:() =>
                    import ( /* webpackChunkName: "register" */ '../pages/register').catch(),

            },
            meta: {
                isFreeAuth: true,
              },
        },
        {
            path: '/registAgreement',
            name: 'registAgreement',
            components: {
                default:() =>
                    import ( /* webpackChunkName: "productList" */ '../pages/agreement').catch(),

            },
            meta: {
                isFreeAuth: true,
              },
        },
    ]
});

sync(store, router);
Vue.use(Router);

initGuards(store, router, true);

export const objRouter = router;
export const objStore = store;