// 定义store
import { defineStore } from "pinia";
import { ref } from "vue";
/* 
    第一个参数：唯一标识，pinia会根据这个标识找到对应的store
    第二个参数：定义state和actions
    返回值：返回一个函数，这个函数会返回一个对象，这个对象中包含state和actions
*/
export const useTokenStore = defineStore("token", ()=>{
    // 定义状态的内容

    // 1. 定义一个token
    let token = ref('');

    // 2. 定义一个方法，用于修改token
    const setToken = (newToken)=>{
        token.value = newToken;
    }

    // 3.定义一个函数，用于移除token
    const removeToken = ()=>{
        token.value = '';
    }

    return {
        token,
        setToken,
        removeToken
    }
},
{
    persist:true // 开启持久化存储
});