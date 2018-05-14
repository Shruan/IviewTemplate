import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout'
import store from '@/store'
import iView from 'iview'
import HomePage from '@/pages/homePage'
import Error from '@/components/Error'

import orderView from './orderView' // 模板管理
import knowledgeBase from './knowledgeBase' // 模板管理
import templateManage from './templateManage' // 模板管理
import componentsTest from './componentsTest' // 组件测试库

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'Index',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'HomePage',
          component: HomePage,
          meta: { name: '首页' }
        },
        {
          path: 'error',
          name: 'Error',
          component: Error
          // meta: { name: '错误' }
        },
        ...orderView,
        ...knowledgeBase,
        ...templateManage,
        ...componentsTest
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
  // 根据meta中的name生成面包屑
  let breadcrumbList = []
  for (let record of to.matched) {
    if (record.meta.name) {
      breadcrumbList.push({ path: record.fullPath, name: record.meta.name })
    }
  }
  store.commit('menu/_breadcrumbList', breadcrumbList)
  // 回退或前进时根据url设置选中标签
  let rootPath = to.fullPath.split('/')[1]
  if (rootPath === 'index') {
    store.commit('menu/_tag', '-1')
  } else {
    var secondMenuList = store.state.menu.secondMenuList
    for (var i = 0; i < secondMenuList.length; i++) {
      for (var j = 0; j < secondMenuList[i].length; j++) {
        for (var k = 0; k < secondMenuList[i][j].list.length; k++) {
          let routerName = secondMenuList[i][j].list[k].routerName
          routerName = routerName[0].toLowerCase() + routerName.substring(1)
          if (routerName === rootPath) {
            store.commit('menu/_tag', i + '-' + j + '-' + k)
          }
        }
      }
    }
  }
})

router.afterEach((to, from) => {
  // 关闭加载进度条
  if (to.matched[to.matched.length - 1].name === 'Error') {
    iView.LoadingBar.error()
  } else {
    iView.LoadingBar.finish()
  }
})

export default router
