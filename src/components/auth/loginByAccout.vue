<template>
    <div>
        <van-cell-group>
            <van-field v-model="username" label="用户名" v-validate="'required|mobile'" name="mobile" data-vv-as="手机号"  placeholder="请输入用户名" autocomplete="off" clearable>
                <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="edit"></van-icon>
            </van-field>

            <van-field v-model="password" :type="textType" label="密 码" placeholder="请输入手机号" clearable autocomplete="off">
                <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="look"></van-icon>
                <van-icon slot="right-icon" :name="inputType" @click="changeinputType" />
            </van-field>
        </van-cell-group>
    </div>
</template>

<script>
import qs from 'qs'
import pickBy from 'lodash/pickBy';
import request from '@/api/account'
import { toToast } from "@/utils/tools.js";
export default {
  name: "loginByAccount",
  $_veeValidate: {
    validator: "new" // give me a new validator each time.
  },
  data() {
    return {
      username: "",
      password: "",
      textType: "password",
      inputType: "closed-eye"
    };
  },
  methods: {
    resetForm() {
      this.username = "";
      this.phone = "";
    },

    changeinputType() {
      this.inputType == "eye-o"
        ? (this.textType = "password")
        : (this.textType = "text");
      this.inputType == "eye-o"
        ? (this.inputType = "closed-eye")
        : (this.inputType = "eye-o");
    },

    onLogin() {
        console.log("account")
      this.$validator.validateAll().then(result => {
          console.log('result',result)
        if (!result) {
          console.log(this.errors.all());
          this.toToast(this.errors.all()[0]);
          return;
        } else {
          const postConf = {
            loginName: this.account || this.username,
            password: this.password,
            imgCode: this.hasShowVFCode && this.vfcode
          };
          this.loginByAccount(pickBy(postConf));

          //   this.$toast.loading({
          //     message: "登录中...",
          //     forbidClick: true,
          //     loadingType: "spinner"
          //   });
          //   window.location.replace(`/mobile/index/main/user`)
        }
      });
    },
    loginByAccount(postConf) {
      request
        .userLoginByAccount(postConf)
        .then(res => {
          const { errorCode, errorMsg, success } = res.data
          this.LoginStatus = success
          if (success) {
            // const loginCookie = Cookie.get('ZATECH1000100')
            // localStorage.setItem('loginCookie', loginCookie)
            const { search } = window.location

            const fromUrl = qs.parse(search, { ignoreQueryPrefix: true })
              .fromUrl
            console.log('fromUrl', fromUrl)
            if (fromUrl) {
              // 绑定微信
            //   const getQueryString = wxapi.getQueryString()
            //   let code = getQueryString.code
              //if (code) {
                // api
                //   .getWxUserInfo({ code, state: 'STATE' })
                //   .then(res => {
                //     console.log(res)
                //   })
                //   .catch(err => {
                //     console.log(err)
                //   })
             // }

              const decodedUrl = window.decodeURIComponent(fromUrl)
              window.location.replace(`${decodedUrl}`)
            }
          } else {
            this.errorCode = errorCode
            let baseurl = this.getProjectPath
            let fromUrl = this.$route.query.fromUrl
            let url = `${baseurl}/mobile/auth/login?fromUrl=${fromUrl}`
            window.history.pushState(null, null, url)
           toToast(errorMsg)
            // this.$vux.toast.show({
            //   text: errorMsg,
            //   type: 'text',
            //   width: 'auto'
            // })
          }
        })
        .catch(error => {
          console.log('error',error);
          return;
          let baseurl = this.getProjectPath
          let fromUrl = this.$route.query.fromUrl
          let url = `${baseurl}/mobile/auth/login?fromUrl=${fromUrl}`
          window.history.pushState(null, null, url)
            toToast('网络异常,稍后重试')

        //   this.$vux.toast.show({
        //     text: '网络异常,稍后重试',
        //     type: 'text',
        //     width: 'auto'
        //   })
        })
    },
    toToast(txt) {
      this.$toast({
        message: txt,
        position: "middle"
      });
    }
  }
};
</script>

<style scoped>
</style>