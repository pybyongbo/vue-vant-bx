<template>
    <div class="wrapper">
        <!-- <h2>测试滚动分页加载,要先进行登录哦</h2> -->
        <!-- list列表 -->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div id="mescroll" class="mescroll">
                <div id="newsList">
                    <ul v-cloak id="lists" class="lists data-list">
                        <li v-for="(item, $index) in newsList" :key="$index">
                            <div class="item">
                                <img :imgurl="item.coverUrl" :src="loadingPic" alt="" class="itemImg">
                                <div class="itemCon">
                                    <p class="itemConTit">{{ item.name | subStrFilter(12)}}--{{item.id}}</p>
                                    <p class="desc">{{item.subtitle | subStrFilter(22)}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="nodata" class="m-product-nodata"></div>
                <div class="pagetip">
                    {{curPage}}/{{totalPage}}
                    <!-- <span></span> -->
                </div>
            </div>
        </mescroll-vue>
    </div>
</template>

<script>
import api from "@/api/testpage";
import MescrollVue from "mescroll.js/mescroll";
export default {
  name: "testpage",
  components: {
    MescrollVue
  },
  data() {
    return {
      loadingPic: require("@/assets/image/common/loading-yt.png"),
      newsList: [],
      curPage:1,
      totalPage:0,
      mescrollDown: {
        callback: this.downCallback
      },
      mescrollUp: {
        callback: this.upCallback,
        noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
  created() {
    this.getNewsList(1,10);
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    async getNewsList(pageNo,pageSize) {
      let res = await api.newsList({ pageNum:pageNo, pageSize });
      //  console.log(res);
      const {
        data: { list,pageNum,total,pages },
        status
      } = res.data;

       if (pageNo > pageNum) {
          this.mescroll.endSuccess(rows.length);
          //   this.mescroll.endSuccess(total);
          return;
        }

        if (status==0) {
          //this.listData = this.listData.concat(rows || []);
          this.newsList = this.newsList.concat(list || []);
          this.totalPage = pages;
          if (total || isNumber(total)) {
            this.$nextTick(() => {
              this.mescroll.endSuccess(total);
            });
          } else {
            this.mescroll.endErr();
          }
          this.mescroll.endSuccess(list.length);
          return res.data;
        } else {
          toToast(resultMsg);
        }
      //   this.newsList = list;
    
      return res.data;
    },
    async downCallback(mescroll) {
      mescroll.resetUpScroll();
      mescroll.endSuccess();
    },

    async upCallback(page, mescroll) {
    //   console.log("滚动----", page);
      this.curPage=page.num;
      if (page.num > 1) {
        let result = await this.getNewsList(page.num,page.size);
        console.log(result);
        if (page.num >= result.data.pages) {
          this.mescroll.endSuccess(result.data.list.length);
          return;
        } else {

        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.wrapper{
      height: 100%;
  overflow: hidden;
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

// .data-list .pd-name {
//   font-size: 16px;
//   line-height: 20px;
//   height: 40px;
//   overflow: hidden;
// }

// .data-list .pd-price {
//   margin-top: 8px;
//   color: red;
// }

// .data-list .pd-sold {
//   font-size: 12px;
//   margin-top: 8px;
//   color: gray;
// }
.mescroll {
  width: 100%;
  background: #fff;
}

</style>
<style>
.mescroll-totop{
    bottom:60px;
}
.mescroll-upwarp{
    padding-bottom:100px;
}
.pagetip{
    z-index: 9990;
    position: fixed;
    right: 0.4rem;
    bottom: 8.142857rem;
    width: 3.5rem;
    height: 3.5rem;
    line-height:52px;
    color:#fff;
    border-radius: 50%;
    font-size:12px;
    text-align: center;
    background-color: rgba(0,0,0,0.4);
}

</style>
