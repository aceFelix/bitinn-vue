import request from '@/utils/request'

export const getCategoryListService = () => request.get('/category/list')

export const addCategoryService = (categoryData) => request.post('/category', categoryData)

export const updateCategoryService = (categoryData) => request.put('/category', categoryData)

export const deleteCategoryService = (categoryId) =>
  request.delete('/category', { params: { id: categoryId } })

export const articleListService = (params) => request.get('/article', { params })

export const addArticleService = (articleData) => request.post('/article', articleData)

export const getArticleDetailService = (id) => request.get('/article/detail', { params: { id } })

export const updateArticleService = (articleData) => request.put('/article', articleData)

export const deleteArticleService = (id) => request.delete('/article', { params: { id } })
