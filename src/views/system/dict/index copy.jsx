/*
 * @Author: 唐云
 * @Date: 2021-08-26 14:32:55
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-27 17:32:26
 * 字典管理
 */
import React, { Component } from 'react'
import { Table, Button, Divider, message, Modal } from 'antd'
import EditForm from './components/editForm'
import './index.less'
import { getDict, createOrEditDict, delDict } from '@/api/system/dict'
import systemDataHOC from '../../../HOC/systemDataHOC'

const { Column } = Table

class Dict extends Component {
  // 这个变量是用来标志当前组件是否挂载
  _isMounted = false
  state = {
    // 字典类型
    dictTypeData: [],
    // 字典属性
    dictNatureData: [],
    loading: false,
    currentRadioIndex: null,
    selectedRowKeys: [],
    // 字典类型的码表代码
    dictTypeCode: '',
  }

  componentDidMount() {
    this._isMounted = true
    this.getTableList()
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  /**
   * 获取字典列表
   */
  getTableList = () => {
    this.setState({ loading: true })
    getDict()
      .then((res) => {
        if (this._isMounted) {
          this.setState({ dictTypeData: res.data.records })
          this.setState({ dictNatureData: [] })
          const dictTypeCode = this.state.dictTypeCode
          // 新增/编辑字典属性后，依然选中指定字典类型
          dictTypeCode &&
            this.state.dictTypeData.forEach((item) => {
              if (dictTypeCode === item.code) {
                this.setState({ dictNatureData: item.children })
              }
            })
        }
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }
  /**
   * 删除
   * @param {Object} row
   */
  handleDelete = (row) => {
    const _this = this
    Modal.confirm({
      title: '是否确定删除？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        delDict({
          id: String(row.id).split(' '),
          code: row.code,
        }).then((res) => {
          message.success(res.message)
          _this.getTableList()
        })
      },
      onCancel() {
        message.info('取消操作')
      },
    })
  }
  /**
   * 新增/编辑提交
   */
  handleOk = () => {
    const { dataHOC } = this.props
    const { form } = dataHOC.formRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const currentRowData = dataHOC.currentRowData // 点击行数据
      const createType = dataHOC.createType // 新增类型
      const values = { ...fieldsValue }
      if (currentRowData.id) {
        values.id = currentRowData.id
        values.parent_code = currentRowData.parent_code
        values.if_parent = currentRowData.if_parent
      }
      // 字典类型新增
      if (createType === 'dictType') {
        values.parent_code = '0'
        values.if_parent = '1'
      } else if (createType === 'dictNature') {
        // 字典属性新增
        values.parent_code = this.state.dictTypeCode
        values.if_parent = '0'
      }
      dataHOC.editModalLoading = true
      createOrEditDict(values)
        .then((res) => {
          form.resetFields()
          dataHOC.editModalVisible = false
          message.success(res.message)
          this.getTableList()
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          dataHOC.editModalLoading = false
        })
    })
  }
  /**
   * 行点击事件
   * @param {Object} record 点击行数据
   */
  selectRow = (record) => {
    this.setState({
      dictNatureData: record.children,
      dictTypeCode: record.code,
    })
    const selectedRowKeys = []
    selectedRowKeys.push(record.id)
    this.setState({ selectedRowKeys })
  }
  /**
   * 单选按钮点击事件
   * @param {Array} selectedRowKeys key值
   * @param {Array} records 点击行数据
   */
  onSelectedRowKeysChange = (selectedRowKeys, records) => {
    this.setState({
      dictNatureData: records[0].children,
      dictTypeCode: records[0].code,
    })
    this.setState({ selectedRowKeys })
  }

  render() {
    const { dataHOC, handleCreate, handleCancel, handleEdit } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (key, records) => this.onSelectedRowKeysChange(key, records),
    }

    return (
      <div className="container">
        <div className="dict-main">
          <div className="table-container">
            <div className="opera-container">
              <Button
                type="primary"
                onClick={(e) => handleCreate('dictType')}
              >
                新增
              </Button>
            </div>
            {/* 字典类型 */}
            <Table
              size="small"
              rowKey={(record) => record.id}
              dataSource={this.state.dictTypeData}
              loading={this.state.loading}
              pagination={false}
              childrenColumnName=""
              rowSelection={rowSelection}
              onRow={(record) => {
                return {
                  onClick: (e) => this.selectRow(record),
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
                    <Button type="link" onClick={(e) => this.handleDelete(row)}>
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
                onClick={(e) => handleCreate('dictNature')}
                disabled={this.state.dictTypeCode ? false : true}
              >
                新增
              </Button>
            </div>
            {/* 字典属性 */}
            <Table
              size="small"
              rowKey={(record) => record.id}
              dataSource={this.state.dictNatureData}
              loading={this.state.loading}
              pagination={false}
            >
              <Column
                title="字典属性"
                dataIndex="name"
                key="name"
                align="center"
              />
              <Column
                title="Key值"
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
                    <Button type="link" onClick={(e) => this.handleDelete(row)}>
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
          currentRowData={dataHOC.currentRowData}
          wrappedComponentRef={(formRef) => (dataHOC.formRef = formRef)}
          visible={dataHOC.editModalVisible}
          confirmLoading={dataHOC.editModalLoading}
          onCancel={handleCancel}
          onOk={this.handleOk}
        />
      </div>
    )
  }
}

export default systemDataHOC(Dict)
