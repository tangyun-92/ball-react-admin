/*
 * @Author: 唐云 
 * @Date: 2021-08-26 14:27:04 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 16:26:17
 * 奖项管理
 */

import request from '@/utils/request'

/**
 * 获取奖项列表
 * @param {*} data
 * @returns
 */
export function getAward(data) {
  return request({
    url: '/awards/list',
    method: 'post',
    data,
  })
}

/**
 * 创建/更新奖项
 * @param {*} data
 * @returns
 */
export function createOrEditAward(data) {
  return request({
    url: '/awards/update',
    method: 'post',
    data,
  })
}

/**
 * 删除奖项
 * @param {*} data
 * @returns
 */
export function delAward(data) {
  return request({
    url: '/awards/delete',
    method: 'post',
    data,
  })
}
