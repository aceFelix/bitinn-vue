import request from '@/utils/request'

export const userRegisterService = (registerData) => {
  const params = new URLSearchParams()
  for (const key in registerData) {
    params.append(key, registerData[key])
  }
  return request.post('/user/register', params)
}

export const userLoginService = (loginData) => {
  const params = new URLSearchParams()
  for (const key in loginData) {
    params.append(key, loginData[key])
  }
  return request.post('/user/login', params)
}

export const getUserInfoService = () => request.get('/user/info')

export const userInfoUpdateService = (userInfo) => request.put('/user/update', userInfo)

export const userAvatarUpdateService = (avatarUrl) => {
  const params = new URLSearchParams()
  params.append('avatarUrl', avatarUrl)
  return request.patch('/user/updateAvatar', params)
}

export const userResetPasswordService = (data) => request.patch('/user/updatePwd', data)
