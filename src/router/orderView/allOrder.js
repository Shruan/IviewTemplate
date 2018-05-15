import Index from '@/components'
import AllOrder from '@/pages/orderView/allOrder'

export default [
  {
    path: '/nothing',
    component: Index,
    meta: { name: '全部工单' },
    children: [
      {
        path: '/allOrder',
        name: 'AllOrder',
        component: AllOrder,
        meta: {
          name: '全部工单',
          tag: true
        }
      }
    ]
  }
]
