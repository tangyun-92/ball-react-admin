import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'

import rootReducer from './reducer'

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  whitelist: ['user'],
  // stateReconciler: autoMergeLevel1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// 使chrome中的react-devtools调试工具显示调试代码
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)

// const store = createStore(reducer, applyMiddleware(reduxThunk));

export default store