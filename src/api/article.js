// 导入request.js
import request from '@/utils/request'
// import { useTokenStore } from '@/stores/token'
// 提供调用文章列表接口的函数
export const getArticleListService = () => {
    // 在请求头中携带token
    // 在pinia中定义的响应式数据，都不需要使用.value，因为在模板中，会自动解构响应式数据
    // return request.get('/article',{headers:{'Authorization':useTokenStore().token}})
    return request.get('/article')
}

