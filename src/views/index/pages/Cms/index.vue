<template>
    <div :class="{activeTop: isDown}" class="consult">
        <!-- 第一栏-->
        <div class="tit">
            <div class="content" style="position:relative;overflow:hidden">
                <div id="oneColumnBox" style="" class="oneColumnBox">
                    <ul id="oneColumn" class="oneColumn">
                        <li v-for="(item,index) in columnDate" :class="{activated1: index === isActivated}" :key="index" @click="onMainMenuClk(index,item)">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
            <img :class="{mark:true,down: isDown}" src="~assets/image/common/mark.png" @click="isDown = !isDown">
        </div>
        <!-- 第二栏 -->
        <div v-show="isDown" class="secondTotal">
            <div class="secondDiv">
                <ul class="clearfix">
                    <li v-for="(item,index) in columnDate" :class="{activated2: index === isActivated}" :key="index" @click="onMoreMenuClk(index, item)">{{ item.name }} </li>
                </ul>
            </div>
        </div>

        <div class="maskPopup" v-show="isDown">

        </div>
        <!-- list列表 -->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div id="mescroll" class="mescroll">
                <div id="newsList">
                    <ul v-cloak id="lists" class="lists data-list">
                        <li v-for="(item, $index) in cmsList" :key="$index">
                            <div v-if="item.contentType == 1" class="item" @click="toDetail(item.id)">
                                <img :imgurl="item.coverUrl" :src="loadingPic" alt="" class="itemImg">
                                <div class="itemCon">
                                    <p class="itemConTit"> <span v-if="item.topFlag === 'Y'">[置顶]</span>{{ item.title | subStrFilter(12)}}</p>
                                    <p class="desc">{{item.summary | sumaryFilter}}</p>
                                    <p class="itemConTime">{{ (item.releaseDate|| item.gmtModified) }}</p>
                                </div>
                            </div>
                            <div v-if="item.contentType == 3" class="item" @click="toFile(item.contentUrl)">
                                <img :src="item.coverUrl" alt="" class="itemImg">
                                <div class="itemCon">
                                    <p class="itemConTit">{{ item.title |subStrFilter(12)}}</p>
                                    <p class="itemConTime">{{ (item.releaseDate || item.gmtModified) }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="nodata" class="m-product-nodata"></div>
            </div>
        </mescroll-vue>
    </div>
</template>

<script>
import api from "@/api/cms";
import MescrollVue from "mescroll.js/mescroll";
import isNumber from "lodash/isNumber";
import { mapState, mapActions } from "vuex";
import { toToast } from "@/utils/tools.js";

export default {
  name: "Consult",
  components: {
    MescrollVue
  },
  data() {
    return {
      loadingPic: require("@/assets/image/common/loading-yt.png"),
      isFirstIn: true,
      cmsList: [],
      // 一级栏目
      isActivated: 0, // 选中的下标
      isDown: false,
      // 往右挪动n被
      n: 0,
      titWith: 0,
      columnType: 1, // 2 的时候为视频样式，1是综合，3是文件
      // 二级栏目
      isSign: 0,
      pathname: "recommend",
      title: "推荐",
      // 判断二级栏目是否显示
      twoColumn: false,
      columnDate: [],
      page: 1,
      totalPage: 0,

      pageSize: 10,
      mescrollDown: {
        callback: this.downCallback
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // 回到顶部按钮
        toTop: {
          warpId: "newsList",
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
          icon: require("@/assets/image/common/003.png"), // 图标,支持网络图
          tip: "暂无相关数据~" // 提示
        },
        htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>'
      }
    };
  },
  computed: {
    //     ...mapState("cms", {
    //       //   tabFirst: state => state.tabFirst,
    //       tabSecond: state => state.tabSecond,
    //       tabTotal: state => state.tabTotal,
    //       cmsMenu: "menu",
    //     //   cmsList: "list",
    //       total:state=>state.total,
    //       cmsError: "listError"
    //       //   activeTab: "activeTab"
    //     }),
  },
  async created() {
    await this.getMenuData();
    this.isActivated = 0;
    this.columnDate &&
      this.columnDate[0] &&
      this.getListById(this.columnDate[0].id);
  },
  mounted() {
    // 获取一级栏目的的宽度。
    if (this.columnDate[this.isActivated]) {
      const dom = document.getElementsByClassName("activated1")[0];
      this.titWith = dom.clientWidth;
    }
  },
  watch: {
    cmsList(newValue) {
      // 如果总条数不足pageSize条数，则隐藏“加载更多”提示，采用display:none方式
      if (this.total <= this.pageSize) {
        // 当上拉刷新触发后，mescroll会自动触发一次endupscroll
        // 会覆盖隐藏操作，需要用nexttick等待endupscroll执行完再隐藏
        this.$nextTick(() => {
          this.mescroll.hideUpScroll(true);
        });
      }
      // 一共有多少页
      this.totalPage = Math.ceil(this.total / 10) - 1;
      if (this.page > this.totalPage) {
        this.mescroll.endUpScroll(true);
      }
      this.mescroll.endSuccess();
    },
    cmsMenu(newValue) {
      if (!newValue) {
        this.mescroll.showEmpty();
        return;
      }
      this.columnDate = newValue;
      try {
        this.twoColumn = !!this.columnDate[this.isActivated].children[0];
      } catch (e) {
        this.twoColumn = false;
      }
      this.mescroll.removeEmpty();
    },
    cmsError(newValue) {
      this.$vux.toast.show({
        text: newValue.data.error,
        type: "text"
      });
      if (newValue) {
        this.mescroll.endErr();
      }
    }
  },
  methods: {
    // ...mapActions('cms', ['getCmsMenu', 'getCmsList', 'setCurrentTab']),
    // ...mapActions("cms", ["getCmsList", "setCurrentTab"]),

    // 点击二级栏目
    onMoreMenuClk(index, item) {
      if (!item) return;
      this.isActivated = index;
      this.columnType = item.columnType;
      const box = document.getElementById("oneColumnBox");
      const ulDom = document.getElementById("oneColumn");
      const liDom = ulDom.getElementsByTagName("li")[index];
      const offLeft = liDom.offsetLeft;
      try {
        box.scrollTo(offLeft, 0);
      } catch (e) {
        try {
          box.scrollLeft = offLeft;
        } catch (e1) {
          console.log(e1);
        }
      }
      this.isDown = false;
      this.page = 1;
      this.getListById(item.id);
    },
    // 点击一级栏目
    onMainMenuClk(index, item) {
      if (this.isActivated === index) {
        return;
      }
      this.isActivated = index;
      this.mescroll.scrollTo(0, 30);
      this.isSign = 0;
      this.columnType = item.columnType;
      this.page = 1;
      // 二级栏目是否显示
      this.getListById(item.id);
      console.log(item.id);
      this.mescroll.resetUpScroll(); // 重置mescroll内部的page.num为1
    },
    // 获取columnId函数
    getColumnId(index, n) {
      const isA = index || 0;
      const isS = n || 0;
      return this.columnDate && this.columnDate[isA].id;
    },

    async getMenuData() {
      let res = await api.tabFirst();
      let { resultContent } = res.data.resultContent;
      this.columnDate = resultContent;
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    downCallback(mescroll) {
      this.mescroll.resetUpScroll();
    },
    async upCallback(page, mescroll) {
      await this.getMenuData();
      this.getCmsList(
        this.columnDate[this.isActivated] &&
          this.columnDate[this.isActivated].id
      ).then(res => {
        const {
          resultContent: { total }
        } = res.data;
        console.log("res data", res);
        if (total || isNumber(total)) {
          this.$nextTick(() => {
            mescroll.endSuccess(total);
          });
        } else {
          mescroll.endErr();
        }
      });
    },

    // 获取内容列表
    getListById(id) {
      return this.getCmsList(id);
    },

    async getCmsList(cid) {
      let res = await api.cmsList({
        columnId: cid,
        page: this.page,
        rows: this.pageSize
      });

      const {
        resultContent: { rows, total },
        resultFlag,
        resultMsg
      } = res.data;

      if (resultFlag) {
        this.cmsList = rows || [];
      } else {
        toToast(resultMsg);
      }
      return res;
    },

    toFile(url) {
      window.location.href = url;
    },
    toDetail(id) {
      // 把数据的位置带到下一个页面中
      this.$router.push({
        path: `/findDetail/${id}`
      });
    }
  },
  filters: {
    dataBefore(value) {
      return value.split(" ")[0];
    },
    sumaryFilter(value) {
      if (value && value.length > 16) {
        value = value.substring(0, 16) + "...";
      }
      return value;
    }
  }
};
</script>

<style lang='scss' scoped>
.secondTotal {
  .secondDiv {
    position: absolute;
    z-index: 1000;
    background: #fff;
    width: 100%;
    .clearfix::after {
      content: "";
      clear: both;
      display: block;
      height: 0;
      visibility: hidden;
    }
    ul {
      padding: 7.5px 15px;
      border-bottom: 1px solid #e0e3e5;
      overflow: hidden;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-around;
      // align-content: space-around;
      li {
        height: 28px;
        width: 77.5px;
        float: left;
        background: #f5f5f5;
        margin: 7.5px 4px;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
        color: #5b5f65;
        line-height: 28px;
        border-radius: 2px;
        overflow: hidden;
      }
      .activated2 {
        color: #fff;
        background-color: #e9573d;
      }
    }
  }
}

.maskPopup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

// 未折叠的，最上面的
.tit {
  width: 100%;
  // display: flex;
  top: 0;
  left: 0;
  background-color: #fff;
  height: 50px;
  box-sizing: border-box;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid #e0e3e5;
  position: fixed;
  .content {
    // flex-grow: 1;
    margin-right: 35px;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    .oneColumnBox {
      -webkit-overflow-scrolling: touch;
      /*这个属性可以使滚动更流畅有左右弹动*/
      margin-top: 0;
      // -webkit-transform: translateY(0.4rem) !important;
      // transform: translateY(0.4rem);
      position: absolute;
      left: 0;
      overflow-x: auto;
      width: 100%;
      height: -webkit-calc(100% + 6px);
    }
    .oneColumn {
      height: 100%;
      display: -webkit-box;
      width: 100%;
      li {
        margin: 0 16.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        box-sizing: border-box;
        color: #292b2d;
        border-bottom: 2px solid transparent;
        font-size: 14px;
        line-height: 20px;
      }
      .activated1 {
        font-weight: bold;
        color: #c21b17;
        border-bottom: 2px solid #c21b17;
      }
    }
  }
  .mark {
    display: block;
    width: 13px;
    height: 7px;
    margin: 20px 15px 16px 8px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .down {
    transform: rotateZ(180deg);
  }
}

//栏目二
.column {
  width: 100%;
  overflow: hidden;
  height: 35px;
  position: fixed;
  top: 45px;
  left: 0;
  z-index: 2;
  .column-box {
    -webkit-overflow-scrolling: touch;
    /*这个属性可以使滚动更流畅有左右弹动*/
    margin-top: -0.4rem;
    padding-bottom: 0.4rem;
    -webkit-transform: translateY(0.4rem) !important;
    transform: translateY(0.4rem);
    position: relative;
    overflow-x: auto;
    background-color: #fff;
    overflow-y: hidden;
    .twoCon {
      width: 100%;
      height: 100%;
      height: 35px;
      background-color: #fff;
      display: -webkit-box;
      .towCon-li {
        background: #fff;
        font-size: 13px;
        height: 35px;
        width: 75px;
        color: #666;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active {
        color: #ff9600;
      }
    }
  }
}
.consult {
  height: 100%;
  width: 100%;
  background: #fff;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow: hidden;
}

.consult .ny-vux-tab-item {
  font-size: 15px;
}

.selectConsult {
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  background: #ffffff;
}

.selectConsult h1 {
  font-size: 20px;
  background: linear-gradient(#ff8d00, #ff6a00);
  color: #ffffff;
}

.lists li {
  padding-right: 15px;
  background: #ffffff;
  margin-left: 15px;
  height: 110px;
  border-bottom: 1px solid #e0e3e5;
}

.lists .item {
  padding: 15px 0;
  overflow: hidden;
  font-size: 14px;
  height: 110px;
  width: 100%;
  // display: flex;
  .itemCon {
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    height: 79.5px;
    .itemConTit {
      font-size: 15px;
      line-height: 21px;
      color: #292b2d;
      width: 100%;
      overflow: hidden;
      margin-top: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    span {
      color: #d3a243;
      margin-right: 5px;
    }
    .itemConTime {
      color: #b0b2b3;
      font-size: 13px;
      line-height: 18.5px;
      margin-top: 10px;
      text-align: right;
      position: absolute;
      right: 0;
      bottom: -15px;
    }
    .desc {
      width: 100%;
      color: #b0b2b3;
      font-size: 13px;
      line-height: 18.5px;
      //   position: absolute;
      //   top: 43px;
      //   right: 0;
      margin-top: 0;
      text-align: left;
    }
  }
  .itemImg {
    margin-right: 11.5px;
    width: 130px;
    // min-width:130px;
    height: 80px;
    // display: flex;
    float: left;
  }
}

.lists .video {
  display: flex;
  flex-direction: column;
  padding: 20px 15px 20px 0;
  border-bottom: 1px solid #f3f3f3;
  background: #ffffff;
  .videoTitle {
    font-size: 15px;
    line-height: 15px;
    color: #333333;
    width: 100%;
  }
  .videoTime {
    color: #999999;
    font-size: 14px;
    line-height: 10px;
    width: 100%;
    text-align: right;
    margin-top: 10px;
  }
  .videoImg {
    display: flex;
    width: 100%;
    height: 180px;
    margin-top: 8px;
  }
}

.vux-tab {
  position: fixed;
  top: 0;
  z-index: 10000;
  width: 100%;
}

.vux-tab .vux-tab-item.vux-tab-selected {
  color: #ff9900;
  border-bottom: 3px solid #ff9900;
}

/*展示上拉加载的数据列表*/

.data-list .li {
  position: relative;
  padding: 10px 8px 10px 120px;
  border-bottom: 1px solid #eee;
}

.data-list .pd-img {
  position: absolute;
  left: 18px;
  top: 18px;
  width: 80px;
  height: 80px;
}

.data-list .pd-name {
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
}

.data-list .pd-price {
  margin-top: 8px;
  color: red;
}

.data-list .pd-sold {
  font-size: 12px;
  margin-top: 8px;
  color: gray;
}
.mescroll {
  width: 100%;
  background: #fff;
}
// .mescroll-empty .empty-icon,.mescroll-empty img{
//     width:100%!important;
// }
</style>
