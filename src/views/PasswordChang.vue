<template>
    <div class="passwordchang">

        <!-- 返回组件 -->
        <div class="user-back">
            <backnav left-arrow title="修改密码" leftText="返回"></backnav>
        </div>

        <div class="chang-password">

            <div class="passwod-one">
                <van-form>
                    <van-field
                    v-model="oldPassword"
                    type="text"
                    name="密码"
                    placeholder="请输入旧密码"
                    autocomplete="off"
                    ref="oldPassword"
                    :rules="[
                        { required: true, message: '请输入旧密码' },
                        {
                        pattern: passwordReg,
                        message: '数字字母下划线组合,以字母开头6-16位',
                        },
                    ]"
                    />
                </van-form>
            </div>
            <div class="passwod-two">
                <van-form>
                    <van-field
                    v-model="newPassword"
                    type="text"
                    name="密码"
                    placeholder="请输入新密码"
                    autocomplete="off"
                    ref="newPassword"
                    :rules="[
                        { required: true, message: '请输入新密码' },
                        {
                        pattern: passwordReg,
                        message: '数字字母下划线组合,以字母开头6-16位',
                        },
                    ]"
                    />
                </van-form>
            </div>

            <div class="chang animate__animated animate__bounceInDown" @click="changPassword">
            done
            </div>

        </div>
    </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

    export default {
        name: "PasswordChang",
        data(){
            return {
                isOpen: false,
                // 验证密码(数字字母下划线组合,以字母开头6-16位)
                passwordReg: /^[A-Za-z]\w{5,15}$/,
                oldPassword: "",
                newPassword: "",
            }
        },
        methods: {
            changPassword(){
                this.axios({
                    method: "post",
                    url: "/updatePassword",
                    data: {
                        tokenString: localStorage.getItem("token"),
                        oldPassword: this.$refs.oldPassword.value,
                        password: this.$refs.newPassword.value,
                    },
                })
                .then((res) => {
                    this.$toast(res.data.msg);
                    setTimeout(() => {
                        this.$router.push({name: "Login"});
                    },1000)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        },
        components: {
            backnav,
        },
    }
</script>

<style lang="less" scoped>
    .passwod-one,
    .passwod-two{
        margin: 0 auto;
        width: 95%;
        input{
            outline: none;
            border: none;
            border-bottom: 1px solid #d1d0d0;
            width: 100%;
            margin-bottom: 10px;
            height: 25px;
        }
    }
    .chang-password{
        width: 90%;
        margin: 10px auto;
        padding: 10px;
        background: white
    }
    .chang{
        width: 100%;
        height: 50px;
        background: white;
        position: absolute;
        text-align: center;
        line-height: 50px;
        color: gray;
        font-size: 14px;
        font-weight: bold;
        bottom: 0;
        left: 0;
    }
</style>