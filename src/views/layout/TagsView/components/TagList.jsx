import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { Tag } from 'antd'
import {
  deleteTag,
  emptyTaglist,
  closeOtherTags,
} from '@/store/tagsView/actionCreators'
import { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useCallback } from 'react'

const TagList = (props) => {
  const { taglist } = useSelector(
    (state) => ({
      taglist: state.tags.get('taglist')
    }),
    shallowEqual
  )

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [menuVisible, setMenuVisible] = useState(false)
  const [currentTag, setCurrentTag] = useState(null)

  const { history } = props
  const currentPath = history.location.pathname

  const tagListContainer = React.createRef()
  const contextMenuContainer = React.createRef()

  const handleClose = (tag) => {
    const path = tag.path
    const currentPath = history.location.pathname
    const length = taglist.length
    // 如果关闭的是当前页，跳转到最后一个tag
    if (path === currentPath) {
      history.push(taglist[length - 1].path)
    }
    // 如果关闭的是最后的tag ,且当前显示的也是最后的tag对应的页面，才做路由跳转
    if (
      path === taglist[length - 1].path &&
      currentPath === taglist[length - 1].path
    ) {
      // 因为cutTaglist在最后执行，所以跳转到上一个tags的对应的路由，应该-2
      if (length - 2 > 0) {
        history.push(taglist[length - 2].path)
      } else if (length === 2) {
        history.push(taglist[0].path)
      }
    }

    // 先跳转路由，再修改state树的taglist
    deleteTag(tag)
  }
  const handleClick = (path) => {
    props.history.push(path)
  }
  const openContextMenu = (tag, event) => {
    event.preventDefault()
    const menuMinWidth = 105
    const clickX = event.clientX
    const clickY = event.clientY //事件发生时鼠标的Y坐标
    const clientWidth = tagListContainer.current.clientWidth // container width
    const maxLeft = clientWidth - menuMinWidth // left boundary

    // 当鼠标点击位置大于左侧边界时，说明鼠标点击的位置偏右，将菜单放在左边
    if (clickX > maxLeft) {
      setLeft(clickX - menuMinWidth + 15)
      setTop(clickY)
      setMenuVisible(true)
      setCurrentTag(tag)
    } else {
      // 反之，当鼠标点击的位置偏左，将菜单放在右边
      setLeft(clickX)
      setTop(clickY)
      setMenuVisible(true)
      setCurrentTag(tag)
    }
  }
  const handleClickOutside = useCallback((event) => {
    const isOutside = !(
      contextMenuContainer.current &&
      contextMenuContainer.current.contains(event.target)
    )
    if (isOutside && menuVisible) {
      closeContextMenu()
    }
  }, [contextMenuContainer, menuVisible])
  const closeContextMenu = () => {
    setMenuVisible(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside)
  }, [handleClickOutside])
  // const componentWillUnmount() {
  //   document.body.removeEventListener('click', this.handleClickOutside)
  // }

  const handleCloseAllTags = () => {
    emptyTaglist()
    props.history.push('/dashboard')
    closeContextMenu()
  }
  const handleCloseOtherTags = () => {
    const { path } = currentTag
    closeOtherTags(currentTag)
    props.history.push(path)
    closeContextMenu()
  }

  return (
    <>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        hideTracksWhenNotNeeded={true}
        renderView={(props) => (
          <div {...props} className="scrollbar-container" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="scrollbar-track-vertical" />
        )}
      >
        <ul className="tags-wrap" ref={tagListContainer}>
          {taglist &&
            taglist.map((tag) => (
              <li key={tag.path}>
                <Tag
                  onClose={(e) => handleClose(null, tag)}
                  closable={tag.path !== '/dashboard'}
                  color={currentPath === tag.path ? 'geekblue' : 'gold'}
                  onClick={(e) => handleClick(null, tag.path)}
                  onContextMenu={(e) => openContextMenu(null, tag)}
                >
                  {tag.title}
                </Tag>
              </li>
            ))}
        </ul>
      </Scrollbars>
      {menuVisible ? (
        <ul
          className="contextmenu"
          style={{ left: `${left}px`, top: `${top}px` }}
          ref={contextMenuContainer}
        >
          <li onClick={handleCloseOtherTags}>关闭其他</li>
          <li onClick={handleCloseAllTags}>关闭所有</li>
        </ul>
      ) : null}
    </>
  )
}

export default withRouter(TagList)
