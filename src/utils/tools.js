import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
export const trimStr = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');

export const toToast=(txt) =>{
    Toast({
      message: txt,
      position: "middle"
    });
  }