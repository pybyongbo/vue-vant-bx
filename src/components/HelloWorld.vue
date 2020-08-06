<template>
    <div class="hello">
        <h2>vant+vee-validate验证测试</h2>
        <br><br>

        
        <van-cell-group>
            <van-field 
            v-model="username"
             label="用户名"
              placeholder="请输入用户名"
               v-validate="'required|username'" 
               name="username" 
               data-vv-as="用户名" 
               autocomplete="off"
               clearable
               />

            <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号" v-validate="'required|mobile'" name="mobile" data-vv-as="手机号" clearable autocomplete="off"/>
        </van-cell-group>

        <br><br>

        <van-button @click="submitForm" block type="primary">登录</van-button>
    </div>
</template>

<script>
export default {
  name: "FooterMenu",
  $_veeValidate: {
    validator: "new" // give me a new validator each time.
  },
  data() {
    return {
      username: "",
      phone: ""
    };
  },
  methods: {
    submitForm(e) {
      this.$validator.validateAll().then(result => {
        if (!result) {
          console.log(this.errors.all());
          //   this.showError(this.errors.all()[0]);
          this.toToast(this.errors.all()[0]);
          return;
        } else {
          console.log(this.$toast);
          this.$toast.loading({
            message: "登录中...",
            forbidClick: true,
            loadingType: "spinner"
          });
        }
      });
    },
    toToast(txt) {
      this.$toast({
        message: txt,
        position: "middle"
      });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
