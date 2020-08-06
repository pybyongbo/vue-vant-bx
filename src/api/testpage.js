import axiosInstancenews from './confignews'



// 列表 /manage/product/list.do
const newsList = params => axiosInstancenews.get('/manage/product/list.do', { params })


export default {
    newsList
}