<template>
  <div class="menu">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" ref="searchname" @keyup.enter="search" value="请输入商品名称" onfocus="javascript:if(this.value=='请输入商品名称')this.value='';">
      </div>

      <!-- 菜单栏物品 -->
      <div class="classifymenu">
        <classifymenu></classifymenu>
      </div>

      <!-- 回到顶部 -->
      <div class="backtop">
        <backtop></backtop>
      </div>

      <div class="blank"></div>
  </div>
</template>

<script>
import classifymenu from '../components/ClassifyMenu.vue'
import detail from './Detail.vue'
import backtop from '../components/BackTop.vue'

export default {
  name: "Menu",
  // data(){
  //   return {
  //     menuList: ""
  //   }
  // },
  // created(){
  //   this.getProductType()
  // },
  methods:{
    //获取商品类型
    // getProductType(){
    //   this.axios({
    //     //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
    //     method: "get",
    //     url: "/type",
    //     params: {
    //       appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
    //     }
    //   }).then(res => {
    //     if(res.data.code === 400){
    //       res.data.result.unshift({type: "isHot", typeDesc: "热卖推荐"});
    //       this.menuList = res.data.result;
    //     }
    //     console.log(res);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // }
    // 搜索
    search(){
      this.axios({
      method: "get",
      url: "/search",
      params: {
        name: this.$refs.searchname.value,
      },
      })
      .then((res) => {
        this.$router.push({name: "LookSearch", params: res.data.result})
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  components: {
    classifymenu,
    detail,
    backtop
  }
};
</script>

<style lang="less" scoped>
.blank{
        height: 40px;
        width: 100%;
        background: #f7f8fa;
    }
.menu {
  background: #ffffff;
  user-select: none;
  height: 50px;
  line-height: 50px;
  .search{
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        position: absolute;
        left: 14px;
        line-height: 50px;
        color: blue;
      }
      input{
        border-radius: 20px;
        border: 1px solid #f7f8fa;
        background: #f7f8fa;
        padding: 0px 30px;
        width: 100%;
        height: 36px;
        font-size: 15px;
        color: #d3dbde;
        vertical-align: middle;
      }
    }
}
</style>