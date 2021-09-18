import store from '@/store'

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
// 根据某个属性值从MenuList查找拥有该属性值的menuItem
export function getMenuItemInMenuListByProperty(menuList, key, value) {
  let stack = []
  stack = stack.concat(menuList)
  let res
  while (stack.length) {
    let cur = stack.shift()
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack)
    }
    if (value === cur[key]) {
      res = cur
    }
  }
  return res
}

/**
 * 
 * @param {String} code 对应码表的code
 * @param {String | Number} val 需要被过滤的值
 * @returns val存在，返回码表对应的值，val不存在，返回指定code下的children
 */
export function filterDict(code) {
  const dictList = store.getState().baseData.dictList
  const list = dictList && dictList.find((item) => item.code === code)
  return list && list.children
}

/**
 * 
 * @param {*} code 
 * @param {*} val 
 * @returns 
 */
export function filterDictData(code, val) {
  const dictList = store.getState().baseData.dictList
  const list = dictList && dictList.find((item) => item.code === code)
  const res = list && list.children.find((item) => item.code === val)
  return res && res.name
}