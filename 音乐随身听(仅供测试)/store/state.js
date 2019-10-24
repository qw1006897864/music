import api from '../api/'


const state = {
    redirectCode:{//接口返回状态码
      successCode:0,//成功返回状态码
      loseTokenCode:1029,//用户token失效
      loseLoginCode:1045,//用户未注册
      loseAuthCode:1038,//用户未授权
    },
    isAuth:false,
    loginState : false,//登录状态
    isLoginShow:false,//是否显示登录框
    wxShareHomeUrl:api.pageUrl+'?from=singlemessage',//首页微信分享地址
    wxShareBocUrl:api.pageUrl+'?from=singlemessage#/boc',//红包微信分享地址
    wxShareLotteryUrl:api.pageUrl+'?from=singlemessage#/lottery',//抽奖微信分享地址
    wxShareTaskUrl:api.pageUrl+'?from=singlemessage#/task/index',//任务墙微信分享地址
    wxShareSeckillUrl:api.pageUrl+'?from=singlemessage#/seckill/index',//任务墙微信分享地址
    wxShareStatus:null,//当前分享状态 --
}
export default state;
