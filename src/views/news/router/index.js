import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/productStore';
import { sync } from 'vuex-router-sync';
import initGuards from '@/utils/guards';

const router = new Router({
    mode: 'history',
    base: '/mobile/find',
    routes: [

        {
            path: 'findList',
            name: 'findList',
            components: {
                center: () =>
                    import ( /* webpackChunkName: "productList" */ '../views/ProductList').catch(),
                bottom: Menu,
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