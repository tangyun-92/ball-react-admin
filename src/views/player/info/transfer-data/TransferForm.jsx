/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:30:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 15:36:46
 * 转会记录 - 新增/编辑
 */
import React, { memo, useEffect } from 'react'
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import { filterDict } from '@/utils'
import moment from 'moment'

const TransferForm = (props) => {
  const { visible, onCancel, onOk, formData, teamList } = props
  let { time, old_team_id, new_team_id, price, transfer_type } = formData
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
    if (formData.time) {
      formData.time = moment(formData.time, 'YYYY.MM')
    }
    form.resetFields()
    form.setFieldsValue(formData)
  }, [form, formData])

  return (
    <Modal
      forceRender
      width={1100}
      title="荣誉记录"
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="时间:"
              name="time"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={time}
            >
              <DatePicker placeholder="请选择" picker="month" format="YYYY.MM" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="转出球队:"
              name="old_team_id"
              initialValue={old_team_id}
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
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="转入球队:"
              name="new_team_id"
              rules={[{ required: true, message: '请选择!' }]}
              initialValue={new_team_id}
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
            <Form.Item label="价格:" name="transferPrice" initialValue={price}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="转会类型:"
              name="transfer_type"
              rules={[{ required: true, message: '请选择!' }]}
              initialValue={transfer_type}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="请选择"
              >
                {filterDict('zhlx') &&
                  filterDict('zhlx').map((val) => (
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

export default memo(TransferForm)
