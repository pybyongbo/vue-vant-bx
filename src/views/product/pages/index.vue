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

    <van-cell
      v-for="item in factors"
      :key="item.key"
      :class="{'fl':(item.readonly === true ||item.readonly === false),'w100':item.type === 'label'}"
        @click="chooseRefuel(item,item.readonly)"
    >
        <template #title >
          <div class="custom-title"  :class="[refuelArr.includes(item.key) ? 'bg-color' : '',item.readonly === true ? 'fly': '']">{{item.title}}</div>
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

    <div class="terms">
        <p>增值服务</p>
        <ul class="terms_title">
          <li>
            <a target="_blank" href="/mobile/static/found/postoperative-20200518.pdf">术后家庭护理服务介绍</a>
          </li>
          <li>
            <a target="_blank" href="/mobile/static/found/medical-20200518.pdf">医疗垫付服务介绍</a>
          </li>
          <li>
            <a target="_blank" href="/mobile/static/found/swelling-20200518.pdf">肿瘤特药服务介绍</a>
          </li>
          <li>
            <a target="_blank" href="/mobile/static/found/serious-20200518.pdf">重疾绿通服务介绍</a>
          </li>
        </ul>
      </div>

      <!-- 中间图标 -->
      <div class="m-product-logo">
        <div />
        <p>本保险由众安保险承保并负责理赔</p>
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
      refuelArr:[],
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

    // 选择加油包 附加责任（可选）
    chooseRefuel(item, value) {
      if (value === false) {
        let index1 = this.premium.products[0].factors.findIndex(v => {
          return v.key === item.key
        })
        // 点击添加参数
        if (index1 > -1) {
          this.premium.products[0].factors.splice(index1, 1)
          this.getPremiun()
        } else {
          this.premium.products[0].factors.push({
            key: item.key,
            value: '1'
          })
          this.getPremiun()
        }
        // 点击高亮
        let index = this.refuelArr.indexOf(item.key)
        if (index > -1) {
          this.refuelArr.splice(index, 1)
        } else {
          this.refuelArr.push(item.key)
        }
      }
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
        console.log(123,234)
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

<style lang="scss" scoped>
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
.van-cell__title div,.van-cell__title span {
  font-size: 12px;
}
.van-cell{
    // padding:0 10px;
}
.van-cell.fl{
    display: block;
    text-align: center;
    padding:5px 8px;
}
.fl {
    width: 50%;
    float: left;
    .van-cell__title {
      height: 100%;
      .custom-title {
        width: 100%;
        border-radius: 5px;
        color: #999999;
         height:40px;
        line-height: 40px;
        background-color: #f5f5f5;
        text-align: center;
      }
    }
  }
//   .fl{
  .custom-title.bg-color{
    background-color: #d3a243!important;
    color: #fff!important;
    border-radius: 10px;
    height:26px;
    line-height: 26px;
  }
//   }

  div.fly {
    color: #fff !important;
    background-color: #d3a243 !important;
    border-radius: 10px;
    padding:10px 0;
    height:24px!important;
    line-height: 24px!important;
  }
  .w100 {
    width: 100%;
    float: left;
  }
  .terms {
      background-color: #fff;
      padding-left: 20px;
      clear: both;
      p {
        height: 50px;
        line-height: 50px;
        color: #5b5f65;
      }
      .terms_title {
        display: flex;
        flex-wrap: wrap;
        li {
          height: 42px;
          line-height: 42px;
          width: 44%;
          text-align: center;
          padding-right: 20px;
          padding-bottom: 12px;
          a {
            text-decoration: underline;
            font-size: 12px;
            border-radius: 5px;
            color: #d3a243;
            height: 100%;
            display: block;
            // background-color: #d3a243;
          }
        }
      }
    }

    .m-product-logo {
      height: 45px;
      background-color: #f6f6f6;
      display: flex;
      justify-content: center;
      padding-top: 14px;
      div {
        width: 90px;
        height: 16px;
        // background: url('~@/assets/image/product/logo03.png') no-repeat center
        //   center;
        background-size: contain;
        margin-right: 3px;
      }
      p {
        color: #999999;
        font-size: 12px;
        margin-left: 3px;
      }
    }
</style>
