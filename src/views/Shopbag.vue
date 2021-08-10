<template>
  <div class="shopbag">
    <!-- 顶部返回 -->
    <backnav
      class="top-back-nav"
      title="购物袋"
      left-arrow
      left-text="返回"
    ></backnav>
    <!-- 头部背景图片 -->
    <div class="title-img">
      <img src="../assets/images/shopbag_bg.png" />
    </div>

    <!-- 编辑 -->
    <div
      class="edit"
      @click="editShop"
      v-text="isOver == true ? '完成' : '编辑'"
    ></div>

    <!-- 主体订单 -->
    <div class="shop-box">
      <div class="shop-item" v-for="(item, index) in shopArray" :key="index">
        <!-- 复选框 -->
        <div class="item-radio">
          <van-checkbox
            checked-color="#0c34ba"
            v-model="item.check"
            @click="selectInput(item, index)"
          ></van-checkbox>
        </div>
        <!-- 图片 -->
        <div class="item-img">
          <img :src="item.small_img" />
        </div>
        <!-- 文本 -->
        <div class="item-content">
          <div class="txt">
            <div class="name">
              <div class="znname">{{ item.name }}</div>
              <div class="enname">{{ item.enname }}</div>
            </div>
            <div class="text">{{ item.rule }}</div>
          </div>
          <div class="bottom">
            <div class="money">￥{{ item.price }}</div>
            <div class="stepper">
              <van-stepper
                @plus="addShopCount(item)"
                @minus="downShopCount(item)"
                v-model="item.count"
                theme="round"
                button-size="22"
                disable-input
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交订单 -->
    <div class="place-order">
      <van-submit-bar button-text="提交订单" @submit="gotoOrder">
        <van-checkbox
          checked-color="#0c34ba"
          v-model="checked"
          @click="allInput"
          >全选</van-checkbox
        >
        <div class="moneyShow">
          <div class="text">合计:</div>
          <div class="money">￥</div>
          <div class="gewei">{{ totalSumAll + "." }}</div>
          <div class="xiaoshuwei">00</div>
        </div>
      </van-submit-bar>
    </div>

    <!-- 删除订单 -->
    <div class="place-delete" v-show="isOver == true">
      <van-submit-bar button-text="删除选择" @submit="deleteCheckShop">
        <van-checkbox
          checked-color="#0c34ba"
          v-model="checked"
          @click="allInput"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

export default {
  name: "Shopbag",
  data() {
    return {
      shopArray: [],
      totalSumAll: 0,
      checked: false,
      isOver: false,
      sids: [],
      deleteShop: [],
      v: [],
      counts: 0,
    };
  },
  created() {
    this.getShopUrl();
  },
  methods: {
    // 删除选中商品
    deleteCheckShop() {
      console.log(1111);
      this.axios({
        method: "post",
        url: "/removeShopcart",
        data: {
          tokenString: localStorage.getItem("token"),
          sids: JSON.stringify(this.sids),
        },
      })
        .then((res) => {
          if (res.data.code === 7000) {
            location.reload();
          }
        })
        .catch((err) => {
        });
    },
    // 编辑方法
    editShop() {
      this.isOver = !this.isOver;
      if (!this.isOver) {
        this.checked = false;
        this.shopArray.forEach((item) => {
          // 让假数据中的check等于全选选项的复选框
          item.check = this.checked;
          this.totalSumAll = 0;
        });
      }
    },
    // 获取购物袋数据
    getShopUrl() {
      this.axios({
        //如果是get请求,参数需要写在params里面.如果是post请求,参数需要写在data里面
        method: "get",
        url: "/findAllShopcart",
        params: {
          tokenString: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if(res.data.result.length === 0){
            setTimeout(() => {
              this.$toast("暂时没有数据");
            }, 1000);
          }
          if (res.data.code === 5000) {
            res.data.result.forEach((v) => {
              v.check = false;
            });
            this.shopArray = res.data.result;
          } else {
            //跳转登录
            setTimeout(() => {
              this.$toast("暂时没有数据,登录看看?");
            }, 1000);
          }
        })
        .catch((err) => {
        });
    },
    // 全选
    allInput() {
      // 调用计算商品价格
      this.doneAllMoney();
      // 让假数据中的check跟随全选选项的复选框状态变化
      this.shopArray.forEach((item) => {
        // 让假数据中的check等于全选选项的复选框
        item.check = this.checked;
      });
      this.shopArray.map((item) => {
        if (item.check) {
          if (this.deleteShop.indexOf(item) == -1) {
            this.deleteShop.push(item);
            this.deleteShop.forEach((v) => {
              this.sids.push(v.sid);
              // 去重
              this.sids = Array.from(new Set(this.sids));
            });
          }
        }
      });
    },
    // 单选
    // 选中商品
    selectInput(item, index) {
      // 计算价格
      if (this.shopArray[index].check) {
        this.totalSumAll += item.count * item.price;
      } else if (!this.shopArray[index].check) {
        this.totalSumAll -= item.count * item.price;
      }

      // 检测是否存在
      if (typeof item.check == "undefined") {
        // 局部注册,给item添加check等于true
        this.$set(item, "check", true);
      }
      // 如果取消一个商品的选中,全选也取消
      let itemisChexcked = [];
      this.shopArray.forEach((v) => {
        if (v.check === true) {
          itemisChexcked.push(v);
        }
      });
      if (itemisChexcked.length === this.shopArray.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }

      // sids判断
      if (item.check) {
        if (this.sids.indexOf(item.sid) == -1) {
          this.sids.push(item.sid);
        }
      } else if (!item.check) {
        this.sids.splice(index, 1);
      }
    },
    // 增加商品
    addShopCount(item) {
      if (item.check) {
        this.totalSumAll += parseInt(item.price);
      }
    },
    // 减少商品
    downShopCount(item) {
      if (item.check) {
        this.totalSumAll -= parseInt(item.price);
      }
    },
    // 全选商品总价格
    doneAllMoney() {
      this.totalSumAll = 0;
      if (this.checked === true) {
        this.shopArray.map((item) => {
          this.totalSumAll += item.count * item.price;
        });
      } else if (this.checked === false) {
        this.totalSumAll = 0;
      }
    },
    // 跳转到订单页面
    gotoOrder() {
      this.shopArray.map((v) => {
        if (v.check) {
          this.v.push(v);
          this.counts += v.count;
        }
      });
      if (this.totalSumAll != 0) {
        this.$router.push({
          name: "Order",
          params: {
            s: this.v,
            money: this.totalSumAll,
            counts: this.counts,
            sids: this.sids,
          },
        });
      } else {
        this.$toast("请先选择商品");
      }
    },
  },
  computed: {
    getPid() {
      return this.$store.state.Pid;
    },
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
.edit {
  position: fixed;
  top: 13px;
  right: 20px;
  font-size: 14px;
  color: gray;
}
.place-delete {
  /deep/ .van-checkbox {
    flex: 1;
  }
  /deep/ .van-button {
    background: #ff0000;
  }
}
.moneyShow {
  flex: 1;
  display: flex;
  text-align: center;
  line-height: 50px;
  padding: 0 5px;
  justify-content: flex-end;
  .xiaoshuwei {
    font-size: 12px;
    color: #0c34ba;
  }
  .money {
    font-size: 12px;
    color: #0c34ba;
  }
  .gewei {
    font-size: 20px;
    color: #0c34ba;
  }
}
.top-back-nav {
  position: fixed;
  top: 0;
  width: 100%;
}
/deep/ .van-submit-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
  z-index: 100;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}
/deep/ .van-button {
  background: #0c34ba;
}
/deep/ .van-submit-bar__price {
  color: #0c34ba;
}
.item-radio {
  margin: 0px 10px;
}
.shop-item {
  width: 95%;
  margin: 5px auto;
  display: flex;
  background: white;
  border-radius: 10px;
  align-items: center;
  padding: 10px 0px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 55px;
  }
  .item-img {
    width: 80px;
    height: 80px;
    background: #f7f8fa;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-content {
    .txt {
      display: flex;
      .text {
        color: gray;
        font-size: 14px;
        margin-left: 15px;
      }
      .name {
        .znname {
          color: #646566;
          font-size: 15px;
        }
        .enname {
          color: gray;
          margin-top: 5px;
          width: 70px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          // border: 1px solid black;
        }
      }
    }
    width: 215px;
    margin-left: 10px;
    .bottom {
      display: flex;
      margin-top: 15px;
      font-weight: bold;
      font-size: 14px;
      color: #0c34ba;
      justify-content: space-between;
    }
  }
}
.title-img {
  width: 100%;
  margin-top: 45px;
  img {
    width: 100%;
  }
}
/deep/ .van-stepper__plus {
  background: #0c34ba;
}
/deep/ .van-stepper__minus {
  border: 1px solid #0c34ba;
  color: #0c34ba;
}
</style>