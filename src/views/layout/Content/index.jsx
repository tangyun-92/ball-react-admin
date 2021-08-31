import React from 'react'
import { Redirect, withRouter, Route, Switch } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Layout } from 'antd'
import { getMenuItemInMenuListByProperty } from '@/utils'
import routeList from '@/config/routeMap'
import menuList from '@/config/menuConfig'
import { shallowEqual, useSelector } from 'react-redux'

const { Content } = Layout

const getPageTitle = (menuList, pathname) => {
  let title = 'Ant Design Pro'
  let item = getMenuItemInMenuListByProperty(menuList, 'path', pathname)
  if (item) {
    title = `${item.title} - Ant Design Pro`
  }
  return title
}

const LayoutContent = (props) => {
  const { location } = props
  const { pathname } = location

  // const { role } = useSelector(
  //   (state) => ({
  //     role: state.user.get('role'),
  //   }),
  //   shallowEqual
  // )
  const role = 'admin'


  const handleFilter = (route) => {
    // 过滤没有权限的页面
    return role === 'admin' || !route.roles || route.roles.includes(role)
  }
  return (
    <DocumentTitle title={getPageTitle(menuList, pathname)}>
      <Content style={{ height: 'calc(100% - 100px)' }}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={500}
            classNames="fade"
            exit={false}
          >
            <Switch location={location}>
              <Redirect exact from="/" to="/dashboard" />
              {routeList.map((route) => {
                return (
                  handleFilter(route) && (
                    <Route
                      component={route.component}
                      key={route.path}
                      path={route.path}
                    />
                  )
                )
              })}
              <Redirect to="/error/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  )
}

export default withRouter(LayoutContent)
