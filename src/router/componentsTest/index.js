import Index from '@/components'
import PicsCheck from '@/pages/componentsTest/picsCheck'

export default [
  {
    path: '/nothing',
    component: Index,
    meta: { name: '组件测试' },
    children: [
      {
        path: '/picsCheck',
        name: 'PicsCheck',
        component: PicsCheck,
        meta: { name: '查看图片' }
      }
    ]
  }
]
