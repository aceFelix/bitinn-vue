// 定制请求的实例
 
// 导入axios  npm install axios
import axios from 'axios'
// 导入ElMassage组件
import { ElMessage } from 'element-plus'
// 定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL})

import { useTokenStore } from '@/stores/token';
// 添加请求拦截器
instance.interceptors.request.use(
    config=>{
        // 添加token
        if(useTokenStore().token){
            config.headers.Authorization = useTokenStore().token;
        }
    },
    err=>{
        return Promise.reject(err);
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    // 判断业务状态码
    res=>{
        if(res.data.code==0){
            return res.data;
        }else{
            // alert(res.data.msg?res.data.msg:'服务异常');
            ElMessage.error(res.data.msg?res.data.msg:'服务异常');
        }
    },
    err=>{
        // alert('服务异常');
        ElMessage.error('服务异常');
        return Promise.reject(err);  // 异步的状态转化成失败的状态
    }
)

export default instance;