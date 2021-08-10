<template>
    <div class="main">
        <div>
            <!-- 二级路由插座 -->
            <router-view></router-view>
        </div>
        
        <div class="botton-menu">
            <van-tabbar v-model="activeIndex" active-color="blue" inactive-color="#646566" route>
            <van-tabbar-item v-for="item, index in tabbardata" :key="index" :to="item.to">
                <span>{{item.title}}</span>
                <template #icon="props">
                    <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
        </div>

        <div class="blank"></div>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                activeIndex: 0,
                tabbardata: [
                    {
                        title: '首页',
                        activeIcon: require("../assets/images/home_active.png"),
                        inactiveIcon: require("../assets/images/home.png"),
                        to: {name: "Home"}
                    },
                    {
                        title: '菜单',
                        activeIcon: require("../assets/images/menu_active.png"),
                        inactiveIcon: require("../assets/images/menu.png"),
                        to: {name: "Menu"}
                    },
                    {
                        title: '购物袋',
                        activeIcon: require("../assets/images/shopbag_active.png"),
                        inactiveIcon: require("../assets/images/shopbag.png"),
                        to: {name: "Shopbag"}
                    },
                    {
                        title: '我的',
                        activeIcon: require("../assets/images/my_active.png"),
                        inactiveIcon: require("../assets/images/my.png"),
                        to: {name: "My"}
                    },
                ],
            };
        },
    }
</script>

<style lang="less" scoped>
    .botton-menu{
        position: sticky;
        bottom: 0;
    }
    .blank{
        height: 50px;
        width: 100%;
        background: #f7f8fa;
    }
</style>