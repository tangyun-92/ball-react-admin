import { combineReducers } from 'redux'

import { reducer as commonReducer } from './common'
import userReducer from './user/reducer'
import { reducer as settingsReducer } from './settings'
import { reducer as appReducer } from './app'
import { reducer as tagsReducer } from './tagsView'

const cReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  app: appReducer,
  tags: tagsReducer,
  common: commonReducer,
})

export default cReducer
