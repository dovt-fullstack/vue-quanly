<template>
  <Header />
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-3 d-none d-sm-flex">
        <div class="menu">
          <p @click="navigateTo('admin-users-create')">Đăng kí shipper</p>
          <p @click="navigateTo('admin-member-create')">Đăng kí user</p>
          <p @click="navigateTo('admin-manager-create')">Đăng kí manager</p>
          <p @click="navigateTo('admin-store')">Danh sách sửa hàng</p>
          <p @click="navigateTo('admin-product-type-create')">Thêm product type</p>
          <p @click="navigateTo('store/info-them-moi')">Thêm info store</p>
        </div>
      </div>
      <div class="col-12 col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style>
.menu {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  background-color: #fff;
  padding: 10px;
}

.menu p {
  margin: 0;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu p:hover {
  background-color: #f0f0f0;
}
</style>
