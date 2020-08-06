import axios from 'axios'
import Vue from 'vue'
import { debounce } from 'lodash'
import { Toast } from 'vant';
Vue.use(Toast);

// console.dir(axios)
const axiosInstancenews = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

//  记录请求个数
let requestCount = 0;

// 1s内所有请求都返回的话，就不显示loading
const debouncedShowLoading = debounce(() => {
    console.log('requestCount', requestCount)
    //if (requestCount > 0) {
    Toast.loading({
        message: '页面加载中...',
        forbidClick: true,
    })
    // }
}, 1000, {
    'leading': true,
    'trailing': false
});

axiosInstancenews.interceptors.request.use((config) => {
    const { isNeedLoader } = config;
    requestCount += 1
    console.log('isNeedLoader', isNeedLoader)
    // if (isNeedLoader) {
    requestCount == 1 && debouncedShowLoading();
    // requestCount += 1
    // }
    return config
}, (error) => {
    Toast.clear();
    return Promise.reject(error);
})
axiosInstancenews.interceptors.response.use((response) => {
    requestCount -= 1
    if (requestCount == 0) {
        Toast.clear();
    }
    return response
}, (error) => {
    Toast.clear();

    return Promise.reject(error);
})

// axiosInstancenews.all = axios.all;

export default axiosInstancenews

