<template>
  <div class="information">
    <!-- 返回组件 -->
    <div class="user-back">
      <backnav left-arrow title="个人资料" leftText="返回"></backnav>
    </div>

    <!-- 顶部背景区 -->
    <div class="bg-top"></div>

    <div class="user-menu animate__animated animate__bounceInUp">
      <div class="user-img">
        <div class="text">头像</div>
        <div class="img">
          <img :src="imageUrl = imageUrl ? imageUrl : userImg" />
          <div class="fileImg">
            <input type="file" @change="toBase64()">
          </div>
        </div>
        
      </div>
      <div class="user-id">
        <div class="text">用户ID</div>
        <div class="id">{{userId}}</div>
      </div>
      <div class="user-nickname">
        <div class="text">昵称</div>
        <input type="text"
        ref="changName"
        v-on:blur="changNickNameDone"
        :placeholder="nickName = nickName ? nickName : 'Allen'">
      </div>
      <div class="user-jianjie">
        <div class="text">简介</div>
        <input type="text" 
        ref="changJianjie"
        v-on:blur="changJianjieDone"
        :placeholder="desc = desc ? desc : '这个家伙很懒,什么也没留下'"/>
      </div>
    </div>

    <div class="changPassword animate__animated animate__bounceInDown" @click="changPassword">
      更改密码
    </div>
    
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";
export default {
  name: "Information",
  data(){
      return {
          changName: "",
          changJianjie: "",
          desc: "",
          nickName: "",
          userId: "",
          userImg: "",
          flag: false,
          headImg:"",
          imageUrl: "",
          imgType: "",
          serverBase64Img: "",
          img: "",
      }
  },
  methods: {
    changNickNameDone(){
      this.changName = this.$refs.changName.value;
      console.log(this.changName);
      this.axios({
          method: "post",
          url: "/updateNickName",
          data: {
              tokenString: localStorage.getItem("token"),
              nickName: this.changName,
          },
      })
      .then((res) => {
          setTimeout(() => {
              this.$toast("修改成功")
          },1000)
      })
      .catch((err) => {
          console.log(err);
      })
    },
    changJianjieDone(){
      this.changJianjie = this.$refs.changJianjie.value;
      console.log(this.changJianjie);
      this.axios({
          method: "post",
          url: "/updateDesc",
          data: {
              tokenString: localStorage.getItem("token"),
              desc: this.changJianjie,
          },
      })
      .then((res) => {
      })
      .catch((err) => {
          console.log(err);
      })
    },
    toBase64(){
      let file = document.querySelector('input[type=file]').files[0];
      this.imgType = file.type.slice(6, 4);
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
          url: "/updateAvatar",
          data: {
              tokenString: localStorage.getItem("token"),
              imgType: this.imgType,
              serverBase64Img: this.serverBase64Img,
          },
      })
      .then((res) => {
        if(res.data.code === 700){
          this.$toast(res.data.msg);
        }else{
          this.$toast(res.data.msg);
        }
      })
      .catch((err) => {
          console.log(err);
      })
    },
    userInformation() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
        params: {
          tokenString: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.desc = res.data.result[0].desc;
        this.nickName = res.data.result[0].nickName;
        this.userId = res.data.result[0].userId;
        this.userImg = res.data.result[0].userImg;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    changPassword(){
      this.$router.push({name: "PasswordChang"})
    }
  },
  created() {
    this.userInformation();
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
.user-jianjie,
.user-nickname{
  input{
    width: 80%;
    text-align: right;
    border: none;
  }
}
.fileImg{
  width: 100%;
  height: 100%;
  text-align: center;
  opacity: 0;
  line-height: 37px;
  position: absolute;
  right: 0;
  top: 0;
}
.changPassword{
  width: 100%;
  height: 50px;
  background: white;
  position: absolute;
  text-align: center;
  line-height: 50px;
  color: gray;
  font-size: 14px;
  font-weight: bold;
  bottom: 0;
  left: 0;
}
.chang{
  width: 100%;
  height: 50px;
  background: white;
  position: absolute;
  text-align: center;
  line-height: 50px;
  color: gray;
  font-size: 14px;
  font-weight: bold;
  bottom: 0;
  left: 0;
}
.id,
.nickame,
.jianjie {
  color: gray;
}
.user-img {
  .img {
    width: 37px;
    position: relative;
    height: 37px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      text-align: center;
    }
  }
}
.user-img,
.user-id,
.user-nickname,
.user-jianjie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  padding: 13px 10px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #f1efef;
}
.user-jianjie {
  border-bottom: none;
}
.user-menu {
  width: 95%;
  margin: -20px auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: white;
  height: 220px;
}
.bg-top {
  height: 100px;
  background: #0c34ba;
}
</style>