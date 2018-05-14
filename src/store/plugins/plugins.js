import $$ from './storage'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    let st = state
    let key = ''
    let storageKey = ''
    for (let type of mutation.type.split('/')) {
      if (type[0] === '_') {
        key = type.substring(1)
        st = st[key]
        storageKey += key
      } else {
        st = st[type]
        storageKey += type + '/'
      }
    }
    $$.set(storageKey, st)
  })
}

export default [localStoragePlugin]
