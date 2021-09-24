/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:29:56
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 11:06:53
 * 历史数据
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal, Button, Table, message } from 'antd'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import {
  deleteTeamData,
  getTeamData,
  updateTeamData,
} from '@/api/data-management/team'
import HistoryForm from './HistoryForm'

const { Column } = Table

const HistoryTable = (props) => {
  let { visible, onCancel, team_id } = props
  const [tableData, setTableData] = useState([])

  const {
    multipleSelectionHandler,
    handleCreate,
    handleEdit,
    dataHooks,
    handleCancel,
  } = useSystemDataHooks({
    getListApi: getTeamData,
  })

  // 获取指定球员历史数据列表
  const getTeamList = useCallback(() => {
    getTeamData({ id: team_id }).then((res) => {
      setTableData(res.data.records)
    })
  }, [team_id])

  useEffect(() => {
    if (visible) {
      getTeamList()
    }
  }, [getTeamList, visible])

  const handleOk = (form) => {
    form.validateFields().then((values) => {
      const id = dataHooks.formData.id
      updateTeamData({
        ...values,
        time: values.historyTime,
        team_id: team_id,
        id,
      })
        .then((res) => {
          handleCancel()
          message.success(res.message)
          getTeamList()
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

  return (
    <Modal
      forceRender
      width={1400}
      title="历史数据"
      visible={visible}
      footer={[
        <Button key="back" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <div className="opera-container">
        <Button type="primary" onClick={(e) => handleCreate()}>
          新增
        </Button>
      </div>
      <Table
        className="table"
        size="small"
        rowKey={(record) => record.id}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 2000 }}
      >
        <Column title="时间" dataIndex="time" key="time" align="center" />
        <Column
          title="联赛排名"
          dataIndex="ranking"
          key="ranking"
          align="center"
        />
        <Column
          title="积分"
          dataIndex="integral"
          key="integral"
          align="center"
        />
        <Column title="胜" dataIndex="win" key="win" align="center" />
        <Column title="平局" dataIndex="deuce" key="deuce" align="center" />
        <Column title="负" dataIndex="lose" key="lose" align="center" />
        <Column title="进球" dataIndex="goal" key="goal" align="center" />
        <Column title="失球" dataIndex="fumble" key="fumble" align="center" />
        <Column
          title="点球"
          dataIndex="penalty_kick"
          key="penalty_kick"
          align="center"
        />
        <Column
          title="场均射门"
          dataIndex="averaging_shot"
          key="averaging_shot"
          align="center"
        />
        <Column
          title="场均射正"
          dataIndex="averaging_respectively"
          key="averaging_respectively"
          align="center"
        />
        <Column
          title="场均传球"
          dataIndex="averaging_pass"
          key="averaging_pass"
          align="center"
        />
        <Column
          title="传球成功率"
          dataIndex="pass_success"
          key="pass_success"
          align="center"
        />
        <Column
          title="关键传球"
          dataIndex="key_pass"
          key="key_pass"
          align="center"
        />
        <Column title="抢断" dataIndex="steal" key="steal" align="center" />
        <Column
          title="拦截"
          dataIndex="intercept"
          key="intercept"
          align="center"
        />
        <Column
          title="解围"
          dataIndex="clearance"
          key="clearance"
          align="center"
        />
        <Column title="犯规" dataIndex="foul" key="foul" align="center" />
        <Column
          title="黄牌"
          dataIndex="yellow_card"
          key="yellow_card"
          align="center"
        />
        <Column
          title="红牌"
          dataIndex="red_card"
          key="red_card"
          align="center"
        />
        <Column
          title="操作"
          key="action"
          width={120}
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
                    reqFn: deleteTeamData,
                    data: {
                      id: String(row.id).split(' '),
                    },
                    single: true,
                    success: getTeamList,
                  })
                }
              >
                删除
              </Button>
            </span>
          )}
        />
      </Table>
      <HistoryForm
        formData={dataHooks.formData}
        visible={dataHooks.formDialogVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Modal>
  )
}

export default memo(HistoryTable)
