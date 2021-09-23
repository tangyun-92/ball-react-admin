/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:29:56
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 16:51:29
 * 荣誉记录
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal, Button, Table, message } from 'antd'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import {
  deletePlayerHonor,
  getPlayerHonor,
  updatePlayerHonor,
} from '@/api/data-management/player'
import HonorForm from './HonorForm'
import { filterWhether } from '@/utils'

const { Column } = Table

const HonorTable = (props) => {
  let { visible, onCancel, player_id, teamList, awardData } = props
  const [tableData, setTableData] = useState([])

  const {
    multipleSelectionHandler,
    handleCreate,
    handleEdit,
    dataHooks,
    handleCancel,
  } = useSystemDataHooks({
    getListApi: getPlayerHonor,
  })

  // 获取指定球员荣誉记录列表
  const getPlayerList = useCallback(() => {
    getPlayerHonor({ id: player_id }).then((res) => {
      setTableData(res.data.records)
    })
  }, [player_id])

  useEffect(() => {
    if (visible) {
      getPlayerList()
    }
  }, [getPlayerList, visible])

  // 过滤奖项名称
  const filterAwardName = (name) => {
    let result = null
    if (awardData.length !== 0) {
      result = awardData.find((item) => item.code === name)
      return result.name
    }
    return ''
  }

  const handleOk = (form) => {
    form.validateFields().then((values) => {
      const id = dataHooks.formData.id
      updatePlayerHonor({
        ...values,
        time: values.honorTime,
        team_id: values.honorTeamId,
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
      title="荣誉记录"
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
        <Column title="时间" dataIndex="time" key="time" align="center" />
        <Column title="球队" dataIndex="team" key="team" align="center" />
        <Column
          title="是否个人奖项"
          dataIndex="if_personal"
          key="if_personal"
          align="center"
          render={(val) => {
            return <span>{filterWhether(val)}</span>
          }}
        />
        <Column
          title="奖项名称"
          dataIndex="award_code"
          key="award_code"
          align="center"
          render={(name) => {
            return <span>{filterAwardName(name)}</span>
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
                    reqFn: deletePlayerHonor,
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
      <HonorForm
        formData={dataHooks.formData}
        visible={dataHooks.formDialogVisible}
        teamList={teamList}
        awardData={awardData}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Modal>
  )
}

export default memo(HonorTable)
