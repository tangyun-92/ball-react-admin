import React, { memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Upload, Form } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import useUploadImgHooks from '@/hooks/useUploadImgHooks'

const UploadImg = (props) => {
  const { imgUrl, uploadUrl, label, name, valuePropName } = props
  const baseUrl = process.env.REACT_APP_BASE_API

  const { token } = useSelector(
    (state) => ({
      token: state.user.token,
    }),
    shallowEqual
  )

  const { imageUrl, handleChange, uploadLoading } = useUploadImgHooks({
    url: imgUrl,
  })

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  return (
    <Form.Item
      label={label}
      name={name}
      valuePropName={valuePropName}
      getValueFromEvent={normFile}
      style={{ marginTop: 10, marginLeft: 60 }}
    >
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${baseUrl}${uploadUrl}`}
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
  )
}

export default memo(UploadImg)
