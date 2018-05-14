import $$ from '@/store/plugins/storage'

const namespace = 'test'
$$.setNamespace(namespace)

const state = {
  name: $$.get(namespace + '/name') || ''
}

const getters = {
  Name: state => state.name
}

const mutations = {
  _name (state, value) {
    state.name = value
  }
}

const actions = {
  _Name ({ commit }, value) {
    commit('_name', value)
  }
}

export default { namespaced: true, state, mutations, getters, actions }
