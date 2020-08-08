<template>

  <div class="p-content-container">
    <div class="m-product-banner">
      <img
        style="width: 100%"
        :src="detailInfo.bannerImg"
        alt
      />
    </div>
    <van-cell
      :value="birthday"
      is-link
      @click="showPop"
    >
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
        <van-tag
          :class="[currentSex === 'M' ? 'active' : '']"
          size="large"
          @click="changeSex('M')"
        >男</van-tag>
        <van-tag
          :class="[currentSex === 'F' ? 'active' : '']"
          size="large"
          @click="changeSex('F')"
        >女</van-tag>
      </template>
    </van-cell>
   

    <van-popup
      v-model="show"
      position="bottom"
      get-container="body"
      :style="{ height: '300px' }"
    >
      <van-datetime-picker
        type="date"
        title="选择年月日"
        :formatter="formatter"
        @confirm="getDate"
      />
    </van-popup>
    <!-- <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" /> -->

    <van-cell
      v-for="item in factors"
      :key="item.key"
    >
      <!-- {{JSON.stringify(item)}} -->
        <template #title>
          <span class="custom-title">{{item.title}}</span>
        </template>
        <template #default>
          <van-tag
             :class="[ currentActivity[item.key] === item1.code  ? 'active' : '',item.key === 'insure' ? 'fly': '']"
             v-for="(item1) in item.list"
             :key="item1.code"
             :title="currentActivity[item.key]"
            size="large"
             @click.native="changeCurrent(item.key,item1.code) "
          >{{item1.text}}</van-tag>
        </template>

    </van-cell>


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
    this.premium.products[0].productCode = this.$route.query.productCode;
    this.getPremiun();
  },
  mounted() {
    this.getProductDetail();
  },
  data() {
    const { productId, productCode, id, sourceType } = this.$route.query;
    return {
      birthday: "请选择",
      detailInfo: {},
      factors: [],
      price: 0,

      premium: {
        applicants: [
          {
            birthday: "",
            genderCode: "M",
            age: 18,
            name: "张三",
            occupation: "",
            applicantSeq: 1
          }
        ],
        insurants: [
          {
            birthday: "",
            genderCode: "M",
            age: 0,
            name: "李四",
            occupation: "001",
            insurantSeq: 1,
            relation: "01"
          }
        ],
        products: [
          {
            productCode: "",
            insurantSeqs: [1],
            factors: [],
            riders: []
          }
        ]
      },
      currentActivity: {},
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
    },

    //计算保费
    async getPremiun() {
      const res = await api.getPremium(this.premium);
      const { productList, totalPremium } = res.data.value;
      this.factors = productList[0].factors;
      console.log(123, this.factors);
        console.log("this.factors", productList, this.factors);
        this.price = totalPremium;
        let index = productList[0].factors.findIndex(v => {
          return v.type === "label";
        });
        let arr = productList[0].factors.slice(0, index + 1);
        for (let i = 0; i < arr.length; i++) {
          this.$set(this.currentActivity, arr[i].key, arr[i].value);
        }
    },
    // 被保人抽烟  社保
    changeCurrent(key, code) {
      // vue中动态添加属性需要使用$set  负责点击高亮
      this.$set(this.currentActivity, key, code)
      // 判断数据是否存在
      let index = this.premium.products[0].factors.findIndex(v => {
        return v.key === key
      })
      if (index > -1) {
        this.premium.products[0].factors.splice(index, 1, {
          key,
          value: code
        })
        this.getPremiun()
      } else {
        this.premium.products[0].factors.push({
          key,
          value: code
        })
        this.getPremiun()
      }
    },
  }
};
</script>

<style scoped>
.van-tag--large {
  padding: 5px 18px;

}
.van-tag--large:not(:last-child){
  margin-right:6px;
}
/* color="#ffe1e1" text-color="#ad0000" */
.active {
  background: #ffe1e1;
  color: #ad0000;
}
.van-cell__title span {
  font-size: 12px;
}
</style>
