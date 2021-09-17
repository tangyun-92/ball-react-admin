// import { Map } from 'immutable'
import produce from 'immer'

import * as actionTypes from './constants'

const defaultState = {
  dictList: '', // 字典列表
}

function reducer(state = defaultState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.CHANGE_DICT_LIST:
        return void (draft.dictList = action.data)
      default:
        return state
    }
  })
}


export default reducer
