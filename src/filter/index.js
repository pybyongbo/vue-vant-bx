import Vue from 'vue'

//定义一些全局过滤器
Vue.filter('subStrFilter', (value,num) => {
    if (value && value.length > num) {
        value = value.substring(0, num) + "...";
    }
    return value;
})