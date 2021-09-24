/*
 * @Author: 唐云
 * @Date: 2021-09-24 09:25:04
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 11:09:44
 * 球队管理
 */
import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeSearchDataAction,
  getTableListAction,
} from '@/store/common/actionCreators'
import SearchForm from './components/SearchForm'
import { Button, Table, Pagination, message } from 'antd'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import { useSelector } from 'react-redux'
import { shallowEqual } from 'react-redux'
import { createOrEditTeam, delTeam, getTeam } from '@/api/data-management/team'
import EditForm from './components/EditForm'
import HistoryTable from './history-data/HistoryTable'

const { Column } = Table

const TeamManagement = () => {
  const [teamId, setTeamId] = useState(null) // 球队id

  const { tableLoading, currentPage, total, tableData } = useSelector(
    (state) => ({
      tableLoading: state.common.tableLoading,
      currentPage: state.common.currentPage,
      total: state.common.total,
      tableData: state.common.tableData,
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  useEffect(() => {
    // 获取球员列表
    dispatch(getTableListAction(getTeam))
  }, [dispatch])

  const {
    dataHooks,
    handleEdit,
    handleCreate,
    handleCancel,
    handleSizeChange,
    handleCurrentChange,
    multipleSelectionHandler,
  } = useSystemDataHooks({
    getListApi: getTeam,
  })

  // 新增/编辑提交
  const handleOk = (form) => {
    form.validateFields().then((values) => {
      let team_logo = ''
      if (typeof values.team_logo === 'object') {
        team_logo = values.team_logo[0].response.url
      } else {
        team_logo = values.team_logo
      }
      const data = {
        ...values,
        team_logo,
        english_name: values.editEnglish,
        name: values.editName,
      }
      const formData = dataHooks.formData
      if (formData.id) {
        data.id = formData.id
      }
      createOrEditTeam(data)
        .then((res) => {
          handleCancel()
          message.success(res.message)
          dispatch(getTableListAction(getTeam))
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

  /**
   * 历史数据
   */
  const [historyVisible, setHistoryVisible] = useState(false)
  // 显示弹窗
  const handleEditHistory = (row) => {
    setHistoryVisible(true)
    setTeamId(row.id)
  }

  /**
   * 搜索
   */
  const onSearchFinish = (form) => {
    form.validateFields().then((values) => {
      dispatch(changeSearchDataAction(values))
      dispatch(getTableListAction(getTeam))
    })
  }

  return (
    <div className="container">
      <div className="search-container">
        <SearchForm onFinish={onSearchFinish} />
      </div>
      <div className="opera-container">
        <Button type="primary" onClick={(e) => handleCreate('dictType')}>
          新增
        </Button>
      </div>
      <Table
        className="table"
        size="small"
        rowKey={(record) => record.id}
        dataSource={tableData}
        loading={tableLoading}
        pagination={false}
        scroll={{ x: 2200 }}
      >
        <Column title="球队名称" dataIndex="name" key="name" align="center" />
        <Column
          title="英文名"
          dataIndex="english_name"
          key="english_name"
          align="english_name"
        />
        <Column
          title="成立时间"
          dataIndex="setup_time"
          key="setup_time"
          align="center"
        />
        <Column title="所在地区" dataIndex="area" key="area" align="center" />
        <Column title="城市" dataIndex="city" key="city" align="center" />
        <Column
          title="球队主场"
          dataIndex="home_court"
          key="home_court"
          align="center"
        />
        <Column
          title="容纳人数"
          dataIndex="person_num"
          key="person_num"
          align="center"
        />
        <Column title="电话" dataIndex="tel" key="tel" align="center" />
        <Column title="邮箱" dataIndex="email" key="email" align="center" />
        <Column title="地址" dataIndex="address" key="address" align="center" />
        <Column
          title="世界排名"
          dataIndex="world_ranking"
          key="world_ranking"
          align="center"
        />
        <Column
          title="总身价"
          dataIndex="total_value"
          key="total_value"
          align="center"
        />
        <Column
          title="队徽"
          dataIndex="team_logo"
          key="team_logo"
          align="center"
          render={(url) => {
            return url ? (
              <img src={url} alt="" style={{ width: 40, height: 40 }} />
            ) : (
              ''
            )
          }}
        />
        <Column
          title="操作"
          key="action"
          width={300}
          align="center"
          fixed="right"
          render={(text, row) => (
            <span>
              <Button type="link" onClick={(e) => handleEdit(row)}>
                编辑
              </Button>
              <Button
                type="link"
                onClick={(e) =>
                  multipleSelectionHandler({
                    operation: '删除',
                    reqFn: delTeam,
                    data: {
                      id: String(row.id).split(' '),
                    },
                    single: true,
                  })
                }
              >
                删除
              </Button>
              <Button type="link" onClick={(e) => handleEditHistory(row)}>
                历史数据
              </Button>
            </span>
          )}
        />
      </Table>
      <Pagination
        total={total}
        pageSizeOptions={['10', '20', '50', '100']}
        showTotal={(total) => `共${total}条数据`}
        onChange={handleSizeChange}
        current={currentPage}
        onShowSizeChange={handleCurrentChange}
        showSizeChanger
        showQuickJumper
        hideOnSinglePage={false}
      />
      <EditForm
        formData={dataHooks.formData}
        visible={dataHooks.formDialogVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
      <HistoryTable
        visible={historyVisible}
        onCancel={(e) => setHistoryVisible(false)}
        team_id={teamId}
      />
    </div>
  )
}

export default memo(TeamManagement)
