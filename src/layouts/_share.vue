<template>
  <Header />
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-3 d-none d-sm-flex">
        <a-list bordered style="width: 100%">
          <p @click="navigateTo('admin-users-create')" style="padding-left: 5px;padding-top: 10px;">Đăng kí shipper</p>
          <p @click="navigateTo('admin-member-create')" style="padding-left: 5px;padding-top: 10px;">Đăng kí user</p>
          <p @click="navigateTo('admin-manager-create')" style="padding-left: 5px;padding-top: 10px;">Đăng kí manager</p>
          <p @click="navigateTo('admin-store')" style="padding-left: 5px;padding-top: 10px;">Danh sách sửa hàng</p>

          <template #header>
            <div>BẢNG ĐIỀU KHIỂN</div>
          </template>
        </a-list>
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
