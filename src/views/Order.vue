<template>
  <div class="order">
    <!-- 顶部返回 -->
    <backnav
      class="top-back-nav"
      title="订单结算"
      left-arrow
      left-text="返回"
    ></backnav>

    <!-- 地址栏 -->
    <div class="choice-ress">
      <div class="ress-body">
        <div class="ress-top">
          <div class="choice-ress-text" @click="openWindow">选择地址</div>
          <i class="fa fa-chevron-right"></i>
        </div>
        <div class="ress-content">
          <div class="content-name">{{ isDefaultRees.name }}</div>
          <div class="content-tel">{{ isDefaultRees.tel }}</div>
          <div
            class="content-default"
            v-show="isDefaultRees.isDefault == defaultShow"
          >
            <span>默认</span>
          </div>
        </div>
        <div class="ress-ress-text">{{ isDefaultRees.addressDetail }}</div>
      </div>
    </div>

    <!-- 订单栏 -->
    <div class="orders-box">
      <div class="orders-box-item">
        <div class="box-item-title">订单信息</div>

        <div
          class="shop-item"
          v-for="(item, index) in defaultAddress"
          :key="index"
        >
          <!-- 图片 -->
          <div class="item-img">
            <img :src="item.small_img" />
          </div>
          <!-- 文本 -->
          <div class="item-content">
            <div class="txt">
              <div class="name">
                <div class="znname">{{ item.name }}</div>
                <div class="enname">Americano</div>
              </div>
              <div class="text">{{ item.rule }}</div>
            </div>
            <div class="bottom">
              <div class="money">￥{{ item.price }}</div>
            </div>
          </div>
          <div class="count">x{{ item.count }}</div>
        </div>
      </div>
    </div>

    <!-- 底部计件栏 -->
    <div class="bottom-count-box">
      <div class="count-box">
        <div class="box-data-time">1970-01-01 00:00:00</div>
        <div class="box-bottom">
          <div class="box-counts">共计{{ counts }}件</div>
          <div class="box-allmoney">合计￥{{ moneyAll }}</div>
        </div>
      </div>
    </div>

    <!-- 底部结算按钮 -->
    <div class="bottom-over-button">
      <div class="over-button" @click="pay">
        <button>立即结算</button>
      </div>
    </div>

    <!-- 地址选项栏 -->
    <div class="choice-box-mask" v-show="shows">
      <div class="box-mask">
        <div class="title-box">
          <div class="box-mask-title">选择地址</div>
          <div class="over-x">
            <img src="../assets/images/取 消.png" @click="closeWindow" />
          </div>
        </div>
        <div class="blank"></div>
        <div class="box-mask-ress" v-for="(item, index) in ress" :key="index">
          <div class="mask-ress-item">
            <div class="item-box">
              <div class="radio-box">
                <van-checkbox
                  checked-color="#0c34ba"
                  v-model="item.check"
                  @click="moveDefault(item)"
                ></van-checkbox>
              </div>
              <div class="ress-item-top">
                <div class="top-name">{{ item.name }}</div>
                <div class="top-tel">{{ item.tel }}</div>
                <div
                  class="top-default"
                  v-show="defaultShow == item.isDefault ? 1 : 0"
                >
                  <span>默认</span>
                </div>
              </div>
            </div>
            <div class="ress-item-bottom">{{ item.address }}</div>
          </div>
        </div>
      </div>
      <!-- 底部结算按钮 -->
      <div class="bottom-over">
        <div class="over">
          <button>新增地址</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

export default {
  name: "Order",
  data() {
    return {
      defaultAddress: [],
      ressDefault: [],
      moneyAll: 0,
      counts: 0,
      isDefaultRees: "",
      defaultShow: 1,
      ress: [],
      shows: false,
      moduleIndex: "",
    };
  },
  methods: {
    // 获取地址
    findAddress() {
      this.axios({
        method: "get",
        url: "/findAddress",
        params: {
          tokenString: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          res.data.result.forEach((item) => {
            item.check = false;
            // 处理返回的地址列表数据
            this.ress.push({
              address: item.addressDetail,
              aid: item.aid,
              areaCode: item.areaCode,
              city: item.city,
              county: item.county,
              createdAt: item.createdAt,
              id: item.id,
              isDefault: item.isDefault,
              isRemove: item.isRemove,
              name: item.name,
              postalCode: item.postalCode,
              province: item.province,
              tel: item.tel,
              updatedAt: item.updatedAt,
              userId: item.userId,
            });
            if (item.isDefault === 1) {
              this.isDefaultRees = item;
            }
          });
        })
        .catch((err) => {});
    },
    // 打开地址选项栏
    openWindow() {
      this.shows = true;
    },
    // 关闭地址选项栏
    closeWindow() {
      this.shows = false;
    },
    // 动态更新默认地址
    moveDefault(item) {
      this.isDefaultRees = {
        addressDetail: item.address,
        aid: item.aid,
        areaCode: item.areaCode,
        city: item.city,
        county: item.county,
        createdAt: item.createdAt,
        id: item.id,
        isDefault: item.isDefault,
        isRemove: item.isRemove,
        name: item.name,
        postalCode: item.postalCode,
        province: item.province,
        tel: item.tel,
        updatedAt: item.updatedAt,
        userId: item.userId,
      };
    },
    // 立即结算
    pay(){
      this.axios({
        method: "post",
        url: "/pay",
        data: {
          tokenString: localStorage.getItem("token"),
          sids: JSON.stringify(this.$route.params.sids),
          phone: this.isDefaultRees.tel,
          address: this.isDefaultRees.addressDetail,
          receiver: this.isDefaultRees.name,
        },
      })
      .then((res) => {
      })
      .catch((err) => {});
    }
  },
  created() {
    this.findAddress();
    this.defaultAddress = this.$route.params.s;
    this.moneyAll = this.$route.params.money;
    this.counts = this.$route.params.counts;
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
.choice-box-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  .blank {
    width: 100%;
    height: 50px;
    background: #ffffff;
  }
  .bottom-over {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: -5px;
    padding-top: 14px;
    background: #ffffff;
    .over {
      width: 90%;
      margin: 0 auto;
      background: #ffffff;
      button {
        width: 100%;
        background: #0c34ba;
        border: 1px solid #0c34ba;
        height: 40px;
        border-radius: 20px;
        color: #ffffff;
        font-size: 14px;
      }
    }
  }
  .title-box {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    height: 50px;
    background: #ffffff;
    z-index: 100;
    .over-x {
      width: 15px;
      margin-left: -25px;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }
  }
  .box-mask {
    width: 100%;
    height: 290px;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    overflow-y: auto;
    .box-mask-ress {
      width: 90%;
      margin: 10px auto;
      border-bottom: 1px solid #f1f1f1;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 10px 10px;
      padding-top: 10px;
      .mask-ress-item {
        .item-box {
          display: flex;
          align-items: center;
          .radio-box {
            margin-bottom: -25px;
          }
        }
        .ress-item-bottom {
          // border: 1px solid black;
          width: 300px;
          margin-top: 10px;
          margin-left: 30px;
        }
        .ress-item-top {
          display: flex;
          align-items: center;
          margin-left: 10px;
          .top-default {
            color: #ffffff;
            margin-left: 10px;
            span {
              background: #0c34ba;
              border-radius: 20px;
              padding: 2px 5px;
            }
          }
          .top-tel {
            font-size: 14px;
            margin-left: 10px;
          }
          .top-name {
            font-size: 14px;
          }
        }
      }
    }
    .box-mask-title {
      width: 90%;
      margin: 15px auto;
      font-size: 15px;
      color: gray;
    }
  }
}
.bottom-over-button {
  width: 100%;
  position: fixed;
  bottom: 15px;
  z-index: 1000;
  background: #ffffff;
  .over-button {
    width: 90%;
    margin: 0 auto;
    button {
      width: 100%;
      background: #0c34ba;
      border: 1px solid #0c34ba;
      height: 40px;
      border-radius: 20px;
      color: #ffffff;
      font-size: 14px;
    }
  }
}
.bottom-count-box {
  width: 100%;
  .count-box {
    width: 90%;
    padding: 10px;
    margin: 0 auto;
    background: #ffffff;
    border-top: 1px dashed #e7e7e7;
    position: relative;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: #f7f8fa;
      // background: red;
      position: absolute;
      left: -9px;
      top: -10px;
      border-radius: 50%;
    }
    &::after {
      content: "";
      width: 20px;
      height: 20px;
      background: #f7f8fa;
      // background: red;
      position: absolute;
      right: -9px;
      top: -10px;
      border-radius: 50%;
    }
    .box-data-time {
      margin-top: 5px;
    }
    .box-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: gray;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
      .box-allmoney {
        color: #0c34ba;
      }
    }
    .box-data-time {
      color: gray;
    }
  }
}
.orders-box {
  width: 100%;
  .orders-box-item {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    background: #ffffff;
    .shop-item {
      width: 95%;
      margin: 5px auto;
      display: flex;
      background: white;
      border-radius: 10px;
      align-items: center;
      padding: 5px 0px;
      .count {
        color: gray;
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
    .box-item-title {
      color: gray;
      font-size: 14px;
    }
  }
}
.choice-ress {
  width: 100%;
  .ress-body {
    width: 90%;
    margin: 10px auto;
    background: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
  }
  .ress-ress-text {
    margin-top: 10px;
    color: gray;
    font-size: 13px;
  }
  .ress-content {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .content-name {
      color: #0c34ba;
      font-weight: bold;
      font-size: 14px;
    }
    .content-tel {
      margin-left: 20px;
      font-size: 14px;
      color: gray;
    }
    .content-default {
      margin-left: 20px;
      color: #ffffff;
      span {
        padding: 3px 8px;
        background: #0c34ba;
        border-radius: 20px;
      }
    }
  }
  .ress-top {
    display: flex;
    margin-bottom: 10px;
    color: gray;
    display: flex;
    align-items: center;
    .choice-ress-text {
      font-size: 14px;
    }
    i {
      margin-left: 5px;
      margin-top: 3px;
    }
  }
  /deep/ .van-button {
    border: 1px solid #0c34ba;
    background: #0c34ba;
  }
}
</style>