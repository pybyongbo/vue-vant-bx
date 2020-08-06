<template>
    <div class="p-login-container">
        <div class="m-login-bg"></div>
        <van-cell-group>
            <van-field 
            v-model="username"
            label="姓名"
            placeholder="请输入您的姓名"
            v-validate="'required|username'" 
            name="username" 
            data-vv-as="用户名" 
            autocomplete="off"
            clearable
            label-align="right"
            label-width="78"
            />
            <van-field v-model="phone" 
            type="tel" 
            label="手机号" 
            placeholder="请输入手机号" 
            v-validate="'required|mobile'" 
            name="mobile" 
            data-vv-as="手机号" 
            clearable autocomplete="off"
            label-align="right"
               label-width="78"
            />

            <van-field
            v-model="sms"
            center
            clearable
            label="验证码"
            placeholder="请输入短信验证码"
            label-align="right"
               label-width="78"
            >
            <template #button>
                <van-button size="small" type="primary">发送验证码</van-button>
            </template>
            </van-field>

            <van-field 
              v-model="password"
              label="登录密码"
              placeholder="请输入您的登录密码"
              v-validate="'required|username'" 
               name="password" 
               type="password"
               data-vv-as="登录密码" 
               autocomplete="off"
               clearable
               label-align="right"
               label-width="82"
               />
                <van-field 
                v-model="inviteCode" 
                 label="邀请码"
                  placeholder="请输入邀请码"
                   v-validate="'required|mobile'" 
                   name="mobile" 
                   data-vv-as="手机号" 
                   clearable 
                   autocomplete="off"
                   label-align="right"
               label-width="78"
                   />
                <div class="protocol">
                    <p class="notice">
                        <van-checkbox
                        checked-color="#c21b17"
                        v-model="agree"
                        data-vv-as="注册协议"
                        >
                        注册即同意
                        <!-- <a @click="goToRegisterAgreement">《盈泰保险经纪平台注册协议》</a> -->
                        <!--  -->
                        </van-checkbox>
                        <router-link tag="a" to="/registAgreement">《盈泰保险经纪平台注册协议》</router-link>
                    </p>
                </div>
        </van-cell-group>
        

        <div class="m-login-btn" @click="onLogin">注册</div>

    </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  name: "Register",
    $_veeValidate: {
    validator: "new" // give me a new validator each time.
  },
  components: {
 
  },
  data() {
    return {
     phone:'',
     username:'',
     sms:'',
     password:'',
     inviteCode:'',
     agree:true
   };
  },
  created() {},
  methods: {

    onClick(name, title) {

    },
    goToRegisterAgreement() {
        console.log('1111')
      const query = this.$route.query;
      this.$router.push({
        name: "registAgreement",
        query
      });
    },
    onLogin() {
        console.log('register')
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
    .van-cell-group{
        margin-bottom:50px;
    }
  .m-login-bg {
    margin: 3rem 0 2rem;
    background: url("~assets/logo_bg.png") no-repeat center;
    width: 100%;
    height: 7.142857rem;
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
   
  .protocol{
      p{
          padding-left:20px;
          .van-checkbox{
            float:left;
          }
          span.van-checkbox__label{
              
          }
          a{
              color: #c21b17;
          }
      }
  }
}
</style>
<style>
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border-width:0;
}
</style>

