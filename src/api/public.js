import request from '@/utils/request'

/**
 * 球队列表
 * @param {*} data
 * @returns
 */
export function getTeam(data) {
  return request({
    url: '/public/findTeam',
    method: 'post',
    data,
  })
}

/**
 * 国家列表
 * @param {*} data
 * @returns
 */
export function getNation(data) {
  return request({
    url: '/public/findNation',
    method: 'post',
    data,
  })
}
