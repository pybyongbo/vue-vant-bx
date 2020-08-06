<template>
     <div
    class="c-product-item van-hairline--bottom"
    @click="insureDetail(item.companyCode)">
    <img
      v-lazy='item.productListImg'
      class="pic" >
    <div class="con">
      <h3>{{ item.productName |subStrFilter(11)}}</h3>
      <p class="des van-multi-ellipsis--l2">{{ item.productFeature  }}</p>
      <div class="price">
        <p
          v-if="promotionRateShow"
          class="profee">推广费 {{ item.basePromotionRate }}%</p>
        <p>
          ￥
          <strong>{{ item.minPremium  }}</strong> 元起
        </p>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { isNumber } from 'lodash';
import { ROUTER_BASE } from '@/constants';
// import * as tool from '@/utils/tool'

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    promotionRateShow: {
      type: Boolean,
      default: false,
    },
    showCollect: {
      type: Boolean,
      default: true,
    },
    isFavor: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // ...mapGetters('user', ['isLogin']),
    // ...mapState('user', {
    //   userId: state => state.info.userId,
    // }),
    promotionRate() {
      const { basePromotionRate } = this.item;
      return basePromotionRate || 0;
    },
    ...mapState('star', {
      starDict: state => state.stars,
      starLoading: state => state.loading,
    }),
    currentStarFlag() {
      return this.starDict && this.starDict[this.item.productId];
    },
  },
  data() {
    return {
      loadingPic: require('@/assets/image/common/loading-yt.png'),
      isLike: false,
    };
  },
  created() {

  },
  methods: {
    // ...mapActions('star', ['toggleStar']),
    insureDetail(code) {
    //   const { productCode, wxUrl, isSale, commodityType, id } = this.item;
    //   if (commodityType === 3 && isSale === 'N') {
    //     this.$vux.alert.show({
    //       title: '无法购买',
    //       content: '正在申请互联网销售资质，敬请期待',
    //       onShow() {},
    //       onHide() {},
    //     });
    //     return false;
    //   }
    //   const _id = tool.addId(code, wxUrl, this.userId);
    //   window.location.href =
    //     commodityType === 3
    //       ? wxUrl + _id
    //       : `${ROUTER_BASE}/product/detail?productCode=${productCode}&productId=${id}&userId=${
    //         this.userId
    //       }`;
      return false;
    },
  },

};
</script>

<style lang="scss" scoped>


.c-product-item {
  padding: 10px 15px 15px 10px;
  background: #fff;
  margin-bottom:10px;
  height: 110px;
  
  .pic {
    float: left;
    // width: 110px;
    height: 80px;
    margin-right: 15px;
    margin-top:15px;
  }
  .con {
    overflow: hidden;
    h3 {
      height: 19px;
      margin-bottom: 4px;
      font-size: 15px;
      line-height: 19px;
      color: #292b2d;
      letter-spacing: 0;
    //   @include text-truncate;
    }
    p.des {
      height: 34px;
      font-size: 12px;
      line-height: 17px;
      color: #b0b2b3;
      letter-spacing: 0;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-top: 0;
    }
    div.price {
      p {
        font-size: 12px;
        color: #292b2d;
        letter-spacing: 0;
        text-align: justify;
        strong {
          font-size: 18px;
          line-height: 18px;
        }
      }
      p.profee {
        float: right;
        color: #e9573d;
        margin-top: 3px;
      }
    }
  }
}
</style>
