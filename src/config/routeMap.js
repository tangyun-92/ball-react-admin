import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
const Dashboard = Loadable({
  loader: () => import('@/views/dashboard'),
  loading: Loading,
})
const Dict = Loadable({
  loader: () => import('@/views/system/dict'),
  loading: Loading,
})
const PlayerInfo = Loadable({
  loader: () => import('@/views/data-management/player'),
  loading: Loading,
})
const Error404 = Loadable({
  loader: () => import('@/views/error/404'),
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
