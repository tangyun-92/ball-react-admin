/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: '首页',
    path: '/dashboard',
    icon: 'home',
    roles: ['admin', 'editor', 'guest'],
  },
  {
    title: '系统管理',
    path: '/system',
    icon: 'home',
    roles: ['admin', 'editor', 'guest'],
    children: [
      {
        title: '字典管理',
        path: '/system/dict',
        icon: 'home',
        roles: ['admin', 'editor', 'guest'],
      },
    ],
  },
  {
    title: '数据管理',
    path: '/data-management',
    icon: 'home',
    roles: ['admin', 'editor', 'guest'],
    children: [
      {
        title: '球员管理',
        path: '/data-management/player',
        icon: 'home',
        roles: ['admin', 'editor', 'guest'],
      },
      {
        title: '球队管理',
        path: '/data-management/team',
        icon: 'home',
        roles: ['admin', 'editor', 'guest'],
      },
    ],
  },
  // {
  //   title: '路由嵌套',
  //   path: '/nested',
  //   icon: 'cluster',
  //   roles: ['admin', 'editor'],
  //   children: [
  //     {
  //       title: '菜单1',
  //       path: '/nested/menu1',
  //       children: [
  //         {
  //           title: '菜单1-1',
  //           path: '/nested/menu1/menu1-1',
  //           roles: ['admin', 'editor'],
  //         },
  //         {
  //           title: '菜单1-2',
  //           path: '/nested/menu1/menu1-2',
  //           children: [
  //             {
  //               title: '菜单1-2-1',
  //               path: '/nested/menu1/menu1-2/menu1-2-1',
  //               roles: ['admin', 'editor'],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // }
]
export default menuList;
