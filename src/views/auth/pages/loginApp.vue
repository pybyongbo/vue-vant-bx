<template>
    <div class="p-login-container">
        <div class="m-login-bg"></div>
        <van-tabs @click="onClick" :border="false" :line-width="50">
            <van-tab v-for="item in pageArr" :key="item.id" :title="item.title">
            </van-tab>
        </van-tabs>

         <component ref="currentView" :is="currentView" />
         
         <div class="btn">
             <van-button 
             color="#c21b17" 
             round 
             type="primary" 
             size="large"
             @click="onLogin"
         >登录</van-button>
         </div>
         
        <!-- <div class="m-login-btn" @click="onLogin">登录</div> -->
        <div class="m-link-box">
            <template v-if="this.currentLoginType==0">
                <router-link to="/forget">忘记密码?</router-link>
            </template>
            <a href="javascript:;" @click.stop="onLinkToRegister">立即注册</a>
        </div>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
import loginByAccount from "_c/auth/loginByAccout";
import loginByMobile from "_c/auth/loginByMobile";

export default {
  name: "Login",
  components: {
    loginByAccount,
    loginByMobile
  },
  data() {
    return {
      currentLoginType: 0, // 当前登录方式
      currentView: this.$route.query.currentView || 'loginByAccount',
      pageArr:[
            {   
                id:1,
                title:'账号密码',
                // currentView:loginByAccount
            },
            {   
                id:2,
                title:'手机验证码',
                // currentView:loginByMobile
            }
        ]
   };
  },
  created() {},
  methods: {

    onClick(name, title) {
        console.log(name, title);
        this.currentLoginType = name;
         this.currentView = name === 0 ? 'loginByAccount' : 'loginByMobile'
        //   this.currentView.resetForm();
        console.log( this.$refs.currentView)
        this.$refs.currentView.resetForm();
    },
    onLinkToRegister() {
      const query = this.$route.query;
      this.$router.push({
        name: "register",
        query
      });
    },
    onLogin() {
        this.$refs.currentView.onLogin();
    }
  }
};
</script>

<style lang='scss' scoped>
.p-login-container {
    height: 100%;
    background-color: #fff;
    background-image: url("~assets/ft_bg.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2.428571rem;
  .m-login-bg {
    margin: 3rem 0 2rem;
    background: url("~assets/logo_bg.png") no-repeat center;
    width: 100%;
    height: 7.142857rem;
  }
  .btn{
      width:90%;
      margin: 0 auto;
  }
  .m-login-btn {
    border-radius: 3.571429rem;
    margin: 0 2.142857rem;
    line-height: 2.142857rem;
    font-size: 1.285714rem;
    padding: .714286rem 0;
    color: #fff;
    text-align: center;
    background: #c21b17;
  }
   .m-link-box {
    display: flex;
    margin-top: 29px;
    padding: 0 30px;
    a {
      display: block;
      flex: 1;
      color: #c21b17;
      text-align: center;
      -webkit-tap-highlight-color: transparent;
    }
    a:first-child {
      text-align: left;
    }
    a:last-child {
      text-align: right;
    }
  }
}
</style>
<style>
.van-tab{
    font-size:14px;
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border-width:0;
}
.van-cell::after{
    border:none;
}
.van-field{
    width:90%;
    margin:0 auto 10px;
    border-bottom: 1px solid #ebedf0;

}
.van-button--small{
    height:26px;
}
.van-cell-group{
    margin:50px auto;
}
.van-tabs--line{
    border:none!important;
}
.van-tabs__wrap{
    border:none;
}
.van-tabs--line .van-tabs__wrap{
    margin-bottom:50px;
}
</style>

