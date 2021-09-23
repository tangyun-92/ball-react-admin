/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:29:56
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 16:15:51
 * 历史数据
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal, Button, Table, message } from 'antd'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import {
  deletePlayerData,
  getPlayerData,
  updatePlayerData,
} from '@/api/player/info'
import HistoryForm from './HistoryForm'

const { Column } = Table

const HistoryTable = (props) => {
  let { visible, onCancel, player_id } = props
  const [tableData, setTableData] = useState([])

  const {
    multipleSelectionHandler,
    handleCreate,
    handleEdit,
    dataHooks,
    handleCancel,
  } = useSystemDataHooks({
    getListApi: getPlayerData,
  })

  // 获取指定球员历史数据列表
  const getPlayerList = useCallback(() => {
    getPlayerData({ id: player_id }).then((res) => {
      setTableData(res.data.records)
    })
  }, [player_id])

  useEffect(() => {
    if (visible) {
      getPlayerList()
    }
  }, [getPlayerList, visible])

  const handleOk = (form) => {
    form.validateFields().then((values) => {
      const id = dataHooks.formData.id
      updatePlayerData({
        ...values,
        shoot: values.dataShoot,
        player_id: player_id,
        id,
      })
        .then((res) => {
          handleCancel()
          message.success(res.message)
          getPlayerList()
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
          title="出场"
          dataIndex="enter_field"
          key="enter_field"
          align="center"
        />
        <Column title="首发" dataIndex="starter" key="starter" align="center" />
        <Column
          title="场均时间"
          dataIndex="game_time"
          key="game_time"
          align="center"
        />
        <Column title="进球" dataIndex="goal" key="goal" align="center" />
        <Column title="助攻" dataIndex="assist" key="assist" align="center" />
        <Column
          title="场均进球"
          dataIndex="averaging_goal"
          key="averaging_goal"
          align="center"
        />
        <Column
          title="每球耗时"
          dataIndex="every_time"
          key="every_time"
          align="center"
        />
        <Column
          title="被犯规"
          dataIndex="be_foul"
          key="be_foul"
          align="center"
        />
        <Column title="射门" dataIndex="shoot" key="shoot" align="center" />
        <Column
          title="射正率"
          dataIndex="target_rate"
          key="target_rate"
          align="center"
        />
        <Column title="越位" dataIndex="offside" key="offside" align="center" />
        <Column
          title="关键传球"
          dataIndex="key_pass"
          key="key_pass"
          align="center"
        />
        <Column
          title="传球总数"
          dataIndex="pass_total"
          key="pass_total"
          align="center"
        />
        <Column
          title="传球成功率"
          dataIndex="pass_success"
          key="pass_success"
          align="center"
        />
        <Column
          title="场均抢断"
          dataIndex="averaging_steal"
          key="averaging_steal"
          align="center"
        />
        <Column
          title="场均拦截"
          dataIndex="averaging_intercept"
          key="averaging_intercept"
          align="center"
        />
        <Column
          title="场均解围"
          dataIndex="averaging_clearance"
          key="averaging_clearance"
          align="center"
        />
        <Column
          title="出场时间"
          dataIndex="playing_time"
          key="playing_time"
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
                    reqFn: deletePlayerData,
                    data: {
                      id: String(row.id).split(' '),
                    },
                    single: true,
                    success: getPlayerList,
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
