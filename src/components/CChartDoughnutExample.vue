<template>
  <div>
    <CRow>
      <CCol :md="6" class="mb-4">
        <label for="month">Tháng:</label>
        <input v-model="month" type="number" min="1" max="12" id="month" />
        
        <label for="year">Năm:</label>
        <input v-model="year" type="number" min="2000" id="year" />
        
        <button @click="updateData">Cập nhật</button>
      </CCol>
    </CRow>
    <CRow>
      <CCol :md="6" class="mb-4">
        <CCard>
          <CCardHeader>Thống kê sản phẩm trong tháng:</CCardHeader>
          <CCardBody>
            <CChartDoughnut :data="chartData" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'
import { defineComponent, computed, ref, reactive } from "vue";
import "ant-design-vue/dist/antd.min.css";
import { useAuthStore } from "../stores/auth.store.js";
import { useRoute } from "vue-router";
import { onUpdated, onMounted } from "vue";
import { message, Badge, Button, Drawer, List, Avatar } from "ant-design-vue";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/vue';

export default defineComponent({
  components: {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CChartDoughnut
  },
  setup() {

    const month = ref(new Date().getMonth() + 1)
    const year = ref(new Date().getFullYear())
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const authStore = useAuthStore();
    const route = useRoute();
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    const token = JSON.parse(localStorage.getItem("token"));
    const chartData = ref({
      labels: [],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [],
        },
      ],
    });


    const getData = (month, year) => {
      axios
        .get(`${apiPrefix}/api/v1/management/order/table1`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { month, year },
        })
        .then((response) => {
          const apiData = response.data.data;
          chartData.value = {
            labels: ['Đã đặt', 'Đang giao', 'Đã giao', 'Đã hủy'],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [apiData['da-dat'], apiData['dang-giao'], apiData['da-giao'], apiData['da-huy']],
              },
            ],
          };
        })
        .catch((error) => {
          console.error(error);
        });
    };

    onMounted(() => {
      getData(month.value, year.value)
    });
    const updateData = () => {
      getData(month.value, year.value)
    }
    return {
      chartData,
      updateData,
      year,
      month
    };
  },
});
</script>

<style scoped>
input {
  margin-right: 10px;
  margin-bottom: 10px;
}
button {
  margin-bottom: 20px;
}
</style>
