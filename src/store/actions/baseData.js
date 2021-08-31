import * as types from '../action-types'
import { getDict } from '@/api/system/dict.js'

export const setDictList = (dictList) => {
  return {
    type: types.BASEDATA_SET_DICT_LIST,
    dictList
  }
}

export const getDictList = () => (dispatch) => {
  console.log('222')
  return new Promise((resolve, reject) => {
    getDict().then(res => {
      console.log(res.data.records)
      dispatch(setDictList(res.data.records))
      resolve(res)
    })
  })
}