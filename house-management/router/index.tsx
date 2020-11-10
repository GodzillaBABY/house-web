
export default {
  routes: [
    {
      name: '房源系统', // 兼容此写法
      path: '/',
      routes: [
        {
          path: '/house/index',
          component: '@/pages/house/list/list',
          name: '房源列表'
        },
        {
          path: '/house/create/create',
          component: '@/pages/house/create/create',
          name: '新增房源'
        },
        {
          path: '/house/edit/edit',
          component: '@/pages/house/edit/edit',
          name: '编辑房源'
        }
      ]
    }
  ]
}