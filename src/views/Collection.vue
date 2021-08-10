<template>
  <div class="collection">
    <!-- 返回组件 -->
    <div class="user-back">
      <backnav left-arrow title="我的收藏" leftText="返回"></backnav>
    </div>

    <!-- 顶部背景区 -->
    <div class="bg-top"></div>

    <div class="collection-menu animate__animated animate__bounceInUp">
      <div class="collection-item"
      v-for="item, index in arrShop"
      :key="index"
      >
          <div class="item-img">
              <img :src="item.smallImg">
          </div>
          <div class="item-name">{{item.name}}</div>
          <div class="item-enname">{{item.enname}}</div>
          <div class="item-icon">
              <div class="item-money">￥{{item.price}}</div>
              <i class="fa fa-trash"
              @click="deleteCollection(item.pid)"
              ></i>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

export default {
  name: "Collection",
  data(){
      return {
          arrShop: "",
      }
  },
   components: {
    backnav,
  },
  methods: {
    getCollection(){
        this.axios({
        method: "get",
        url: "/findAllLike",
        params: {
          tokenString: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if(res.data.result.length == 0){
          this.$toast("暂时没有数据哦")
        }
        if(res.data.code === 2000){
          this.arrShop = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    deleteCollection(pid){
        this.axios({
        method: "post",
        url: "/notlike",
        data: {
          pid: pid,
          tokenString: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        location.reload()
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  created(){
      this.getCollection()
  }
}
</script>

<style lang="less" scoped>
.collection-item{
    margin-left: 9px;
    margin-top: 9px;
    width: 107px;
    .item-icon{
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-money{
            font-size: 15px;
            color: #0c34ba;
            font-weight: bold;
        }
        i{
            color: gray;
        }
    }
    .item-enname{
        margin-top: 5px;
        font-size: 12px;
        color: gray;
        width: 107px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .item-name{
        margin-top: 10px;
        font-size: 14px;
        color: #302f2f;
    }
    .item-img{
        background: pink;
        width: 100%;
        height: 107px;
        img{
            width: 100%;
        }
    }
}
.collection-menu {
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: -20px auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: white;
}
.bg-top {
  height: 100px;
  background: #0c34ba;
}
</style>