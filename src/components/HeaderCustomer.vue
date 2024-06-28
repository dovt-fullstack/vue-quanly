<template>
  <div id="header">
    <div class="head1">

      <div class="wrap flexJus">
        <router-link to="/trang-chu-stores">
          <span title="Siêu thị Agogo">
            <img width="60" height="60"
              src="https://res.cloudinary.com/dqvr7kat6/image/upload/v1718287579/ftld80xpfribbbfhp1qu.png"
              alt="Siêu thị đèn LED" />
          </span>
        </router-link>

        <div class="open">
          <label style="cursor: pointer" class="oh">
            <router-link v-if="!userLocal" to="/login">
              <span> Đăng nhập </span>
            </router-link>
            <a-dropdown>
              <span class="ant-dropdown-link " @click.prevent>
                <span class="me-1">Xin chào {{ userLocal?.lastname }}</span>
                <i class="fa-solid "></i>
              </span>
              <template #overlay>
                <a-menu>

                  <a-menu-item>
                    <router-link :to="{ name: 'profile-client' }">
                      <span>Trang cá nhân</span>
                    </router-link>
                  </a-menu-item>

                  <a-menu-item>
                    <a @click="handleClickLogout" style="color: red;">Đăng xuất</a>
                  </a-menu-item>

                </a-menu>
              </template>
            </a-dropdown>
            <!-- <router-link to="/profile-client" v-else class="me-1">
                            <span>Xin chào {{ userLocal.lastname }}</span>
                        </router-link> -->
          </label>
        </div>
      </div>
    </div>
    <div class="head2">
      <div class="wrap flexJus">
        <div>
          <span style="font: bold 15px arial">Hãy cùng mua sắm nào!</span>
        </div>
        <div class="flexJus">
          <router-link to="/frivStore">
            <div class="vcart2">
              <i class="fa-solid fa-store"></i>
            </div>
          </router-link>

          <router-link to="/trang-chu/gio-hang">
            <div class="vcart2">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </router-link>

          <router-link to="/ordered">
            <div class="vcart2">
              <i class="fa-regular fa-rectangle-list"></i>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  setup() {
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const handleClickLogout = () => {
      localStorage.removeItem("auth");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      window.location.href = "http://localhost:5173/login"

    };
    return {
      handleClickLogout,
      userLocal,
    };
  },
});
</script>

<style scoped>
#header,
.btn2 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

#header {
  width: 100%;
  float: left;
  position: relative;
}

.head1 {
  padding: 15px 0;
  background: #000;
  position: relative;
}

.head2 {
  background: #ffd52f;
}

.wrap {
  width: 98%;
  margin: 0 auto;
  max-width: 1300px;
}

.flexJus {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.open {
  color: #fff;
  display: flex;
}

.open label {
  font-size: 13px;
  padding-left: 48px;
  position: relative;
}

.open label:nth-child(1) {
  margin-right: 30px;
}

.open label span {
  text-align: left;
  color: #ffd52f;
  font: bold 15px arial;
  display: block;
}

.open span b {
  color: white;
  font-weight: normal;
}

.vcart2:before {
  font: 21px/1 FontAwesome;
  padding-right: 2px;
}

.vcart2 {
  color: #000;
  padding-left: 14px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
}

.oh:before {
  background: url("/Content/img/i/icon-logo.png") no-repeat;
  width: 40px;
  display: inline-block;
  height: 40px;
  padding-right: 5px;
  content: " ";
  position: absolute;
  left: 0;
  top: -5px;
}

@media screen and (max-width: 769px) {
  .owl-wrapper-outer {
    padding-bottom: 40px;
  }

  .owl-pagination {
    text-align: center;
    width: 100%;
  }

  #mslidedetail .owl-pagination {
    bottom: 0;
  }

  .owl-page {
    display: inline-block;
  }

  .owl-page span {
    display: block;
    width: 22px;
    height: 14px;
    border: 0;
    margin: 0 3px 0 0;
    float: left;
    text-align: center;
    background: none !important;
  }

  .owl-page span:before {
    content: "\f111";
    font: 6px/1px FontAwesome;
    color: #ccc;
    display: inline-block;
    width: 8px;
    height: 8px;
  }

  .active span:before {
    color: #666;
  }
}

@media screen and (max-width: 415px) {

  .tiplist h2,
  .tiplist h3,
  .tiplist h4 {
    font-size: 13px;
  }

  .blog {
    width: 96%;
  }
}

@keyframes sonar {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  100% {
    -webkit-transform: scale(4);
    transform: scale(4);
    opacity: 0;
  }
}

@font-face {
  font-family: "FontAwesome";
  src: url("/Content/awesome/fontawesome-webfont.eot?v=4.4.0");
  src: url("/Content/awesome/fontawesome-webfont.eot?#iefix&v=4.4.0") format("embedded-opentype"),
    url("/Content/awesome/fontawesome-webfont.woff2?v=4.4.0") format("woff2"),
    url("/Content/awesome/fontawesome-webfont.woff?v=4.4.0") format("woff"),
    url("/Content/awesome/fontawesome-webfont.ttf?v=4.4.0") format("truetype"),
    url("/Content/awesome/fontawesome-webfont.svg?v=4.4.0#fontawesomeregular") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>