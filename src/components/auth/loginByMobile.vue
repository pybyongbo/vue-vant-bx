<template>
    <div>
          <!-- v-validate="'required|mobile'" 
            name="mobilephone" 
            data-vv-as="手机号"  -->
        <van-cell-group>
            <van-field 
            v-model="mobileNo" 
            label="手机号" 
            placeholder="请输入手机号" 
          
            autocomplete="off" clearable 
            >
            <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="edit"></van-icon>
            </van-field>
            <van-field
                v-model="smsNo"
                center
                clearable
                label="验证码"
                placeholder="请输入短信验证码"   
            >
            <van-icon class="iconfont" class-prefix="icon" slot="left-icon" name="look"></van-icon>
            <template #button>
                <van-button size="small" type="primary">发送验证码</van-button>
            </template>
            </van-field>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name:"loginByMobile",
        $_veeValidate: {
            validator: "new" // give me a new validator each time.
        },
        data(){
            return {
                mobileNo:'',
                smsNo:''
            }
        },
        methods:{

            resetForm(){
                this.mobileNo="";
                this.smsNo = ""
            },
            onLogin(e) {
                this.$validator.validateAll().then(result => {
                    if (!result) {
                    console.log(this.errors.all());
                    this.toToast(this.errors.all()[0]);
                    return;
                    } else {
                    // console.log(this.$toast);
                    this.$toast.loading({
                        message: "登录中...",
                        forbidClick: true,
                        loadingType: "spinner"
                    });
                    window.location.replace(`/main/user11`)
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
}
</script>

<style scoped>

</style>