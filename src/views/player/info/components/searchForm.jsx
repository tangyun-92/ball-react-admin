/*
 * @Author: 唐云 
 * @Date: 2021-08-27 17:05:35 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-30 10:55:15
 * 球员信息-搜索
 */
import React, { Component } from 'react'
import { Button, Form, Input } from 'antd'

class SearchForm extends Component {
  render() {
    const { form, searchData, onSubmit } = this.props
    const { getFieldDecorator } = form
    const { name, english_name } = searchData
    return (
      <Form layout="inline" onSubmit={onSubmit}>
        <Form.Item label="姓名:">
          {getFieldDecorator('name', {
            initialValue: name,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item label="英文名:">
          {getFieldDecorator('english_name', {
            initialValue: english_name,
          })(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            icon="search"
            htmlType="submit"
          >
            搜索
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'SearchForm' })(SearchForm)
