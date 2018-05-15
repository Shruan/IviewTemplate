import Index from '@/components'
import TemplateCenter from '@/pages/templateManage/templateCenter'
import ProcessSetting from '@/pages/templateManage/templateCenter/processSetting'

export default [
  {
    path: '/null',
    component: Index,
    meta: { name: '应用模板' },
    children: [
      {
        path: '/templateCenter',
        name: 'TemplateCenter',
        component: TemplateCenter,
        meta: {
          name: '模板中心', tag: true
        }
      },
      {
        path: '/templateCenter/processSetting',
        name: 'ProcessSetting',
        component: ProcessSetting,
        meta: { name: '流程设置' }
      }
    ]
  }
]
