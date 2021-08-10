<template>
  <div class="detail">
    <!-- 顶部返回 -->
    <div class="top-back-nav">
      <backnav left-arrow title="商品详情" leftText="返回"></backnav>
    </div>
    <!-- 背景图片 -->
    <div class="detail-big-img animate__animated animate__bounceInDown">
      <img :src="productDetail.large_img" />
    </div>
    <!-- 物品详情栏 -->
    <div class="detail-bottom animate__animated animate__bounceInUp">
      <!-- 简介 -->
      <div class="synopsis">
        <div class="top-synopsis">
          <div class="top-americano">{{ productDetail.name }}</div>
          <div class="right-money">￥{{ productDetail.price }}</div>
        </div>
      </div>
      <div class="bottom-synopsis">{{ productDetail.enname }}</div>

      <!-- 温度栏 -->
      <div class="pro-rule">
        <div
          class="pro-rule-item"
          v-for="(item, index) in productDetail.rules"
          :key="index"
        >
          <div class="pro-rule-title">{{ item.title }}</div>
          <div class="pro-sub-rule">
            <div
              class="pro-sub-rule-item"
              v-for="(v, i) in item.rules"
              :key="i"
              @click="toggleRule(item, i)"
              :class="{ active: item.activeIndex == i }"
            >
              {{ v.title }}
            </div>
          </div>
        </div>
      </div>
      <!-- 数量选择 -->
      <div class="count">
        <div class="content">选择数量</div>
        <div class="stepper">
          <van-stepper
            v-model="count"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
      <!-- 描述栏 -->
      <div class="describe">
        <div class="title">商品描述</div>
        <div
          class="substance"
          v-for="(item, index) in productDetail.desc"
          :key="index"
        >
          {{ index + 1 }}、{{ item }}。
        </div>
      </div>
    </div>
    <!-- 订单栏 -->
    <div class="order">
      <van-goods-action>
        <van-goods-action-icon icon="bag" :color="badge > 0 ? '#0c34ba' : '#323233'" :badge="badge" text="购物袋" />
        <van-goods-action-icon
          icon="like"
          text="收藏"
          :color="isLike ? '#0c34ba' : '#323233'"
          @click="shopLike"
        />
        <van-goods-action-button
          color="#2450f2"
          type="warning"
          @click="addShopcart"
          text="加入购物袋"
        />
        <van-goods-action-button
          color="#0c34ba"
          type="danger"
          text="立即购买"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";
export default {
  name: "Detail",
  data() {
    return {
      count: 1,
      //商品pid
      pid: "",
      //商品详情数据
      productDetail: {},
      isLike: false,
      jianjie: "",
      optionShop: [],
      token: localStorage.getItem("token"),
      badge: "",
    }
  },
  created() {
    this.pid = this.$route.params.pid;
    this.getProductDetailByPid();
    this.shopcartCount()

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
          if(res.data.code === 4000){
              this.badge = res.data.result;
          }
      })
      .catch((err) => {
      });
    },
    
    addShopcart() {
      if(localStorage.getItem("token")){
        this.axios({
          //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
          method: "post",
          url: "/addShopcart",
          data: {
            pid: this.pid,
            count: this.count,
            rule: "无糖/默认奶油",
            tokenString: localStorage.getItem("token"),
          }
        })
        .then((res) => {
          if(res.data.code === 3000){
            location.reload()
          }
        })
        .catch((err) => {
        });
      }else{
        this.$toast("请先登录")
        setTimeout(() => {
          this.$router.push({name: "Login"})
        }, 1000)
      }
    },
    //根据商品pid查询商品详细数据
    getProductDetailByPid() {
      this.axios({
        //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
        method: "get",
        url: "/productDetail",
        params: {
          pid: this.pid,
        },
      })
      .then((res) => {
        if (res.data.code === 600) {
          // this.shopcartCount()
          let data = res.data.result[0];
          data.desc = data.desc.split(/\n/);
          // this.productDetail = data;
          // 处理规格数据
          //模板
          // [
          //     {title: "温度", activeIndex: 0, result: [{title: "冷"}, {title: "热"}]}
          // ]
          let ruleDate = ["cream", "sugar", "milk", "tem"];
          let rules = [];
          ruleDate.forEach((v) => {
            if (!data[v]) {
              return;
            }
            let r = {
              title: data[`${v}_desc`],
              //默认激活下标
              activeIndex: 0,
              rules: [],
            };
            let rs = data[v].split(/\//);
            rs.forEach((item) => {
              let subRule = {
                title: item,
              };
              r.rules.push(subRule);
            });
            rules.push(r);
          });
          data.rules = rules;
          this.productDetail = data;
        }
      })
      .catch((err) => {
      });
    },
    //切换规格
    toggleRule(item, i) {
      if (item.activeIndex === i) {
        return;
      }
      item.activeIndex = i;
      // 商品的每一个温度,糖选项,存储进optionShop,并且存储进公用state
      this.optionShop.push(item.rules[i].title)
    },
    shopLike() {
      this.isLike = !this.isLike;
      // 发起收藏请求
      if (this.isLike === true) {
        this.axios({
          method: "post",
          url: "/like",
          data: {
            pid: this.pid,
            tokenString: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (res.data.code === 800) {
              this.$toast(res.data.msg);
            } else if (res.data.code === 700) {
              this.$toast(res.data.msg);
              //跳转到登录页面
              setTimeout(() => {
                this.$router.push({ name: "Login" });
              }, 1000);
            }
          })
          .catch((err) => {
          });
      } else if (this.isLike === false) {
        this.axios({
          method: "post",
          url: "/notlike",
          data: {
            pid: this.pid,
            tokenString: localStorage.getItem("token"),
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.code === 900) {
              this.$toast(res.data.msg);
            } else if (res.data.code === 700) {
              this.$toast(res.data.msg);
            }
          })
          .catch((err) => {
          });
      }
    },
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-info{
  background: #0c34ba;
}
.pro-sub-rule-item {
  width: 60px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: #e8e8e8;
  margin-right: 10px;
  border-radius: 12px;
  &:last-child {
    margin-right: 0px;
  }
  &.active {
    background: #0c34ba;
    color: white;
    transition: all 0.4s linear;
  }
}

.pro-sub-rule {
  display: flex;
}
.pro-rule-title {
  width: 50px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
}
.pro-rule-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.pro-rule {
  padding: 0px 10px;
  margin-top: 10px;
  color: #323233;
}
.order {
  position: sticky;
  top: 0px;
}
.describe {
  padding: 10px;
  .title {
    color: #646566;
    font-size: 15px;
  }
  .substance {
    color: gray;
    width: 100%;
    height: auto;
    margin: 10px 0px;
  }
}
.count {
  // border-top: 1px solid #e8e8e8;
  // border-bottom: 1px solid #e8e8e8;
  display: flex;
  margin: 0 auto;
  padding: 15px 10px;
  color: #646566;
  font-size: 15px;
  justify-content: space-between;
  /deep/ .van-stepper__plus {
    background: #0c34ba;
  }
  /deep/ .van-stepper__minus {
    border: 1px solid #0c34ba;
    color: #0c34ba;
  }
}
.detail-bottom {
  width: 89%;
  background: white;
  height: auto;
  margin: 0 auto;
  margin-top: -20px;
  padding: 0px 10px;
  margin-bottom: 60px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  .bottom-synopsis {
    padding: 10px;
    color: gray;
    margin-top: -25px;
  }
  .synopsis {
    // border: 1px solid black;
    display: flex;
    .top-synopsis {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 20px 10px;
      .top-americano {
        font-size: 16px;
        font-weight: 700;
        color: #646566;
      }
      .right-money {
        font-size: 16px;
        font-weight: 700;
        color: #0c34ba;
      }
    }
  }
}
.detail-big-img {
  width: 100%;
  img {
    width: 100%;
  }
}
.top-back-nav {
  position: sticky;
  z-index: 10;
  top: 0px;
}
</style>