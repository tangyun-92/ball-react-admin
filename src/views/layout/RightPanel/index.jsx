import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Drawer, Switch, Row, Col, Divider } from 'antd'
import { changeSetting } from '@/store/settings/actionCreators'
import { toggleSettingPanel } from '@/store/app/actionCreators'

const RightPanel = (props) => {
  // const {
  //   settingPanelVisible,
  //   toggleSettingPanel,
  //   changeSetting,
  //   sidebarLogo: defaultSidebarLogo,
  //   fixedHeader: defaultFixedHeader,
  //   tagsView: defaultTagsView,
  // } = props

  let { settingPanelVisible, sidebarLogo, fixedHeader, tagsView } = useSelector(
    (state) => ({
      settingPanelVisible: state.app.settingPanelVisible,
      sidebarLogo: state.settings.sidebarLogo,
      fixedHeader: state.settings.fixedHeader,
      tagsView: state.settings.tagsView,
    }),
    shallowEqual
  )

  // const [sidebarLogo, setSidebarLogo] = useState(defaultSidebarLogo)
  // const [fixedHeader, setFixedHeader] = useState(defaultFixedHeader)
  // const [tagsView, setTagsView] = useState(defaultTagsView)

  const sidebarLogoChange = (checked) => {
    // setSidebarLogo(checked)
    sidebarLogo = checked
    changeSetting({ key: 'sidebarLogo', value: checked })
  }

  const fixedHeaderChange = (checked) => {
    // setFixedHeader(checked)
    fixedHeader = checked
    changeSetting({ key: 'fixedHeader', value: checked })
  }

  const tagsViewChange = (checked) => {
    // setTagsView(checked)
    tagsView = checked
    changeSetting({ key: 'tagsView', value: checked })
  }

  return (
    <div className="rightSettings">
      <Drawer
        title="系统设置"
        placement="right"
        width={350}
        onClose={toggleSettingPanel}
        visible={settingPanelVisible}
      >
        <Row>
          <Col span={12}>
            <span>侧边栏 Logo</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={sidebarLogo}
              onChange={sidebarLogoChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>固定 Header</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={fixedHeader}
              onChange={fixedHeaderChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>开启 Tags-View</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={tagsView}
              onChange={tagsViewChange}
            />
          </Col>
        </Row>
        <Divider dashed />
      </Drawer>
    </div>
  )
}

export default RightPanel
