import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/productStore';
import { sync } from 'vuex-router-sync';
import initGuards from '@/utils/guards';


const router = new Router({
  mode: 'history',
  base: '/mobile/product',
  routes: [
    {
      // 产品详情
      path: '/detail',
      name: 'productDetail',
      components: {
        default: () =>
          import(/* webpackChunkName: "productDetail" */ '../pages/index').catch(
          ),
      },
      meta: {
        isFreeAuth: true,
      },
    },
    
  ],
});

sync(store, router);
Vue.use(Router);

initGuards(store, router, true);

export const objRouter = router;
export const objStore = store;
