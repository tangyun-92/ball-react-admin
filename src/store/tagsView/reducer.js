import { Map } from 'immutable'
import * as actionTypes from './constants'

const defaultState = Map({
  taglist: [],
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.TAGSVIEW_ADD_TAG:
      const tag = action.tag
      if (state.taglist.includes(tag)) {
        return state
      } else {
        return {
          ...state,
          taglist: [...state.taglist, tag],
        }
      }
    case actionTypes.TAGSVIEW_DELETE_TAG:
      return {
        ...state,
        taglist: [...state.taglist.filter((item) => item !== action.tag)],
      }
    case actionTypes.TAGSVIEW_EMPTY_TAGLIST:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter((item) => item.path === '/dashboard'),
        ],
      }
    case actionTypes.TAGSVIEW_CLOSE_OTHER_TAGS:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter(
            (item) => item.path === '/dashboard' || item === action.tag
          ),
        ],
      }
    default:
      return state
  }
}

export default reducer
