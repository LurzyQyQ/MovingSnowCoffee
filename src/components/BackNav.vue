<template>
    <div class="top-back-nav">
        <van-nav-bar
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="leftArrow"
        @click-left="goBack"
        />
    </div>
</template>

<script>
    export default {
        name: "BackNav",
        props:{
            title:{
                type: String,
                default: "",
            },
            leftText:{
                type: String,
                default: "",
            },
            rightText:{
                type: String,
                default: "",
            },
            leftArrow:{
                type: Boolean,
                default: false,
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="less" scoped>
.top-back-nav{
    /deep/ .van-nav-bar__text{
        color: #0c34ba;
    }
    /deep/ .van-icon {
        color: #0c34ba;
    }
    /deep/ .van-nav-bar__title{
        color: #646566;
    }
}
</style>