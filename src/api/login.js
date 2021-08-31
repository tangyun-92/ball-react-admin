import request from '@/utils/request'

export function reqLogin(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/users/logout',
    method: 'post',
    data
  })
}