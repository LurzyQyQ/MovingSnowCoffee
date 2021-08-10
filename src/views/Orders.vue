<template>
  <div class="orders">
    <!-- 返回组件 -->
    <div class="user-back">
      <backnav left-arrow title="我的订单" leftText="返回"></backnav>
    </div>

    <!-- 顶部背景区 -->
    <div class="bg-top"></div>

    <!-- 切换选项栏 -->
    <div class="my-songs-box">
      <div class="songs-box-item">
        <div
          class="box-item-1"
          v-for="(item, index) in gedanArray"
          :key="index"
          @click="toggle(index)"
          :class="currIndex == index ? 'active1' : ''"
        >
          {{ item.title }}
          <div :class="currIndex == index ? 'active' : ''"></div>
        </div>
      </div>
    </div>

    <!-- 商品栏 -->
    <div class="song-box-box">
      <div class="box-box">
        <div class="box-establish" v-show="currIndex == 0">
          <div class="establish-item">
            <div class="title-text">
              <div class="text-bianhao">{{ overOid }}</div>
              <div class="text-isover">已完成</div>
              <div class="text-icon">
                <i class="fa fa-trash" @click="deleteShop"></i>
              </div>
            </div>

            <!-- 已完成部分 -->
            <div class="shop-item" v-for="(item, index) in isOver" :key="index">
              <!-- 图片 -->
              <div class="item-img">
                <img :src="item.smallImg" />
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
                </div>
              </div>
              <div class="count">x{{ item.count }}</div>
            </div>

            <!-- 底部计件栏 -->
            <div class="bottom-count-box">
              <div class="count-box">
                <div class="box-data-time">{{ overUpdatedAt }}</div>
                <div class="box-bottom">
                  <div class="box-counts">共计{{ overCounts }}件</div>
                  <div class="box-allmoney">合计￥{{ overTotalSumAll }}.00</div>
                </div>
              </div>
            </div>

            <!-- 确认收货栏 -->
            <div class="yes-shop-box">
              <div class="shop-box-item">
                <div class="box-title">
                  <div class="box-item-title">{{ oneOid }}</div>
                  <div class="box-item-over" @click="yesGitShop">确认收货</div>
                </div>
                <div
                  class="shop-item"
                  v-for="(item, index) in oneShop"
                  :key="index"
                >
                  <!-- 图片 -->
                  <div class="item-img">
                    <img :src="item.smallImg" />
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
                    </div>
                  </div>
                  <div class="count">x{{ item.count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="box-collection" v-show="currIndex == 1">
          <div class="establish-item">
            <!-- 确认收货栏 -->
            <div class="yes-shop-box">
              <div class="shop-box-item">
                <div class="box-title">
                  <div class="box-item-title">{{ oneOid }}</div>
                  <div class="box-item-over" @click="yesGitShop">确认收货</div>
                </div>
                <div
                  class="shop-item"
                  v-for="(item, index) in oneShop"
                  :key="index"
                >
                  <!-- 图片 -->
                  <div class="item-img">
                    <img :src="item.smallImg" />
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
                    </div>
                  </div>
                  <div class="count">x{{ item.count }}</div>
                </div>
              </div>
            </div>

            <!-- 底部计件栏 -->
            <div class="bottom-count-box">
              <div class="count-box">
                <div class="box-data-time">{{ isoverUpdatedAt }}</div>
                <div class="box-bottom">
                  <div class="box-counts">共计{{ oneCounts }}件</div>
                  <div class="box-allmoney">合计￥{{ oneTotalSumAll }}.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="box-assistant" v-show="currIndex == 2">
          <div class="establish-item">
            <div class="title-text">
              <div class="text-bianhao">{{ overOid }}</div>
              <div class="text-isover">已完成</div>
              <div class="text-icon">
                <i class="fa fa-trash" @click="deleteShop"></i>
              </div>
            </div>

            <!-- 已完成部分 -->
            <div class="shop-item" v-for="(item, index) in isOver" :key="index">
              <!-- 图片 -->
              <div class="item-img">
                <img :src="item.smallImg" />
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
                </div>
              </div>
              <div class="count">x{{ item.count }}</div>
            </div>

            <!-- 底部计件栏 -->
            <div class="bottom-count-box">
              <div class="count-box">
                <div class="box-data-time">{{ overUpdatedAt }}</div>
                <div class="box-bottom">
                  <div class="box-counts">共计{{ overCounts }}件</div>
                  <div class="box-allmoney">合计￥{{ overTotalSumAll }}.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认收货栏 -->
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

export default {
  name: "Orders",
  data() {
    return {
      currIndex: 0,
      gedanArray: [
        { id: "00001", title: "全部", ind: 0 },
        { id: "00002", title: "进行中", ind: 1 },
        { id: "00003", title: "已完成", ind: 1 },
      ],

      allShop: "",
      oneShop: "",
      isOver: "",

      allCounts: 0,
      allTotalSumAll: 0,

      oneCounts: 0,
      oneTotalSumAll: 0,

      overCounts: 0,
      overTotalSumAll: 0,

      oids: "",
      overOid: "",
      oneOid: "",

      overUpdatedAt: "",
      isoverUpdatedAt: "",
    };
  },
  methods: {
    //   获取全部订单
    allShops() {
      this.axios({
        method: "get",
        url: "/findOrder",
        params: {
          tokenString: localStorage.getItem("token"),
          status: 0,
        },
      })
        .then((res) => {
          if (res.data.result.length === 0) {
            setTimeout(() => {
                this.$toast("暂时没有订单");
            },1000)
          } else {
            this.allShop = res.data.result;
            this.allShop.map((v) => {
              this.oids = v.oid;
              this.allCounts += v.count;
              this.allTotalSumAll += v.count * v.price;
            });
          }
        })
        .catch((err) => {});
    },
    //   获取进行中订单
    oneShops() {
      this.axios({
        method: "get",
        url: "/findOrder",
        params: {
          tokenString: localStorage.getItem("token"),
          status: 1,
        },
      }).then((res) => {
        this.oneShop = res.data.result;
        this.oneShop.map((v) => {
          this.isoverUpdatedAt = v.updatedAt;
          this.oneOid = v.oid;
          this.oneCounts += v.count;
          this.oneTotalSumAll += v.count * v.price;
        });
        console.log(res);
      });
    },
    //   获取完成的订单
    overShops() {
      this.axios({
        method: "get",
        url: "/findOrder",
        params: {
          tokenString: localStorage.getItem("token"),
          status: 2,
        },
      }).then((res) => {
        this.isOver = res.data.result;
        this.isOver.map((v) => {
          this.overUpdatedAt = v.updatedAt;
          this.overOid = v.oid;
          this.overCounts += v.count;
          this.overTotalSumAll += v.count * v.price;
        });
        console.log(this.overOid);
      });
    },
    // 确认收货
    yesGitShop() {
      console.log(this.oids);
      this.axios({
        method: "post",
        url: "/receive",
        data: {
          tokenString: localStorage.getItem("token"),
          oid: this.oids,
        },
      }).then((res) => {
        if (res.data.code == 80000) {
          this.$toast(res.data.msg);
        }
        console.log(res);
      });
    },
    // 确认收货
    deleteShop() {
      this.axios({
        method: "post",
        url: "/removeOrder",
        data: {
          tokenString: localStorage.getItem("token"),
          oid: this.oids,
        },
      }).then((res) => {
        if (res.data.code == 90000) {
          this.$toast(res.data.msg);
        }
        console.log(res);
      });
    },
    toggle(index) {
      this.currIndex = index;
    },
  },
  created() {
    this.allShops();
    this.oneShops();
    this.overShops();
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
.bottom-count-box {
  width: 100%;
  height: 50px;
  .count-box {
    width: 95%;
    margin: 0 auto;
    background: #ffffff;
    margin-bottom: 50px;
    border-top: 1px dashed #e7e7e7;
    position: relative;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: #f7f8fa;
      // background: red;
      position: absolute;
      left: -25px;
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
      right: -25px;
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
.song-box-box {
  width: 100%;
  .box-box {
    width: 95%;
    margin: 0 auto;
    margin-top: 30px;
    .box-assistant {
      background: #f7f8fa;
      .establish-item {
        width: 95%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #ffffff;
        padding: 10px;
        .yes-shop-box {
          width: 100%;
          margin-top: 50px;
          position: relative;
          &::before {
            content: "";
            width: 375px;
            background: #f7f8fa;
            height: 20px;
            position: absolute;
            left: -20px;
            top: -40px;
          }
          .shop-box-item {
            width: 100%;
            margin: 0px auto;
            background: #ffffff;
            margin-top: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            // padding: 10px 0px;
            .shop-item {
              width: 100%;
              margin: 20px auto;
              //   display: flex;
              background: white;
              border-radius: 10px;
              align-items: center;
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
            .box-title {
              display: flex;
              justify-content: space-between;
              margin-left: 10px;
              align-items: center;
              .box-item-over {
                margin-right: 10px;
              }
              .box-item-icon {
                margin-right: 10px;
              }
              .box-item-title {
                flex: 1;
              }
            }
          }
        }
        .shop-item {
          width: 100%;
          margin: 5px auto;
          display: flex;
          background: white;
          border-radius: 10px;
          align-items: center;
          padding: 5px 0px;
          margin-bottom: 10px;
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
        .title-text {
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .text-isover {
            margin-right: 10px;
          }
          .text-bianhao {
            flex: 1;
          }
        }
      }
    }
    .box-establish {
      background: #f7f8fa;
      .establish-item {
        width: 95%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #ffffff;
        padding: 10px;
        .yes-shop-box {
          width: 100%;
          margin-top: 50px;
          position: relative;
          &::before {
            content: "";
            width: 375px;
            background: #f7f8fa;
            height: 20px;
            position: absolute;
            left: -20px;
            top: -40px;
          }
          .shop-box-item {
            width: 100%;
            margin: 0px auto;
            background: #ffffff;
            margin-top: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            // padding: 10px 0px;
            .shop-item {
              width: 100%;
              margin: 20px auto;
              //   display: flex;
              background: white;
              border-radius: 10px;
              align-items: center;
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
            .box-title {
              display: flex;
              justify-content: space-between;
              margin-left: 10px;
              align-items: center;
              .box-item-over {
                margin-right: 10px;
              }
              .box-item-icon {
                margin-right: 10px;
              }
              .box-item-title {
                flex: 1;
              }
            }
          }
        }
        .shop-item {
          width: 100%;
          margin: 5px auto;
          display: flex;
          background: white;
          border-radius: 10px;
          align-items: center;
          padding: 5px 0px;
          margin-bottom: 10px;
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
        .title-text {
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .text-isover {
            margin-right: 10px;
          }
          .text-bianhao {
            flex: 1;
          }
        }
      }
    }
    .box-collection {
      width: 95%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #ffffff;
      padding: 10px;
      .yes-shop-box {
        width: 100%;
        margin-top: -20px;
        position: relative;
        .shop-box-item {
          width: 100%;
          margin: 0px auto;
          background: #ffffff;
          margin-top: 20px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          // padding: 10px 0px;
          .shop-item {
            width: 100%;
            margin: 20px auto;
            //   display: flex;
            background: white;
            border-radius: 10px;
            align-items: center;
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
          .box-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .box-item-over {
              margin-right: 10px;
            }
            .box-item-icon {
              margin-right: 10px;
            }
            .box-item-title {
              flex: 1;
            }
          }
        }
      }
      .shop-item {
        width: 100%;
        margin: 0px auto;
        display: flex;
        background: white;
        border-radius: 10px;
        align-items: center;
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
      .title-text {
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text-isover {
          margin-right: 10px;
        }
        .text-bianhao {
          flex: 1;
        }
      }
    }
  }
}
.my-songs-box {
  width: 100%;
  .songs-box-item {
    width: 95%;
    margin: -20px auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 15px;
    padding: 15px 0px 0px 0px;
    background: #ffffff;
    .box-item-1 {
      width: 50px;
      text-align: center;
      &.active1 {
        color: #0c34ba;
      }
      div {
        width: 50px;
        border-radius: 20px;
        height: 2px;
        transition: all 0.1s;
        margin-left: -10px;
        margin-top: 10px;
        &.active {
          background: #0c34ba;
          margin-left: 0px;
        }
      }
    }
    span {
      font-size: 12px;
      color: #afafaf;
    }
  }
}
.bg-top {
  height: 100px;
  background: #0c34ba;
}
</style>