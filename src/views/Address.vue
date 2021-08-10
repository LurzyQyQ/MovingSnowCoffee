<template>
  <div class="address">
    <!-- 返回组件 -->
    <div class="user-back">
      <backnav left-arrow title="地址列表" leftText="返回"></backnav>
    </div>

    <!-- 顶部背景区 -->
    <div class="bg-top"></div>

    <div class="address-menu">
      <van-address-list
        :list="ressListChang"
        v-model="moduleIndex"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import backnav from "../components/BackNav.vue";

export default {
  name: "Address",
  data() {
    return {
      chosenAddressId: "1",
      ressList: [],
      ressList2: [],
      ressListChang: [],
      moduleIndex: "",
    };
  },
  created() {
    this.findAddress();
  },
  methods: {
    findAddress() {
      this.axios({
        method: "get",
        url: "/findAddress",
        params: {
          tokenString: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          this.ressList = res.data.result;
          this.ressList.forEach((item) => {
            // 处理返回的地址列表数据
            this.ressListChang.push({
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
            this.ressListChang.map((v, i) => {
              this.moduleIndex = v.id;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onAdd() {
      // Toast("新增地址");
      this.$router.push({ name: "AddressEdit" });
    },
    onEdit(item) {
      // 处理带到编辑地址的数据
      this.ressList2.push({
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
      });
      this.$router.push({name: "EditAddress", params: {item: this.ressList2[0]}});
    },
  },
  components: {
    backnav,
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-address-item {
  margin-bottom: 10px;
}
</style>