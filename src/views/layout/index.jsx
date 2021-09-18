import React, { useEffect } from 'react'
import Content from './Content'
import Header from './Header'
import RightPanel from './RightPanel'
import Sider from './Sider'
import TagsView from './TagsView'
import { Layout } from 'antd'
import { shallowEqual, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getDictListAction } from '@/store/base-data/actionCreators'

const Main = () => {
  const { tagsView } = useSelector(
    (state) => ({
      tagsView: state.settings.tagsView,
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDictListAction())
  }, [dispatch])
  
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
