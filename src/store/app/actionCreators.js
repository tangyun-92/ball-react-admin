import * as actionTypes from './constants'

export const toggleSiderBar = () => {
  return {
    type: actionTypes.APP_TOGGLE_SIDEBAR,
  }
}

export const toggleSettingPanel = () => {
  return {
    type: actionTypes.APP_TOGGLE_SETTINGPANEL,
  }
}
