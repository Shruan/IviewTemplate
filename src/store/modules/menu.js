import $$ from '@/store/plugins/storage'
import menuList from './menuList'

const namespace = 'menu'
$$.setNamespace(namespace)

const homeTag = { routerName: 'Index', label: '首页' }  // 首页页签

const state = {
  // 一级菜单列表
  firstMenuList: menuList.firstMenuList,
  // 二级菜单列表
  secondMenuList: menuList.secondMenuList,
  // 标签列表
  tagList: $$.get(namespace + '/tagList') || [homeTag],
  // 面包屑
  breadcrumbList: $$.get(namespace + '/breadcrumbList') || [],
  // 选中的一级菜单名称（即下标）
  firstMenu: $$.get(namespace + '/firstMenu') || 0,
  // 选中的二级菜单名称（形式为0-0）
  // secondMenu: $$.get(namespace + '/secondMenu') || 0,
  // 选中的标签名称（形式为0-0-0）
  tag: $$.get(namespace + '/tag') || homeTag.routerName,
  // 是否显示
  isVisibleSecondMenu: $$.get(namespace + '/isVisibleSecondMenu') !== ''
  ? $$.get(namespace + '/isVisibleSecondMenu') : true
}

const mutations = {
  _firstMenu (state, value) {
    state.firstMenu = value
  },
  _tagList (state, value) {
    state.tagList = value
  },
  _breadcrumbList (state, value) {
    state.breadcrumbList = value
  },
  // _secondMenu (state, value) {
  //   state.secondMenu = value
  // },
  _tag (state, value) {
    state.tag = value
  },
  _isVisibleSecondMenu (state, value) {
    state.isVisibleSecondMenu = !state.isVisibleSecondMenu
  }
}

const actions = {
  // 添加一个标签并选中
  _AddTag ({ commit, state }, data) {
    // 菜单为标签时添加tag
    if (data.meta.tag) {
      let tag = {
        routerName: data.name,
        label: data.meta.name
      }
      let tagList = state.tagList
      // 查询标签是否已存在
      if (!tagList.some(item => item.routerName === tag.routerName)) {
        tagList.push(tag)
        commit('_tagList', tagList)
      }
      commit('_tag', tag.routerName)
    }
  },
  // 删除一个标签并设置选中规则
  _DelTag ({ commit, state }, value) {
    // 关闭选中的标签
    let tagList = state.tagList.filter(item => {
      return [value].indexOf(item.routerName) === -1
    })
    if (value === state.tag) {
      let index // 当前选中的tag下标
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tag === state.tagList[i].routerName) {
          index = i
        }
      }
      // 若删除的即是选中的
      commit('_tag', state.tagList[index - 1].routerName)
    }
    commit('_tagList', tagList)
  },
  // 关闭所有标签
  _DelAllTag ({ commit, state }, value) {
    commit('_tagList', [homeTag])
    commit('_tag', homeTag.routerName)
  },
  // 关闭左侧标签
  _DelLeftTag ({ commit, state }, value) {
    let tag = state.tag
    let tagList = state.tagList
    let tagIndex = 0
    tagList.forEach((val, index, arr) => {
      if (tag === val) {
        tagIndex = index
      }
    })
    tagList.splice(1, tagIndex - 1)
    commit('_tagList', tagList)
  },
  // 关闭右侧标签
  _DelRightTag ({ commit, state }, value) {
    let tag = state.tag
    let tagList = state.tagList
    let tagIndex = 0
    let len = tagList.length
    tagList.forEach((val, index, arr) => {
      if (tag === val) {
        tagIndex = index
      }
    })
    tagList.splice(tagIndex + 1, len - tagIndex)
    commit('_tagList', tagList)
  },
  // 关闭其他标签
  _DelOhterTag ({ commit, state }, value) {
    let tagList = state.tagList.filter(item => {
      return [homeTag.routerName, state.tag].indexOf(item.routerName) !== -1
    })
    commit('_tagList', tagList)
  }
}

export default { namespaced: true, state, mutations, actions }
