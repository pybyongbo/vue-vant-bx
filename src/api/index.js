import axiosInstance from './config'

const qs = require('qs')

// 首页轮播图
const getIndexBanner = params => axiosInstance.get('advertise/queryAdvertiseByCondition', { params, isNeedLoader: true });

//首页Icon分类
const getIndexIcon = params => axiosInstance.get('classification', { params, isNeedLoader: true });

//首页特色分类产品推荐
const getIndexRecom = params => axiosInstance.get('characteristic/classification', { params, isNeedLoader: true });


// 分类产品,首页ICON 进入(tab标题)
const getProductCategory = params => axiosInstance.get('classification', { params, isNeedLoader: true })


const getProductList = params => axiosInstance.get('category', { params, isNeedLoader: true });

// 首页点击更多分类操作
const getIndexCatelist = params =>
    axiosInstance.get('category/list', { params });

export default {
    getIndexBanner,
    getIndexIcon,
    getIndexRecom,
    getProductCategory,
    getProductList,
    getIndexCatelist
}