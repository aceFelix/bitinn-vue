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

// 提供调用添加文章分类的函数
export const addCategoryService = (categoryData) => {
    return request.post('/category',categoryData)
}

// 提供调用编辑文章分类的函数
export const updateCategoryService = (categoryData) => {
    return request.put('/category',categoryData)
}

// 提供调用删除文章分类的函数
export const deleteCategoryService = (categoryId) => {
    return request.delete(`/category/${categoryId}`) // ${categoryId}: 动态参数；${}: 模板字符串,表示拼接字符串，?:表示可选参数
}

// 文章列表查询
export const articleListService = (params) => {
    return request.get('/article',{params:params})
}

// 添加文章
export const addArticleService = (articleData) => {
    return request.post('/article',articleData)
}