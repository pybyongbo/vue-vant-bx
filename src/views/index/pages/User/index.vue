<template>
    <div class="user-center">
        <h2>用户中心</h2>
        <h3>会员等级:{{isApprove?'代理会员':'普通会员'}}</h3>
        <van-cell-group>
            <van-cell title="用户名" :value="userName" />
            <van-cell title="手机号" :value="tel" />
            <van-cell title="用户等级" :value="userLevel" />
            <van-cell title="注册时间" :value="createdDate" />
        </van-cell-group>
        <div class="user-logout-btn" @click.stop="onClickLogout">退出账号</div>
    </div>
</template>

<script>
import { toToast } from "@/utils/tools.js";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    const { user } = this.$store.state;
    return {};
  },
  computed: {
    ...mapGetters("user", ["isPersonal", "isApprove"]),
    ...mapState("user", {
      userName: state => state.info.userName,
      merchantName: state => state.info.merchantName,
      tel: state => state.info.mobile || "",
      userType: state => state.info.userType || 2,
      userLevel: state => state.info.userLevel || '',
      createdDate: state => state.info.registerDate || "",
      inviteCode: state => state.info.inviteCode,
      sex: state => state.info.gender || "M",
      emailInit: state => state.info.email,
      addressInit: state => state.info.address,
      updateUserError: state => state.updateUserError,
      logoutSuccess: state => state.logoutSuccess,
      logoutError: state => state.logoutError,
      agentCodeNum: state => state.info.agentCode,
      orgLevel: state => state.info.userLevel,
      nickname: state => state.info.nickname,
      openid: state => state.info.openid
    })
  },
  methods: {
    ...mapActions("user", ["getUserInfo", "loginOut"]),
    onClickLogout() {
      this.loginOut().then(res => {
        const { value, errorMsg } = res;

        if (value == "success") {
          this.$router.push({
            name: "indexPage"
          });
        } else {
          toToast(errorMsg);
        }
      });
    }
  }
};
</script>

<style scoped>
.user-center{
    height: 100%;
    position: relative;
    overflow: hidden;
}
.user-logout-btn {
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  font-size: 17px;
  color: #d3a243;
  line-height: 50px;
  text-align: center;
}
</style>