<template>
  <div class="user_index">
    <!-- <h2>用户中心</h2>
        <h3>会员等级:{{isApprove?'代理会员':'普通会员'}}</h3>
        <van-cell-group>
            <van-cell title="用户名" :value="userName" />
            <van-cell title="手机号" :value="tel" />
            <van-cell title="用户等级" :value="userLevel" />
            <van-cell title="注册时间" :value="createdDate" />
        </van-cell-group>
        <div class="user-logout-btn" @click.stop="onClickLogout">退出账号</div> -->
    <div class="user_info">
      <div class="user_message" @click="onLinkTo('/message')">
        <div v-if="messageCount > 0" class="number">{{ messageCount }}</div>
      </div>
      <div class="user_top">
        <div class="user_detail_info">
          <img src="~assets/image/user/photo.png" alt="头像" @click.stop="onLinkTo('/userInfo')" />
          <div :class="{'user_type':true,'pading':isNormalPerson,isChannelstaff_user_type:isChannelstaff ? true : false}">
            <div>
              <p>{{ userName || '未实名' }}</p>
              <p :class="{
                  professional: isProfessional ? true : false,
                  aptitude: isApprove ? true : false,
                  normal: isNormalPerson ? true : false,
                  isChannelstaff:isChannelstaff ? true : false,
              }"> <span>{{ userType }}{{isApprove?'代理会员':'普通会员'}}{{ userLevel }}</span></p>
            </div>
            <p v-if="!isNormalPerson && !isChannelstaff">
              <span>邀请码：</span>
              <span>{{ inviteCode }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 我的财富 -->
      <div v-if="!isChannelstaff" class="user_treasure">
        <div class="treasure">
          <p>我的{{ isApprove ?'佣金':'推广费' }}（元）</p>
          <div @click="goCache">去提现</div>
        </div>
        <div class="CanPay">
          <div v-if="isApprove">
            <div>
              <p>{{ balanceFee }}</p>
              <p>可提现推佣金</p>
            </div>
            <div>
              <p>{{ totalMonthFee }}</p>
              <p>结算中佣金</p>
            </div>
            <div>
              <p v-if="eye">{{ totalProFee }}</p>
              <p>累计佣金</p>
            </div>
          </div>
          <div v-else>
            <div>
              <p>{{ balanceFee }}</p>
              <p>可提现推广费</p>
            </div>
            <div>
              <p>{{ totalMonthFee }}</p>
              <p>结算中推广费</p>
            </div>
            <div>
              <p v-if="eye">{{ totalProFee }}</p>
              <p>累计推广费</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 财富订单客户邀请 -->
    <div v-if="!isChannelstaff" class="user_list">
      <!-- 渠道用户单独判断显示 -->
      <div @click.stop="onLinkTo('/fortune')">
        <img src="~assets/image/user/money.png" alt />
        <p>财富</p>
      </div>
      <div @click.stop="onLinkTo('/order')">
        <img src="~assets/image/user/book.png" alt />
        <p>订单</p>
      </div>
      <div v-if="isNormalPerson ? false : true" @click.stop="onLinkTo('/customer')">
        <img src="~assets/image/user/customer.png" alt />
        <p>客户</p>
      </div>
      <div v-if="isNormalPerson ? false : true" @click.stop="onLinkTo('/invite')">
        <img src="~assets/image/user/invite.png" alt />
        <p>邀请</p>
      </div>
      <div v-if="isNormalPerson ? false : true" @click.stop="onLinkTo('/posters')">
        <img src="~assets/image/user/posters.png" alt />
        <p>海报</p>
      </div>
    </div>

    <!-- 列表 -->
    <div :class="[isChannelstaff?'channelstaff':'']" class="user_more">
      <template v-if="!isChannelstaff">
        <!-- <div v-for="(item, index) in menus" v-show="isShowList(item)" :key="index" class="item" @click.stop="goLinkTo(item.url)">
          <div :class="['icon',`icon-${item.icon}`]" />
          <p>{{ item.displayName }}</p>
        </div> -->
        <van-cell-group v-for="(item, index) in menus" v-show="isShowList(item)" :key="index" >
          <van-cell :title="item.displayName" :icon="item.iconUrl" :border="false" :url="`/mobile/index${item.url}`" is-link/>
        </van-cell-group>

      </template>
      <template v-else>
        <div v-for="(item, index) in menusChannelstaff" v-show="isShowList(item)" :key="index" class="item" @click.stop="goLinkTo(item.url)">
          <div :class="['icon',`icon-${item.icon}`]" />
          <p>{{ item.displayName }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { toToast } from "@/utils/tools.js";
import { mapActions, mapState, mapGetters } from "vuex";
import { USER_LIST_MENU, USER_CHANNELSTAFF_LIST_MENU } from "@/constants/user";
export default {
  data() {
    const { user } = this.$store.state;
    return {
      eye: true,
      messageCount: 0,
      menus: USER_LIST_MENU,
      menusChannelstaff: USER_CHANNELSTAFF_LIST_MENU
    };
  },
  computed: {
    ...mapGetters("user", [
      "isPersonal",
      "isLogin",
      "isNormalPerson",
      "isApprove",
      "isProfessional",
      "isIdentifyUser",
      "isAptitudeUser",
      "isChannelstaff",
      "isUsrList"
    ]),
    ...mapState("user", {
      userName: state => state.info.userName,
      merchantName: state => state.info.merchantName,
      tel: state => state.info.mobile || "",
      userType: state => state.info.userType || 2,
      userLevel: state => state.info.userLevel || "",
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
    }),
    ...mapState("fortune", {
      balanceFee: state => state.result.balanceFee || 0, // 可提现
      totalProFee: state => state.result.totalProFee || 0, // 累计
      totalMonthFee: state => state.result.totalMonthFee || 0 // 当月累计
    })
  },
  methods: {
    ...mapActions("user", ["getUserInfo", "loginOut"]),

    goCache() {
      // if (!this.isBindBankCard) {
      //   const _this = this
      //   this.$vux.confirm.show({
      //     onCancel() {},
      //     onConfirm() {
      //       _this.$router.push({
      //         name: 'bindBankcard'
      //       })
      //     },
      //     confirmText: '去绑定',
      //     cancelText: '取消',
      //     content: '请先绑定银行卡才能提现'
      //   })
      //   return
      // }
      this.$router.push({
        name: "cache"
      });
    },

    isShowList(item) {
      if (item.type) {
        if (item.type == this.isUsrList) {
          if (item.show == "only7") {
            return true;
          }
          return false;
        }
        if (item.show == "only7") {
          return false;
        }
        return true;
      }
      return true;
    },
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

<style lang='scss' scoped>
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
.user_index {
  background: #f2f2f2;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.user_info {
  background-color: #fff;
  position: relative;
  height: 226.5px;
  .user_message {
    width: 23.5px;
    height: 20px;
    background: url("~assets/image/user/messages.png") center center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 19.5px;
    right: 20px;
    .number {
      width: 15px;
      height: 15px;
      background-color: #fff;
      line-height: 15px;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      top: -7px;
      right: -6px;
      color: #d3a243;
      font-size: 12px;
    }
  }
  .user_top {
    background: url("~assets/image/user/mine_bg.png") center center no-repeat;
    background-size: 100% 100%;
    height: 207px;
    width: 100%;
    padding-top: 30px;
    .user_detail_info {
      height: 60px;
      margin-left: 15px;
      img {
        height: 49px;
        width: 49px;
        border-radius: 50%;
        float: left;
        display: block;
        // margin-top: 3px;
      }
      .user_type {
        margin-left: 55px;
        p {
          margin: 0;
        }
        .user_name {
          padding-right: 50px;
          overflow: hidden;
          p {
            float: left;
            margin: 0;
            &:first-child {
              max-width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 0;
            }
          }
        }
        div {
          width: 250px;
          height: 35px;
          margin: 0;
          p:first-child {
            font-weight: 700;
            font-size: 22px;
            color: #ffffff;
            margin-right: 6px;
            float: left;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0;
          }
          p:last-child {
            float: left;
            margin-top: 5px;
            padding: 0 6px 3px 30px !important;
            font-size: 12px;
            text-align: left;
            border-radius: 13px;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.5);
            margin-left: 5px;
            position: relative;
            line-height: 21px;
            margin-top: 0;
            span {
              // color: red;
              // position: relative;
              position: relative;
              top: 3px;
              left: -2px;
            }
            img {
              position: absolute;
              left: -3px;
              top: -1px;
              width: 24px;
              height: 24px;
            }
          }
          .isChannelstaff {
            // padding-left: 12px !important;
            // height: 26px;
            padding-right: 5px;
            height: 23px;
            &::after {
              content: "";
              width: 23px;
              height: 23px;
              border-radius: 50%;
              background: url("~assets/image/user/qudao.png") center center
                no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: -3px;
              top: -1px;
            }
          }
          .professional {
            padding-right: 5px;
            // height: 23px;
            &::after {
              content: "";
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background: url("~assets/image/user/prs.png") center center
                no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: -3px;
              // top: -1px;
            }
          }
          .aptitude {
            padding-right: 5px;
            height: 23px;
            &::after {
              content: "";
              width: 23px;
              height: 23px;
              border-radius: 50%;
              background: url("~assets/image/user/certifi.png") center center
                no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: -3px;
              top: -1px;
            }
          }
          .normal {
            // width: 116px;
            // padding-right: 10px;
            height: 23px;
            &::after {
              content: "";
              width: 23px;
              height: 23px;
              border-radius: 50%;
              background: url("~assets/image/user/star1.png") center center
                no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: -3px;
              top: -1px;
            }
          }
        }
        p {
          span {
            font-size: 12px;
            color: #ffffff;
            letter-spacing: 0;
          }
        }
      }
      .isChannelstaff_user_type {
        > div {
          p {
            margin-top: 12px;
          }
          .isChannelstaff {
            margin-top: 16px !important;
          }
        }
      }
      .pading {
        padding: 10px;
      }
    }
  }
  .user_treasure {
    position: absolute;
    height: 125px;
    width: 345px;
    left: 50%;
    transform: translateX(-50%);
    bottom: -22px;
    background-color: #fff;
    padding-top: 18px;
    box-shadow: 0 10px 30px 0 rgba(239, 242, 243, 1);
    .treasure {
      margin: 0 25px 23.5px 25px;
      height: 20px;
      p {
        font-size: 14px;
        color: #292b2d;
        float: left;
        position: relative;
        // background: url("~assets/image/user/treasure.png") 100% 100% no-repeat ;
        // background-position-y: 12px;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          display: block;
          width: 6.428571rem;
          height: 0.5rem;
          opacity: 0.3;
          background: #d3a243;
          border-radius: 0.857143rem;
        }
      }
      div {
        font-weight: 700;
        font-size: 14px;
        color: #d3a243;
        letter-spacing: 0;
        float: right;
        position: relative;
        padding-right: 20px;

        &::after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #c8c8cd;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          top: -2px;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 10px;
        }
      }
    }
    .CanPay {
      display: flex;
      width: 100%;
      div {
        width: 100%;
        div {
          // flex: 1;
          float: left;
          width: 33%;
          p:first-child {
            font-size: 17px;
            color: #292b2d;
            font-weight: 700;
            margin-bottom: 3px;
            text-align: center;
          }
          p:last-child {
            font-size: 12px;
            color: #b0b2b3;
            text-align: center;
          }
        }
      }
    }
  }
}
.user_list {
  display: flex;
  // height: 100px;
  padding-top: 25px;
  padding-bottom: 10px;
  background-color: #fff;
  margin-top: 30px;
  div {
    flex: 1;
    text-align: center;
    img {
      width: 24px;
      height: 27px;
      margin: 0 auto;
    }
    p {
      margin: 5px 0 0 0;
      text-align: center;
      font-size: 13px;
      color: #5b5f65;
    }
  }
}
.user_more {
  margin-top: 10px;
  background-color: #fff;
  padding: 13px 0 60px;
  .item {
    height: 45px;
    margin: 0 20px;
    position: relative;
    padding-left: 37px;
    p {
      font-size: 14px;
      color: #292b2d;
      line-height: 45px;
      height: 45px;
    }
    div {
      // position: absolute;
      // left: 0;
      // top: 50%;
      // transform: translateY(-55%);
      // background: url("~assets/image/user/icon_sprite.png");
      // background-size: 60.5px 58.5px;
      // &.icon-01 {
      //   background-position: -22px 0;
      //   width: 20px;
      //   height: 18px;
      // }
      // &.icon-02 {
      //   background-position: 0 0;
      //   width: 21.5px;
      //   height: 21.5px;
      // }
      // &.icon-03 {
      //   background-position: -42.5px -18px;
      //   width: 18px;
      //   height: 15.5px;
      // }
      // &.icon-04 {
      //   background-position: 0 -21.5px;
      //   width: 19px;
      //   height: 19px;
      // }
      // &.icon-05 {
      //   background-position: -42.5px 0;
      //   width: 18px;
      //   height: 18px;
      // }
      // &.icon-06 {
      //   background-position: -19.5px -22.5px;
      //   width: 18px;
      //   height: 18.5px;
      // }
      // &.icon-07 {
      //   background-position: 0 -41px;
      //   width: 18.5px;
      //   height: 16px;
      // }
      // &.icon-08 {
      //   background: url("~assets/image/user/icon_sprite2.png");
      //   background-size: 42px 40px;
      //   background-position: 0 0;
      //   width: 21px;
      //   height: 20.5px;
      // }
      // &.icon-09 {
      //   background: url("~assets/image/user/icon_sprite2.png");
      //   background-size: 42px 40px;
      //   background-position: 0 -21px;
      //   width: 20px;
      //   height: 18.5px;
      // }
      // &.icon-10 {
      //   background: url("~assets/image/user/icon_sprite2.png");
      //   background-size: 42px 40px;
      //   background-position: -21px 0;
      //   width: 20px;
      //   height: 20px;
      // }
      // &.icon-11 {
      //   background: url("~assets/image/user/icon_sprite.png");
      //   background-size: 60.5px 58.5px;
      //   background-position: -20px -42px;
      //   width: 18.5px;
      //   height: 16px;
      // }
      // &.icon-12 {
      //   background: url("~assets/image/user/icon12.png") no-repeat;
      //   background-size: 100% 100%;
      //   width: 18.5px;
      //   height: 19px;
      // }
      // &.icon-13 {
      //   background: url("~assets/image/user/icon13.png") no-repeat;
      //   background-size: 100% 100%;
      //   width: 18.5px;
      //   height: 16px;
      // }
      // &.icon-14 {
      //   background: url("~assets//image/user/icon14.png") no-repeat;
      //   background-size: 100% 100%;
      //   width: 18px;
      //   height: 20px;
      // }
    }
    img {
      position: absolute;
      right: 0;
      top: 15px;
      height: 13px;
      width: 8px;
      display: block;
    }
    &:after {
      content: " ";
      display: inline-block;
      height: 0.428571rem;
      width: 0.428571rem;
      border-width: 0.142857rem 0.142857rem 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: absolute;
      top: 50%;
      margin-top: -0.285714rem;
      right: 0.142857rem;
    }
  }

  .van-cell-group.van-hairline--top-bottom:first-child::after{
    border:none!important;
  }
  .van-cell-group.van-hairline--top-bottom:last-child::after{
    border:none!important;
  }
  .van-cell-group:not(:last-child) {
    margin-top:-1px;
  }
  .van-cell{
    // margin-top:-1px;
  }
  // .van-cell:first-child::after{
  //   border:none!important;
  // }
  .van-icon__image{
    width:1.5em;
    height:1.5em;
    margin-right:5px;
  }
}

.channelstaff {
  width: 90%;
  position: absolute;
  left: 20px;
  margin: -100px auto 0;
  border-radius: 5px;
  z-index: 10;
}
</style>