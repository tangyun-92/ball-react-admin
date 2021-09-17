import React, { memo } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { getUserInfo } from "@/store/actions";
import Layout from '@/views/layout'
import Login from '@/views/login'

const mapStateToProps = (state) => ({
  token: state.user.token,
  role: state.user.role
})

function Router(props) {
  // const { token, role } = useSelector(
  //   (state) => ({
  //     token: state.user.get('token'),
  //     role: state.user.get('role')
  //   }),
  //   shallowEqual
  // )
  const { token, role } = props

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          path="/"
          render={() => {
            if (!token) {
              return <Redirect to="/login" />
            } else {
              if (role) {
                return <Layout />
              } else {
                // getUserInfo(token).then(() => <Layout />);
                return <Layout />
              }
            }
          }}
        />
      </Switch>
    </HashRouter>
  )
}



export default connect(mapStateToProps)(memo(Router))
