import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入路由
import router from '@/router'
// 导入Pinia
import { createPinia } from 'pinia'
// 导入persist插件
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState())

createApp(App)
.use(pinia)
.use(router)
.use(ElementPlus)
.mount('#app')
