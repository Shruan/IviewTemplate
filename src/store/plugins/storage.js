const prefix = '[smy-web] - '

export default {
  namespace: '',
  setNamespace (namespace) {
    this.namespace = namespace
  },
  set (key, value) {
    window.localStorage.setItem(prefix + key, JSON.stringify(value))
  },
  get (key) {
    // key = this.namespace ? (this.namespace + '/' + key) : key
    let value = window.localStorage.getItem(prefix + key)
    return value ? JSON.parse(value) : ''
  }
}
