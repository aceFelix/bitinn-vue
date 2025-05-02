import { defineStore } from "pinia";
import { ref } from "vue";

export const userInfoStore = defineStore("userInfo", () => {
  // 定义状态的内容
  // 1. 定义一个用户信息对象
  let userInfo = ref({});

  // 2. 定义一个方法，用于修改用户信息
  const setUserInfo = (newUserInfo) => {
    userInfo.value = newUserInfo;
  }

  // 3. 定义一个方法，用于移除用户信息
  const removeUserInfo = () => {
    userInfo.value = {};
  }

  return {
    userInfo,
    setUserInfo,
    removeUserInfo,
  }
},
{
    persist:true
});