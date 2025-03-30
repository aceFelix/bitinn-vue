import { createRouter, createWebHistory } from 'vue-router'

// 导入页面视图组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue';
// 导入子路由视图组件
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
// 定义路由关系
const routes = [
    {path: '/login',component: LoginVue},
    {path: '/',component: LayoutVue,
        // 路由重定向
        redirect:'/article/manage',
        // 嵌套子路由
        children:[
            {path: '/article/category',component: ArticleCategoryVue},
            {path: '/article/manage',component: ArticleManageVue},
            {path: '/user/avatar',component: UserAvatarVue},
            {path: '/user/info',component: UserInfoVue},
            {path: '/user/resetPassword',component: UserResetPasswordVue}
        ]
    }
]

// 创建路由器实例并传递 `routes` 配置
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出路由
export default router