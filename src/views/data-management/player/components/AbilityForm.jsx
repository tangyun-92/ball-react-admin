/*
 * @Author: 唐云 
 * @Date: 2021-09-22 11:30:06 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 14:00:25
 * 能力值 Form
 */
import React, { memo, useEffect } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd'

const AbilityForm = (props) => {
  const { visible, onCancel, onOk, formData } = props
  const {
    comprehensive,
    speed,
    shoot,
    pass,
    dribbling,
    defend,
    power,
    cross,
    heading,
    short_pass,
    volley,
    arc,
    free_kick,
    long_pass,
    ball_control,
    speed_up,
    agility,
    reaction,
    balance,
    shooting_power,
    bounce,
    stamina,
    strong,
    long_shot,
    aggressiveness,
    intercept_awareness,
    positioning,
    view,
    penalty_kick,
    marking,
    break_off,
    slide_tackle,
    m_fish_dive,
    m_hand_shape,
    m_open_ball,
    m_stance,
    m_reaction,
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
      title="能力值"
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Row>
          <Col span={6}>
            <Form.Item
              label="综合能力:"
              name="comprehensive"
              initialValue={comprehensive}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="速度:" name="speed" initialValue={speed}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="射门:" name="shoot" initialValue={shoot}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="传球:" name="pass" initialValue={pass}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="盘带:" name="dribbling" initialValue={dribbling}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="防守:" name="defend" initialValue={defend}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="力量:" name="power" initialValue={power}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="传中:" name="cross" initialValue={cross}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="头球:" name="heading" initialValue={heading}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="短传:"
              name="short_pass"
              initialValue={short_pass}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="凌空:" name="volley" initialValue={volley}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="弧线:" name="arc" initialValue={arc}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="任意球:"
              name="free_kick"
              initialValue={free_kick}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="长传:" name="long_pass" initialValue={long_pass}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="控球:"
              name="ball_control"
              initialValue={ball_control}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="加速:" name="speed_up" initialValue={speed_up}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="敏捷:" name="agility" initialValue={agility}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="反应:" name="reaction" initialValue={reaction}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="平衡:" name="balance" initialValue={balance}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="射门力量:"
              name="shooting_power"
              initialValue={shooting_power}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item label="弹跳:" name="bounce" initialValue={bounce}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="耐力:" name="stamina" initialValue={stamina}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="强壮:" name="strong" initialValue={strong}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="远射:" name="long_shot" initialValue={long_shot}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="侵略性:"
              name="aggressiveness"
              initialValue={aggressiveness}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="拦截意识:"
              name="intercept_awareness"
              initialValue={intercept_awareness}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="跑位:"
              name="positioning"
              initialValue={positioning}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="视野:" name="view" initialValue={view}>
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
            <Form.Item label="盯人:" name="marking" initialValue={marking}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="抢断:" name="break_off" initialValue={break_off}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="铲球:"
              name="slide_tackle"
              initialValue={slide_tackle}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="鱼跃:"
              name="m_fish_dive"
              initialValue={m_fish_dive}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="手型:"
              name="m_hand_shape"
              initialValue={m_hand_shape}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="开球:"
              name="m_open_ball"
              initialValue={m_open_ball}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="站位:" name="m_stance" initialValue={m_stance}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="反应:"
              name="m_reaction"
              initialValue={m_reaction}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(AbilityForm)
