<template>
    <div class="information">
        <div v-if="pageStatusShow && detailInfo">
            <div class="datatime">
                <h1>{{ detailInfo.title }}</h1>
                <p class="gray">
                    作者：<span class="auth">{{ detailInfo.author }}
                    </span><span>{{ detailInfo.releaseDate }}</span>
                    <span class="readcount">阅读量：{{detailInfo.contentViews}}</span>
                </p>
            </div>
            <div v-if="detailInfo.contentType!=2" id="dataContent" class="content" v-html="detailInfo.content" />
            <video width="100%" v-if="detailInfo.contentType==2" :poster="detailInfo.coverUrl" controls style="margin-top:20px;">
                <source :src="videoUrl">
            </video>
            <div v-show="isShowCode" class="info-code">
                <div class="code-img">
                    <!-- <img src="~assets/image/common/yt_ewm.jpeg"> -->
                </div>
                <p class="p-code">更多精彩资讯，请长按二维码关注</p>
            </div>
        </div>
        <pageStatus v-if="!pageStatusShow" :status="pagestate" />
    </div>
</template>

<script>
import api from "@/api/cms";
import pageStatus from "@/components/common/pageStatus";
import { toToast } from "@/utils/tools.js";
export default {
  name: "findDetail",
  data() {
    return {
      detailInfo: {},
      pagestate: {
        status: 1
      },
      pageStatusShow: false,
      isShowCode: false
    };
  },
  components: {
    pageStatus
  },
  created() {
    console.log(this.$route.params.id);
    this.initData();
  },
  computed: {
    videoUrl() {

      var str = this.detailInfo.content;
      var patt = /<video[^>]+src=['"]([^'"]+)['"]+/g;
      var result = [],
        temp;

      while ((temp = patt.exec(str)) != null) {
        result.push(temp[1]);
      }
      return result.join();
    }
  },
  methods: {
    async initData() {
      const { id } = this.$route.params;
      try {
        const res = await api.getCmsDetail({ id });

        const { resultContent, resultFlag, resultMsg } = res.data;

        if (resultFlag) {
          this.detailInfo = Object.assign({}, resultContent);
          this.pageStatusShow = true;
        } else {
          this.pagestate.status = 3;
          toToast(resultMsg);
        }
      } catch (err) {
        console.log(err);
      }

      if (window.location.href.indexOf("share=share") !== -1) {
        this.isShowCode = true;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.information {
  -webkit-user-select: none;
  user-select: none;
  padding: 28px 20px 0 20px;
  position: relative;
  height: 100%;
}

.infor {
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  background: #ffffff;
  border-bottom: 1px solid #f3f3f3;
}

.infor img {
  height: 20px;
  width: 10px;
  position: absolute;
  left: 0;
  top: 15px;
  left: 15px;
}

.infor h1 {
  font-size: 20px;
}

.infor .share {
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 17px;
  color: #000000;
}

.datatime h1 {
  font-weight: 600;
  font-size: 17px;
  color: #292b2d;
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}

.datatime p {
  padding: 10px 0 15px 0;
  border-bottom: 1px solid #e0e0e0;
}

.content {
  margin-top: 15px;
  line-height: 30px;
  font-size: 14px;
  color: #6f7072;
  text-align: justify;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
  width: 100%;
  p {
    img {
      width: 100% !important;
    }
  }
}

.content div {
  margin-bottom: 8px;
}

.gray {
  font-size: 12px;
  color: #b0b2b3;
  letter-spacing: 0;
  line-height: 14px;
  span.readcount {
    float: right;
    margin-right: 15px;
  }
}
.gray .auth {
  margin-right: 30px;
}

.black {
  text-indent: 2em;
}

.info-code {
  margin: 27px 0;
  .code-img {
    width: 125px;
    height: 125px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    padding: 2px;
    img {
      width: 120px;
      display: block;
    }
  }
  .p-code {
    margin-top: 17px;
    font-size: 14px;
    color: #5b5f65;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>

<style lang="less">
.content p img {
  width: 100% !important;
}
</style>
