import { getDict } from '@/api/system/dict'

import * as actionTypes from './constants'

// 改变字典列表
export const changeDictList = (data) => ({
  type: actionTypes.CHANGE_DICT_LIST,
  data
})

// 获取字典列表
export const getDictListAction = () => {
  return (dispatch) => {
    getDict().then((res) => {
      if (res.result) {
        dispatch(changeDictList(res.data.records))
      }
    })
  }
}
