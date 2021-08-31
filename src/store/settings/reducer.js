import { Map } from 'immutable'
import * as actionTypes from './constants'
import defaultSettings from '@/defaultSettings'

const { showSettings, sidebarLogo, fixedHeader, tagsView } = defaultSettings

const defaultState = Map({
  showSettings: showSettings,
  sidebarLogo: sidebarLogo,
  fixedHeader: fixedHeader,
  tagsView: tagsView,
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SETTINGS_CHANGE_SETTINGS:
      const {key, value} = action
      if (state.hasOwnProperty(key)) {
        return {
          ...state,
          [key]: value
        }
      }
      return state
    default:
      return state
  }
}

export default reducer
