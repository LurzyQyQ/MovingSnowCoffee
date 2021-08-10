<template>
    <div class="usermanage">
        <!-- 返回组件 -->
        <div class="user-back">
            <backnav left-arrow title="设置" leftText="返回"></backnav>
        </div>

        <!-- 退出登录 -->
        <div class="manage-done" @click="manageDone">
            退出登录
        </div>
        <!-- 注销 -->
        <div class="manage-logout" @click="manageLogout">
            注销账号
        </div>

    </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

    export default {
        name: "UserManage",
        methods: {
            // 退出登录
            manageDone(){
                this.axios({
                    method: "post",
                    url: "/logout",
                    data: {
                        tokenString: localStorage.getItem("token")
                    }
                }).then( res => {
                    this.$toast(res.data.msg)
                    setTimeout(() => {
                        this.$router.push({name: "Home"});
                    },1500)
                    console.log(res);
                }).catch( err => {
                    console.log(err);
                })
            },
            // 注销账号
            manageLogout(){
                this.axios({
                    method: "post",
                    url: "/destroyAccount",
                    data: {
                        tokenString: localStorage.getItem("token")
                    }
                }).then( res => {
                    this.$toast(res.data.msg)
                    setTimeout(() => {
                        this.$router.push({name: "Login"});
                    },1500)
                    console.log(res);
                }).catch( err => {
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
.manage-logout,
.manage-done{
    width: 100%;
    margin-top: 10px;
    height: 50px;
    background: white;
    text-align: center;
    line-height: 50px;
    color: gray;
}

</style>