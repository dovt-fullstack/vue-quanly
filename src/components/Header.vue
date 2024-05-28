<template>
  <div class="container-fluid">
    <div class="row text-white" style="background-color: #0c713d; padding: 1rem">
      <div class="
                          col-10 col-sm-9
                          d-flex
                          align-items-center
                          justify-content-center justify-content-sm-start
                        ">
        <router-link :to="{ name: 'admin-dashboards' }">
          <img src="../assets/logo.svg" alt="Logo" height="32" width="34" class="ms-3 me-3" />
          <span class="text-light">QUẢN TRỊ</span>
        </router-link>
      </div>

      <div class="col-2 col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
        <a-dropdown>
          <a class="ant-dropdown-link text-light" @click.prevent>
            <span v-if="authStore.user" class="me-1">Xin chào {{ authStore.user.userName }}</span>
            <i class="fa-solid fa-caret-down"></i>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a @click="handleClickLogout">Đăng xuất</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import 'ant-design-vue/dist/antd.min.css';
import { message } from "ant-design-vue";
import { useAuthStore } from "../stores/auth.store.js";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const handleClickLogout = () => {
      if (authStore.user) {
        return authStore.logout(authStore.user.userName).catch(error => {
          if (error.response.status === 401) {
            message.error("Lỗi! Đăng xuất không thành công.");
          } else {
            message.error(`Lỗi! ${error.response.statusText}`);
          }
        });
      } else {
        message.error("Lỗi! Hệ thống không tìm thấy thông tin người dùng.");
      }
    };
    return {
      authStore,
      handleClickLogout
    };
  }
})

</script>
<!-- <script>
import Menu from "../components/Menu.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    Menu,
  },
  setup() {
    const visible = ref(false);
    const visible_user = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const showDrawerUser = () => {
      visible_user.value = true;
    };

    return {
      visible,
      visible_user,
      showDrawer,
      showDrawerUser,
    };
  },
});
</script> -->