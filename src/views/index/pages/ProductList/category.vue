<template>
    <div class="cate-list">
        <h2 class="tit van-hairline--bottom" style="text-align:center;height:32px;line-height:32px;">分类产品列表--{{ categoryName }}</h2>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="product-list">
                <product v-for="(item, index) in cateList" :item="item" :key="index" />
            </div>
        </mescroll-vue>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import pickBy from "lodash/pickBy";
import isNumber from "lodash/isNumber";
import { toToast } from "@/utils/tools.js";
import MescrollVue from "mescroll.js/mescroll.vue";
import Product from "@/components/productItem";
import request from "@/api/index";
export default {
  name: "categoryList",
  data() {
    return {
      isShow: false,
      mescroll: null,
      mescrollDown: {
        callback: this.downCallback
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          //warpId: "dataList", // 父布局的id;
          icon: "./static/mescroll/mescroll-empty.png", // 图标,支持网络图
          tip: "暂无相关数据~", // 提示
          btnClick() {
            // 点击按钮的回调,默认null
            console.log("点击了按钮,具体逻辑自行实现");
          }
        },
        htmlNodata:
          '<p class="upwarp-nodata" style="display:none">-- 没有更多数据了 --</p>'
      },
      categoryName: this.$route.query.categoryName || "",
      cateList: []
    };
  },
  components: {
    MescrollVue,
    Product
  },
  created() {
    //let cid = this.$route.query.categoryId
    //this.getCateList(cid,1,10)
  },
  computed: {
    //  ...mapState("indexCategoryList", ["categoryList"]),
  },

  methods: {
    async getCateList(categoryId, pageSize, pageNum) {
      let res = await request.getIndexCatelist({
        terminal: 0,
        page: pageNum,
        rows: pageSize,
        categoryId: categoryId
      });
      const {
        resultContent: {
          resultContent: { rows }
        },
        resultFlag
      } = res.data;
      console.log(rows);
      if (resultFlag) {
        this.cateList = rows;
      } else {
      }
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      const cid = this.$route.query.categoryId;
      this.getCateList(cid, page.size, page.num).then(res => {
        if (res || isNumber(res)) {
          this.$nextTick(() => {
            mescroll.endSuccess(res);
          });
        } else {
          mescroll.endErr();
        }
      });
    },
    downCallback(mescroll) {
      this.mescroll.resetUpScroll();
    },
    maxRate(item) {
      let arr = item.productRatelist;
      if (Array.isArray(arr)) {
        if (arr.length) {
          return arr[arr.length - 1].basePromotionFee || "-";
        } else {
          return "-";
        }
      } else {
        return "-";
      }
    }
  }
};
</script>

<style lang="scss">
.cate-list {
  // h2{
  //     font-size:14px;
  //     text-align:center;
  //     height: 32px;
  //     line-height: 32px;
  // }
}
h2.tit {
  font-size: 14px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  margin:10px auto 20px;
  padding:0;
}
</style>