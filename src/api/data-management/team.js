/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 10:08:20
 * 球队管理
 */
import request from '@/utils/request'

/**
 * 获取球员列表
 * @param {*} data
 * @returns
 */
export function getTeam(data) {
  return request({
    url: '/teams/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新球员
 * @param {*} data
 * @returns
 */
export function createOrEditTeam(data) {
  return request({
    url: '/teams/update',
    method: 'post',
    data
  })
}

/**
 * 头像上传
 * @param {*} data
 * @returns
 */
export function uploadImage(data) {
  return request({
    url: '/teams/upload',
    method: 'post',
    data
  })
}

/**
 * 删除球员
 * @param {*} data
 * @returns
 */
export function delTeam(data) {
  return request({
    url: '/teams/delete',
    method: 'post',
    data
  })
}

