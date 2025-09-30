<script setup lang="ts">
import { onMounted } from 'vue';
import OrderList from './components/OrderList.vue';
import { useMiniApp } from 'vue-tg'
import { useMainStore } from './store/main'
import { storeToRefs } from 'pinia';

const { login } = useMainStore()
const { getLogin, getAuth } = storeToRefs(useMainStore())
const miniApp = useMiniApp()
onMounted(() => {
  const userData = miniApp.initDataUnsafe;
  if (userData && userData.user) {
    console.log(userData.user);
    login(userData.user?.username)
  }
  else {
    login('test')
  }
})
</script>

<template>
  <template v-if="getAuth">
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="CRM" :sub-title="getLogin" />
    <OrderList />
  </template>
  <template v-else>
    401
  </template>
</template>

<style scoped></style>
