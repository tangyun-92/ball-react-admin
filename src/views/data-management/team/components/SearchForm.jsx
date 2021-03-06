/*
 * @Author: 唐云
 * @Date: 2021-08-27 17:05:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 09:32:18
 * 球队管理-搜索
 */
import React, { memo } from 'react'
import { Button, Form, Input } from 'antd'

const SearchForm = (props) => {
  const { onFinish } = props
  const [form] = Form.useForm()

  return (
    <Form layout="inline" onFinish={(e) => onFinish(form)} form={form}>
      <Form.Item label="姓名:" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        label="英文名:"
        name="english_name"
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
    </Form>
  )
}

export default memo(SearchForm)
