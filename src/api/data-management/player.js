/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 15:56:08
 * 球员信息
 */
import request from '@/utils/request'

/**
 * 获取球员列表
 * @param {*} data
 * @returns
 */
export function getPlayer(data) {
  return request({
    url: '/players/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新球员
 * @param {*} data
 * @returns
 */
export function createOrEditPlayer(data) {
  return request({
    url: '/players/update',
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
    url: '/players/upload',
    method: 'post',
    data
  })
}

/**
 * 删除球员
 * @param {*} data
 * @returns
 */
export function delPlayer(data) {
  return request({
    url: '/players/delete',
    method: 'post',
    data
  })
}

/**
 * 获取球员能力值
 * @param {*} data
 * @returns
 */
export function getPlayerAbility(data) {
  return request({
    url: '/players/findAbility',
    method: 'post',
    data
  })
}

/**
 * 更新球员能力值
 * @param {*} data
 * @returns
 */
export function updatePlayerAbility(data) {
  return request({
    url: '/players/updateAbility',
    method: 'post',
    data
  })
}

/**
 * 获取球员位置
 * @param {*} data
 * @returns
 */
export function getPlayerPosition(data) {
  return request({
    url: '/players/findPosition',
    method: 'post',
    data
  })
}

/**
 * 更新球员位置
 * @param {*} data
 * @returns
 */
export function updatePlayerPosition(data) {
  return request({
    url: '/players/updatePosition',
    method: 'post',
    data
  })
}

/**
 * 获取球员历史数据
 * @param {*} data
 * @returns
 */
export function getPlayerData(data) {
  return request({
    url: '/players/findPlayerData',
    method: 'post',
    data
  })
}
/**
 * 更新球员历史数据
 * @param {*} data
 * @returns
 */
export function updatePlayerData(data) {
  return request({
    url: '/players/updatePlayerData',
    method: 'post',
    data
  })
}
/**
 * 删除球员历史数据
 * @param {*} data
 * @returns
 */
export function deletePlayerData(data) {
  return request({
    url: '/players/deletePlayerData',
    method: 'post',
    data
  })
}

/**
 * 获取球员荣誉记录
 * @param {*} data
 * @returns
 */
export function getPlayerHonor(data) {
  return request({
    url: '/players/findPlayerHonor',
    method: 'post',
    data
  })
}
/**
 * 更新球员荣誉记录
 * @param {*} data
 * @returns
 */
export function updatePlayerHonor(data) {
  return request({
    url: '/players/updatePlayerHonor',
    method: 'post',
    data,
  })
}
/**
 * 删除球员荣誉记录
 * @param {*} data
 * @returns
 */
export function deletePlayerHonor(data) {
  return request({
    url: '/players/deletePlayerHonor',
    method: 'post',
    data,
  })
}

/**
 * 获取球员转会记录
 * @param {*} data
 * @returns
 */
export function getPlayerTransfer(data) {
  return request({
    url: '/players/findPlayerTransfer',
    method: 'post',
    data
  })
}
/**
 * 更新球员转会记录
 * @param {*} data
 * @returns
 */
export function updatePlayerTransfer(data) {
  return request({
    url: '/players/updatePlayerTransfer',
    method: 'post',
    data,
  })
}
/**
 * 删除球员转会记录
 * @param {*} data
 * @returns
 */
export function deletePlayerTransfer(data) {
  return request({
    url: '/players/deletePlayerTransfer',
    method: 'post',
    data,
  })
}

/**
 * 获取球员伤病记录
 * @param {*} data
 * @returns
 */
export function getPlayerInjury(data) {
  return request({
    url: '/players/findPlayerInjury',
    method: 'post',
    data
  })
}
/**
 * 更新球员伤病记录
 * @param {*} data
 * @returns
 */
export function updatePlayerInjury(data) {
  return request({
    url: '/players/updatePlayerInjury',
    method: 'post',
    data,
  })
}
/**
 * 删除球员伤病记录
 * @param {*} data
 * @returns
 */
export function deletePlayerInjury(data) {
  return request({
    url: '/players/deletePlayerInjury',
    method: 'post',
    data,
  })
}