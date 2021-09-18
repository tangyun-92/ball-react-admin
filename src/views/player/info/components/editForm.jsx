/*
 * @Author: 唐云
 * @Date: 2021-08-27 17:07:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-18 10:36:31
 * 球员信息 - 新增/编辑
 */
import React, { memo, useEffect, useState } from 'react'
import { Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from 'antd'
import { filterDict } from '@/utils'
import moment from 'moment'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { shallowEqual, useSelector } from 'react-redux'

const EditForm = (props) => {
  const [uploadLoading, setUploadLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const baseUrl = process.env.REACT_APP_BASE_API
  const { visible, onCancel, onOk, formData, teamList, nationList } = props
  const {
    id,
    name,
    english_name,
    team_id,
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

  const { token } = useSelector(
    (state) => ({
      token: state.user.token,
    }),
    shallowEqual
  )

  useEffect(() => {
    setImageUrl('')
    // 编辑时，将日期回显通过moment包裹起来
    if (formData.birthday) {
      formData.birthday = moment(formData.birthday)
    }
    if (formData.contract_expire) {
      formData.contract_expire = moment(formData.contract_expire)
    }
    if (formData.avatar) {
      setImageUrl(formData.avatar)
    }
    form.resetFields()
    form.setFieldsValue(formData)
  }, [form, formData])

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return setUploadLoading(true)
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imgUrl) => {
        setUploadLoading(false)
        setImageUrl(imgUrl)
      })
    }
  }

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
              label="姓名:"
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
              label="球队:"
              name="team_id"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={team_id}
            >
              <Select showSearch optionFilterProp="children">
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
          <Col span={8}>
            <Form.Item
              label="国籍:"
              name="nation_id"
              rules={[{ required: true, message: '请输入!' }]}
              initialValue={nation_id}
            >
              <Select showSearch optionFilterProp="children">
                {nationList.map((val) => (
                  <Select.Option value={val.id} key={val.id}>
                    {val.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="球衣号码:"
              name="uniform_number"
              initialValue={uniform_number}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="身高:" name="high" initialValue={high}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="体重:" name="weight" initialValue={weight}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="生日:" name="birthday" initialValue={birthday}>
              <DatePicker placeholder="请选择" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="位置:"
              name="position"
              initialValue={position}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Select showSearch optionFilterProp="children">
                {filterDict('wz') &&
                  filterDict('wz').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="惯用脚:"
              name="feet"
              initialValue={feet}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Select showSearch optionFilterProp="children">
                {filterDict('gyj') &&
                  filterDict('gyj').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="逆足能力:"
              name="inverse_enough"
              initialValue={inverse_enough}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Select showSearch optionFilterProp="children">
                {filterDict('star') &&
                  filterDict('star').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="花式技巧:"
              name="fancy_tricks"
              initialValue={fancy_tricks}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Select showSearch optionFilterProp="children">
                {filterDict('star') &&
                  filterDict('star').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="国际声望:"
              name="international_reputation"
              initialValue={international_reputation}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Select showSearch optionFilterProp="children">
                {filterDict('star') &&
                  filterDict('star').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="身价:"
              name="price"
              initialValue={price}
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="合同到期:"
              name="contract_expire"
              initialValue={contract_expire}
            >
              <DatePicker placeholder="请选择" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="技术特点:"
              name="technical_feature"
              initialValue={technical_feature}
            >
              <Select mode="multiple" optionFilterProp="children">
                {filterDict('jstd') &&
                  filterDict('jstd').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="强项:"
              name="strong_point"
              initialValue={strong_point}
            >
              <Select mode="multiple" optionFilterProp="children">
                {filterDict('qrx') &&
                  filterDict('qrx').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="弱项:"
              name="weak_point"
              initialValue={weak_point}
            >
              <Select mode="multiple" optionFilterProp="children">
                {filterDict('qrx') &&
                  filterDict('qrx').map((val) => (
                    <Select.Option value={val.code} key={val.code}>
                      {val.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            label="头像:"
            name="avatar"
            valuePropName="avatar"
            getValueFromEvent={normFile}
            style={{marginTop: 10, marginLeft: 60}}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${baseUrl}/players/upload`}
              headers={{ Authorization: 'Bearer ' + token }}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}

export default memo(EditForm)
