import { login, logout } from './auth'
import { setUserToken, setUserInfo, resetUser } from './user'
import { toggleSiderBar, toggleSettingPanel } from './app'
import { changeSetting } from './settings'
import { addTag, emptyTaglist, deleteTag, closeOtherTags } from './tagsView'
import { setDictList } from './baseData'

export {
  login,
  logout,
  setUserToken,
  setUserInfo,
  resetUser,
  toggleSiderBar,
  toggleSettingPanel,
  changeSetting,
  addTag,
  emptyTaglist,
  deleteTag,
  closeOtherTags,
  setDictList,
}
