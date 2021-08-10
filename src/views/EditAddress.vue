<template>
  <div class="addressedit">
    <!-- 返回组件 -->
    <div class="user-back">
      <backnav left-arrow title="编辑地址" leftText="返回"></backnav>
    </div>

    <div class="addressedit-menu">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :tel-validator="validator"
        tel-maxlength="11"
        @save="onSave"
        @delete="onRemove"
      />
    </div>
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";
import areaList from "../assets/Area";

import { Toast } from "vant";
export default {
  name: "EditAddress",
  data() {
    return {
      areaList,
      userInfo: "",
    };
  },
  created(){
    console.log(this.$route.params.item);
  },
  methods: {
    //校验手机函数
    validator(e) {
      let myreg1 = /^1[3-9]\d{9}$/;
      if (!myreg1.test(e)) {
        this.$toast("手机格式错误");
        return false;
      } else {
        return true;
      }
    },
    //保存修改地址
    onSave(v2) {
      console.log(v2);
      this.axios({
        method: "post",
        url: "/editAddress",
        data: {
          tokenString: localStorage.getItem("token"),
          aid: this.$route.params.item.aid, //地址唯一标识
          name: v2.name,//姓名,
          tel: v2.tel,//电话,
          province: v2.province,//省份,
          city: v2.city,//市,
          county: v2.county,//区县,
          addressDetail: v2.addressDetail,//详细地址,
          areaCode: v2.areaCode,//地区编号,
          postalCode: v2.postalCode,//邮政编码,
          isDefault: v2.isDefault == true ? 1 : 0,//默认地址
        },
      })
        .then((res) => {
          if (res.data.code === 30000) {
            Toast("编辑成功");
            setTimeout(() => {
              this.goBack();
            }, 1500);
          }
        })
        .catch((err) => {});
    },
    //删除地址
    onRemove() {
      this.axios({
        method: "post",
        url: "/deleteAddress",
        data: {
          tokenString: localStorage.getItem("token"),
          aid: this.$route.params.item.aid, //地址唯一标识
        },
      })
        .then((res) => {
          if (res.data.code === 10000) {
            this.$toast(res.data.msg);
            setTimeout(() => {
              this.goBack();
            }, 1500);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
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