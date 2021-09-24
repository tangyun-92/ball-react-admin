/*
 * @Author: 唐云
 * @Date: 2021-08-27 17:07:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 10:36:52
 * 球队管理 - 新增/编辑
 */
import React, { memo, useEffect } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd'
import UploadImg from '@/components/UploadImg'

const EditForm = (props) => {
  const { visible, onCancel, onOk, formData } = props
  const {
    id,
    name,
    english_name,
    setup_time,
    area,
    city,
    home_court,
    person_num,
    tel,
    email,
    address,
    world_ranking,
    total_value,
  } = formData
  const [form] = Form.useForm()
  const title = id ? '编辑' : '新增'
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
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              label="球队名称:"
              name="editName"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={name}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="英文名:"
              name="editEnglish"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={english_name}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="成立时间:"
              name="setup_time"
              initialValue={setup_time}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="所在地区:" name="area" initialValue={area}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="城市:" name="city" initialValue={city}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="球队主场:"
              name="home_court"
              initialValue={home_court}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="容纳人数:"
              name="person_num"
              initialValue={person_num}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="电话:" name="tel" initialValue={tel}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="邮箱:" name="email" initialValue={email}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="地址:" name="address" initialValue={address}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="世界排名:"
              name="world_ranking"
              initialValue={world_ranking}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="总身价:"
              name="total_value"
              initialValue={total_value}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <UploadImg
            imgUrl={formData.team_logo}
            uploadUrl="/teams/upload"
            label="队徽:"
            name="team_logo"
            valuePropName="team_logo"
          />
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(EditForm)
