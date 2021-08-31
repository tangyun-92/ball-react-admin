import React from 'react'
import Content from './Content'
import Header from './Header'
import RightPanel from './RightPanel'
import Sider from './Sider'
import TagsView from './TagsView'
import { Layout } from 'antd'
import { shallowEqual, useSelector } from 'react-redux'

const Main = () => {
  const { tagsView } = useSelector(
    (state) => ({
      tagsView: state.settings.get('tagsView'),
    }),
    shallowEqual
  )
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        <Header />
        {tagsView ? <TagsView /> : null}
        <Content />
        <RightPanel />
      </Layout>
    </Layout>
  )
}
export default Main
