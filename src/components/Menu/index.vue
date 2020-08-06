<template>
  <div>
    <div
      class="c-menu-container"
      @touchmove="notmove" >
      <!-- :to="{name: item.routeName == 'user' ? (isChannel ? 'channel' : 'user') : item.routeName}" -->
      <ul class="c-menu-navbar">
        <router-link
          v-for="item in menu"
          :class="[curMenuName === item.routeName ? 'seled':'', item.class]"
          :key="item.id"
          :to="{name: item.routeName == 'user' ? (isChannel ? 'channel' : 'user') : item.routeName}"
          :title="item.routeName"
          tag="li"
          exact
        >
          {{ item.name }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import { TransferDomDirective as TransferDom } from 'vux'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      visible: true,
      menu: [
        { name: '首页', id: 0, class: 'center', routeName: 'indexPage' },
        { name: '产品', id: 1, class: 'product', routeName: 'productList' },
        { name: '发现', id: 2, class: 'consult', routeName: 'find' },
        { name: '我的', id: 3, class: 'user', routeName: 'user' },
      ],
    };
  },
  created() {
  },
  computed: {
    // ...mapGetters('user', ['isChannel']),
    isChannel(){
        return false;
    },
    curMenuName() {
      if (this.$route.name === 'indexPage') {
        //this.setTitle('首页')
      }
      if (this.$route.name === 'channel') {
        return 'user'
      }
      return this.$route.name
    },
  },
//   directives: {
//     TransferDom,
//   },
  methods: {
    // onMenuClk(name) {
    //   if (name === 'find') {
    //     window.location.href = '/cms'
    //   } else {
    //     this.$router.push({ name })
    //   }
    // },
    notmove() {
      return false;
    },
  },
};
</script>

<style lang='scss' scoped>
$primary-color:#d3a243;
.c-menu-container {
  position: fixed;
  z-index: 10;
  bottom: 0;
  order: 3;
  width: 100%;
  height: 50px;
  background: #fff;
  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
  box-shadow: 1px 5px 20px 0px rgba(186, 212, 247, 0.5);
  overflow: hidden;
  .c-menu-navbar {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    list-style: none;
    > li {
      position: relative;
      flex: 1;
      width: 25%;
      height: 100%;
      padding-top: 30px;
      text-align: center;
      color: #989ba8;
      font-size: 14px;
      line-height: 20px;
      &.center,
      &.product,
      &.consult,
      &.user {
        &:before {
          content: " ";
          position: absolute;
          display: block;
          width: 24px;
          height: 24px;
          top: 5px;
          left: 50%;
          margin-left: -12px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20px auto;
        }
        &.seled {
          color: $primary-color;
        }
      }
      &.center {
        &:before {
          background-image: url('~assets/image/main/icon01.png');
        }
        &.seled:before {
          background-image: url('~assets/image/main/icon11.png');
        }
      }
      &.product {
        &:before {
          background-image: url('~assets/image/main/icon02.png');
        }
        &.seled:before {
          background-image: url('~assets/image/main/icon12.png');
        }
      }
      &.consult {
        &:before {
          background-image: url('~assets/image/main/icon03.png');
          background-size: 22px auto;
        }
        &.seled:before {
          background-image: url('~assets/image/main/icon13.png');
        }
      }
      &.user {
        &:before {
          background-image: url('~assets/image/main/icon04.png');
          background-size: 22px auto;
        }
        &.seled:before {
          background-image: url('~assets/image/main/icon14.png');
        }
      }
    }
  }
}

</style>
