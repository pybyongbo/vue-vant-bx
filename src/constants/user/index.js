
// 我的(个人中心)页面Icon菜单列表
export const USER_LIST_MENU = [
  { name: 'inviteFriends', displayName: '邀请好友', url: '/inviteFriends', icon: '01',iconUrl:require('@/assets/image/user/icon-1.png'), type: 2 },
  // { name: 'collect', displayName: '我的收藏', url: '/collect', icon: '08' },
  { name: 'certification', displayName: '资质认证', url: '/certification', icon: '02',iconUrl:require('@/assets/image/user/icon-2.png'), type: 7 },
  { name: 'OrderDeclarlist', displayName: '出单申报', url: '/OrderDeclarlist', icon: '14', type: 7,iconUrl:require('@/assets/image/user/icon-3.png'), show: 'only7' },
  { name: 'insuredAccount', displayName: '投保账号', url: '/insuredAccount', icon: '12', iconUrl:require('@/assets/image/user/icon-4.png'), type: 7, show: 'only7' },
  { name: 'bankcard', displayName: '我的银行卡', url: '/bindBankcard', icon: '03',iconUrl:require('@/assets/image/user/icon-3.png'), type: undefined },
  { name: 'statistics', displayName: '分享统计', url: '/statistics', icon: '04',iconUrl:require('@/assets/image/user/icon-4.png'), type: 2 },
  // { name: 'footprint', displayName: '我的足迹', url: '/footprint', icon: '09' },
  // { name: 'comment', displayName: '我的评论', url: '/comment', icon: '10' },
  // { name: 'tutorial', displayName: '新手指引', url: '/tutorial', icon: '05' },
  { name: 'callphone', displayName: '客服咨询', url: '/callphone', icon: '06',iconUrl:require('@/assets/image/user/icon-5.png'), type: undefined },
  { name: 'feedback', displayName: '意见反馈', url: '/feedback', icon: '07',iconUrl:require('@/assets/image/user/icon-6.png'), type: undefined },
];
// Channelstaff
export const USER_CHANNELSTAFF_LIST_MENU = [
  { name: 'order', displayName: '查看订单', url: '/order', icon: '01', type: undefined },
  { name: 'posters', displayName: '查看海报', url: '/posters', icon: '02', type: undefined },
  { name: 'callphone', displayName: '客服咨询', url: '/callphone', icon: '06', type: undefined },
  { name: 'feedback', displayName: '意见反馈', url: '/feedback', icon: '07', type: undefined },
]