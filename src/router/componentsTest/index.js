import Index from '@/components'
import PicsCheck from '@/pages/componentsTest/picsCheck'
import AMapModal from '@/pages/componentsTest/aMapModal'

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
        meta: {
          name: '查看图片',
          tag: true
        }
      },
      {
        path: '/aMapModal',
        name: 'AMapModal',
        component: AMapModal,
        meta: {
          name: '地图选址',
          tag: true
        }
      }
    ]
  }
]
