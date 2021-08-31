import React from 'react'
import { Icon, Tooltip } from 'antd'
import { toggleSettingPanel } from '@/store/app/actionCreators'
import './index.less'

const Settings = () => {
  return (
    <div className="settings-container">
      <Tooltip placement="bottom" title="系统设置">
        <Icon type="setting" onClick={toggleSettingPanel} />
      </Tooltip>
    </div>
  )
}

export default Settings
