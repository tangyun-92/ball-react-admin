import confirm from 'antd/lib/modal/confirm'
import { message } from 'antd'

import * as actionTypes from './constants'

// 导入modal显示隐藏
export const changeImportModalStatusAction = (importModalStatus) => ({
  type: actionTypes.CHANGE_IMPORT_MODAL_STATUS,
  importModalStatus,
})

// 总计
export const changeTotalAction = (total) => ({
  type: actionTypes.CHANGE_TOTAL,
  total,
})

// 当前页
export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage,
})

// 每页显示条数
export const changePageSizeAction = (pageSize) => ({
  type: actionTypes.CHANGE_PAGE_SIZE,
  pageSize,
})

// table加载
export const changeTableLoadingAction = (tableLoading) => ({
  type: actionTypes.CHANGE_TABLE_LOADING,
  tableLoading,
})

// 表格数据
export const changeTableDataAction = (tableData) => ({
  type: actionTypes.CHANGE_TABLE_DATA,
  tableData,
})

// 搜索数据
export const changeSearchDataAction = (searchData) => ({
  type: actionTypes.CHANGE_SEARCH_DATA,
  searchData,
})

// 编辑modal显示隐藏
export const changeEditModalStatusAction = (editModalStatus) => ({
  type: actionTypes.CHANGE_EDIT_MODAL_STATUS,
  editModalStatus,
})

// 其他modal显示隐藏
export const changeOtherModalStatusAction = (otherModalStatus) => ({
  type: actionTypes.CHANGE_OTHER_MODAL_STATUS,
  otherModalStatus,
})

// modal标题
export const changeModalTitleAction = (modalTitle) => ({
  type: actionTypes.CHANGE_MODAL_TITLE,
  modalTitle,
})

/**
 * 获取列表
 * @param {*} getTableListApi 获取列表的api
 */
export const getTableListAction = (getListApi) => {
  return (dispatch, getState) => {
    dispatch(changeTableLoadingAction(true))
    const searchData = getState().common.searchData
    const currentPage = getState().common.currentPage
    const pageSize = getState().common.pageSize
    getListApi({
      ...searchData,
      currentPage,
      pageSize,
    })
      .then((res) => {
        dispatch(changeTableDataAction(res.data.records))
        dispatch(changeTotalAction(res.data.total))
        dispatch(changeCurrentPageAction(res.data.current))
      })
      .catch((err) => {
        dispatch(changeTableDataAction([]))
        dispatch(changeTotalAction(0))
        dispatch(changeCurrentPageAction(1))
      })
      .finally(() => {
        dispatch(changeTableLoadingAction(false))
      })
  }
}

/**
 * 清空/删除
 * @param {*} clearAllApi 清空或删除的api
 * @param {*} getTableListApi 获取列表的api
 * @param {*} type 清空/删除
 * @param {*} data 需要传的值
 */
export const getClearAllAction = (clearAllApi, getTableListApi, type, data) => {
  return (dispatch) => {
    confirm({
      title: `是否确定${type}？`,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        clearAllApi(data)
          .then((res) => {
            message.success(res.message)
            dispatch(getTableListAction(getTableListApi))
          })
          .catch((err) => {
            console.error(err)
          })
      },
      onCancel() {
        console.log('cancel')
      },
    })
  }
}
