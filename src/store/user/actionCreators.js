import { message } from 'antd'

import * as actionTypes from './constants'
import { reqLogin } from '@/api/login'

// 清空保存的用户信息
export const changeResetUserAction = () => ({
  type: actionTypes.CHANGE_RESET_USER,
})

// 用户名
export const changeUsernameAction = (username) => ({
  type: actionTypes.CHANGE_USERNAME,
  data: username,
})

// token
export const changeTokenAction = (token) => ({
  type: actionTypes.CHANGE_TOKEN,
  data: token,
})

// 登录状态
export const changeLoginStatusAction = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  loginStatus,
})

// 登录
export const getLoginAction = (data) => {
  return (dispatch) => {
    reqLogin(data).then((res) => {
      message.success('登录成功')
      // 保存用户名
      dispatch(changeUsernameAction(res.data.username))
      dispatch(changeTokenAction(res.data.token))
      // 修改登录状态
      dispatch(changeLoginStatusAction(true))
    })
  }
}
