import * as actionTypes from './constants'

export const addTag = (tag) => {
  return {
    type: actionTypes.TAGSVIEW_ADD_TAG,
    tag,
  }
}

export const emptyTaglist = () => {
  return {
    type: actionTypes.TAGSVIEW_EMPTY_TAGLIST,
  }
}

export const deleteTag = (tag) => {
  return {
    type: actionTypes.TAGSVIEW_DELETE_TAG,
    tag,
  }
}

export const closeOtherTags = (tag) => {
  return {
    type: actionTypes.TAGSVIEW_CLOSE_OTHER_TAGS,
    tag,
  }
}
