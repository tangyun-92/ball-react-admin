import React from 'react'
import axios from 'axios'
import store from '@/store'
import { message } from 'antd'
import { Route } from 'react-router-dom'
import Login from '@/views/login'
import { changeTokenAction } from '@/store/user/actionCreators'

//创建一个axios示例
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api 的 base_url
  timeout: 20000, // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token
    // Do something before request is sent
    if (token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // (response) => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    const res = response.data
    if (!res.result) {
      message.error(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    const { status, data } = error.response
    if (status && status === 401) {
      message.error('token已过期，请重新登录')
      store.dispatch(changeTokenAction(''))
      return <Route path="/login" component={Login} />
    }
    message.error(data.message)
    return Promise.reject(error)
  }
)

export default service
