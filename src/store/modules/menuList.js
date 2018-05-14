export default {
  // 一级菜单
  firstMenuList: [
    {
      icon: 'android-list',
      name: '工单'
    },
    {
      icon: 'person-stalker',
      name: '客户'
    },
    {
      icon: 'android-chat',
      name: '会话'
    },
    {
      icon: 'ios-briefcase',
      name: '办公'
    },
    {
      icon: 'cube',
      name: '库存'
    },
    {
      icon: 'social-yen',
      name: '财务'
    },
    {
      icon: 'podium',
      name: '运营'
    },
    {
      icon: 'ios-gear',
      name: '设置'
    }
  ],
  // 二级菜单
  secondMenuList: [
    [
      {
        name: '工单视图',
        icon: 'ios-list-outline',
        list: [
          {
            name: '列表页面模板',
            routerName: 'AllOrder'
          },
          {
            name: '查看图片组件',
            routerName: 'PicsCheck'
          },
          {
            name: '地图选址组件',
            routerName: 'AMapModal'
          },
          {
            name: '图标选择组件',
            routerName: 'IconSelect'
          },
          {
            name: '上传图片组件',
            routerName: 'UploadImg'
          },
          {
            name: '自定义表单',
            routerName: 'CustomFiledForm'
          }
        ]
      }
    ],
    [
      {
        name: '客户视图',
        icon: 'ios-person-outline',
        list: [
          {
            name: '全部客户',
            routerName: 'AllOrder'
          },
          {
            name: '视图管理',
            routerName: 'AllOrder'
          }
        ]
      }
    ],
    [
      {
        name: '呼叫中心',
        icon: 'ios-telephone-outline',
        list: [
          {
            name: '通话记录',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '消息中心',
        icon: 'ios-bell-outline',
        list: [
          {
            name: '工单消息',
            routerName: 'AllOrder'
          },
          {
            name: '运营消息',
            routerName: 'AllOrder'
          }
        ]
      }
    ],
    [
      {
        name: '知识库管理',
        icon: 'ios-bookmarks-outline',
        list: [
          {
            name: 'FAQ管理',
            routerName: 'FAQManage'
          },
          {
            name: '文档管理',
            routerName: 'AllOrder'
          },
          {
            name: '公告管理',
            routerName: 'AllOrder'
          }
        ]
      }
    ],
    [
      {
        name: '备件管理',
        icon: 'ios-browsers-outline',
        list: [
          {
            name: '备件列表',
            routerName: 'AllOrder'
          },
          {
            name: '库存日志',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '产品管理',
        icon: 'ios-albums-outline',
        list: [
          {
            name: '产品模板',
            routerName: 'AllOrder'
          },
          {
            name: '产品列表',
            routerName: 'AllOrder'
          }
        ]
      }
    ],
    [
      {
        name: '财务对账',
        icon: 'ios-checkmark-outline',
        list: [
          {
            name: '财务对账',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '佣金结算',
        icon: 'social-yen-outline',
        list: [
          {
            name: '个人结算',
            routerName: 'AllOrder'
          },
          {
            name: '团队结算',
            routerName: 'AllOrder'
          }
        ]
      }
    ],
    [
      {
        name: '数据看板',
        icon: 'ios-monitor-outline',
        list: [
          {
            name: '企业看板',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '统计报表',
        icon: 'ios-paper-outline',
        list: [
          {
            name: '统计报表',
            routerName: 'AllOrder'
          },
          {
            name: '自定义报表',
            routerName: 'AllOrder'
          }
        ]
      }
    ],
    [
      {
        name: '门户管理',
        icon: 'ios-home-outline',
        size: '17',
        list: [
          {
            name: '服务管理',
            routerName: 'AllOrder'
          },
          {
            name: '门户配置',
            routerName: 'AllOrder'
          },
          {
            name: '渠道接入',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '服务自动化',
        icon: 'ios-refresh-outline',
        list: [
          {
            name: '自动分配',
            routerName: 'AllOrder'
          },
          {
            name: '自动派单',
            routerName: 'AllOrder'
          },
          {
            name: '自动抄送',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '模板管理',
        icon: 'ios-photos-outline',
        list: [
          {
            name: '模板中心',
            routerName: 'TemplateCenter'
          }
        ]
      },
      {
        name: '人员管理',
        icon: 'ios-people-outline',
        size: '18',
        list: [
          {
            name: '角色权限',
            routerName: 'AllOrder'
          },
          {
            name: '组织架构',
            routerName: 'AllOrder'
          },
          {
            name: '服务团队',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '消息通知',
        icon: 'ios-chatbubble-outline',
        list: [
          {
            name: '短信消息',
            routerName: 'AllOrder'
          },
          {
            name: '工作通知',
            routerName: 'AllOrder'
          }
        ]
      },
      {
        name: '系统设置',
        icon: 'ios-gear-outline',
        list: [
          {
            name: '回访设置',
            routerName: 'AllOrder'
          },
          {
            name: '客户设置',
            routerName: 'AllOrder'
          },
          {
            name: '财务设置',
            routerName: 'AllOrder'
          },
          {
            name: '参数设置',
            routerName: 'AllOrder'
          }
        ]
      }
    ]
  ]
}
