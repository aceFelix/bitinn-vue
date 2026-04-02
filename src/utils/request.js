import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useTokenStore } from '@/stores/token'

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.request.use(
  (config) => {
    const tokenStore = useTokenStore()
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    const result = response.data
    if (result.code === 0) {
      return result
    }
    ElMessage.error(result.message || '服务异常')
    return Promise.reject(result)
  },
  (error) => {
    const tokenStore = useTokenStore()
    if (error.response?.status === 401) {
      tokenStore.removeToken()
      ElMessage.error('请先登录')
      router.push('/login')
    } else {
      ElMessage.error(error.response?.data?.message || '服务异常')
    }
    return Promise.reject(error)
  }
)

export default instance
