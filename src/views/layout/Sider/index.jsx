import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Layout } from 'antd'
import Logo from './Logo'
import Menu from './Menu/index'
const { Sider } = Layout

const LayoutSider = () => {
  const { sidebarLogo, sidebarCollapsed } = useSelector(
    (state) => ({
      sidebarLogo: state.settings.sidebarLogo,
      sidebarCollapsed: state.app.sidebarCollapsed,
    }),
    shallowEqual
  )

  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{ zIndex: '10' }}
    >
      {sidebarLogo ? <Logo /> : null}
      <Menu />
    </Sider>
  )
}

export default LayoutSider
