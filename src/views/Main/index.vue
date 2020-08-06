<template>
 <div class="p-main-container">
    <transition>
      <!-- <keep-alive exclude="ProductList"> -->
        <router-view name="center"/>
      <!-- </keep-alive> -->
    </transition>
    <router-view name="bottom"/>
  </div>
</template>

<script>
// import Loading from "@/components/loading/loading"
export default {
  name: 'Center',
//   inject: {
//     wechatUtil: 'wechatUtil',
//   },
  data() {
    return {
    }
  },
  mounted() {
    console.log('绑定回退事件')
    // 禁止回退
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', this.doNothing, false)
  },
  beforeDestroy() {
    console.log('解绑回退事件')
    window.removeEventListener('popstate', this.doNothing, false)
  },
  created() {
  },
//    components: {
//       Loading,
//     },
  methods: {
    doNothing() {
      // this.wechatUtil.closeWindow()
      console.log('此页面不允许返回')
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.p-main-container{
  width: 100%;
  height: 100%;
//   padding-bottom: 50px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #f3f3f3;
}

</style>
