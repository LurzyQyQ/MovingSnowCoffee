<template>
  <div class="my">
      <!-- 顶部背景图片 -->
      <div class="my-top-nav">
        <img :src="userBg = userBg ? userBg : bgimg">
      </div>

      <!-- 用户选项 -->
      <div class="user-box animate__animated animate__bounceInDown">
        <div class="user-img">
          <img :src="userImg = userImg ? userImg : userImg">
        </div>
        <div class="user-text">
          <div class="user-name">{{nickName = nickName ? nickName : "Allen"}}</div>
          <div class="user-jianjie">{{desc = desc ? desc : "这个家伙很懒,什么也没留下"}}</div>
        </div>
        
      </div>

      <!-- 用户功能 -->
      <div class="user-function ">
        <div class="file-img">
          <div class="file-mask">更换背景</div>
          <input type="file" @change="toBase64" class="bgImg">
        </div>
        <div class="rofile" @click="goInformation">
          <div class="text">个人资料</div>
          <div class="icon">
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
        <div class="order" @click="goOrder">
          <div class="text">我的订单</div>
          <div class="icon">
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
        <div class="collection" @click="goCollection">
          <div class="text">我的收藏</div>
          <div class="icon">
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
        <div class="address" @click="goAddress">
          <div class="text">地址管理</div>
          <div class="icon">
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
        <div class="lognuser" @click="goUserManage">
          <div class="text">设置</div>
          <div class="icon">
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data(){
    return {
      nickName: "",
      userBg: "",
      userImg: "",
      desc: "",
      serverBase64Img: "",
      bgimg: require("../assets/images/img/wallhaven-g75r7d.jpg"),
    }
  },
  methods: {
    toBase64(){
      let file = document.querySelector('input[type=file]').files[0];
      this.imgType = file.type.slice(6, 4);
      console.log(this.imgType);
      let reader = new FileReader;
      reader.onloadend = () => {
          this.imageUrl = reader.result;
          // console.log(reader.result);
          this.updateAvatar()
      }
      if (file) {
          // 将需要更改的图片转换为base64
          reader.readAsDataURL(file);
      }
    },
    updateAvatar(){
      this.serverBase64Img = this.imageUrl.replace(/^data:image\/[A-Za-z]+;base64,/, '');
      this.axios({
          method: "post",
          url: "/updateUserBg",
          data: {
              tokenString: localStorage.getItem("token"),
              imgType: this.imgType,
              serverBase64Img: this.serverBase64Img,
          },
      })
      .then((res) => {
        location.reload()
      })
      .catch((err) => {
      })
    },
    getUser(){
      this.axios({
        method: "get",
        url: "/findMy",
        params: {
          tokenString: localStorage.getItem("token")
        }
      }).then( res => {
        this.desc = res.data.result[0].desc;
        this.nickName = res.data.result[0].nickName;
        this.userBg = res.data.result[0].userBg;
        this.userImg = res.data.result[0].userImg;
      }).catch( err => {
      })
    },
    goInformation(){
      if(localStorage.getItem("token")){
        this.$router.push({name: "Information"})
      }else{
        this.$toast("请先登录")
        setTimeout(() => {
          this.$router.push({name: "Login"})
        },1000)
      }
    },
    goOrder(){
      if(localStorage.getItem("token")){
        this.$router.push({name: "Orders"})
      }else{
        this.$toast("请先登录")
        setTimeout(() => {
          this.$router.push({name: "Login"})
        },1000)
      }
    },
    goCollection(){
      if(localStorage.getItem("token")){
        this.$router.push({name: "Collection"})
      }else{
        this.$toast("请先登录")
        setTimeout(() => {
          this.$router.push({name: "Login"})
        },1000)
      }
    },
    goAddress(){
      if(localStorage.getItem("token")){
        this.$router.push({name: "Address"})
      }else{
        this.$toast("请先登录")
        setTimeout(() => {
          this.$router.push({name: "Login"})
        },1000)
      }
    },
    goUserManage(){
      this.$router.push({name: "UserManage"})
    }
  },
  created(){
    this.getUser()
  },
};
</script>

<style lang="less" scoped>
.file-img{
  width: 65px;
  height: 20px;
  overflow: hidden;
  position: relative;
  float: right;
  .bgImg{
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    opacity: 0;
  }
  .file-mask{
    width: 100%;
    height: 100%;
    // background: rgba(255, 255, 255, .2);;
    color: gray;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.user-function{
  width: 85%;
  margin: 25px auto;
  background: rgba(255, 255, 255, .6);
  padding: 40px 15px 15px 15px;
}
.rofile,
.order,
.lognuser,
.collection,
.address{
  display: flex;
  width: 100%;
  padding: 17px 0px 17px 0px;
  border-bottom: 2px solid #e4e2e2;
  justify-content: space-between;
  color: #646566;
  font-size: 14px;
  i{
    color: gray;
  }
}
.lognuser{
  border-bottom: none;
  margin-bottom: -10px;
}
.user-box{
  display: flex;
  padding: 15px;
  background: rgba(255, 255, 255, .6);
  width: 85%;
  margin: -40px auto;
  // height: 360px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}
.user-jianjie{
  font-size: 13px;
  color: gray;
  font-weight: 200;
  margin-top: 20px;
}
.user-name{
  font-size: 16px;
  color: #0c34ba;
  font-weight: bold;
  margin-bottom: 15px;
}
.user-text{
  margin-left: 20px;
}
.user-img{
  width: 70px;
  height: 70px;
  background: transparent;
  border-radius: 50%;
  overflow: hidden;
  img{
    width: 100%;
  }
}
.my-top-nav {
  width: 100%;
  height: 210px;
  overflow: hidden;
  img{
    width: 100%;
  }
}
</style>