<template>
    <div :class="{paddingTop: !productListShow}" class="p-product-list-container">
        <van-tabs v-model="active" sticky swipeable @click="onTabClick">
            <van-tab v-for="item in hdTablist" :name="item.code" :code="item.code" :title="item.name" :key="item.code">
            </van-tab>
        </van-tabs>
        <!-- 正常产品列表 -->
        <mescroll-vue v-show="productListShow" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div id="dataList" class="product-list">
                <!--内容...-->
                <product v-for="(item, index) in listData" :item="item" :key="index" />
            </div>
            <div id="nodata" class="m-product-nodata" />
        </mescroll-vue>

    </div>
</template>

<script>
import isNumber from "lodash/isNumber";
import api from "@/api/index";
import { toToast } from "@/utils/tools.js";
import MescrollVue from "mescroll.js/mescroll.vue";

import Product from "@/components/productItem";

export default {
  name: "iconCate",
  components: {
    MescrollVue,
    Product
  },
  data() {
    return {
      active: 0,
      hdTablist: [],
      listData: [],
      insuranceType: "",
      productListShow: true, // 这是一个tab表头这产品列表
      mescrollDown: {
        callback: this.downCallback
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
        },
        // isBounce:false,
        // pageSize: 5,
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        //回到顶部按钮
        toTop: {
          warpId: "dataList",
          showClass: "mescroll-fade-in",
          hideClass: "mescroll-fade-out",
          src: require("@/assets/image/common/mescroll-totop.png"), //图片路径,默认null,支持网络图
          offset: 100 //列表滚动100px才显示回到顶部按钮
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: "nodata", // 父布局的id;
          icon: require("@/assets/image/common/003.png"),
          tip: "暂无数据~" // 提示
        },
        htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>'
      }
    };
  },
  created() {
    this.initData();
    //如果是首页ICON点击进入的,修改当前选中的active值,就调用watch方法!
    if (this.$route.query.insuranceType) {
      this.active = this.$route.query.insuranceType;
    } 
    // else {
      //scroll默认初始化会执行一次的.所以这里不用初始化了.不然数据不对
      //this.getDataList();
    // }
  },
  methods: {
    initData() {
      this.getTabList();
      //this.getDataList();
    },

    async getTabList() {
      try {
        const res = await api.getProductCategory({
          terminal: 0
        });

        const {
          resultContent: { resultContent },
          resultFlag,
          resultMsg
        } = res.data;

        if (resultFlag) {
          this.hdTablist = [{ code: "", name: "全部" }].concat(resultContent);
        } else {
          toToast(resultMsg);
        }
      } catch (error) {}
    },

    async getDataList(cateType, pageSize, pageNum) {
      try {
        const res = await api.getProductList({
          terminal: 0,
          pageNum: pageNum || 1,
          pageSize: pageSize,
          insuranceType: this.active || ""
        });
        const {
          resultContent: {
            resultContent: { rows, total, pages }
          },
          resultFlag,
          resultMsg
        } = res.data;
        console.log(res.data)
        if (this.pageNum > pages) {
          this.mescroll.endSuccess(rows.length);
          //   this.mescroll.endSuccess(total);
          return;
        }

        if (resultFlag) {
          this.listData = this.listData.concat(rows || []);
          if (total || isNumber(total)) {
            this.$nextTick(() => {
              this.mescroll.endSuccess(total);
            });
          } else {
            this.mescroll.endErr();
          }
          this.mescroll.endSuccess(rows.length);
          return res.data.resultContent.resultContent;
        } else {
          toToast(resultMsg);
        }
      } catch (error) {
        console.log("error", error);
      }
    },

    async onTabClick(code, title) {
      this.mescroll.resetUpScroll();
      this.listData = [];
      if (code === this.active) return;
      this.insuranceType = code;
      let res = await this.getDataList(code, this.pageSize, this.pageNum);
      const {
        resultContent: {
          resultContent: { rows, total, pages }
        },
        resultFlag,
        resultMsg
      } = res.data;

      if (rows.length == 0) {
        this.mescroll.endSuccess(rows.length);
        //   this.mescroll.endSuccess(total);
        return;
      }
      this.mescroll.resetUpScroll(); // 重置mescroll内部的page.num为1
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    async downCallback(mescroll) {
        //this.clearProductList();
        //   console.log('down callback',page);
        // if (this.pageNum === 1) 
        // let result=  await this.getDataList(this.active, 5, 1);
        // this.listData = result.rows;
        // console.log('result111',result)
        // if (this.pageNum > result.pages) {
        //     this.mescroll.endSuccess(result.rows.length);
        //     return;
        // }
        
      mescroll.resetUpScroll();
      mescroll.endSuccess();
    },
    async upCallback(page, mescroll) {
      console.log("滚动----", page);
      //   page.num > 1 &&
      //     (await this.getDataList(this.active, page.size, page.num, arr => {
      //       console.log("arr", arr);
      //       if (page.num === 1) this.listData = [];

      //       this.listData = this.listData.concat(arr);
      //       this.$nextTick(
      //         () => {
      //           this.mescroll.endSuccess(arr.length);
      //         },
      //         () => {
      //           this.mescroll.endErr();
      //         }
      //       );
      //     }));
      if (page.num > 1) {
         let result=  await this.getDataList(this.active, page.size, page.num);
        
        // const res = await api.getProductList({
        //   pageNum: page.num,
        //   pageSize: page.size,
        //   insuranceType: this.active,
        //   terminal: 0 //0标识终端h5
        // });
        // const {
        //   resultContent: {
        //     resultContent: { rows, total, pages }
        //   },
        //   resultFlag,
        //   resultMsg
        // } = res.data;

        if (page.num > result.pages) {
          this.mescroll.endSuccess(result.rows.length);
          return;
        } else {
           // this.listData = this.listData.concat(rows);
        }

        // if (res || isNumber(total) > 0) {
        //   this.$nextTick(() => {
        //     mescroll.endSuccess(total);
        //   });
        // } else {
        //   mescroll.endErr();
        // }
      }
    }
  },
  watch: {
    active() {
      this.getDataList(this.active, 5, this.pageNum);
    }
  }
};
</script>
<style lang="scss" scoped>
.paddingTop {
  padding-top: 85px !important;
}
.p-product-list-container {
  //   position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
<style>
.mescroll-totop {
  bottom: 100px !important;
}
.product-list {
  height: 100%;
  padding-top: 40px;
}
.van-tabs__content {
  padding-top: 10px;
}
.mescroll-upwarp {
  padding-bottom: 83px;
}
.van-sticky {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
}
</style>