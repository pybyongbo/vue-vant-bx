import axiosInstance from './config'

const qs = require('qs')

/* *****************************用户信息********************************** */
// 获取用户信息
const getUser = params => axiosInstance.get('user/info', {
        params,
    })
    // 更新用户信息
const userUpdateInfo = params => axiosInstance.post('user/completionInfo', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 用户登录
const userLogin = params => axiosInstance.post('user/login', params, {
        headers: {
            'Content-Type': 'application/json',
        },
        emulateJSON: false,
    })
    // 短信验证码登录
const userLoginByMobile = params => axiosInstance.post('user/code/login', params, {
        headers: {
            'Content-Type': 'application/json',
        },
        emulateJSON: false,
    })
    // 用户退出
const userLogout = params => axiosInstance.post('user/logout', params)
    // 修改密码
const userModifyPassword = params => axiosInstance.post('user/resetPassword', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 实名认证
const identify = params => axiosInstance.post('/user/updateCertiNo', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 资质认证
const hasApproveInfo = params => axiosInstance.post('circ/aptitude/certification', qs.stringify(params), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    isNeedLoader: true,
})

/* *****************************消息********************************** */
// 获取用户未读消息数量
const getMessageUnread = params => axiosInstance.get('message/countMessage', {
        params,
    })
    // 获取消息列表
const getMessageList = params => axiosInstance.post('message/getMessages', params)
    // 获取消息详情
const getMessageDetail = params => axiosInstance.get('message/getMessageDetails', {
    params,
})

/* *****************************我的财富********************************** */
// 获取推广费汇总
const getFortuneData = params => axiosInstance.get('finance/queryTotalMoney', {
        params,
    })
    // 绑定银行卡
const binkBankCard = params => axiosInstance.post('user/bindBankCard', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        isNeedLoader: true,
    })
    // 获取银行卡信息
const getBankCardInfo = params => axiosInstance.post('user/getBankCardInfo', params)
    // 是否绑定了银行卡
const getBankCardIsBind = params => axiosInstance.get('user/isBindBankCard', {
        params,
    })
    // 提现手续费税费
const getCashApplyTax = params => axiosInstance.get('finance/getCashApplyTax', {
        params,
    })
    // 提现次数
const checkCashApply = params => axiosInstance.get('finance/checkBeforeCashApply', {
        params,
    })
    // 提现是否成功
const getCashApply = params => axiosInstance.post('finance/cashApply', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        isNeedLoader: true,
    })
    // 获取提现记录
const getCacherList = params => axiosInstance.get('finance/queryCashApplyList', {
        params,
    })
    // 获取推广费明细
const getFortuneDeatil = params => axiosInstance.get('finance/queryProFeeList', {
    params,
})

/* *****************************分享统计********************************** */
// 分享统计
const getShareDataList = params => axiosInstance.get('statistics/productShare', params)

// 分享统计-海报
const getShareDataposterList = params => axiosInstance.get('statistics/posterShare', params)


/* *****************************意见反馈********************************** */
// 意见反馈列表
const getSuggestionList = params => axiosInstance.post('suggestion/list', params)
    // 提交意见反馈
const setSuggestionSave = params => axiosInstance.post('suggestion/save', qs.stringify(params), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})

// 上传图片  (接口有问题 - 2020-05-19 - )
// const uploadImageByBase64 = params => axiosInstance.post('disk/upload/base64', qs.stringify(params), {
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     isNeedLoader: true,
// })

const uploadImageByFile = params => axiosInstance.post('disk/upload/image', qs.stringify(params), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    isNeedLoader: true,
})


const uploadImageByBase64 = params => axiosInstance.post('upload/singleFile', params,{
    headers: {
        'Content-Type': 'multipart/form-data'
      }
})

/* *****************************客户********************************** */
// 获取保单客户信息
const getCustomer = params => axiosInstance.get('customer/searchCusList', {
        params,
    })
    // 删除准客户
const deletCustomer = params => axiosInstance.post('customer/deleteQuasiCustomer', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 添加准客户
const addCustomer = params => axiosInstance.post('customer/addQuasiCustomer', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 获取客户资料
const getCustomerOrderList = params => axiosInstance.get('customer/searchCusDetail', {
    params,
})

/* *****************************订单保单********************************** */
// 获取客户订单
const getOrderListFromCustom = params => axiosInstance.post('party/orderlist', params, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    // 获取我的订单
const getOrderListFromMyself = params => axiosInstance.post('party/my/orderlist', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 获取保单详情
const getInsurancePolicyDetail = params => axiosInstance.post('party/policyDetail', JSON.stringify(params))

// 问题件
const getQuestionList = params => axiosInstance.get('question/queryquestionlist', {
    params,
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})

// 问题件-详情页面
const getQuestionDetail = params => axiosInstance.get('/question/queryQuestionById', {
    params,
}, {
    headers: {
        'Content-Type': 'application/json',
    },
})

// 问题件-补充资料上传
const updateQuestion = params => axiosInstance.post('question/UpdateQuestion', params, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    // 删除订单 party/deleted
const deletOrderItem = params => axiosInstance.get(`party/deleted/${params.id}`)
    // 订单列表获取去预约 order/getSubscribeURL?orderNo=
const getSubscribeURL = params => axiosInstance.get('order/getSubscribeURL', {
    params,
})
const getOrderDetail = params => axiosInstance.post('party/orderdetail', qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // 订单查询(输入保单号、身份证等信息查询)
const orderCheck = params => axiosInstance.get('order/queryOrderFront', {
    params,
})

/* *****************************我的邀请********************************** */
// 我的邀请
const getInviteList = params => axiosInstance.get('statistics/invitation', params)
    /* *****************************我的收藏********************************** */
    // 我的收藏
const getCollectList = params => axiosInstance.get('user/favorite/listPage', {
    params,
})

export default {
    getUser,
    identify,
    getMessageUnread,
    getMessageList,
    getFortuneData,
    getMessageDetail,
    userUpdateInfo,
    userLogin,
    userLoginByMobile,
    userLogout,
    userModifyPassword,
    getCashApplyTax,
    checkCashApply,
    getCashApply,
    binkBankCard,
    getBankCardInfo,
    getBankCardIsBind,
    hasApproveInfo,
    getShareDataList,
    getShareDataposterList,
    getSuggestionList,
    setSuggestionSave,
    uploadImageByBase64,
    uploadImageByFile,
    getFortuneDeatil,
    getCustomer,
    deletCustomer,
    addCustomer,
    getCustomerOrderList,
    getOrderListFromCustom,
    getOrderListFromMyself,
    getQuestionList,
    getQuestionDetail,
    updateQuestion,
    deletOrderItem,
    getSubscribeURL,
    getOrderDetail,
    getInviteList,
    getCacherList,
    orderCheck,
    getCollectList,
    getInsurancePolicyDetail,
}