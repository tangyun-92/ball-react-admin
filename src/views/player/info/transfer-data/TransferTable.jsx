/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:29:56
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 15:37:12
 * 转会记录
 */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal, Button, Table, message } from 'antd'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import {
  deletePlayerTransfer,
  getPlayerTransfer,
  updatePlayerTransfer,
} from '@/api/player/info'
import TransferForm from './TransferForm'
import { filterDictData } from '@/utils'

const { Column } = Table

const TransferTable = (props) => {
  let { visible, onCancel, player_id, teamList } = props
  const [tableData, setTableData] = useState([])

  const {
    multipleSelectionHandler,
    handleCreate,
    handleEdit,
    dataHooks,
    handleCancel,
  } = useSystemDataHooks({
    getListApi: getPlayerTransfer,
  })

  // 获取指定球员荣誉记录列表
  const getPlayerList = useCallback(() => {
    getPlayerTransfer({ id: player_id }).then((res) => {
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
      updatePlayerTransfer({
        ...values,
        time: values.time ? values.time.format('YYYY.MM') : '',
        price: values.transferPrice,
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
        <Column
          title="转出球队"
          dataIndex="old_team"
          key="old_team"
          align="center"
        />
        <Column
          title="转入球队"
          dataIndex="new_team"
          key="new_team"
          align="center"
        />
        <Column title="价格" dataIndex="price" key="price" align="center" />
        <Column
          title="转会类型"
          dataIndex="transfer_type"
          key="transfer_type"
          align="center"
          render={(val) => {
            return <span>{filterDictData('zhlx', val)}</span>
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
                    reqFn: deletePlayerTransfer,
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
      <TransferForm
        formData={dataHooks.formData}
        visible={dataHooks.formDialogVisible}
        teamList={teamList}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Modal>
  )
}

export default memo(TransferTable)
