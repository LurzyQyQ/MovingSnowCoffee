<template>
    <div class="looksearch">
        <!-- 顶部返回 -->
        <div class="top-back-nav">
            <backnav left-arrow title="商品列表" leftText="返回"></backnav>
        </div>

        <!-- 顶部背景区 -->
        <div class="bg-top"></div>

        <div class="list-box animate__animated animate__bounceInDown">
            <div class="list-item" v-for="item, index in resSearch" :key="index" @click="getPid(item.pid)">
                <div class="item-img">
                    <img :src="item.smallImg">
                </div>
                <div class="item-name">{{item.name}}</div>
                <div class="item-enname">{{item.enname}}</div>
                <div class="item-money">￥{{item.price}}</div>
            </div>
        </div>


    </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

    export default {
        name: "LookSearch",
        data(){
            return {
                resSearch: ""
            }
        },
        created(){
            this.resSearch = this.$route.params;
            console.log(this.resSearch);
        },
        methods: {
            shopcartCount(){
                this.axios({
                    method: "get",
                    url: "/shopcartCount",
                    params: {
                        tokenString: localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            },      
            getPid(pid) {
                this.shopcartCount()
                this.$router.push({ name: "Detail", params: { pid } });
            },
            
        },
        components: {
            backnav,
        },
    }
</script>

<style lang="less" scoped>
    .list-item{
        margin: 10px 0px 10px 10px;
        .item-name{
            font-size: 14px;
            color: #646566;
            margin-top: 10px;
        }
        .item-enname{
            margin-top: 5px;
            font-size: 12px;
            color: gray;
            width: 107px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .item-money{
            margin-top: 8px;
            font-weight: bold;
            color: #0c34ba;
            font-size: 13px;
        }
        .item-img{
            width: 107px;
            height: 107px;
            img{
                width: 100%;
            }
        }
    }
    .list-box{
        display: flex;
        flex-wrap: wrap;
        // padding: 10px;
        box-sizing: border-box;
        width: 95%;
        background: white;
        margin: -15px auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .bg-top {
        height: 100px;
        background: #0c34ba;
    }
</style>