<script setup lang="ts">
import { onMounted } from 'vue';
import OrderList from './components/OrderList.vue';
import { useMiniApp } from 'vue-tg'
import { useMainStore } from './store/main'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { login } = useMainStore()
const { getLogin, getAuth } = storeToRefs(useMainStore())
const miniApp = useMiniApp()
const text = ref('load')
const is401 = ref(false)
const chatId = ref('')
onMounted(() => {
  const userData = miniApp.initDataUnsafe;
  console.log(userData.chat?.id);
  localStorage.setItem("chat-id", userData.user?.id?.toString())
  chatId.value = userData.user?.id?.toString() ?? 'test'
  setTimeout(() => {
    text.value = 'Нет доступа'
    is401.value = true
  }, 5000)

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
    <a-result v-if="is401" status="403" title="401" sub-title="Нет доступа">
    </a-result>
    <div style="display: flex; justify-content: center; align-items: center; align-content: center; height: 95vh;">
      <a-spin v-if="!is401" size="large" />
    </div>
  </template>
</template>

<style scoped></style>
