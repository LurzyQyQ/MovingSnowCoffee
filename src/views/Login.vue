<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <van-nav-bar>
      <template #left>
        <div class="logo">
          <img src="../assets/images/home_active.png" />
        </div>
        <div class="logo-text">Luckin Coffee</div>
      </template>
      <template #right>
        <div @click="backHome" class="nav-text">先逛一逛</div>
      </template>
    </van-nav-bar>

    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-tips-name">欢迎回来!</div>
      <div class="user-tips-enname">Please login to your accounts</div>
    </div>

    <!-- 用户登录 -->
    <div class="user-login">
      <van-form>
        <van-field
          v-model="userInfo.username"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          autocomplete="off"
          ref="loginPhone"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: phoneReg, message: '手机格式不正确' },
          ]"
        />
        <van-field
          v-model="userInfo.password"
          :type="isOpen ? 'text' : 'password'"
          name="密码"
          label="密码"
          placeholder="密码(6-16位)"
          autocomplete="off"
          ref="loginPassword"
          :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
          @click-right-icon="togglePasswordStatus"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: passwordReg,
              message: '数字字母下划线组合,以字母开头6-16位',
            },
          ]"
        />
        <div class="login-btn" style="margin: 16px">
          <van-button round block @click="loginUser" color="#0c34ba" native-type="submit"
            >登录</van-button
          >
        </div>
        <div class="register-btn">
          <van-button round block hairline @click="closeRegister" native-type="button"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>

    <!-- 注册遮罩层 -->
    <div class="register" v-show="maskFlag">
      <div class="register-white-mask">
        <div class="register-white-mask-text">
          注册
          <i class="fa fa-times" @click="closeRegister"></i>
        </div>
        <div class="register-white-mask-from">
          <van-form>
            <van-field
              v-model="registerUserInfo.registerPhone"
              name="手机号"
              label="手机号"
              placeholder="11位手机号"
              autocomplete="off"
              ref="registerPhone"
              :rules="[
                { required: true, message: '请填写手机号' },
                { pattern: phoneReg, message: '手机格式不正确' },
              ]"
            />
            <van-field
              v-model="registerUserInfo.registerPassword"
              :type="isOpen ? 'text' : 'password'"
              name="密码"
              label="密码"
              placeholder="密码必须由字母开头"
              autocomplete="off"
              ref="registerPassword"
              :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
              @click-right-icon="togglePasswordStatus"
              :rules="[
                { required: true, message: '请填写密码' },
                {
                  pattern: passwordReg,
                  message: '数字字母下划线组合,以字母开头6-16位',
                },
              ]"
            />
            <van-field
              v-model="userInfo.nikName"
              type="text"
              name="昵称"
              label="昵称"
              placeholder="昵称"
              autocomplete="off"
              ref="registerNikName"
              :rules="[
                { required: true, message: '请填写昵称' },
                { pattern: nickNameReg, message: '1-6位' },
              ]"
            />
            <div class="register-mask-btn">
              <van-button round block color="#0c34ba" @click="regeistUser" native-type="submit"
                >注册</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //登录遮罩层
      show: false,
      isOpen: false,
      // 验证手机号
      phoneReg: /^1[3-9]\d{9}$/,
      // 验证密码(数字字母下划线组合,以字母开头6-16位)
      passwordReg: /^[A-Za-z]\w{5,15}$/,
      //昵称验证(1-6位)
      nickNameReg: /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,6}/,
      // 遮罩层显示隐藏
      maskFlag: false,
      //登录页面用户信息
      userInfo: {
        loginPhone: "",
        loginPassword: "",
      },
      //注册页面用户信息
      registerUserInfo: {
        registerPhone: "",
        registerPassword: "",
        registerNikName: "",
      },
    };
  },
  methods: {
    regeistUser(){
      this.registerPhone = this.$refs.registerPhone.value;
      this.registerPassword = this.$refs.registerPassword.value;
      this.registerNikName = this.$refs.registerNikName.value;
      
      this.axios({
        method: "post",
        url: "/register",
        data: {
            nickName: this.registerNikName,
            password: this.registerPassword,
            phone: this.registerPhone
        }
      }).then( res => {
          this.$toast("注册成功")
          this.closeRegister()
      }).catch( err => {
          console.log(err);
      })
    },
    loginUser(){
      this.loginPhone = this.$refs.loginPhone.value;
      this.loginPassword = this.$refs.loginPassword.value;
      this.axios({
        method: "post",
        url: "/login",
        data: {
            password: this.loginPassword,
            phone: this.loginPhone
        }
      }).then( res => {
        this.$toast(res.data.msg)
        localStorage.setItem("token", res.data.token)
        if(res.data.token == localStorage.getItem("token")){
          setTimeout(() => {
            this.$router.push({name: "Home"})
          },1000)
          this.$store.commit("getToken", res.data.token)
        }
      }).catch( err => {
          console.log(err);
      })
    },
    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },
    backHome() {
      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 1000);
    },
    closeRegister(){
      this.maskFlag = !this.maskFlag;
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 10000;
  top: 0;
  .register-white-mask-from{
    margin-top: 45px;
  }
  .register-mask-btn{
    width: 94%;
    margin: 85px auto;
    position: sticky;
    bottom: 12px ;
  }
  
  .register-white-mask {
    width: 100%;
    height: 335px;
    background: white;
    position: fixed;
    bottom: 0;
    .register-white-mask-text {
      display: flex;
      justify-content: space-between;
      width: 94%;
      margin: 15px auto;
      font-size: 25px;
      font-weight: bold;
      color: #646566;
      i {
        font-size: 30px;
        color: #d4d0ce;
      }
    }
  }
}
.user-login {
  .register-btn {
    border: 1px solid #e9eaee;
    border-radius: 40px;
    width: 94%;
    margin: 45px auto;
  }
  margin-top: 50px;
  .forget {
    font-size: 13px;
    color: #646566;
    display: flex;
    width: 94%;
    padding: 15px 0px 40px 0px;
    margin: 0 auto;
    justify-content: flex-end;
  }
}
.user-info {
  width: 94%;
  margin: 0 auto;
  .user-tips-name {
    font-weight: bold;
    font-size: 26px;
    color: #646566;
    margin-top: 100px;
    margin-bottom: 35px;
  }
  .user-tips-enname {
    color: gray;
    font-size: 16px;
  }
}
.nav-text {
  color: #0c34ba;
  font-weight: 600;
  font-size: 12px;
}
.logo-text {
  margin-left: 10px;
  font-weight: bold;
  color: #686766;
}
.logo {
  width: 30px;
  height: 30px;
  // background: pink;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>