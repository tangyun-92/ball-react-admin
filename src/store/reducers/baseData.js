import * as types from '../action-types'

const initBaseData = {
  dictList: [],
}

export default function baseData(state = initBaseData, action) {
  switch (action.type) {
    case types.BASEDATA_SET_DICT_LIST:
      return {
        ...state,
        dictList: action.dictList,
      }
    default:
      return state
  }
}
