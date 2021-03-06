import React from 'react'
import { connect, shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Icon, Menu, Dropdown, Modal, Layout, Avatar, message } from 'antd'
import { Link } from 'react-router-dom'
// import { logout } from '@/store/actions'
import FullScreen from '@/components/FullScreen'
import Settings from '@/components/Settings'
import Hamburger from '@/components/Hamburger'
import BreadCrumb from '@/components/BreadCrumb'
import { changeTokenAction } from '@/store/user/actionCreators'
import './index.less'

const { Header } = Layout

const mapStateToProps = (state) => ({
  token: state.user.token,
  avatar: state.user.avatar,
})

const LayoutHeader = (props) => {
  const { sidebarCollapsed, showSettings, fixedHeader } = useSelector(
    (state) => ({
      // token: state.user.get('token'),
      // avatar: state.user.get('avatar'),
      sidebarCollapsed: state.app.sidebarCollapsed,
      showSettings: state.settings.showSettings,
      fixedHeader: state.settings.fixedHeader,
    }),
    shallowEqual
  )
  const { token, avatar } = props
  const dispatch = useDispatch()

  const handleLogout = (token) => {
    Modal.confirm({
      title: '注销',
      content: '确定要退出系统吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch(changeTokenAction(''))
        message.success('退出成功')
      },
    })
  }
  const onClick = ({ key }) => {
    switch (key) {
      case 'logout':
        handleLogout(token)
        break
      default:
        break
    }
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  )
  const computedStyle = () => {
    let styles
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: 'calc(100% - 80px)',
        }
      } else {
        styles = {
          width: 'calc(100% - 200px)',
        }
      }
    } else {
      styles = {
        width: '100%',
      }
    }
    return styles
  }
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? 'fix-header' : ''}
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <FullScreen />
          {showSettings ? <Settings /> : null}
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="medium" src={avatar} />
                <Icon style={{ color: 'rgba(0,0,0,.3)' }} type="caret-down" />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  )
}

export default connect(mapStateToProps)(LayoutHeader)
