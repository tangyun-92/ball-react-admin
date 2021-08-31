import { setUserInfo, setUserToken, resetUser } from './user'
import { reqLogin, reqLogout } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ username: username.trim(), password: password })
      .then((res) => {
        const { data } = res
        if (res.result) {
          const token = data.token
          dispatch(setUserToken(token))
          dispatch(setUserInfo(data))
          setToken(token)
          resolve(res)
        } else {
          const msg = data.message
          reject(msg)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((res) => {
        const { data } = res
        if (res.result) {
          dispatch(resetUser())
          removeToken()
          resolve(data)
        } else {
          const msg = data.message
          reject(msg)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
