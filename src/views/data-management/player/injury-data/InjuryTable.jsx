/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:29:56
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 16:51:31
 * 转会记录
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal, Button, Table, message } from 'antd'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import {
  deletePlayerInjury,
  getPlayerInjury,
  updatePlayerInjury,
} from '@/api/data-management/player'
import InjuryForm from './InjuryForm'
import { filterDictData } from '@/utils'

const { Column } = Table

const InjuryTable = (props) => {
  let { visible, onCancel, player_id, teamList } = props
  const [tableData, setTableData] = useState([])

  const {
    multipleSelectionHandler,
    handleCreate,
    handleEdit,
    dataHooks,
    handleCancel,
  } = useSystemDataHooks({
    getListApi: getPlayerInjury,
  })

  // 获取指定球员荣誉记录列表
  const getPlayerList = useCallback(() => {
    getPlayerInjury({ id: player_id }).then((res) => {
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
      updatePlayerInjury({
        ...values,
        price: values.transferPrice,
        start_time: values.start_time
          ? values.start_time.format('YYYY.MM.DD')
          : '',
        end_time: values.end_time ? values.end_time.format('YYYY.MM.DD') : '',
        team_id: values.injuryTeamId,
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
      title="伤病记录"
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
      >
        <Column
          title="开始时间"
          dataIndex="start_time"
          key="start_time"
          align="center"
        />
        <Column
          title="结束时间"
          dataIndex="end_time"
          key="end_time"
          align="center"
        />
        <Column title="球队" dataIndex="team" key="team" align="center" />
        <Column
          title="伤病类型"
          dataIndex="injury_code"
          key="injury_code"
          align="center"
          render={(val) => {
            return <span>{filterDictData('sblx', val)}</span>
          }}
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
                    reqFn: deletePlayerInjury,
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
      <InjuryForm
        formData={dataHooks.formData}
        visible={dataHooks.formDialogVisible}
        teamList={teamList}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Modal>
  )
}

export default memo(InjuryTable)
