/*
 * @Author: 唐云
 * @Date: 2021-09-22 11:30:28
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 15:45:57
 * 历史数据 - 新增/编辑
 */
import React, { memo, useEffect } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd'

const AbilityForm = (props) => {
  const { visible, onCancel, onOk, formData } = props
  let {
    time,
    enter_field,
    starter,
    game_time,
    goal,
    assist,
    averaging_goal,
    every_time,
    be_foul,
    shoot,
    target_rate,
    offside,
    key_pass,
    pass_total,
    pass_success,
    averaging_steal,
    averaging_intercept,
    averaging_clearance,
    playing_time,
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
            <Form.Item label="时间:" name="time" initialValue={time}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="出场:"
              name="enter_field"
              initialValue={enter_field}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="首发:" name="starter" initialValue={starter}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="场均时间:"
              name="game_time"
              initialValue={game_time}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="进球:" name="goal" initialValue={goal}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="助攻:" name="assist" initialValue={assist}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="场均进球:"
              name="averaging_goal"
              initialValue={averaging_goal}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="每球耗时:"
              name="every_time"
              initialValue={every_time}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="被犯规:" name="be_foul" initialValue={be_foul}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="射门:" name="dataShoot" initialValue={shoot}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="射正率:"
              name="target_rate"
              initialValue={target_rate}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="越位:" name="offside" initialValue={offside}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
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
            <Form.Item
              label="传球总数:"
              name="pass_total"
              initialValue={pass_total}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
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
              label="场均抢断:"
              name="averaging_steal"
              initialValue={averaging_steal}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="场均拦截:"
              name="averaging_intercept"
              initialValue={averaging_intercept}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="场均解围:"
              name="averaging_clearance"
              initialValue={averaging_clearance}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="出场时间:"
              name="playing_time"
              initialValue={playing_time}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="犯规:" name="foul" initialValue={foul}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
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

export default memo(AbilityForm)
