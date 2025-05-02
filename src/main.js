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
// 导入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const pinia = createPinia()
pinia.use(createPersistedState())

createApp(App)
.use(pinia)
.use(router)
.use(ElementPlus)
.usere(ElementPlus,{locale:zhCn})
.mount('#app')
