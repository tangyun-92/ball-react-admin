import React, { memo } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import { connect, useDispatch } from 'react-redux'
import DocumentTitle from 'react-document-title'
import './index.less'
import { getLoginAction } from '@/store/user/actionCreators'

const mapStateToProps = (state) => ({
  token: state.user.token,
})

function Login(props) {
  // const Login = (props) => {
  // const { form, token, login } = props
  // const { getFieldDecorator } = form

  const dispatch = useDispatch()
  // const { token } = useSelector(
  //   (state) => ({
  //     token: state.user.get('token'),
  //   }),
  //   shallowEqual
  // )
  const { token } = props
  console.log(props)

  // 获取用户信息
  // const handleUserInfo = (token) => {
  //   getUserInfo(token)
  //     .then((data) => {})
  //     .catch((error) => {
  //       message.error(error);
  //     });
  // };

  const handleSubmit = (data) => {
    dispatch(getLoginAction(data))
  }

  if (token) {
    return <Redirect to="/dashboard" />
  }
  return (
    <DocumentTitle title={'用户登录'}>
      <div className="login-container">
        <Form
          className="content"
          initialValues={{ remember: true }}
          onFinish={(e) => handleSubmit(e)}
          // onFinishFailed={(e) => onFinishFailed(e)}
        >
          <div className="title">
            <h2>用户登录</h2>
          </div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
            initialValue={'admin'}
          >
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            initialValue={'4YS8pXDMcZNSqEymv0uxDg=='}
          >
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <span>账号 : admin 密码 : 随便填</span>
            <br />
            <span>账号 : editor 密码 : 随便填</span>
            <br />
            <span>账号 : guest 密码 : 随便填</span>
          </Form.Item>
        </Form>
      </div>
    </DocumentTitle>
  )
  // }
}

export default connect(mapStateToProps)(memo(Login))
