import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
const Dashboard = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/dashboard'),
  loading: Loading,
})
const Dict = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/system/dict'),
  loading: Loading,
})
const PlayerInfo = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/player/info'),
  loading: Loading,
})
const Error404 = Loadable({
  loader: () => import(/*webpackChunkName:'Error404'*/ '@/views/error/404'),
  loading: Loading,
})

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    roles: ['admin', 'editor', 'guest'],
  },
  {
    path: '/system/dict',
    component: Dict,
    roles: ['admin', 'editor', 'guest'],
  },
  {
    path: '/player/info',
    component: PlayerInfo,
    roles: ['admin', 'editor', 'guest'],
  },
  { path: '/error/404', component: Error404 },
]
