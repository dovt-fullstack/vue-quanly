<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="card shadow">
                    <div class="card-title text-center border-bottom">
                        <h2 class="p-3">Đăng nhập</h2>
                    </div>
                    <div class="card-body px-3 py-3">
                        <h1></h1>
                        <a-form :model="formState" autocomplete="off" name="normal_login" class="login-form"
                            @finish="onFinish" @finishFailed="onFinishFailed">
                            <a-form-item label="Username" name="username"
                                :rules="[{ required: true, message: 'Please input your username!' }]">
                                <a-input v-model:value="formState.username">
                                    <template #prefix>
                                        <UserOutlined class="site-form-item-icon" />
                                    </template>
                                </a-input>
                            </a-form-item>

                            <a-form-item label="Password" name="password" autocomplete="off"
                                :rules="[{ required: true, message: 'Please input your password!' }]">
                                <a-input-password v-model:value="formState.password" autocomplete="off">
                                    <template #prefix>
                                        <LockOutlined class="site-form-item-icon" />
                                    </template>
                                </a-input-password>
                            </a-form-item>

                            <!-- <a-form-item>
                                <a-form-item name="remember" no-style>
                                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                                </a-form-item>
                                <a class="login-form-forgot" href="">Forgot password</a>
                            </a-form-item> -->

                            <a-form-item>
                                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                                    Log in
                                </a-button>
                                Or
                                <router-link :to="{ name: 'register' }">
                                    <a>register now!</a>
                                </router-link>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, computed, ref, reactive } from 'vue';

import 'ant-design-vue/dist/antd.min.css';
import { message } from "ant-design-vue";
import { useAuthStore } from "../../stores/auth.store.js";
import axios from 'axios';

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const formState = reactive({
            username: '',
            password: ''
        });
   
        const onFinish = values => {
            const { username, password } = values;
            const newValue = {
                email : username,
                password :password
            }
             axios.post('https://charismatic-friendship-production.up.railway.app/api/v1/auth/authenticate',newValue).then((res)=>{
                console.log(res.data);
                localStorage.setItem('auth',JSON.stringify(res.data));
                localStorage.setItem('token',JSON.stringify(res.data.accesstoken))
                window.location.href="/dashboards"
             }).catch((err) => {
                console.log(err);
             })

        }
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.username && formState.password);
        });
        //
        return {
            formState,
            onFinishFailed,
            onFinish,
            disabled
        };
    }
})

</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>

