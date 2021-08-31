/*
 * @Author: 唐云
 * @Date: 2021-08-27 17:07:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-30 10:53:18
 * 球员信息 - 新增/编辑
 */
import React, { Component } from 'react'
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import { filterDict } from '@/utils'
import moment from 'moment'

class EditForm extends Component {
  render() {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
      teamList,
      nationList,
    } = this.props
    const { getFieldDecorator } = form
    const {
      id,
      name,
      english_name,
      team_id,
      avatar,
      nation_id,
      uniform_number,
      high,
      weight,
      birthday,
      position,
      feet,
      inverse_enough,
      fancy_tricks,
      international_reputation,
      price,
      contract_expire,
      technical_feature,
      strong_point,
      weak_point,
    } = currentRowData
    const title = id ? '编辑' : '新增'
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    }

    return (
      <Modal
        width={1100}
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Row>
            <Col span={8}>
              <Form.Item label="姓名:">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: name,
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="英文名:">
                {getFieldDecorator('english_name', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: english_name,
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="球队:">
                {getFieldDecorator('team_id', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: team_id,
                })(
                  <Select showSearch optionFilterProp="children">
                    {teamList.map((val) => (
                      <Select.Option value={val.id} key={val.id}>
                        {val.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="国籍:">
                {getFieldDecorator('nation_id', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: nation_id,
                })(
                  <Select showSearch optionFilterProp="children">
                    {nationList.map((val) => (
                      <Select.Option value={val.id} key={val.id}>
                        {val.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="球衣号码:">
                {getFieldDecorator('uniform_number', {
                  initialValue: uniform_number,
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="身高:">
                {getFieldDecorator('high', {
                  initialValue: high,
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="体重:">
                {getFieldDecorator('weight', {
                  initialValue: weight,
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="生日:">
                {getFieldDecorator('birthday', {
                  initialValue: id ? moment(birthday, 'YYYY-MM-DD') : birthday,
                })(<DatePicker placeholder="请选择" format="YYYY-MM-DD" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="位置:">
                {getFieldDecorator('position', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: position,
                })(
                  <Select showSearch optionFilterProp="children">
                    {filterDict('wz') &&
                      filterDict('wz').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="惯用脚:">
                {getFieldDecorator('feet', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: feet,
                })(
                  <Select showSearch optionFilterProp="children">
                    {filterDict('gyj') &&
                      filterDict('gyj').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="逆足能力:">
                {getFieldDecorator('inverse_enough', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: inverse_enough,
                })(
                  <Select showSearch optionFilterProp="children">
                    {filterDict('star') &&
                      filterDict('star').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="花式技巧:">
                {getFieldDecorator('fancy_tricks', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: fancy_tricks,
                })(
                  <Select showSearch optionFilterProp="children">
                    {filterDict('star') &&
                      filterDict('star').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="国际声望:">
                {getFieldDecorator('international_reputation', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: international_reputation,
                })(
                  <Select showSearch optionFilterProp="children">
                    {filterDict('star') &&
                      filterDict('star').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="身价:">
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: price,
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="合同到期:">
                {getFieldDecorator('contract_expire', {
                  initialValue: id
                    ? moment(contract_expire, 'YYYY-MM-DD')
                    : contract_expire,
                })(<DatePicker placeholder="请选择" format="YYYY-MM-DD" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="技术特点:">
                {getFieldDecorator('technical_feature', {
                  initialValue: technical_feature,
                })(
                  <Select mode="multiple" optionFilterProp="children">
                    {filterDict('jstd') &&
                      filterDict('jstd').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="强项:">
                {getFieldDecorator('strong_point', {
                  initialValue: strong_point,
                })(
                  <Select mode="multiple" optionFilterProp="children">
                    {filterDict('qrx') &&
                      filterDict('qrx').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="弱项:">
                {getFieldDecorator('weak_point', {
                  initialValue: weak_point,
                })(
                  <Select mode="multiple" optionFilterProp="children">
                    {filterDict('qrx') &&
                      filterDict('qrx').map((val) => (
                        <Select.Option value={val.code} key={val.code}>
                          {val.name}
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row></Row>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'EditForm' })(EditForm)
