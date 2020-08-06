<template>
  <div :class="statusClass">
    <div class="c-pagestatus-img" />
    <div class="c-pagestatus-mes" v-html="statusMessage" />
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        '努力加载中...',
        '暂时没有网络...',
        '暂时没有内容哦~',
        '未找到合适的结果~'
      ]
    }
  },
  props: [
    // eslint-disable-line
    'status' // eslint-disable-line
  ],
  computed: {
    statusClass() {
      const className = this.status.status
        ? `c-pagestatus-00${this.status.status}`
        : 'c-pagestatus-003'
      return className
    },
    statusMessage() {
      return (
        this.status.message || `<p>${this.messages[this.status.status-1 ]}</p>`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.c-pagestatus-001,
.c-pagestatus-002,
.c-pagestatus-003,
.c-pagestatus-004 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  text-align: center;
  // .c-pagestatus-img {
  //   width: 100%;
  //   background-size: contain;
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   height: 100%;
  //   margin: 0 auto;
  // }
  // .c-pagestatus-mes {
  //   font-size: 16px;
  //   line-height: 24px;
  //   color: #999;
  //   position: absolute;
  //   left: 50%;
  //   top: 80%;
  //   transform: translate(-50%,-50%);
  //   p{
  //     padding: 0;
  //     margin: 0;
  //   }
  // }
  .c-pagestatus-img {
    width: 70%;
    height: 175px;
    margin: 22% auto 10px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .c-pagestatus-mes {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #999;
  }
}
@for $i from 1 to 4 {
  .c-pagestatus-00#{$i} {
    .c-pagestatus-img {
      background-image: url('~assets/image/common/00#{$i}.png');
    }
  }
}
</style>
