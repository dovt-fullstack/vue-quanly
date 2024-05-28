<template>
    <div class="container">
        <div class="row">
            <div class="col">
                Column
                <div>Current Count: {{ counter.count }}</div>
                <h2 v-if="authStore.user">Welcome, {{ authStore.user.userName }}</h2>
            </div>
            <div class="col">
                Column
            </div>
            <div class="col">
                Column
            </div>
        </div>
    </div>
    <div class="container-sm">100% wide until small breakpoint</div>
    <div class="container-md">100% wide until medium breakpoint</div>
    <div class="container-lg">100% wide until large breakpoint</div>
    <div class="container-xl">100% wide until extra large breakpoint</div>
    <div class="container-xxl">100% wide until extra extra large breakpoint</div>
</template>
<script>
import { onMounted, onUpdated, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useMenu } from "../../stores/use-menu.js";
import { useCounterStore } from "../../stores/test-store.js";
import { useAuthStore } from "../../stores/auth.store.js";

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-dashboards"]);
        const authStore = useAuthStore();
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        //
        const counter = useCounterStore()
        counter.increment();
        return {
            counter,
            authStore,
            authStoreClaim
        };
    },
});
</script>
<style>
#components-layout-demo-basic .code-box-demo {
    text-align: center;
}

#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
    color: #fff;
    background: #7dbcea;
}

[data-theme='dark'] #components-layout-demo-basic .ant-layout-header {
    background: #6aa0c7;
}

[data-theme='dark'] #components-layout-demo-basic .ant-layout-footer {
    background: #6aa0c7;
}

#components-layout-demo-basic .ant-layout-footer {
    line-height: 1.5;
}

#components-layout-demo-basic .ant-layout-sider {
    color: #fff;
    line-height: 120px;
    background: #3ba0e9;
}

[data-theme='dark'] #components-layout-demo-basic .ant-layout-sider {
    background: #3499ec;
}

#components-layout-demo-basic .ant-layout-content {
    min-height: 120px;
    color: #fff;
    line-height: 120px;
    background: rgba(16, 142, 233, 1);
}

[data-theme='dark'] #components-layout-demo-basic .ant-layout-content {
    background: #107bcb;
}

#components-layout-demo-basic>.code-box-demo>.ant-layout+.ant-layout {
    margin-top: 48px;
}
</style>
