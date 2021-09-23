/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:30:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 13:16:47
 * 荣誉记录 - 新增/编辑
 */
import React, { memo, useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd'
import { whether } from '@/config/constants'

const HonorForm = (props) => {
  const { visible, onCancel, onOk, formData, teamList, awardData } = props
  let { time, team_id, if_personal, award_code } = formData
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
              name="honorTime"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={time}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="球队:"
              name="honorTeamId"
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
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="是否个人奖项:"
              name="if_personal"
              rules={[{ required: true, message: '请选择!' }]}
              initialValue={if_personal}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="请选择"
              >
                {whether.map((val) => (
                  <Select.Option value={val.val} key={val.val}>
                    {val.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="奖项名称:"
              name="award_code"
              rules={[{ required: true, message: '请选择!' }]}
              initialValue={award_code}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="请选择"
              >
                {awardData.map((val) => (
                  <Select.Option value={val.code} key={val.id}>
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

export default memo(HonorForm)
