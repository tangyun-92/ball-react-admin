// import { Map } from 'immutable'
import produce from 'immer'

import * as actionTypes from './constants'

const defaultState = {
  username: '', // 用户名,
  role: 'admin', // 角色
  token: '', // token
  loginStatus: false, // 登录状态
  roles: ['admin', 'root', 'guest'], // 登录状态
}

function reducer(state = defaultState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.CHANGE_RESET_USER:
        return void defaultState
      case actionTypes.CHANGE_USERNAME:
        return void (draft.username = action.data)
      // return state.set('username', action.username)
      case actionTypes.CHANGE_TOKEN:
        return void (draft.token = action.data)
      // return state.set('token', action.token)
      case actionTypes.CHANGE_LOGIN_STATUS:
        return void (draft.loginStatus = action.loginStatus)
      // return state.set('loginStatus', action.loginStatus)
      case actionTypes.CHANGE_Roles:
        return void (draft.roles = action.roles)
      // return state.set('data', action.roles)
      default:
        return state
    }
  })
}


export default reducer
