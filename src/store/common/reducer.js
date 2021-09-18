import produce from 'immer'

import * as actionType from './constants'

const defaultState = {
  importModalStatus: false, // 导入modal状态
  total: 0, // 总计
  currentPage: 1, // 当前选中页
  pageSize: 10, // 每页显示条数
  tableLoading: false, // table加载
  tableData: [], // 表格数据
  searchData: {}, // 搜索数据
  editModalStatus: false, // 编辑modal状态
  otherModalStatus: false, // 其他modal状态
  modalTitle: '', // modal的标题
}

function reducer(state = defaultState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionType.CHANGE_IMPORT_MODAL_STATUS:
        return void (draft.importModalStatus = action.importModalStatus)
      case actionType.CHANGE_TOTAL:
        return void (draft.total = action.total)
      case actionType.CHANGE_CURRENT_PAGE:
        return void (draft.currentPage = action.currentPage)
      case actionType.CHANGE_PAGE_SIZE:
        return void (draft.pageSize = action.pageSize)
      case actionType.CHANGE_TABLE_LOADING:
        return void (draft.tableLoading = action.tableLoading)
      case actionType.CHANGE_TABLE_DATA:
        return void (draft.tableData = action.tableData)
      case actionType.CHANGE_SEARCH_DATA:
        return void (draft.searchData = action.searchData)
      case actionType.CHANGE_EDIT_MODAL_STATUS:
        return void (draft.editModalStatus = action.editModalStatus)
      case actionType.CHANGE_OTHER_MODAL_STATUS:
        return void (draft.otherModalStatus = action.otherModalStatus)
      case actionType.CHANGE_MODAL_TITLE:
        return void (draft.modalTitle = action.modalTitle)
      default:
        return state
    }
  })
}

export default reducer
