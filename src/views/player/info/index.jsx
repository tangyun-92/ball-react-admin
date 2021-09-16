/*
 * @Author: 唐云
 * @Date: 2021-08-26 14:32:55
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-16 16:33:48
 * 球员信息
 */
import React, { Component } from 'react'
import { Table, Button, Pagination, Divider, message, Modal, Rate } from 'antd'
import EditForm from './components/editForm'
import SearchForm from './components/searchForm'
import './index.less'
import { getPlayer, createOrEditPlayer, delPlayer } from '@/api/player/info'
import { getTeam, getNation } from '@/api/public'
// import systemDataHOC from '../../../HOC/systemDataHOC'
import { filterDict } from '@/utils'
import moment from 'moment'

const { Column } = Table

class PlayerInfo extends Component {
  // 这个变量是用来标志当前组件是否挂载
  _isMounted = false

  state = {
    // 字典类型
    dictTypeData: [],
    // 字典属性
    dictNatureData: [],
    currentRadioIndex: null,
    selectedRowKeys: [],
    // 字典类型的码表代码
    dictTypeCode: '',
    searchData: {},
    // 球队列表
    teamList: [],
    // 国家列表
    nationList: [],
  }

  UNSAFE_componentDidMount() {
    this._isMounted = true
    this.props.getTableList(getPlayer, this.state.searchData)
    this.getTeamList()
    this.getNationList()
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  /**
   * 获取球队列表
   */
  getTeamList = () => {
    getTeam().then((res) => {
      this.setState({ teamList: res.data.records })
    })
  }

  /**
   * 获取国家列表
   */
  getNationList = () => {
    getNation().then((res) => {
      this.setState({ nationList: res.data.records })
    })
  }

  /**
   * 新增/编辑提交
   */
  handleOk = () => {
    const { dataHOC, getTableList } = this.props
    const { form } = dataHOC.formRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const currentRowData = dataHOC.currentRowData // 点击行数据
      const createType = dataHOC.createType // 新增类型
      const values = {
        ...fieldsValue,
        contract_expire: moment(fieldsValue.contract_expire).format(
          'YYYY-MM-DD'
        ),
        birthday: moment(fieldsValue.birthday).format('YYYY-MM-DD'),
        technical_feature: fieldsValue.technical_feature || [],
        strong_point: fieldsValue.strong_point || [],
        weak_point: fieldsValue.weak_point || [],
      }
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
      createOrEditPlayer(values)
        .then((res) => {
          form.resetFields()
          dataHOC.editModalVisible = false
          dataHOC.editModalLoading = false
          message.success(res.message)
          console.log(this.state.searchData)
          getTableList(getPlayer, this.state.searchData)
        })
        .catch((e) => {
          dataHOC.editModalLoading = false
          console.log(e)
        })
    })
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
  onSubmit = () => {
    const { form } = this.searchRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      this.props.getTableList(getPlayer, values)
    })
  }

  render() {
    const {
      dataHOC,
      handleCreate,
      handleCancel,
      handleEdit,
      changePage,
      changePageSize,
      multipleSelectionHandler,
    } = this.props
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (key, records) => this.onSelectedRowKeysChange(key, records),
    }

    return (
      <div className="container">
        <div className="search-container">
          <SearchForm
            searchData={this.state.searchData}
            wrappedComponentRef={(searchRef) => (this.searchRef = searchRef)}
            onSubmit={this.onSubmit}
          />
        </div>
        <div className="opera-container">
          <Button type="primary" onClick={(e) => handleCreate('dictType')}>
            新增
          </Button>
        </div>
        <Table
          size="small"
          rowKey={(record) => record.id}
          dataSource={dataHOC.tableData}
          loading={this.state.loading}
          pagination={false}
          scroll={{ x: 2000 }}
          rowSelection={rowSelection}
        >
          <Column title="姓名" dataIndex="name" key="name" align="center" />
          <Column
            title="英文名"
            dataIndex="english_name"
            key="english_name"
            align="english_name"
          />
          <Column title="所属球队" dataIndex="team" key="team" align="center" />
          <Column title="国籍" dataIndex="nation" key="nation" align="center" />
          <Column
            title="球衣号码"
            dataIndex="uniform_number"
            key="uniform_number"
            align="center"
          />
          <Column
            title="身高"
            dataIndex="high"
            key="high"
            align="center"
            render={(high) => {
              return <span>{high ? `${high}cm` : ''}</span>
            }}
          />
          <Column
            title="体重"
            dataIndex="weight"
            key="weight"
            align="center"
            render={(weight) => {
              return <span>{weight ? `${weight}kg` : ''}</span>
            }}
          />
          <Column
            title="生日"
            dataIndex="birthday"
            key="birthday"
            align="center"
          />
          <Column
            title="位置"
            dataIndex="position"
            key="position"
            align="center"
            render={(position) => {
              return <span>{filterDict('wz', position)}</span>
            }}
          />
          <Column
            title="惯用脚"
            dataIndex="feet"
            key="feet"
            align="center"
            render={(feet) => {
              return <span>{filterDict('gyj', feet)}</span>
            }}
          />
          <Column
            title="逆足能力"
            dataIndex="inverse_enough"
            key="inverse_enough"
            align="center"
            render={(inverse_enough) => {
              return <Rate defaultValue={Number(inverse_enough)} disabled />
            }}
          />
          <Column
            title="花式技巧"
            dataIndex="fancy_tricks"
            key="fancy_tricks"
            align="center"
            render={(fancy_tricks) => {
              return <Rate defaultValue={Number(fancy_tricks)} disabled />
            }}
          />
          <Column
            title="国际声望"
            dataIndex="international_reputation"
            key="international_reputation"
            align="center"
            render={(international_reputation) => {
              return (
                <Rate
                  defaultValue={Number(international_reputation)}
                  disabled
                />
              )
            }}
          />
          <Column
            title="身价"
            dataIndex="price"
            key="price"
            align="center"
            render={(price) => {
              return <span>{price ? `${price}万欧` : ''}</span>
            }}
          />
          <Column
            title="合同到期"
            dataIndex="contract_expire"
            key="contract_expire"
            align="center"
          />
          <Column
            title="操作"
            key="action"
            width={170}
            align="center"
            fixed="right"
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
                      reqFn: delPlayer,
                      data: {
                        id: String(row.id).split(' '),
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
        <Pagination
          total={dataHOC.total}
          pageSizeOptions={['10', '20', '40']}
          showTotal={(total) => `共${total}条数据`}
          onChange={changePage}
          current={dataHOC.pageData.currentPage}
          onShowSizeChange={changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={false}
        />
        <br />
        <EditForm
          currentRowData={dataHOC.currentRowData}
          teamList={this.state.teamList}
          nationList={this.state.nationList}
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

export default PlayerInfo
