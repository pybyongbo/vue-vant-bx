<template>
    <div class="p-product-detail">
        <div class="p-content-container">
            <div class="m-product-banner">
                <img style="width: 100%" :src="detailInfo.bannerImg" alt />
            </div>
            <van-cell :value="birthday" is-link @click="showPop">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">被保人出生日期</span>
                </template>
            </van-cell>

            <van-cell>
                <!-- 使用 title 插槽来自定义标题 color="#ffe1e1" text-color="#ad0000" color="#ffe1e1" text-color="#ad0000"-->
                <template #title>
                    <span class="custom-title">被保人性别</span>
                </template>
                <template #default>
                    <van-tag :class="[currentSex === 'M' ? 'active' : '']" size="large" @click="changeSex('M')">男</van-tag>
                    <van-tag :class="[currentSex === 'F' ? 'active' : '']" size="large" @click="changeSex('F')">女</van-tag>
                </template>
            </van-cell>

            <van-cell>
                <!-- 使用 title 插槽来自定义标题 color="#ffe1e1" text-color="#ad0000" color="#ffe1e1" text-color="#ad0000"-->
                <template #title>
                    <span class="custom-title">被保人有无吸烟习惯/吸烟史</span>
                </template>
                <template #default>
                    <van-tag :class="[currentSmoke === 'Y' ? 'active' : '']" size="large" @click="changeSmoke('Y')">有</van-tag>
                    <van-tag :class="[currentSmoke === 'N' ? 'active' : '']" size="large" @click="changeSmoke('N')">无</van-tag>
                </template>
            </van-cell>
            <van-cell>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">保险期间</span>
                </template>
                <template #default>
                    <van-tag color="#ffe1e1" text-color="#ad0000" size="large">一年</van-tag>
                </template>
            </van-cell>
            <van-popup v-model="show" position="bottom" get-container="body" :style="{ height: '300px' }">
                <van-datetime-picker type="date" title="选择年月日" :formatter="formatter" @confirm="getDate" />
            </van-popup>
            <!-- <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" /> -->
        </div>
    </div>
</template>

<script>
import { toToast } from "@/utils/tools.js";
import isEmpty from "lodash/isEmpty";
import api from "@/api/product";
import { mapGetters } from "vuex";
import { ROOT_URI } from "@/constants";
import moment from "moment";
export default {
  name: "productDetail",
  $_veeValidate: {
    validator: "new" // give me a new validator each time.
  },
  provide() {
    return {
      $validator: this.$validator
    };
  },
  created() {
    this.getProductDetail();
  },
  data() {
    const { productId, productCode, id, sourceType } = this.$route.query;
    return {
      birthday: "请选择",
      detailInfo: {},
      show: false,
      currentSex: "M",
      currentSmoke: "Y",
      productId: productId || "",
      productCode: productCode || "",
      sourceType: sourceType || ""
    };
  },
  methods: {
    async getProductDetail() {
      let res = await api.getProductDetailInfo(this.productId);
      console.log(res);
      const {
        resultContent: { resultContent },
        resultFlag,
        resultMsg
      } = res.data;

      if (resultFlag) {
        this.detailInfo = Object.assign({}, resultContent);
      } else {
        toToast(resultMsg);
      }

      return resultContent;
    },
    showPop() {
      console.log("test");
      this.show = !this.show;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    getDate(val) {
      console.log(moment(val).format("YYYY-MM-DD"));
      let formatDate = moment(val).format("YYYY-MM-DD");
      this.birthday = formatDate;
      this.show = false;
    },
    // 改变性别
    changeSex(value) {
      this.currentSex = value;
      console.log(this.currentSex);
      //   this.premium.insurants[0].genderCode = value
    },
    changeSmoke(value) {
      this.currentSmoke = value;
      console.log(this.currentSmoke);
    }
  }
};
</script>

<style scoped>
.van-tag--large {
  padding: 5px 18px;
}
/* color="#ffe1e1" text-color="#ad0000" */
.active {
  background: #ffe1e1;
  color: #ad0000;
}
</style>