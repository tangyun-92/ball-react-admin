/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:30:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 16:18:18
 * 转会记录 - 新增/编辑
 */
import React, { memo, useEffect } from 'react'
import { Col, DatePicker, Form, Modal, Row, Select } from 'antd'
import { filterDict } from '@/utils'
import moment from 'moment'

const InjuryForm = (props) => {
  const { visible, onCancel, onOk, formData, teamList } = props
  let { start_time, end_time, team_id, injury_code } = formData
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 15 },
    },
  }

  useEffect(() => {
    if (formData.start_time) {
      formData.start_time = moment(formData.start_time, 'YYYY.MM.DD')
    }
    if (formData.end_time) {
      formData.end_time = moment(formData.end_time, 'YYYY.MM.DD')
    }
    form.resetFields()
    form.setFieldsValue(formData)
  }, [form, formData])

  return (
    <Modal
      forceRender
      width={1100}
      title="伤病记录"
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="开始时间:"
              name="start_time"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={start_time}
            >
              <DatePicker
                placeholder="请选择"
                format="YYYY.MM.DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="结束时间:"
              name="end_time"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={end_time}
            >
              <DatePicker
                placeholder="请选择"
                format="YYYY.MM.DD"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="球队:"
              name="injuryTeamId"
              rules={[{ required: true, message: '请选择!' }]}
              initialValue={team_id}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="请选择"
              >
                {teamList.map((val) => (
                  <Select.Option value={val.id} key={val.id}>
                    {val.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="伤病类型:"
              name="injury_code"
              rules={[{ required: true, message: '请选择!' }]}
              initialValue={injury_code}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="请选择"
              >
                {filterDict('sblx') &&
                  filterDict('sblx').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(InjuryForm)
