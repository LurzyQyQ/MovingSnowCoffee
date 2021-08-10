<template>
  <div class="home">
    <div class="topnav">
      <div class="hello">
        <span>下午好</span>
        <a @click="gotoInformation" href="javascript:(0);">{{nickName = nickName ? nickName : "Allen"}}</a>
      </div>
      <div class="search">
        <i class="fa fa-search"></i>
        <input
          type="text"
          ref="searchname"
          @keyup.enter="search"
        />
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="4000" v-if="show">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image.bannerImg" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 热卖导航 -->
    <div class="hot">
      <div class="content">
        <div class="txt">热卖推荐</div>
      </div>
    </div>

    <!-- 商品区 -->
    <div class="shop">
      <div
        class="shop-item"
        @click="getPid(item.pid)"
        v-for="(item, index) in products"
        :key="index"
      >
        <div class="shop-item-img">
          <img :src="item.smallImg" />
        </div>
        <div class="shop-item-txt">
          <div class="shop-item-txt-chinese">{{ item.name }}</div>
          <div class="shop-item-txt-english">{{ item.enname }}</div>
          <div class="shop-item-txt-money">￥{{ item.price }}</div>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div class="backtop">
      <backtop></backtop>
    </div>
  </div>
</template>

<script>
import backtop from "../components/BackTop.vue";
export default {
  name: "Home",
  data() {
    return {
      nickName: "",
      show: true,
      products: [],
      images: ""
    };
  },
  created() {
    this.getProductType();
    this.getUser();
    this.getBanner();
  },
  methods: {
    // 轮播图信息
    getBanner(){
      this.axios({
        method: "get",
        url: "/banner",
      })
      .then((res) => {
        if(res.data.code === 300){
          this.images = res.data.result;
        }
      })
      .catch((err) => {
      });
    },
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
      })
      .catch((err) => {
      });
    },
    shopcartCount(){
        this.axios({
            method: "get",
            url: "/shopcartCount",
            params: {
                tokenString: localStorage.getItem("token"),
            },
        })
        .then((res) => {
        })
        .catch((err) => {
        });
    },
    //获取热卖商品类型
    getProductType() {
      this.axios({
        //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
        method: "get",
        url: "/typeProducts",
        params: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          key: "isHot",
          value: 1,
        },
      })
        .then((res) => {
          if (res.data.code === 500) {
            this.products = res.data.result;
          }
        })
        .catch((err) => {
        });
    },
    getPid(pid) {
      this.shopcartCount()
      this.$router.push({ name: "Detail", params: { pid } });
    },
    getUser() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
        params: {
          tokenString: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.nickName = res.data.result[0].nickName;
      })
      .catch((err) => {
      });
    },
    gotoInformation(){
      this.$router.push({name: "Information"})
    }
  },
  components: {
    backtop,
  },
};
</script>

<style lang="less" scoped>
.home {
  .shop {
    display: flex;
    width: 94%;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    .shop-item {
      // border: 1px solid black;
      // width: 165px;
      // height: 200px;
      background: white;
      margin-left: 20px;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 10px;
      .shop-item-img {
        background: #f7f8fa;
        width: 145px;
        height: 145px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .shop-item-txt {
        color: #646566;
        .shop-item-txt-chinese {
          width: 100px;
          font-size: 15px;
          margin-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .shop-item-txt-english {
          width: 100px;
          color: gray;
          margin-top: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .shop-item-txt-money {
          font-size: 15px;
          font-weight: 700;
          color: #0c34ba;
          margin-top: 8px;
        }
      }
      &:nth-child(odd) {
        margin-left: 0px;
      }
    }
  }
  .hot {
    // border: 1px solid black;
    background: white;
    width: 94%;
    margin: 10px auto;
    padding: 8px 0px;
    .content {
      // border: 1px solid black;
      height: 38px;
      width: 90px;
      text-align: center;
      background: #0c34ba;
      border-top-right-radius: 20px;
      margin-left: -5px;
      position: relative;
      .txt {
        line-height: 50px;
        font-size: 15px;
        line-height: 38px;
        color: white;
      }
    }
  }
  .swiper {
    border-radius: 10px;
    overflow: hidden;
    width: 94%;
    height: 260px;
    margin: 0 auto;
    margin-top: 10px;
    background: white;
    img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
  .topnav {
    background: white;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    .hello {
      width: 30%;
      // border: 1px solid black;
      text-align: center;
      line-height: 50px;
      display: flex;
      justify-content: center;
      span {
        font-size: 15px;
        font-weight: 900;
        color: #646566;
        margin-right: 10px;
      }
      a {
        font-size: 15px;
        font-weight: 600;
        color: blue;
        width: 55px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .search {
      width: 70%;
      text-align: center;
      line-height: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        position: absolute;
        left: 14px;
        line-height: 50px;
        color: blue;
      }
      input {
        border-radius: 20px;
        border: 1px solid #f7f8fa;
        background: #f7f8fa;
        padding: 0px 30px;
        width: 90%;
        height: 36px;
        font-size: 15px;
        color: #d3dbde;
        vertical-align: middle;
      }
    }
  }
  background: #f7f8fa;
  user-select: none;
}
</style>