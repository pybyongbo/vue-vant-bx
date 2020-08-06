import axiosInstance from './config'
// 一级分类二级分类
//const tabFirst = params => axiosInstance.get('cms/column/getTree', { params })

const tabFirst = params => axiosInstance.get('cms/content/oneColumn', { params })

// 列表
const cmsList = params => axiosInstance.get('cms/content/query', { params })

// 详情
const getCmsDetail = params => axiosInstance.get('cms/content/input', { params })
export default {
  tabFirst,
  cmsList,
  getCmsDetail,
}
