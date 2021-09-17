/*
 * @Author: 唐云
 * @Date: 2021-08-26 14:32:55
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-16 17:10:01
 * 字典管理
 */
import React, { memo, useEffect, useState } from 'react'
import { Table, Button, Divider, message } from 'antd'
import EditForm from './components/editForm'
import './index.less'
import { getDict, createOrEditDict, delDict } from '@/api/system/dict'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getTableListAction } from '@/store/common/actionCreators'

const { Column } = Table

const Dict = (props) => {
  // 表单默认值
  const defaultFormData = {
    id: null,
    if_parent: '',
    parent_code: '',
    name: '',
    code: '',
    remark: '',
    sort: '',
  }
  /**
   * state and props
   */
  // 字典类型
  const [dictTypeData, setDictTypeData] = useState([])
  // 字典属性
  const [dictNatureData, setDictNatureData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 字典类型的码表代码
  const [dictTypeCode, setDictTypeCode] = useState('')

  const { tableData, tableLoading } = useSelector(
    (state) => ({
      tableData: state.common.get('tableData'),
      tableLoading: state.common.get('tableLoading'),
    }),
    shallowEqual
  )

  /**
   * hooks
   */
  const dispatch = useDispatch()
  useEffect(() => {
    // 获取字典列表
    dispatch(getTableListAction(getDict))
  }, [dispatch])

  useEffect(() => {
    // 用于删除字典类型时，同步清空字典属性列表
    setDictNatureData([])
    // 将tableData赋值给字典类型列表
    setDictTypeData(tableData)

    // 将字典类型下对应的children赋值给字典属性列表
    dictTypeCode &&
      dictTypeData.forEach((item) => {
        if (dictTypeCode === item.code) {
          setDictNatureData(item.children)
        }
      })
  }, [dictTypeCode, dictTypeData, tableData])

  const {
    dataHooks,
    handleEdit,
    handleCreate,
    hideDialog,
    handleCancel,
    multipleSelectionHandler,
  } = useSystemDataHooks({
    getListApi: getDict,
    searchData: '',
    defaultFormData,
  })

  /**
   * 新增/编辑提交
   */
  const handleOk = (form) => {
    form
      .validateFields()
      .then((values) => {
        const formData = dataHooks.formData // 点击行数据
        const createType = dataHooks.dictCreateType // 新增类型
        console.log(createType)
        if (formData.id) {
          values.id = formData.id
          values.parent_code = formData.parent_code
          values.if_parent = formData.if_parent
        }
        // 字典类型新增
        if (createType === 'dictType') {
          values.parent_code = '0'
          values.if_parent = '1'
        } else if (createType === 'dictNature') {
          // 字典属性新增
          values.parent_code = dictTypeCode
          values.if_parent = '0'
        }
        createOrEditDict(values)
          .then((res) => {
            form.resetFields()
            handleCancel()
            message.success(res.message)
            dispatch(getTableListAction(getDict))
          })
          .catch((e) => {
            console.log(e)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /**
   * 行点击事件
   * @param {Object} record 点击行数据
   */
  const selectRow = (record) => {
    setDictNatureData(record.children)
    setDictTypeCode(record.code)
    const selectedRowKeys = []
    selectedRowKeys.push(record.id)
    setSelectedRowKeys(selectedRowKeys)
  }

  /**
   * 单选按钮点击事件
   * @param {Array} selectedRowKeys key值
   * @param {Array} records 点击行数据
   */
  const onSelectedRowKeysChange = (selectedRowKeys, records) => {
    setDictNatureData(records[0].children)
    setDictTypeCode(records[0].code)
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (key, records) => onSelectedRowKeysChange(key, records),
  }

  return (
    <div className="container">
      <div className="dict-main">
        <div className="table-container">
          <div className="opera-container">
            <Button
              type="primary"
              onClick={(e) => handleCreate(defaultFormData, 'dictType')}
            >
              新增
            </Button>
          </div>
          <Table
            size="small"
            rowKey={(record) => record.id}
            dataSource={dictTypeData}
            loading={tableLoading}
            pagination={false}
            childrenColumnName="a"
            rowSelection={rowSelection}
            onRow={(record) => {
              return {
                onClick: (e) => selectRow(record),
              }
            }}
          >
            <Column
              title="字典类型"
              dataIndex="name"
              key="name"
              align="center"
            />
            <Column
              title="类型代码"
              dataIndex="code"
              key="code"
              align="center"
            />
            <Column
              title="备注"
              dataIndex="remark"
              key="remark"
              align="center"
            />
            <Column
              title="操作"
              key="action"
              width={170}
              align="center"
              render={(text, row) => (
                <span>
                  <Button type="link" onClick={(e) => handleEdit(row)}>
                    编辑
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    type="link"
                    onClick={(e) =>
                      multipleSelectionHandler({
                        operation: '删除',
                        reqFn: delDict,
                        data: {
                          id: String(row.id).split(' '),
                          code: row.code,
                        },
                        single: true,
                      })
                    }
                  >
                    删除
                  </Button>
                </span>
              )}
            />
          </Table>
        </div>
        <div className="table-container">
          <div className="opera-container">
            <Button
              type="primary"
              onClick={(e) => handleCreate(defaultFormData, 'dictNature')}
              disabled={dictTypeCode ? false : true}
            >
              新增
            </Button>
          </div>
          <Table
            size="small"
            rowKey={(record) => record.id}
            dataSource={dictNatureData}
            loading={tableLoading}
            pagination={false}
          >
            <Column
              title="字典属性"
              dataIndex="name"
              key="name"
              align="center"
            />
            <Column title="Key值" dataIndex="code" key="code" align="center" />
            <Column
              title="备注"
              dataIndex="remark"
              key="remark"
              align="center"
            />
            <Column
              title="操作"
              key="action"
              width={170}
              align="center"
              render={(text, row) => (
                <span>
                  <Button type="link" onClick={(e) => handleEdit(row)}>
                    编辑
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    type="link"
                    onClick={(e) =>
                      multipleSelectionHandler({
                        operation: '删除',
                        reqFn: delDict,
                        data: {
                          id: String(row.id).split(' '),
                          code: row.code,
                        },
                        single: true,
                      })
                    }
                  >
                    删除
                  </Button>
                </span>
              )}
            />
          </Table>
        </div>
      </div>
      <br />
      <EditForm
        formData={dataHooks.formData}
        visible={dataHooks.formDialogVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        hideDialog={hideDialog}
      />
    </div>
  )
}

export default (memo(Dict))
