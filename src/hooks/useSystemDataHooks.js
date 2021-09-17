import {
  changeCurrentPageAction,
  changePageSizeAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import { message, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

/**
 *
 * @param {*} reqFn 请求的方法
 * @param {*} searchData 搜索的数据
 * @returns
 */
export default function ({ getListApi, searchData }) {
  const [formDialogVisible, setFormDialogVisible] = useState(false) // 显示/隐藏
  const [dialogStatus, setDialogStatus] = useState('')
  const [dialogTitle, setDialogTitle] = useState('') // 标题
  const [formData, setFormData] = useState({}) // form表单数据
  const [multipleSelection, setMultipleSelection] = useState([]) // 复选框数据
  const [dictCreateType, setDictCreateType] = useState(null) // 字典新增时的类型

  const dispatch = useDispatch()

  // 选中数据id组成的数组，传递给后端
  // const selectIds = computed(() => {
  //   return multipleSelection.value.map((item) => item.id)
  // })

  /**
   * 切换每页显示条数
   * @param {*} pageSize
   */
  const handleSizeChange = (pageSize) => {
    dispatch(changePageSizeAction(pageSize))
    dispatch(getTableListAction(getListApi))
  }

  /**
   * 选择页码
   * @param {*} currentPage
   */
  const handleCurrentChange = (currentPage) => {
    dispatch(changeCurrentPageAction(currentPage))
    dispatch(getTableListAction(getListApi))
  }

  // 新增
  const handleCreate = (type, defaultFormData) => {
    setDictCreateType(type)
    setFormDialogVisible(true)
    setDialogStatus('create')
    setDialogTitle('新增')
    setFormData({id: null})
  }

  // 编辑
  const handleEdit = (row) => {
    setFormData(JSON.parse(JSON.stringify(row)))
    setFormDialogVisible(true)
    setDialogStatus('edit')
    setDialogTitle('编辑')
  }

  // 取消新增/编辑 -- 隐藏dialog
  const handleCancel = () => {
    setFormDialogVisible(false)
  }

  // 查看详情
  const handleDetails = (row) => {
    setFormData(JSON.parse(JSON.stringify(row)))
    setFormDialogVisible(true)
    setDialogStatus('details')
    setDialogTitle('查看')
  }

  // 表格复选框赋值
  const handleSelectionChange = (val) => {
    setMultipleSelection(val)
  }

  /**
   * 处理启用、停用、删除、清空等操作
   * @param {*} operation 操作名
   * @param {*} reqFn 请求方法名
   * @param {*} data 传递给后端的数据
   * @param {*} success 成功后执行的方法，默认为getTableList
   * @param {*} single 是否操作的单条数据，默认为false
   */
  const multipleSelectionHandler = ({
    operation,
    reqFn,
    data,
    success,
    single = false,
  }) => {
    if (multipleSelection === 0 && !single) {
      message.warning('请先选中数据')
    } else {
      Modal.confirm({
        title: `是否对选中数据执行${operation}操作`,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          reqFn(data).then((res) => {
            message.success(`${operation}成功`)
            ;(success && success()) || dispatch(getTableListAction(getListApi))
          })
        },
        onCancel() {
          message.info('取消操作')
        },
      })
    }
  }

  /**
   * 根据传递的value过滤本地constants数据
   * @param {*} param 需要过滤的参数
   * @param {*} arr 需要比对的数组
   * @returns 过滤后的数据
   */
  const filterConstants = (param, arr) => {
    const res = arr.find((item) => item.value === param)
    return res.label
  }

  /**
   * 根据传递的value过滤字典数据
   * @param {*} param 需要过滤的参数
   * @param {*} arr 需要比对的数组
   * @returns 过滤后的数据
   */
  const filterDict = (param, arr) => {
    const res = arr && arr.find((item) => item.code === param)
    return res && res.name
  }

  return {
    dataHooks: {
      formDialogVisible,
      dialogStatus,
      dialogTitle,
      formData,
      setFormDialogVisible,
      dictCreateType,
    },
    handleSizeChange,
    handleCurrentChange,
    handleCreate,
    handleEdit,
    handleDetails,
    handleSelectionChange,
    multipleSelectionHandler,
    // selectIds,
    filterConstants,
    filterDict,
    handleCancel,
  }
}
