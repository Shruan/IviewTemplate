import Index from '@/components'
import FAQManage from '@/pages/knowledgeBase/FAQManage'

export default [
  {
    path: '/nothing',
    component: Index,
    meta: { name: 'FAQ管理' },
    children: [
      {
        path: '/FAQManage',
        name: 'FAQManage',
        component: FAQManage
      }
    ]
  }
]
