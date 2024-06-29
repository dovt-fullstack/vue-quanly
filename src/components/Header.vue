<template>
  <div class="MuiBox-root jss261" id="header">
    <h3 style="color: white" class="MuiTypography-root MuiTypography-h3">
    </h3>
    <div class="MuiBox-root  jss262">
      <div class="MuiBox-root  jss263 ">
        <div class="sb-avatar sb-avatar--text" style="
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            font-family: Helvetica, Arial, sans-serif;
          ">
          <div class="sb-avatar__text" title="" style="
              width: 30px;
              height: 30px;
              line-height: initial;
              text-align: center;
              color: rgb(255, 255, 255);
              background: rgb(215, 61, 50);
              border-radius: 20px;
            ">
            <div style="
                display: table;
                table-layout: fixed;
                width: 100%;
                height: 100%;
                font-size: 10px;
              ">
              <span style="
                  display: table-cell;
                  vertical-align: middle;
                  white-space: nowrap;
                "><span>{{ userLocal && userLocal.lastname ? userLocal.lastname.charAt(0) : '' }}</span></span>
            </div>
          </div>
        </div>
        <p class="MuiTypography-root  ">
          <a-dropdown>
            <a class="ant-dropdown-link " @click.prevent>
              <span class="me-1">Xin chào {{ userLocal?.lastname }}</span>
              <i class="fa-solid "></i>
            </a>
            <template #overlay>
              <a-menu>

                <a-menu-item>
                  <router-link :to="{ name: 'profile-user' }">
                    <span>Trang cá nhân</span>
                  </router-link>
                </a-menu-item>

                <a-menu-item>
                  <a @click="handleClickLogout" style="color: red;">Đăng xuất</a>
                </a-menu-item>

              </a-menu>
            </template>
          </a-dropdown>
        </p>
        <svg class="MuiSvgIcon-root arrow-avatar" focusable="false" aria-hidden="true">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
      </div>
      <div class="">
        <div>
          <div>
            <a-button style="background-color: #182537;border-color: #182537;" type="primary" @click="showDrawer">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                font-size="24" style="color: rgb(0, 136, 255)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M18 10.5c0-3.07-1.14-5.64-4-6.32V2h-4v2.18c-2.87.68-4 3.24-4 6.32V16l-2 1v2h16v-2l-2-1v-5.5Zm-5.6 11.46A2.014 2.014 0 0 1 9.99 20h4c0 .28-.05.54-.15.78-.26.6-.79 1.04-1.44 1.18Z"
                  fill="currentColor"></path>
              </svg>
              <a-badge :count="unreadCount" offset="[10, 0]">
              </a-badge>
            </a-button>
          </div>
          <a-drawer title="Thông báo của bạn" placement="right" :closable="false" :visible="open" :get-container="false"
            :style="{ position: 'absolute' }" @close="onClose">
            <a-list item-layout="horizontal" :data-source="sortedNotiList">
              <template #renderItem="{ item }">
                <a-list-item :style="{ 
                                  marginTop: '10px',
                                  backgroundColor: item.notiStatus ? '#ffffff' : '#d3d3d3' }">
                  <a-list-item-meta>
                    <template #title>
                      <h6>{{ item.description }}</h6>
                    </template>
                    <template #description>
                      {{ item.description }}
                    </template>
                  </a-list-item-meta>
                  <a-button type="link" @click="deleteNoti(item.notiId)" style="color: red;">Delete</a-button>
                </a-list-item>
              </template>
            </a-list>
          </a-drawer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, reactive } from "vue";
import "ant-design-vue/dist/antd.min.css";
import { useAuthStore } from "../stores/auth.store.js";
import { useRoute } from "vue-router";
import { onUpdated, onMounted } from "vue";
import { message, Badge, Button, Drawer, List, Avatar } from "ant-design-vue";


export default defineComponent({
  components: {
    'a-button': Button,
    'a-badge': Badge,
    'a-drawer': Drawer,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-avatar': Avatar,
  },
  setup() {

    const notiLists = ref([]);
    const open = ref(false);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token"));
    const showDrawer = () => {
      open.value = true;
      getNoti();
    };
    const onClose = () => {
      open.value = false;
      notiLists.value.forEach(item => {
        item.notiStatus = true; // Mark all notifications as read
      });
      axios
        .get(`${apiPrefix}/api/v1/notifications/seen`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          console.log(response.data.data, "noti");
        })
        .catch((error) => {
          console.error(error);
        });


    };
    const authStore = useAuthStore();
    const route = useRoute();


    const handleClickLogout = () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5173/login"

    };

    const getNoti = () => {
      axios
        .get(`${apiPrefix}/api/v1/notifications/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          notiLists.value = response.data.data;
          console.log(response.data.data, "noti");

        })
        .catch((error) => {
          console.error(error);
        });
    };

    const deleteNoti = (notiId) => {
      // Perform deletion logic here
      console.log(`Deleting notification with id ${notiId}`);

      axios
        .get(`${apiPrefix}/api/v1/notifications/delete/${notiId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          notiLists.value = response.data.data;
          console.log(response.data.data, "noti");
          getNoti();

        })
        .catch((error) => {
          console.error(error);
        });
      // Example: Remove notification from sortedNotiList
      // sortedNotiList.value = sortedNotiList.value.filter(item => item.notiId !== notiId);
      open.value = false;

    };

    const sortedNotiList = computed(() => {
      return notiLists.value.slice().sort((a, b) => b.notiId - a.notiId);
    });



    onMounted(() => {
      // chay lan dau tien
      getNoti();
    });

    const unreadCount = computed(() => {
      return notiLists.value.filter(item => !item.notiStatus).length;
    });
    return {
      authStore,
      userLocal,
      handleClickLogout,
      showDrawer,
      onClose,
      open,
      sortedNotiList,
      unreadCount,
      deleteNoti

    };
  },
});
</script>
<style scoped>
.menu {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  padding: 10px;
}

.menu p {
  margin: 0;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu p:hover {}

.MuiPaper-root {
  color: #0f1824;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
}

.MuiPaper-rounded {
  border-radius: 3px;
}

.MuiPaper-outlined {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation0 {
  box-shadow: none;
}

.MuiPaper-elevation1 {
  box-shadow: none;
}

.MuiPaper-elevation2 {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation3 {
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation4 {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation5 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation6 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation7 {
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2),
    0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation8 {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation9 {
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2),
    0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation10 {
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation11 {
  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2),
    0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation12 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation13 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation14 {
  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2),
    0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation15 {
  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2),
    0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation16 {
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation17 {
  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2),
    0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation18 {
  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2),
    0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation19 {
  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2),
    0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation20 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation21 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation22 {
  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2),
    0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation23 {
  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2),
    0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12);
}

.MuiPaper-elevation24 {
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}

.MuiCollapse-container {
  height: 0;
  overflow: hidden;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.MuiCollapse-entered {
  height: auto;
  overflow: visible;
}

.MuiCollapse-hidden {
  visibility: hidden;
}

.MuiCollapse-wrapper {
  display: flex;
}

.MuiCollapse-wrapperInner {
  width: 100%;
}

.MuiSvgIcon-root {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
}

.MuiSvgIcon-colorPrimary {
  color: #0088ff;
}

.MuiSvgIcon-colorSecondary {
  color: #747c87;
}

.MuiSvgIcon-colorAction {
  color: rgba(0, 0, 0, 0.54);
}

.MuiSvgIcon-colorError {
  color: #f44336;
}

.MuiSvgIcon-colorDisabled {
  color: rgba(0, 0, 0, 0.26);
}

.MuiSvgIcon-fontSizeInherit {
  font-size: inherit;
}

.MuiSvgIcon-fontSizeSmall {
  font-size: 1.25rem;
}

.MuiSvgIcon-fontSizeLarge {
  font-size: 2.1875rem;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

strong,
b {
  font-weight: 700;
}

body {
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 1.43;
  background-color: #fafafa;
}

@media print {
  body {
    background-color: #fff;
  }
}

body::backdrop {
  background-color: #fafafa;
}

.MuiMenu-list.MuiList-padding {
  padding: 6px 5px;
}

.MuiTypography-root {
  margin: 0;
}

.MuiTypography-body2 {
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 19px;
}

.MuiTypography-body1 {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 20px;
}

.MuiTypography-caption {
  font-size: 0.71rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 12px;
}

.MuiTypography-button {
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
}

.MuiTypography-h1 {
  font-size: 6rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 300;
  line-height: 1.167;
}

.MuiTypography-h2 {
  font-size: 3.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 300;
  line-height: 1.2;
}

.MuiTypography-h3 {
  font-size: 1.7rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 30px;
}

.MuiTypography-h4 {
  font-size: 1.4rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 24px;
}

.MuiTypography-h5 {
  font-size: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 22px;
}

.MuiTypography-h6 {
  font-size: 1.125rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 20px;
}

.MuiTypography-subtitle1 {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 20px;
}

.MuiTypography-subtitle2 {
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 15px;
}

.MuiTypography-overline {
  font-size: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 2.66;
  text-transform: uppercase;
}

.MuiTypography-srOnly {
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.MuiTypography-alignLeft {
  text-align: left;
}

.MuiTypography-alignCenter {
  text-align: center;
}

.MuiTypography-alignRight {
  text-align: right;
}

.MuiTypography-alignJustify {
  text-align: justify;
}

.MuiTypography-noWrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.MuiTypography-gutterBottom {
  margin-bottom: 0.35em;
}

.MuiTypography-paragraph {
  margin-bottom: 16px;
}

.MuiTypography-colorInherit {
  color: inherit;
}

.MuiTypography-colorPrimary {
  color: #0088ff;
}

.MuiTypography-colorSecondary {
  color: #747c87;
}

.MuiTypography-colorTextPrimary {
  color: #0f1824;
}

.MuiTypography-colorTextSecondary {
  color: #747c87;
}

.MuiTypography-colorError {
  color: #f44336;
}

.MuiTypography-displayInline {
  display: inline;
}

.MuiTypography-displayBlock {
  display: block;
}

.MuiTouchRipple-root {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  border-radius: inherit;
  pointer-events: none;
}

.MuiTouchRipple-ripple {
  opacity: 0;
}

.MuiTouchRipple-rippleVisible {
  opacity: 0.3;
  animation: MuiTouchRipple-keyframes-enter 550ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
}

.MuiTouchRipple-ripplePulsate {
  animation-duration: 200ms;
}

.MuiTouchRipple-child {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 1;
  border-radius: 50%;
  background-color: currentColor;
}

.MuiTouchRipple-childLeaving {
  opacity: 0;
  animation: MuiTouchRipple-keyframes-exit 550ms cubic-bezier(0.4, 0, 0.2, 1);
}

.MuiTouchRipple-childPulsate {
  top: 0;
  left: 0;

  animation: MuiTouchRipple-keyframes-pulsate 2500ms cubic-bezier(0.4, 0, 0.2, 1) 200ms infinite;
}

@-webkit-keyframes MuiTouchRipple-keyframes-enter {
  0% {
    opacity: 0.1;
    transform: scale(0);
  }

  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}

@-webkit-keyframes MuiTouchRipple-keyframes-exit {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-webkit-keyframes MuiTouchRipple-keyframes-pulsate {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
}

.MuiButtonBase-root {
  color: inherit;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;

  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.MuiButtonBase-root::-moz-focus-inner {
  border-style: none;
}

.MuiButtonBase-root.Mui-disabled {
  cursor: default;
  pointer-events: none;
}

.MuiListItem-root {
  width: 100%;
  display: flex;

  box-sizing: border-box;
  text-align: left;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  justify-content: flex-start;
  text-decoration: none !important;
}

.MuiListItem-root.Mui-focusVisible {
  background-color: rgba(0, 0, 0, 0.08);
}

.MuiListItem-root.Mui-selected,
.MuiListItem-root.Mui-selected:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.MuiListItem-root.Mui-disabled {
  opacity: 0.5;
}

.MuiListItem-container {}

.MuiListItem-dense {
  padding-top: 4px;
  padding-bottom: 4px;
}

.MuiListItem-alignItemsFlexStart {
  align-items: flex-start;
}

.MuiListItem-divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-clip: padding-box;
}

.MuiListItem-gutters {
  padding-left: 16px;
  padding-right: 16px;
}

.MuiListItem-button {
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.MuiListItem-button:hover {
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.04);
}

@media (hover: none) {
  .MuiListItem-button:hover {
    background-color: transparent;
  }
}

.MuiListItem-secondaryAction {
  padding-right: 48px;
}

.MuiLink-underlineNone {
  text-decoration: none;
}

.MuiLink-underlineHover {
  text-decoration: none;
}

.MuiLink-underlineHover:hover {
  text-decoration: underline;
}

.MuiLink-underlineAlways {
  text-decoration: underline;
}

.MuiLink-button {
  border: 0;
  cursor: pointer;
  margin: 0;
  outline: 0;
  padding: 0;

  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.MuiLink-button::-moz-focus-inner {
  border-style: none;
}

.MuiLink-button.Mui-focusVisible {
  outline: auto;
}

.MuiListItemIcon-root {
  color: rgba(0, 0, 0, 0.54);
  display: inline-flex;
  min-width: 56px;
  flex-shrink: 0;
}

.MuiListItemIcon-alignItemsFlexStart {
  margin-top: 8px;
}

.MuiList-root {
  margin: 0;
  padding: 0;

  list-style: none;
}

.MuiList-padding {
  padding-top: 8px;
  padding-bottom: 8px;
}

.MuiList-subheader {
  padding-top: 0;
}

.MuiIconButton-root {
  flex: 0 0 auto;
  color: #0f1824;
  padding: 12px;
  overflow: visible;
  font-size: 1rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
}

.MuiIconButton-root:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.MuiIconButton-root.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
  background-color: transparent;
}

@media (hover: none) {
  .MuiIconButton-root:hover {
    background-color: transparent;
  }
}

.MuiIconButton-edgeStart {
  margin-left: -12px;
}

.MuiIconButton-sizeSmall.MuiIconButton-edgeStart {
  margin-left: -3px;
}

.MuiIconButton-edgeEnd {
  margin-right: -12px;
}

.MuiIconButton-sizeSmall.MuiIconButton-edgeEnd {
  margin-right: -3px;
}

.MuiIconButton-colorInherit {
  color: inherit;
}

.MuiIconButton-colorPrimary {
  color: #0088ff;
}

.MuiIconButton-colorPrimary:hover {
  background-color: rgba(0, 136, 255, 0.04);
}

@media (hover: none) {
  .MuiIconButton-colorPrimary:hover {
    background-color: transparent;
  }
}

.MuiIconButton-colorSecondary {
  color: #747c87;
}

.MuiIconButton-colorSecondary:hover {
  background-color: rgba(116, 124, 135, 0.04);
}

@media (hover: none) {
  .MuiIconButton-colorSecondary:hover {
    background-color: transparent;
  }
}

.MuiIconButton-sizeSmall {
  padding: 3px;
  font-size: 1.125rem;
}

.MuiIconButton-label {
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
}

@media print {
  .MuiDialog-root {}
}

.MuiDialog-scrollPaper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.MuiDialog-scrollBody {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.MuiDialog-scrollBody:after {
  width: 0;
  height: 100%;
  content: "";
  display: inline-block;
  vertical-align: middle;
}

.MuiDialog-container {
  height: 100%;
  outline: 0;
}

@media print {
  .MuiDialog-container {
    height: auto;
  }
}

.MuiDialog-paper {
  margin: 32px;

  overflow-y: auto;
}

@media print {
  .MuiDialog-paper {
    box-shadow: none;
    overflow-y: visible;
  }
}

.MuiDialog-paperScrollPaper {
  display: flex;
  max-height: calc(100% - 64px);
  flex-direction: column;
}

.MuiDialog-paperScrollBody {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

.MuiDialog-paperWidthFalse {
  max-width: calc(100% - 64px);
}

.MuiDialog-paperWidthXs {
  max-width: 444px;
}

@media (max-width: 507.95px) {
  .MuiDialog-paperWidthXs.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthSm {
  max-width: 600px;
}

@media (max-width: 663.95px) {
  .MuiDialog-paperWidthSm.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthMd {
  max-width: 960px;
}

@media (max-width: 1023.95px) {
  .MuiDialog-paperWidthMd.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthLg {
  max-width: 1280px;
}

@media (max-width: 1343.95px) {
  .MuiDialog-paperWidthLg.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthXl {
  max-width: 1920px;
}

@media (max-width: 1983.95px) {
  .MuiDialog-paperWidthXl.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperFullWidth {
  width: calc(100% - 64px);
}

.MuiDialog-paperFullScreen {
  width: 100%;
  height: 100%;
  margin: 0;
  max-width: 100%;
  max-height: none;
  border-radius: 0;
}

.MuiDialog-paperFullScreen.MuiDialog-paperScrollBody {
  margin: 0;
  max-width: 100%;
}

.MuiButton-root {
  color: #0f1824;
  height: 36px;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 80px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 1;
  border-radius: 10px;
  text-transform: uppercase;
}

.MuiButton-root:hover {
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.04);
}

.MuiButton-root.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
}

@media (hover: none) {
  .MuiButton-root:hover {
    background-color: transparent;
  }
}

.MuiButton-root:hover.Mui-disabled {
  background-color: transparent;
}

.MuiButton-label {
  width: 100%;
  display: inherit;
  font-size: 1rem;
  align-items: inherit;
  text-transform: none;
  justify-content: inherit;
}

.MuiButton-text {
  padding: 6px 8px;
}

.MuiButton-textPrimary {
  color: #0088ff;
}

.MuiButton-textPrimary:hover {
  background-color: rgba(0, 136, 255, 0.04);
}

@media (hover: none) {
  .MuiButton-textPrimary:hover {
    background-color: transparent;
  }
}

.MuiButton-textSecondary {
  color: #747c87;
}

.MuiButton-textSecondary:hover {
  background-color: rgba(116, 124, 135, 0.04);
}

@media (hover: none) {
  .MuiButton-textSecondary:hover {
    background-color: transparent;
  }
}

.MuiButton-outlined {
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 5px 18px 4px;
  font-weight: bold;
  border-color: #ebedf1;
  border-width: 2px;
}

.MuiButton-outlined.Mui-disabled {
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.MuiButton-outlinedPrimary {
  color: #0088ff;
  border: 1px solid rgba(0, 136, 255, 0.5);
}

.MuiButton-outlinedPrimary:hover {
  border: 1px solid #0088ff;
  background-color: rgba(0, 136, 255, 0.04);
}

@media (hover: none) {
  .MuiButton-outlinedPrimary:hover {
    background-color: transparent;
  }
}

.MuiButton-outlinedSecondary {
  color: #747c87;
  border: 1px solid rgba(116, 124, 135, 0.5);
}

.MuiButton-outlinedSecondary:hover {
  border: 1px solid #747c87;
  background-color: rgba(116, 124, 135, 0.04);
}

.MuiButton-outlinedSecondary.Mui-disabled {
  border: 1px solid rgba(0, 0, 0, 0.26);
}

@media (hover: none) {
  .MuiButton-outlinedSecondary:hover {
    background-color: transparent;
  }
}

.MuiButton-contained {
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: #e0e0e0;
}

.MuiButton-contained:hover {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: #d5d5d5;
}

.MuiButton-contained.Mui-focusVisible {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}

.MuiButton-contained:active {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.MuiButton-contained.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.12);
}

@media (hover: none) {
  .MuiButton-contained:hover {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    background-color: #e0e0e0;
  }
}

.MuiButton-contained:hover.Mui-disabled {
  background-color: rgba(0, 0, 0, 0.12);
}

.MuiButton-containedPrimary {
  color: #fff;
  background-color: #0088ff;
}

.MuiButton-containedPrimary:hover {
  background-color: #006db3;
}

@media (hover: none) {
  .MuiButton-containedPrimary:hover {
    background-color: #0088ff;
  }
}

.MuiButton-containedSecondary {
  color: #fff;
  background-color: #747c87;
}

.MuiButton-containedSecondary:hover {
  background-color: rgb(81, 86, 94);
}

@media (hover: none) {
  .MuiButton-containedSecondary:hover {
    background-color: #747c87;
  }
}

.MuiButton-disableElevation {
  box-shadow: none;
}

.MuiButton-disableElevation:hover {
  box-shadow: none;
}

.MuiButton-disableElevation.Mui-focusVisible {
  box-shadow: none;
}

.MuiButton-disableElevation:active {
  box-shadow: none;
}

.MuiButton-disableElevation.Mui-disabled {
  box-shadow: none;
}

.MuiButton-colorInherit {
  color: inherit;
  border-color: currentColor;
}

.MuiButton-textSizeSmall {
  padding: 4px 5px;
  font-size: 0.8125rem;
}

.MuiButton-textSizeLarge {
  padding: 8px 11px;
  font-size: 0.9375rem;
}

.MuiButton-outlinedSizeSmall {
  padding: 3px 9px;
  font-size: 0.8125rem;
}

.MuiButton-outlinedSizeLarge {
  padding: 7px 21px;
  font-size: 0.9375rem;
}

.MuiButton-containedSizeSmall {
  padding: 4px 10px;
  font-size: 0.8125rem;
}

.MuiButton-containedSizeLarge {
  padding: 8px 22px;
  font-size: 0.9375rem;
}

.MuiButton-fullWidth {
  width: 100%;
}

.MuiButton-startIcon {
  display: inherit;
  margin-left: -4px;
  margin-right: 8px;
}

.MuiButton-startIcon.MuiButton-iconSizeSmall {
  margin-left: -2px;
}

.MuiButton-endIcon {
  display: inherit;
  margin-left: 8px;
  margin-right: -4px;
}

.MuiButton-endIcon.MuiButton-iconSizeSmall {
  margin-right: -2px;
}

.MuiButton-iconSizeSmall>*:first-child {
  font-size: 18px;
}

.MuiButton-iconSizeMedium>*:first-child {
  font-size: 20px;
}

.MuiButton-iconSizeLarge>*:first-child {
  font-size: 22px;
}

.jss297 {
  z-index: 100000;
}

.jss297[x-placement*="bottom"] .jss298 {
  top: 0;
  left: 0;
  margin-top: -0.71em;
  margin-left: 4px;
  margin-right: 4px;
}

.jss297[x-placement*="top"] .jss298 {
  left: 0;
  bottom: 0;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: -0.71em;
}

.jss297[x-placement*="right"] .jss298 {
  left: 0;
  width: 0.71em;
  height: 1em;
  margin-top: 4px;
  margin-left: -0.71em;
  margin-bottom: 4px;
}

.jss297[x-placement*="left"] .jss298 {
  right: 0;
  width: 0.71em;
  height: 1em;
  margin-top: 4px;
  margin-right: -0.71em;
  margin-bottom: 4px;
}

.jss297[x-placement*="left"] .jss298::before {
  transform-origin: 0 0;
}

.jss297[x-placement*="right"] .jss298::before {
  transform-origin: 100% 100%;
}

.jss297[x-placement*="top"] .jss298::before {
  transform-origin: 100% 0;
}

.jss297[x-placement*="bottom"] .jss298::before {
  transform-origin: 0 100%;
}

.jss298 {
  width: 1em;
  height: 0.71em;
  overflow: hidden;

  box-sizing: border-box;
}

.jss298::before {
  width: 100%;
  border: 1px solid #d3d5d7;
  height: 100%;
  margin: auto;
  content: "";
  display: block;
  transform: rotate(45deg);
  background-color: #fff;
}

.jss299 {
  max-width: 1000px;
  min-width: 230px;
  background-color: #fff;
}

.jss301 {
  left: auto !important;
}

.jss302 {
  margin-left: -30px;
}

.MuiListItemText-root {
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 4px;
}

.MuiListItemText-multiline {
  margin-top: 6px;
  margin-bottom: 6px;
}

.MuiListItemText-inset {
  padding-left: 56px;
}

.jss186 {
  color: #f3f4f5;
  width: auto;
  height: 48px;
  margin: 4px;
  padding: 0;
  min-width: 44px;
  border-radius: 3px;
}

.jss186.active {
  fill: #fff;
  color: #fff;
  background: #0088ff;
}

.jss186>.MuiListItemIcon-root {
  color: #a3a8af;
  width: 34px;
  display: flex;
  min-width: unset;
  align-items: center;
  margin-left: 10px;
}

.jss186.active>.MuiListItemIcon-root {
  fill: #fff;
  color: #fff;
}

.jss186>.MuiListItemText-root {
  flex: unset;
  width: 155px;
  margin-top: -2px;
  font-weight: 400;
  margin-bottom: unset;
}

.jss186>.icon-collapse {
  color: #a3a8af;
  font-size: 24px;
  transition: transform 0.2s linear;
  margin-right: 4px;
}

.jss186>.icon-collapse:hover {
  color: #fff;
  font-size: 24px;
  transition: transform 0.2s linear;
  margin-right: 4px;
}

.jss186.open>.icon-collapse {
  color: #fff;
  transform: rotate(90deg);
}

.jss186>.MuiListItemText-root .MuiTypography-root {
  overflow: hidden;
  white-space: nowrap;
}

.jss186:not(.active).MuiListItem-button:hover {
  fill: #fff;
  color: #fff;
  background: #243041;
  text-decoration: none;
}

.jss186:not(.active).MuiListItem-button:hover>.MuiListItemIcon-root,
.jss186:not(.active).MuiListItem-button:hover .MuiListItemText-root {
  color: #f3f4f5;
}

.jss186>.MuiListItemIcon-root>svg {
  font-size: 24px;
  max-height: 24px;
}

.jss187 .active {
  background: none;
}

.jss187 .menuListSubMenuItemLevel-0 {
  margin: 0;
  padding: 0;
}

.jss187 .menuListSubMenuItemLevel-1>.rootMenuItem {
  height: 36px;
  padding-left: 44px;
}

.jss187 .menuListSubMenuItemLevel-1 .menuItemTitle .MuiTypography-root {
  display: flex;
  align-items: center;
}

.jss187 .menuListSubMenuItemLevel-1 .menuItemTitle .MuiTypography-root::before {
  content: "\2022";
  font-size: 20px;
  margin-top: -2px;
  line-height: 0.2;
  margin-left: -1px;
  margin-right: 12px;
}

.jss187 .menuListSubMenuItemLevel-0>.rootMenuItem {
  height: 40px;
  padding-left: 44px;
}

.jss187 .menuListSubMenuItemLevel-0 div.MuiButtonBase-root {
  height: 40px;
}

.jss187 .menuListSubMenuItemLevel-0 .MuiListItemText-root {
  color: #f3f4f5;
  margin: 0;
}

.jss187 .menuListSubMenuItemLevel-0 div.MuiButtonBase-root.open:not(.active)>.menuItemTitle {
  color: #f3f4f5;
}

.jss187:not(.active) .MuiListItem-button:hover {
  background: #243041;
}

.jss187 .active.MuiListItem-button:hover,
.jss187 .active .MuiListItemText-root {
  color: #0088ff !important;
  background: none;
}

.jss188 {
  min-width: 196px;
  background: #182537;
  min-height: 48px;
  margin-left: 48px;
}

.jss188 .subMenusHoverHeader {
  color: #f3f4f5;
  height: 48px;
  display: flex;
  background: #243041;
  align-items: center;
  padding-left: 16px;
  justify-content: space-between;
}

.jss188 .subMenusHoverBody {
  padding: 12px 0;
  background: #182537;
}

.jss188 .subMenusHoverBody>.MuiListItem-root {
  color: #f3f4f5;
  width: auto;
  height: 40px;
  margin: 4px 8px;
  padding: 0 16px;
  border-radius: 3px;
  text-decoration: none;
}

.jss188 .subMenusHoverBody .active {
  color: #0088ff;
}

.jss188 .subMenusHoverBody>.MuiListItem-root:hover:not(.active) {
  background: #243041;
}

.jss188 .subMenusHoverHeader .MuiTypography-root {
  line-height: 48px;
}

.jss188 .subMenusHoverHeader .MuiButtonBase-root {
  color: #a3a8af;
  padding: 12px 4px;
}

.jss188 .subMenusHoverHeader .MuiButtonBase-root svg {
  font-size: 24px;
}

.jss91 {
  border: 0;
  margin: 0;
  border-top: 1px solid #46515f;
  border-bottom: 1px solid #46515f;
}

.jss92 .menuDivider {
  border: 0;
  margin: 0;
  border-top: 1px solid #46515f;
  border-bottom: 1px solid #46515f;
}

.jss93 {
  top: 0;
  left: 0;
  width: 230px;
  bottom: 0;
  display: block;
  z-index: 1002;
  background: #ffffff;
  transition: width 200ms;
}

.jss93>nav {
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;

  background-color: #182537;
}

.jss93.menuCollapse {
  width: 52px;
}

.jss93.menuCollapse>nav .menuTopToogle {
  right: 8px;
}

.jss93.menuCollapse>nav .menuList>.MuiListItem-root>.MuiListItemText-root {
  display: none;
}

.jss93.menuCollapse>nav .menuList>.MuiListItem-root>.icon-collapse {
  display: none;
}

.jss93.menuCollapse>nav .menuTopLogo img.logo--full {
  display: none;
}

.jss93>nav .menuTopHeader {
  height: 55px;
}

.jss93>nav .menuTopLogo {
  height: 55px;
}

.jss93>nav .menuTopToogle {
  top: 8px;
  right: 4px;
  display: block;
  padding: 8px;
}

.jss93>nav .menuDivider {
  border: 0;
  margin: 0;
  border-top: 1px solid #15202c;
  border-bottom: 1px solid #263d53;
}

.jss93>nav .menuInnerWrapper {
  height: calc(100% - 60px);
}

.jss93>nav .menuPrimaryInner {
  height: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  overscroll-behavior: contain;
}

.jss93>nav .menuList {
  fill: #f3f4f5;
  color: #f3f4f5;
  padding: 0;
}

.jss93>nav .menuPrimaryInner::-webkit-scrollbar {
  width: 5px;
  background: #202d3f;
}

.jss93>nav .menuPrimaryInner::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #2b4263;
}

.jss93>nav .menuTopToogle svg {
  color: #fff;
  font-size: 24px;
}

.jss93>nav .menuTopLogo img.logo--full {
  padding: 12px 12px 0;
}

.jss94 {
  width: auto;
  cursor: pointer;
  margin: 4px;
  padding: 0 10px;
  min-height: 48px;
  text-transform: uppercase;
}

.jss94 svg {
  color: #a3a8af;
  font-size: 24px;
}

.jss94 .title {
  overflow: hidden;
  white-space: nowrap;
}

.jss94 .hidden {
  display: none;
}

.jss95 {
  width: 0;
  display: flex;
  flex-direction: column;
  background-color: #243954;
}

@media (min-width: 600px) {
  .jss95 {
    width: 230px;
    flex-shrink: 0;
  }
}

.jss96 {
  height: 52px;
  background-color: black;
}

@media (min-width: 600px) {
  .jss96 {
    width: calc(100% - 230px);
  }
}

.jss97 {
  margin-right: 16px;
}

@media (min-width: 600px) {
  .jss97 {
    display: none;
  }
}

.jss98 {
  min-height: 56px;
}

@media (min-width: 0px) and (orientation: landscape) {
  .jss98 {
    min-height: 48px;
  }
}

@media (min-width: 600px) {
  .jss98 {
    min-height: 64px;
  }
}

.jss99 {
  width: 230px;
  display: flex;
  flex-direction: column;
  background-color: #243954;
}

.jss100 {
  padding: 24px;
  flex-grow: 1;
}

.jss101 p {
  color: #ffffff;
}

.jss101 svg {
  fill: #ffffff;
}

.jss102 {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.jss103 {
  color: #182537;
  display: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
}

@media (min-width: 600px) {
  .jss103 {
    display: block;
  }
}

.jss104 {
  display: none;
  align-items: center;
}

@media (min-width: 600px) {
  .jss104 {
    display: flex;
  }
}

.jss105 {
  color: #182537;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  padding-left: 5px;
}

.jss106 {
  cursor: pointer;
  height: 100%;
  display: flex;
  padding: 16px 13px;
  align-items: center;
}

.jss106 svg {
  color: #a2a8af;
}

.jss106:hover svg {
  color: #0088ff;
}

.jss106:hover p {
  color: #0088ff;
}

.jss107 {
  color: #747c87;
  margin-right: 9px;
}

.jss108 {
  width: 30px;
  height: 30px;
}

.jss109 {
  margin: 0 10px;
  font-weight: 500;
}
</style>



<style data-jss="" data-meta="MuiAvatar">
.MuiAvatar-colorDefault {
  color: #fafafa;
  background-color: #bdbdbd;
}

.MuiAvatar-rounded {
  border-radius: 4px;
}

.MuiAvatar-square {
  border-radius: 0;
}

.MuiAvatar-img {
  color: transparent;
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
  text-indent: 10000px;
}

.MuiAvatar-fallback {
  width: 75%;
  height: 75%;
}

.jss274 {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: url(https://res.cloudinary.com/dqvr7kat6/image/upload/v1718268402/zu43thyvdywlzfuhxfm6.webp) top left no-repeat,
    url(https://res.cloudinary.com/dqvr7kat6/image/upload/v1718268402/zu43thyvdywlzfuhxfm6.webp) bottom right no-repeat !important;
}

.jss275 {
  color: #00356d;
  margin: 0 0 25px 0;
  font-size: 24px;
  text-align: center;
  font-weight: 700;
}

.jss276 {
  border: 1px solid #007ce8;
  display: flex;
  padding: 8px 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  min-height: 40px;
  align-items: center;
  border-radius: 6px;
  background: #182537;
}

.jss277 {
  padding-left: 25px;
}

.jss278 {
  left: 50%;
  width: 110px;

  transform: translateX(-50%);
  margin-bottom: -20px;
}

.jss279 {
  margin-top: 16px;
}

.jss280 {
  width: 100%;
  border: 1px solid #d3d5d7;
  height: 36px;
  display: flex;
  padding: 0 12px;
  align-items: center;
  border-radius: 6px;
  justify-content: space-between;
}

.jss281 {
  cursor: pointer;
  display: flex;
  padding: 16px 13px;
  font-size: 14px;
  align-items: center;
}

.jss281 svg {
  color: #a2a8af;
  margin-right: 9px;
}

.jss281:hover {
  color: #0189ff;
  background: #182537;
}

.jss281:hover svg {
  color: #0189ff;
}

.jss282 {
  width: 476px;
  padding: 24px;
}

.jss283 {
  box-shadow: none;
}

.jss284 {
  margin: 0;
}

.jss261 {
  top: 0;
  height: 52px;
  display: flex;
  padding: 0 32px;
  z-index: 1001;
  background: #182537 !important;
  box-shadow: 0px 2px 4px rgba(168, 168, 168, 0.25);
  align-items: center;
  justify-content: space-between;
}

.jss261 .open svg {
  fill: #0088ff;
}

.jss262 {
  height: inherit;
  display: flex;
  align-items: center;
}

.jss263 {
  cursor: pointer;
  height: 100%;
  display: flex;
  padding: 16px 13px;
  align-items: center;
}

.jss263 svg {
  color: #a2a8af;
}

.jss263:hover {
  background: #f2f9ff;
}

.jss263:hover svg {
  color: #0088ff;
}

.jss263:hover p {
  color: #0088ff;
}

.jss264 {
  color: #747c87;
  margin-right: 9px;
}

.jss265 {
  width: 30px;
  height: 30px;
}

.jss266 {
  margin: 0 10px;
  font-weight: 500;
}

.jss268 {}

.jss269 {
  top: 9px;
  left: 25px;
  color: #ffffff;
  width: 20px;
  height: 16px;
  display: flex;

  font-size: 10px;
  background: #e94765;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
}

.jss270 {
  box-shadow: 0px 4px 8px rgba(168, 168, 168, 0.25);
}

.jss271 {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.jss82 {
  display: flex;
  flex-direction: column;
}

.jss592 {
  z-index: 9999;
}

.jss592 #arrow {
  width: 10px;
  height: 10px;
}

.jss592[data-popper-placement^="top"]>#arrow {
  bottom: -10px;
}

.jss592[data-popper-placement^="left"]>#arrow {
  right: -2px;
}

.jss592[data-popper-placement^="right"]>#arrow {
  left: -6px;
}

.jss592[data-popper-placement^="right"]>#arrow:after {
  top: -40px;
  width: 15px;
  height: 15px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 10%);
}

.jss592[data-popper-placement^="left"]>#arrow:after {
  top: -40px;
  width: 15px;
  height: 15px;
  box-shadow: 2px 0px 2px 0px rgb(0 0 0 / 10%);
}

.jss592[data-popper-placement^="top"]>#arrow:after {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.jss592 #arrow:after {
  top: -4px;
  left: 0;
  width: 8px;
  height: 8px;
  content: "";

  transform: rotate(45deg);
  box-shadow: -1px -1px 3px rgb(0 0 0 / 10%);
  background-color: black;
}

.jss1 span {
  font-size: 14px;
}

.jss2 {
  background-color: unset;
}

.jss3 {
  height: 3px;
}

.jss763 {
  left: 0;
  color: #fff;
  width: calc(100% - 230px);
  bottom: 0;
  height: 72px;
  display: flex;
  opacity: 0.9;
  padding: 0 24px;
  z-index: 101;
  background: #182537;
  transition: 200ms;
  align-items: center;
  margin-left: 230px;
  justify-content: space-between;
}

.jss763.menu-is-collapse {
  width: calc(100% - 52px);
  margin-left: 52px;
}

.jss764 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.jss742 {
  left: 0;
  color: #fff;
  width: calc(100% - 230px);
  bottom: 0;
  height: 72px;
  display: flex;
  opacity: 0.9;
  padding: 0 24px;
  z-index: 101;
  background: #182537;
  transition: 200ms;
  align-items: center;
  margin-left: 230px;
  justify-content: space-between;
}

.jss742.menu-is-collapse {
  width: calc(100% - 52px);
  margin-left: 52px;
}

.jss743 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.jss744 {
  height: 42px;
  min-width: 42px;
  background: #ffffff;
  border-radius: 3px;
}

.jss745 {
  height: 41px;
  padding: 7px 5px 7px 5px;
  min-width: 42px;
  background: linear-gradient(62.06deg,
      #0fd186 25.88%,
      #3fda9e 100%) !important;
  border-radius: 3px;
}

.jss728 {
  height: fit-content;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(168, 168, 168, 0.25);
  margin-top: 24px;
}

.jss729 {
  height: auto;
  display: flex;

  min-height: 56px;
  padding-bottom: 8px;
}

.jss730 {
  width: calc(100% - 62px);
  word-break: break-word;
  margin-left: 15px;
  padding-bottom: 10px;
}

.jss731 {
  color: #747c87;
  width: 24px;
  height: 24px;
  margin-left: auto;
}

.jss732 {
  color: #fff;
  height: 20px;
  font-size: 12px;
  background: #ff4d4d;
  margin-top: -11px;
}

.jss733 {
  width: 10px;
  border: 1px solid #0088ff;
  height: 10px;
  box-shadow: 0 0 0 5px #e6f4ff;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 100%;
  background-color: #0088ff;
}

.jss733:hover {
  transform: scale(1.2);
  webkit-transform: scale(1.2);
}

.jss734 {
  top: 25px;
  left: 24px;
  bottom: -4px;

  border-left: 2px dashed #99cfff;
}

.jss735 {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.jss736:hover {
  transform: scale(1.2);
  webkit-transform: scale(1.2);
}
</style>
