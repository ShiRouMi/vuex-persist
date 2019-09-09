const LS = window.localStorage
const KEY = "vuex-persist"
let Observer = null

const getStorage = key => {
  if (!key) return false
  return JSON.parse(LS.getItem(key))
}

const setStorage = (key, value) => {
  if (!key) return false
  value = JSON.stringify(value)
  LS.setItem(key, value)
}

const removeStorage = key => {
  if (!key) return false
  LS.removeItem(key)
}

const initState = store => {
  let data = getStorage(KEY),
    mergeData = Object.assign(store.state, data)
  data && store.replaceState(mergeData)
}

const storagePlugins = store => {
  initState(store)

  store.subscribe((mutation, state) => {

    let observerState = {}
    if (Observer) {
      for (let item of Observer) {
        observerState[item] = state[item]
      }
    } else {
      observerState = state
    }
    setStorage(KEY, observerState)

  })
}

const setObserver = array => {
  Observer = array
}

storagePlugins.remove = () => removeStorage(KEY)
storagePlugins.observer = setObserver
export default storagePlugins
