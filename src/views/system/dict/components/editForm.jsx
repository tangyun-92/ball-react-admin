import React, { memo } from 'react'
import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'

const EditForm = (props) => {
  const { visible, onCancel, onOk, formData } = props
  const { id, name, code, remark, sort } = formData
  const [form] = Form.useForm()
  const title = id ? '编辑' : '新增'
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  }

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(formData)
  }, [form, formData])

  return (
    <Modal
      forceRender
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={(e) => onOk(form)}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="类型名称:"
          name="name"
          rules={[{ required: true, message: '请输入!' }]}
          initialValue={name}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="类型代码:"
          name="code"
          rules={[{ required: true, message: '请输入!' }]}
          initialValue={code}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="排序:"
          name="sort"
          rules={[{ required: true, message: '请输入!' }]}
          initialValue={sort}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="备注:" name="remark" initialValue={remark}>
          <Input type="textarea" placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(EditForm)
