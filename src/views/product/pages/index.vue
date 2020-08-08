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
    <!-- 使用 title 插槽来自定义标题 -->
    <!-- <van-cell>
                <template #title>
                    <span class="custom-title">保险期间</span>
                </template>
                <template #default>
                    <van-tag color="#ffe1e1" text-color="#ad0000" size="large">一年</van-tag>
                </template>
            </van-cell> -->

    <!-- <van-cell>

                <template #title>
                    <span class="custom-title">被保人有无吸烟习惯/吸烟史</span>
                </template>
                <template #default>
                    <van-tag :class="[currentSmoke === 'Y' ? 'active' : '']" size="large" @click="changeSmoke('Y')">有</van-tag>
                    <van-tag :class="[currentSmoke === 'N' ? 'active' : '']" size="large" @click="changeSmoke('N')">无</van-tag>
                </template>
            </van-cell>

            <van-cell>

                <template #title>
                    <span class="custom-title">被保人有无社保</span>
                </template>
                <template #default>
                    <van-tag :class="[currentSmoke === 'Y' ? 'active' : '']" size="large" @click="changeSmoke('Y')">有</van-tag>
                    <van-tag :class="[currentSmoke === 'N' ? 'active' : '']" size="large" @click="changeSmoke('N')">无</van-tag>
                </template>
            </van-cell> -->
    <!-- {{JSON.stringify(factors)}} -->

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
            :class="[currentSmoke === 'Y' ? 'active' : '']"
            size="large"
            @click="changeSmoke('Y')"
          >有</van-tag>
          <!-- <van-tag :class="[currentSmoke === 'N' ? 'active' : '']" size="large" @click="changeSmoke('N')">无</van-tag> -->
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
      listData: [
        {
          list: [
            {
              code: "term_1",
              text: "1年"
            }
          ],
          title: "保险期间",
          type: "select",
          value: "term_1",
          key: "insure"
        },
        {
          list: [
            {
              code: "no",
              text: "无"
            },
            {
              code: "yes",
              text: "有"
            }
          ],
          title: "被保人有无吸烟习惯/吸烟史",
          type: "select",
          value: "no",
          key: "smoke"
        },
        {
          list: [
            {
              code: "no",
              text: "无"
            },
            {
              code: "yes",
              text: "有"
            }
          ],
          title: "被保人有无社保",
          type: "select",
          value: "no",
          key: "medicare"
        },
        {
          title: "保险责任（必选）",
          type: "label",
          value: "",
          key: "yt_insurance_liability"
        },
        {
          readonly: true,
          title: "一般医疗",
          type: "checkBox",
          value: 1,
          key: "yt_insurance_liability_one"
        },
        {
          readonly: true,
          title: "重大疾病医疗 ",
          type: "checkBox",
          value: 1,
          key: "yt_insurance_liability_two"
        },
        {
          readonly: true,
          title: "恶性肿瘤质子重离子医疗",
          type: "checkBox",
          value: 1,
          key: "yt_insurance_liability_three"
        },
        {
          readonly: true,
          title: "恶性肿瘤院外特定药品费用医疗",
          type: "checkBox",
          value: 1,
          key: "yt_insurance_liability_four"
        },
        {
          title: "附加责任（可选）",
          type: "label",
          value: "",
          key: "yt_insurance_liability_optional"
        },
        {
          readonly: false,
          title: "重大疾病津贴保险金",
          type: "checkBox",
          value: 0,
          key: "YT_INSURANCE_LIABILITY_OPTIONAL_CODE_ONE"
        },
        {
          readonly: false,
          title: "重大疾病住院津贴保险金",
          type: "checkBox",
          value: 0,
          key: "YT_INSURANCE_LIABILITY_OPTIONAL_CODE_TWO"
        }
      ],
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
      //   console.log("this.factors", productList, this.factors);
      //   this.price = totalPremium;
      //   let index = productList[0].factors.findIndex(v => {
      //     return v.type === "label";
      //   });
      //   let arr = productList[0].factors.slice(0, index + 1);
      //   for (let i = 0; i < arr.length; i++) {
      //     this.$set(this.currentActivity, arr[i].key, arr[i].value);
      //   }
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
.van-cell__title span {
  font-size: 12px;
}
</style>
