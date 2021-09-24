/*
 * @Author: 唐云
 * @Date: 2021-08-27 17:05:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 16:35:32
 * 球员信息-搜索
 */
import React, { memo } from 'react'
import { Button, Form, Input, Select } from 'antd'

const SearchForm = (props) => {
  const { onFinish, teamList, nationList } = props
  const [form] = Form.useForm()

  return (
    <Form layout="inline" onFinish={(e) => onFinish(form)} form={form}>
      <Form.Item label="姓名:" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="英文名:" name="english_name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="球队:" name="team_id">
        <Select
          showSearch
          optionFilterProp="children"
          allowClear
          placeholder="请选择"
        >
          {teamList.map((val) => (
            <Select.Option value={val.id} key={val.id}>
              {val.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="国籍:" name="nation_id">
        <Select
          showSearch
          optionFilterProp="children"
          allowClear
          placeholder="请选择"
        >
          {nationList.map((val) => (
            <Select.Option value={val.id} key={val.id}>
              {val.name}
            </Select.Option>
          ))}
        </Select>
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
