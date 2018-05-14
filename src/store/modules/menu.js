import $$ from '@/store/plugins/storage'
import menuList from './menuList'

const namespace = 'menu'
$$.setNamespace(namespace)

const state = {
  // 一级菜单列表
  firstMenuList: menuList.firstMenuList,
  // 二级菜单列表
  secondMenuList: menuList.secondMenuList,
  // 标签列表
  tagList: $$.get(namespace + '/tagList') || ['-1'],
  // 面包屑
  breadcrumbList: $$.get(namespace + '/breadcrumbList') || [],
  // 选中的一级菜单名称（即下标）
  firstMenu: $$.get(namespace + '/firstMenu') || 0,
  // 选中的二级菜单名称（形式为0-0）
  // secondMenu: $$.get(namespace + '/secondMenu') || 0,
  // 选中的标签名称（形式为0-0-0）
  tag: $$.get(namespace + '/tag') || '-1',
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
  _AddTag ({ commit, state }, value) {
    let tagList = state.tagList
    let index = tagList.length
    // 查询标签是否已存在
    for (var i = 0; i < tagList.length; i++) {
      if (value === tagList[i]) {
        index = i
      }
    }
    if (index === tagList.length) {
      tagList.push(value)
      commit('_tagList', tagList)
    }
    commit('_tag', value)
  },
  // 删除一个标签并设置选中规则
  _DelTag ({ commit, state }, value) {
    let tagList = state.tagList
    let index // 当前选中的tag下标
    for (let i = 0; i < tagList.length; i++) {
      if (state.tag === tagList[i]) {
        index = i
      }
    }
    // 查询标签是否已存在
    for (let i = 0; i < tagList.length; i++) {
      if (value === tagList[i]) {
        tagList.splice(i, 1)
        commit('_tagList', tagList)
        // 若删除在选中的左侧 则选择 已选中的前一个
        if (i < index) {
          commit('_tag', tagList[index - 1])
        } else if (i === index) {
          // 若删除的即是选中的
          if (index === tagList.length) {
            commit('_tag', tagList[index - 1])
          } else {
            commit('_tag', tagList[index])
          }
        }
      }
    }
  },
  // 关闭所有标签
  _DelAllTag ({ commit, state }, value) {
    let tagList = state.tagList.filter((val) => {
      return val === '-1'
    })
    // commit('_firstMenu', 1)
    commit('_tagList', tagList)
    commit('_tag', tagList[0])
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
    let tag = state.tag
    let tagList = state.tagList.filter((val) => {
      return val === '-1' || val === tag
    })
    commit('_tagList', tagList)
  }
}

export default { namespaced: true, state, mutations, actions }
