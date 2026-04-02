import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import '@/styles/colors.css'

const pinia = createPinia()
pinia.use(createPersistedState())

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app')
