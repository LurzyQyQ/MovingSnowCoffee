<template>
  <div class="addressedit">
    <!-- 返回组件 -->
    <div class="user-back">
      <backnav left-arrow title="新增地址" leftText="返回"></backnav>
    </div>

    <div class="addressedit-menu">
      <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      tel-maxlength="11"
      show-search-result
      :search-result="searchResult"
      :tel-validator="validator"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" 
      @save="onSave"
    />
    </div>
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";
import areaList from '../assets/Area'

import { Toast } from 'vant';
export default {
  name: "AddressEdit",
  data() {
    return {
      areaList,
      searchResult:[],
      userInfo: "",
    }
  },
  methods: {
    //校验手机函数
    validator(e) {
      let myreg1 = /^1[3-9]\d{9}$/;
      if (!myreg1.test(e)) {
        this.$toast("手机格式错误")
        return false;
      } else{
        return true
      }
    },  
    onSave(v1) {
      console.log(v1);
      this.axios({
        method: "post",
        url: "/addAddress",
        data: {
          tokenString: localStorage.getItem("token"),
          name: v1.name,//姓名,
          tel: v1.tel,//电话,
          province: v1.province,//省份,
          city: v1.city,//市,
          county: v1.county,//区县,
          addressDetail: v1.addressDetail,//详细地址,
          areaCode: v1.areaCode,//地区编号,
          postalCode: v1.postalCode,//邮政编码,
          isDefault: v1.isDefault == true ? 1 : 0,//默认地址
        },
      })
      .then((res) => {
        if(res.data.code === 9000){
          Toast('保存成功');
          setTimeout(() => {
              this.goBack()
          },1500)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    //返回
    goBack(){
      this.$router.go(-1);
    }
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-button {
  background: #0c34ba;
  border-color: #0c34ba;
  color: white;
}
/deep/ .van-button--default {
  background: white;
  border-color: #ebedf0;
  color: black;
}

.addressedit-menu {
  width: 95%;
  margin: 10px auto;
  background: white;
  border-radius: 10px;
}
</style>