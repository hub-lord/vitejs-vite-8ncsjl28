<script setup lang="ts">
import { onMounted } from 'vue';
import OrderList from './components/OrderList.vue';
import { useMiniApp } from 'vue-tg'
import { useMainStore } from './store/main'
import { storeToRefs } from 'pinia';

const { login } = useMainStore()
const { getLogin } = storeToRefs(useMainStore())
const miniApp = useMiniApp()

onMounted(() => {
  const userData = miniApp.initDataUnsafe;
  if (userData && userData.user) {
    login(userData.user)
  }
})
</script>

<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="CRM"
    :sub-title="getLogin"
  />
  <OrderList />
</template>

<style scoped></style>
