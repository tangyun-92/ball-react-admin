import produce from 'immer'
import * as actionTypes from './constants'

const defaultState = {
  sidebarCollapsed: false,
  settingPanelVisible: false,
}

function reducer(state = defaultState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.APP_TOGGLE_SIDEBAR:
        return {
          ...state,
          sidebarCollapsed: !state.sidebarCollapsed,
        }
      case actionTypes.APP_TOGGLE_SETTINGPANEL:
        return {
          ...state,
          settingPanelVisible: !state.settingPanelVisible,
        }
      default:
        return state
    }
  })
}

export default reducer
