import * as actionTypes from './constants'

export const changeSetting = (data) => {
  return {
    type: actionTypes.SETTINGS_CHANGE_SETTINGS,
    ...data,
  }
}
