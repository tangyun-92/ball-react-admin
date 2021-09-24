/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:30:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 11:06:18
 * 历史数据 - 新增/编辑
 */
import React, { memo, useEffect } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd'

const HistoryForm = (props) => {
  const { visible, onCancel, onOk, formData } = props
  let {
    time,
    ranking,
    integral,
    win,
    goal,
    deuce,
    lose,
    fumble,
    penalty_kick,
    averaging_shot,
    averaging_respectively,
    averaging_pass,
    key_pass,
    steal,
    pass_success,
    intercept,
    clearance,
    foul,
    yellow_card,
    red_card,
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
      title="数据"
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={6}>
            <Form.Item label="时间:" name="historyTime" initialValue={time}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="联赛排名:" name="ranking" initialValue={ranking}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="积分:" name="integral" initialValue={integral}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="胜:" name="win" initialValue={win}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="平局:" name="deuce" initialValue={deuce}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="负:" name="lose" initialValue={lose}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="进球:" name="goal" initialValue={goal}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="失球:" name="fumble" initialValue={fumble}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="点球:"
              name="penalty_kick"
              initialValue={penalty_kick}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="场均射门:"
              name="averaging_shot"
              initialValue={averaging_shot}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="场均射正:"
              name="averaging_respectively"
              initialValue={averaging_respectively}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="场均传球:"
              name="averaging_pass"
              initialValue={averaging_pass}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="传球成功率:"
              name="pass_success"
              initialValue={pass_success}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="关键传球:"
              name="key_pass"
              initialValue={key_pass}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="抢断:" name="steal" initialValue={steal}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="拦截:" name="intercept" initialValue={intercept}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="解围:" name="clearance" initialValue={clearance}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="犯规:" name="foul" initialValue={foul}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="黄牌:"
              name="yellow_card"
              initialValue={yellow_card}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="红牌:" name="red_card" initialValue={red_card}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(HistoryForm)
