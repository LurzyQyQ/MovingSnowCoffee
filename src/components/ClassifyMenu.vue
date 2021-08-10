<template>
    <div class="box">
        <div class="left-menu animate__animated animate__bounceInLeft">
            <div class="menu-list-left">
                <div class="menu-list-item" :class="{activee: activeIndex === index}" v-for="item, index in menuList" :key="index" @click="toggleMenuList(index, item.type)">{{item.typeDesc}}
                    <div class="color" :class="{active: activeIndex === index}"></div>
                </div>
            </div>
        </div>
        <div class="right-menu animate__animated animate__bounceInDown">
            <div class="menu-list-right">
                <div class="menu-item" v-for="item, index in products" :key="index" @click="getPid(item.pid)">
                    <div class="item">
                        <img :src="item.smallImg" class="img">
                    </div>
                    <div class="chinaese">{{item.name}}</div>
                    <div class="english">{{item.enname}}</div>
                    <div class="money">￥{{item.price}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                menuList: [],
                activeIndex: 0,
                products: [],
            }
        },
        created(){
            this.getProductType()
        },
        methods:{
            
            //获取商品类型
            getProductType(){
                this.axios({
                    //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
                    method: "get",
                    url: "/type",
                }).then(res => {
                    if(res.data.code === 400){
                        res.data.result.unshift({type: "isHot", typeDesc: "热卖推荐"});
                        this.menuList = res.data.result;
                        this.getProductByType(res.data.result[this.activeIndex].type)
                    }
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            //切换类型列表
            toggleMenuList(index, type){
                if(this.activeIndex === index){
                    return;
                }
                this.activeIndex = index;
                //根据商品类型获取商品数据
                this.getProductByType(type)
            },
            //根据商品类型获取商品数据
            getProductByType(type){
                //type: 商品类型
                // console.log(type);
                let key = "";
                let value = "";
                if(type === "isHot"){
                    key="isHot"
                    value= 1;
                }else{
                    key="type";
                    value= type
                }
                this.axios({
                    //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
                    method: "get",
                    url: "/typeProducts",
                    params: {
                        key,
                        value,
                    }
                }).then(res => {
                    if(res.data.code === 500){
                        this.products = res.data.result;
                    }
                    // console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取商品pid
            getPid(pid){
                this.$router.push({name: "Detail", params: { pid}})
            }
        },
    }
</script>

<style lang="less" scoped>
.box{
    display: flex;
    justify-content: space-between;
    .left-menu{
        width: 27%;
        height: auto;
        background: white;
        margin-top: 10px;
        color: #646566;
    .menu-list-left{
        overflow-y: auto;
        width: 100%;
        height: auto;
        .menu-list-item{
            text-align: center;
            height: 20px;
            line-height: 20px;
            padding: 10px 20px;
            .color{
                transition: all .5s linear;
            }
            .color.active{
                width: 50px;
                height: 2px;
                background: #0c34ba;
                margin: 0 auto;
                transform: translate(-60px);
            }
        }
        .menu-list-item.activee{
            color: #0c34ba;
        }
    }
}
.right-menu{
    width: 70%;
    height: auto;
    background: white;
    margin-top: 10px;
    // margin-left: 100px;
    color: #646566;
    display: flex;
    .menu-list-right{
        // background: white;
        // border: 1px solid black;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        width: 100%;
        height: auto;
        margin: 0 auto;
        // justify-content: center;
        align-items: center;
        .menu-item{
            // border: 1px solid black;
            // background: skyblue;
            margin: 6px 5px;
            .chinaese{
                font-size: 15px;
                font-weight: 700;
                color: #646566;
                margin-top: -5px;
            }
            .english{
                color: #aeaaa1;
                margin-top: -28px;
                width: 100px;
                /* 元素溢出内容  隐藏 */
                overflow: hidden;
                /* 设置文本不折行 */
                white-space: nowrap;
                /* 元素溢出打点 */
                text-overflow: ellipsis;
            }
            .money{
                font-size: 15px;
                font-weight: 700;
                color: orangered;
                margin-top: -28px;
            }
            .item{
                width: 117px;
                    height: 117px;
                    background: #f7f8fa;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
}
</style>