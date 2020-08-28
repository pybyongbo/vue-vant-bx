<template>
  <div>
    <div class="swiper-wrap demo-swipe">
      <van-swipe :autoplay="3000" indicator-color="#1989fa">
        <van-swipe-item v-for="(image, index) in bannerImg" :key="index">
          <img v-lazy="image.imgPath" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-notice-bar color="#a46240" background="#fff3eb" left-icon="volume-o" scrollable text="注册成为盈泰会员,分享参加活动拿提成" mode="closeable" />
    <ul class="m-index-navbar" v-if="insuranceTypes.length<=5">
      <li v-for="(item, index) in insuranceTypes" :key="index" :class="`icon-0${index+1}`" @click.stop="onLinkToProductList(item)">{{ item.name }}</li>
    </ul>
    <!-- ICON特色分类,超过5个可以滚动,用的轮播效果,不超过5个显示固定 -->
    <div class="swiper1 m-swiper-box" v-else>
      <swiper :options="swiperOption" ref="mySwiper1">
        <!-- slides -->
        <swiper-slide v-for="(item, index) of insuranceTypes" :key="item.id">
          <span :class="`icon-0${index+1}`" @click="onLinkToProductList(item)"></span>
          <span class="text" @click="onLinkToProductList(item)">{{item.name}}</span>
        </swiper-slide>
        <!-- Optional controls -->
        <div slot="pagination" class="swiper-pagination"></div>
      </swiper>
    </div>

    <!-- 首页特色分类 -->
    <div v-for="(category, index) in indexCateListFilter" v-if="category.list.length>0" :key="index" class="m-category-list" :class="[index==indexCateListFilter.length-1?'last':'']">
      <h2>
        <span>{{ category.categoryName }}</span>
        <span @click.stop="onLinkToCategory(category.id,category.categoryName)">更多</span>
      </h2>
      <van-grid :gutter="10" :column-num="2">
        <van-grid-item v-for="(item, idx) in (category.list.length>4?category.list.slice(0, 4):category.list)" :key="idx" @click.stop="onLinkToDetail(item)">
          <!-- <template slot="icon">
                <img class="new-icon" :src='item.productListImg' style="width:100%;max-height:72px;"/>
            </template>
            <img class="new-icon" :src='item.productListImg' style="width:100%;max-height:72px;"/>
          -->
          <template slot="default">
            <lazy-component>
              <div class="pic">
                <img v-lazy='item.productListImg' style="width:100%;max-height:78px;" alt="图片">
              </div>
              <div class="con">
                <h3>{{ item.productName | subStrFilter(9) }}</h3>
                <div class="price">
                  <p>￥<strong>{{ item.minPremium }}</strong>元起
                  </p>
                  <!-- v-if="isPromotionFeeVisible && isShowPromotion" -->
                  <p class="profee">推广费 {{item.basePromotionRate }}%</p>
                </div>
              </div>
            </lazy-component>
          </template>
        </van-grid-item>

      </van-grid>
    </div>

    <!-- <loading title="正在加载..." :show="loading" /> -->
  </div>
</template>

<script>
// import { Lazyload } from "vant";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import Loading from "@/components/loading/loading";
import api from "@/api/index";
import { toToast } from "@/utils/tools.js";
import axiosInstance from "@/api/config";
import { ROUTER_BASE } from "@/constants";
export default {
  name: "indexPage",
  data() {
    return {
      bannerImg: [],
      insuranceTypes: [],
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        autoplay: false,
        loop: false, //设置 active slide 居中后，会有左右留白现象，添加此会让未尾的导航补齐前后空白
        slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide。
        slidesPerView: 5,
        //centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        freeMode: true,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        mousewheelControl: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      indexCateList: [],
      loading: true,
      loadingPic: require("@/assets/image/common/loading.png")
    };
  },
  components: {
    Loading,
    swiper,
    swiperSlide
  },
  created() {
    this.initData();
  },
  computed:{
      indexCateListFilter(){
       return this.indexCateList.filter((item)=>{
            return item.list.length>0
        })
      }

  },
  mounted() {
    console.dir(axiosInstance);
    // var that = this;
    // axiosInstance
    //   .all([that.getBannerList(), that.getIconcate()])
    //   .then(function(a, b) {
    //     that.loading = false;
    //   });
  },
  methods: {
    initData() {
      this.getBannerList();
      this.getIconcate();
      this.getIndexCate();
    },
    //轮播图
    async getBannerList() {
      let res = await api.getIndexBanner({ terminal: 0 });
      const { resultContent, resultFlag } = res.data;
      if (resultFlag) {
        this.bannerImg = resultContent;
      } else {
      }
      return resultContent;
      //   .then(res => {
      //     const { resultContent, resultFlag } = res.data;
      //     console.log("res", res);
      //     if (resultFlag) {
      //       this.bannerImg = resultContent;
      //     } else {
      //     }
      //   });
    },
    //icon分类
    async getIconcate() {
      let res = await api.getIndexIcon({ terminal: 0 });
      const {
        resultContent: { resultContent:resData },
        resultFlag,
        resultMsg
      } = res.data;

      if (resultFlag) {
        this.insuranceTypes = resData;
        //this.insuranceTypes = resultContent.slice(0,5);
      } else {
        toToast(resultMsg);
      }
      // console.log('resData',resData);
      return resData;

      //   .then(res => {
      //     const {
      //       resultContent: { resultContent },
      //       resultFlag,
      //       resultMsg
      //     } = res.data;

      // if (resultFlag) {
      //   this.insuranceTypes = resultContent;
      // } else {
      //   toToast(resultMsg);
      // }
      //   });
    },
    onLinkToProductList(item) {
      this.$router.push({
        name: "productList",
        query: {
          insuranceType: item.code
        }
      });
    },
    onLinkToCategory(type, name) {
      this.$router.push({
        name: "categoryList",
        query: {
          categoryId: type,
          categoryName: name
        }
      });
    },
    onLinkToDetail(item) {
      const { productCode, commodityType, wxUrl, isSale, id } = item;
      if (commodityType === 3 && isSale === "N") {
        this.$vux.alert.show({
          title: "无法购买",
          content: "正在申请互联网销售资质，敬请期待"
        });
        return false;
      }
      //   const _id = tool.addId(item.companyCode, wxUrl, this.userId);
      window.location.href =
        commodityType === 3
          ? wxUrl
          : `${ROUTER_BASE}/product/detail?productCode=${productCode}&productId=${id}&userId=${
              this.userId
            }`;
      return false;
    },
    getIndexCate() {
      api.getIndexRecom({ terminal: 0 }).then(res => {
        const {
          resultContent: { resultContent },
          resultFlag,
          resultMsg
        } = res.data;
        if (resultFlag) {
          this.indexCateList = resultContent;
        } else {
          toToast(resultMsg);
        }
      });
    }
    // requestAll([getBannerList(),getIconcate()])
  }
};
</script>

<style scoped lang="scss">
.demo-swipe {
  height: 210px;
  overflow: hidden;
}
.demo-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.demo-swipe .van-swipe-item:nth-child(even) {
  background-color: #39a9ed;
}
.demo-swipe .van-swipe-item:nth-child(odd) {
  background-color: #66c6f2;
}
.demo-swipe .van-swipe img {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  max-height: 207px;
  background-color: #fff;
  pointer-events: none;
  box-sizing: border-box;
  padding: 5px 10px;
}
.demo-swipe--vertical .van-swipe-item {
  line-height: 200px;
}
.demo-swipe .custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.m-index-navbar {
  display: flex;
  padding: 10px 5px 10px;
  background-color: #fff;
  li {
    position: relative;
    flex: 1;
    display: block;
    width: 50px;
    padding-top: 63px;
    text-align: center;
    color: #5b5f65;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      display: block;
      width: 53px;
      height: 53px;
      margin-left: -27px;
    }
  }
  .icon-01 {
    &:after {
      background: url("~assets/image/index/icon-index-cate01.png") no-repeat
        scroll center;
      background-size: 48px;
    }
  }
  .icon-02 {
    &:after {
      background: url("~assets/image/index/icon-index-cate02.png") no-repeat
        scroll center;
      background-size: 48px;
    }
  }
  .icon-03 {
    &:after {
      background: url("~assets/image/index/icon-index-cate03.png") no-repeat
        scroll center;
      background-size: 48px;
    }
  }
  .icon-04 {
    &:after {
      background: url("~assets/image/index/icon-index-cate04.png") no-repeat
        scroll center;
      background-size: 48px;
    }
  }
  .icon-05 {
    &:after {
      background: url("~assets/image/index/icon-index-cate05.png") no-repeat
        scroll center;
      background-size: 46px;
    }
  }
  .icon-06 {
    &:after {
      background: url("~assets/image/index/icon-index-cate03.png") no-repeat
        scroll center;
      background-size: 46px;
    }
  }
}
.m-category-list {
  padding: 19px 0 10px 0;
  clear: both;
  h2 {
    position: relative;
    height: 30px;
    padding: 0 20px;
    line-height: 30px;
    font-size: 22px;
    font-weight: bolder;
    margin-bottom: 10px;
    margin-top: 0;
    span:first-child {
      position: relative;
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      font-weight: bolder;
      z-index: 10;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 1px;
        display: block;
        width: 100%;
        height: 10px;
        opacity: 0.5;
        background: #eee0c5;
        border-radius: 12px;
        z-index: 1;
      }
    }
    span:last-child {
      float: right;
      display: block;
      height: 18px;
      line-height: 21px;
      padding: 0 7px 2px 7px;
      margin-top: 4px;
      font-size: 12px;

      color: #ddbb7e;
      text-align: center;
      border: 1px solid #ddbb7e;
      border-radius: 10px;
    }
  }

  .con {
    overflow: hidden;
    width: 100%;
    h3 {
      height: 22px;
      margin-bottom: 4px;
      font-size: 15px;
      line-height: 22px;
      color: #292b2d;
      letter-spacing: 0;
    }
  }
  p.des {
    height: 34px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 19px;
    color: #b0b2b3;
    letter-spacing: 0;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  div.price {
    line-height: 24px;
    padding: 0;
    p {
      font-size: 12px;
      color: #292b2d;
      letter-spacing: 0;
      text-align: justify;
      float: left;
      strong {
        font-size: 13px;
        font-weight: bold;
      }
    }
    p.profee {
      float: right;
      color: #e9573d;
    }
  }
}
.last {
  padding-bottom: 60px;
}
.cateList {
  overflow: hidden;
  a {
    float: left;
    width: 100px;
    height: 100px;
  }
}
span.icon-01 {
  background: url("~assets/image/index/icon-index-cate01.png") no-repeat scroll
    center;
  background-size: 48px;
}
span.icon-02 {
  background: url("~assets/image/index/icon-index-cate02.png") no-repeat scroll
    center;
  background-size: 48px;
}
span.icon-03 {
  background: url("~assets/image/index/icon-index-cate03.png") no-repeat scroll
    center;
  background-size: 48px;
}
span.icon-04 {
  background: url("~assets/image/index/icon-index-cate04.png") no-repeat scroll
    center;
  background-size: 48px;
}
span.icon-05 {
  background: url("~assets/image/index/icon-index-cate05.png") no-repeat scroll
    center;
  background-size: 46px;
}
span.icon-06 {
  background: url("~assets/image/index/icon-index-cate03.png") no-repeat scroll
    center;
  background-size: 46px;
}
.swiper-container {
  overflow: hidden;
  
  .swiper-pagination{
    bottom:-5px;
  }
}


</style>
<style lang="scss">
.swiper-wrap {
  .van-swipe__indicator {
    width: 5px;
    height: 5px;
    background-color: #fff;
    opacity: 0.5;
    border-radius: 100%;
  }
  .van-swipe__indicator--active {
    width: 10px;
    background-color: #fff;
    opacity: 1;
    border-radius: 3px;
  }
}
.van-grid-item__content {
  height: 200px;
  max-height: 200px;
}
.van-notice-bar {
  margin-bottom: 10px;
}
.van-notice-bar__content {
  padding-top: 1px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}
.swiper1 {
  height: 80px;
  overflow: hidden;
  .swiper-slide {
    height: 80px;
    font-size: 14px;
    text-align: center;
    float: left;
    span {
      display: block;
      text-align: center;
      width: 100%;
      height: 50px;
      &.text{
        height:24px;
        line-height:24px;
      }
    }
  }
   .swiper-pagination-bullet {
    width: 5px;
    height: 5px;
    background-color: #fff;
    opacity: 0.5;
    border-radius: 100%;
  }
  .swiper-pagination-bullet-active {
    width: 10px;
    background-color: #d3a243;
    opacity: 1;
    border-radius: 3px;
  }
}
</style>
