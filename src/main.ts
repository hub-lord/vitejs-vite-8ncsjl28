import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { VueTelegramPlugin } from 'vue-tg'

const pinia = createPinia()

const app = createApp(App)

app.use(VueTelegramPlugin)
app.use(pinia)
app.use(Antd)
app.mount('#app')