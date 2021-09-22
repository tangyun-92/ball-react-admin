/*
 * @Author: 唐云
 * @Date: 2021-08-26 14:32:55
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 15:48:38
 * 球员信息
 */
import React, { useState, useEffect, memo } from 'react'
import { Table, Button, Pagination, message, Rate } from 'antd'
import EditForm from './components/EditForm'
import SearchForm from './components/SearchForm'
import './index.less'
import {
  getPlayer,
  createOrEditPlayer,
  delPlayer,
  getPlayerAbility,
  updatePlayerAbility,
  getPlayerPosition,
  updatePlayerPosition,
  getPlayerData,
} from '@/api/player/info'
import { getTeam, getNation } from '@/api/public'
import { filterDictData } from '@/utils'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  getTableListAction,
  changeSearchDataAction,
} from '@/store/common/actionCreators'
import useSystemDataHooks from '@/hooks/useSystemDataHooks'
import AbilityForm from './components/AbilityForm'
import PositionForm from './components/PositionForm'
import HistoryTable from './history-data/HistoryTable'

const { Column } = Table

const PlayerInfo = () => {
  const [teamList, setTeamList] = useState([]) // 球队列表
  const [nationList, setNationList] = useState([]) // 国家列表
  const [playerId, setPlayerId] = useState(null) // 球员id

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
    dispatch(getTableListAction(getPlayer))
    // 获取球队列表
    getTeamList()
    // 获取国家列表
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

  // 获取球队列表
  const getTeamList = () => {
    getTeam().then((res) => {
      setTeamList(res.data.records)
    })
  }
  // 获取国家列表
  const getNationList = () => {
    getNation().then((res) => {
      setNationList(res.data.records)
    })
  }
  // 新增/编辑提交
  const handleOk = (form) => {
    form.validateFields().then((values) => {
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

  /**
   * 能力值
   */
  const defaultAbilityFormData = {
    comprehensive: '',
    speed: '',
    shoot: '',
    pass: '',
    dribbling: '',
    defend: '',
    power: '',
    cross: '',
    heading: '',
    short_pass: '',
    volley: '',
    arc: '',
    free_kick: '',
    long_pass: '',
    ball_control: '',
    speed_up: '',
    agility: '',
    reaction: '',
    balance: '',
    shooting_power: '',
    bounce: '',
    stamina: '',
    strong: '',
    long_shot: '',
    aggressiveness: '',
    intercept_awareness: '',
    positioning: '',
    view: '',
    penalty_kick: '',
    marking: '',
    break_off: '',
    slide_tackle: '',
    m_fish_dive: '',
    m_hand_shape: '',
    m_open_ball: '',
    m_stance: '',
    m_reaction: '',
    player_id: null,
  }
  const [abilityFormData, setAbilityFormData] = useState([])
  const [abilityFormVisible, setAbilityFormVisible] = useState(false)
  // 显示弹窗-获取指定球员能力值
  const handleEditAbility = (row) => {
    setAbilityFormVisible(true)
    setPlayerId(row.id)
    getPlayerAbility({
      id: row.id,
    }).then((res) => {
      if (res.data.records) {
        setAbilityFormData(res.data.records)
      } else {
        setAbilityFormData(defaultAbilityFormData)
      }
    })
  }
  // 能力值提交
  const abilityHandleOk = (form) => {
    form.validateFields().then((values) => {
      updatePlayerAbility({
        ...values,
        player_id: playerId,
      }).then((res) => {
        message.success(res.message)
        setAbilityFormVisible(false)
      })
    })
  }

  /**
   * 位置
   */
  const defaultPositionFormData = {
    CF: '',
    LW: '',
    RW: '',
    LM: '',
    RM: '',
    SF: '',
    AMF: '',
    CMF: '',
    DM: '',
    WL: '',
    WR: '',
    LB: '',
    RB: '',
    CB: '',
    GK: '',
  }
  const [positionFormData, setPositionFormData] = useState([])
  const [positionFormVisible, setPositionFormVisible] = useState(false)
  // 显示弹窗-获取指定球员位置值
  const handleEditPosition = (row) => {
    setPositionFormVisible(true)
    setPlayerId(row.id)
    getPlayerPosition({
      id: row.id,
    }).then((res) => {
      if (res.data.records) {
        setPositionFormData(res.data.records)
      } else {
        setPositionFormData(defaultPositionFormData)
      }
    })
  }
  // 位置提交
  const positionHandleOk = (form) => {
    form.validateFields().then((values) => {
      updatePlayerPosition({
        ...values,
        player_id: playerId,
      }).then((res) => {
        message.success(res.message)
        setPositionFormVisible(false)
      })
    })
  }

  /**
   * 历史数据
   */
  const [historyVisible, setHistoryVisible] = useState(false)
  // 显示弹窗-获取指定球员历史数据
  const handleEditHistory = (row) => {
    setHistoryVisible(true)
    setPlayerId(row.id)
  }

  return (
    <div className="container player-info">
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
              <Button type="link" onClick={(e) => handleEditAbility(row)}>
                能力值
              </Button>
              <Button type="link" onClick={(e) => handleEditPosition(row)}>
                位置
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
      <br />
      <EditForm
        formData={dataHooks.formData}
        teamList={teamList}
        nationList={nationList}
        visible={dataHooks.formDialogVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
      <AbilityForm
        formData={abilityFormData}
        visible={abilityFormVisible}
        onCancel={(e) => setAbilityFormVisible(false)}
        onOk={abilityHandleOk}
      />
      <PositionForm
        formData={positionFormData}
        visible={positionFormVisible}
        onCancel={(e) => setPositionFormVisible(false)}
        onOk={positionHandleOk}
      />
      <HistoryTable
        visible={historyVisible}
        onCancel={(e) => setHistoryVisible(false)}
        player_id={playerId}
      />
    </div>
  )
}

export default memo(PlayerInfo)
