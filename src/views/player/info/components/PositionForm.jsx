/*
 * @Author: 唐云 
 * @Date: 2021-09-22 11:30:28 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 15:34:30
 * 位置 Form
 */
import React, { memo, useEffect } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd'

const AbilityForm = (props) => {
  const { visible, onCancel, onOk, formData } = props
  const {
    CF,
    LW,
    RW,
    LM,
    RM,
    SF,
    AMF,
    CMF,
    DM,
    WL,
    WR,
    LB,
    RB,
    CB,
    GK,
  } = formData
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
      title="位置"
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={6}>
            <Form.Item label="中锋:" name="CF" initialValue={CF}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="左边锋:" name="LW" initialValue={LW}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="右边锋:" name="RW" initialValue={RW}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="左中场:" name="LM" initialValue={LM}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="右中场:" name="RM" initialValue={RM}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="影锋:" name="SF" initialValue={SF}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="前腰:" name="AMF" initialValue={AMF}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="中前卫:" name="CMF" initialValue={CMF}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="后腰:" name="DM" initialValue={DM}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="左翼卫:" name="WL" initialValue={WL}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="右翼卫:" name="WR" initialValue={WR}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="左后卫:" name="LB" initialValue={LB}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="右后卫:" name="RB" initialValue={RB}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="中后卫:" name="CB" initialValue={CB}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="门将:" name="GK" initialValue={GK}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(AbilityForm)
