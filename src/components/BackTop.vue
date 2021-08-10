<template>
  <div class="backtop">
    <div class="content" v-if="goTopShow" @click="backTop">
      <i>Top</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: "",
      goTopShow: false,
    };
  },

  // window对象,监听滚动事件
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },

  methods: {
    // 点击回到顶部
    backTop() {
      let timer = setInterval(() => {
        let step = Math.floor(this.scrollTop / 2);
        // console.log(step);
        document.documentElement.scrollTop = step;
        // console.log(this.scrollTop);
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 10);
    },

    // 高度大于400显示返回顶部,小于400则隐藏
    scrollToTop() {
      let scrollTop = document.documentElement.scrollTop;
      this.scrollTop = scrollTop;
      if (this.scrollTop > 400) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.backtop {
  // border: solid 1px blue;
  border-radius: 50%;
  bottom: 10px;
  float: left;
  overflow: hidden;
  position: fixed;
  right: 15px;
  bottom: 100px;
  z-index: 100;
  width: 30px;
  height: 30px;
  .content {
    width: 100%;
    height: 100%;
    background: white;
    text-align: center;
    line-height: 30px;
    color: #0c34ba;
  }
}
</style>