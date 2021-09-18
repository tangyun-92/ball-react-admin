/*
 * @Author: 唐云
 * @Date: 2021-08-26 14:32:55
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-18 15:24:55
 * 球员信息
 */
import React, { useState, useEffect, memo } from 'react'
import { Table, Button, Pagination, message, Rate } from 'antd'
import EditForm from './components/EditForm'
import SearchForm from './components/SearchForm'
import './index.less'
import { getPlayer, createOrEditPlayer, delPlayer } from '@/api/player/info'
import { getTeam, getNation } from '@/api/public'
import { filterDictData } from '@/utils'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  getTableListAction,
  changeSearchDataAction,
} from '@/store/common/actionCreators'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import AbilityForm from './components/AbilityForm'

const { Column } = Table

const PlayerInfo = () => {
  const [teamList, setTeamList] = useState([])
  const [nationList, setNationList] = useState([])

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
    dispatch(getTableListAction(getPlayer))
    getTeamList()
    getNationList()
  }, [dispatch])

  const {
    dataHooks,
    handleEdit,
    handleCreate,
    handleSizeChange,
    handleCurrentChange,
    handleCancel,
    multipleSelectionHandler,
  } = useSystemDataHooks({
    getListApi: getPlayer,
  })

  /**
   * 获取球队列表
   */
  const getTeamList = () => {
    getTeam().then((res) => {
      setTeamList(res.data.records)
    })
  }

  /**
   * 获取国家列表
   */
  const getNationList = () => {
    getNation().then((res) => {
      setNationList(res.data.records)
    })
  }

  /**
   * 新增/编辑提交
   */
  const handleOk = (form) => {
    form.validateFields().then((values) => {
      console.log(values)
      let avatar = ''
      if (typeof values.avatar === 'object') {
        avatar = values.avatar[0].response.url
      } else {
        avatar = values.avatar
      }
      const data = {
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : '',
        contract_expire: values.contract_expire
          ? values.contract_expire.format('YYYY-MM-DD')
          : '',
        strong_point: values.strong_point || [],
        weak_point: values.weak_point || [],
        technical_feature: values.technical_feature || [],
        avatar,
        english_name: values.editEnglish,
        name: values.editName,
      }
      const formData = dataHooks.formData
      if (formData.id) {
        data.id = formData.id
      }
      createOrEditPlayer(data)
        .then((res) => {
          handleCancel()
          message.success(res.message)
          dispatch(getTableListAction(getPlayer))
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }
  /**
   * 搜索
   */
  const onSearchFinish = (form) => {
    form.validateFields().then((values) => {
      dispatch(changeSearchDataAction(values))
      dispatch(getTableListAction(getPlayer))
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
        size="small"
        rowKey={(record) => record.id}
        dataSource={tableData}
        loading={tableLoading}
        pagination={false}
        scroll={{ x: 2000 }}
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
            return <span>{filterDictData('wz', position)}</span>
          }}
        />
        <Column
          title="惯用脚"
          dataIndex="feet"
          key="feet"
          align="center"
          render={(feet) => {
            return <span>{filterDictData('gyj', feet)}</span>
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
              <Rate defaultValue={Number(international_reputation)} disabled />
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
          width={240}
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
              <Button type="link">能力值</Button>
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
      <br />
      <EditForm
        formData={dataHooks.formData}
        teamList={teamList}
        nationList={nationList}
        visible={dataHooks.formDialogVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
      <AbilityForm />
    </div>
  )
}

export default memo(PlayerInfo)
