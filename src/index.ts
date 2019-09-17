import { Store } from 'vuex'

/**
 * 需要监听的属性名
 * sign: true 时候 list 是被观察的对象
 * sign: false 时候 list 是不被观察的对象
 * @interface observerOptions
 */
interface observerOptions {
  list: string[];
  sign?: boolean;
}

interface VuexStorageState {
  name: string;
  observer: observerOptions;
}

const LS = window.localStorage
let KEY: string = "vuex-storage-state"
let Observer: string[]
let isObserve: boolean = true

const getStorage = (key: string) => {
  if (!key) return false
  let val: any = LS.getItem(key)
  return JSON.parse(val)
}

const setStorage = (key: string, value: any): any => {
  if (!key) return false
  value = JSON.stringify(value)
  LS.setItem(key, value)
}

const removeStorage = (key: string): any => {
  if (!key) return false
  LS.removeItem(key)
}

const initState = (store: Store, key: string) => {
  let data = getStorage(key),
    mergeData = (<any>Object).assign(store.state, data)
  data && store.replaceState(mergeData)
}

const storagePlugins = (options: VuexStorageState) => {

  let { name=KEY, observer } = options
  let { list, sign=true } = observer
  KEY = name
  Observer = list
  isObserve = sign

  return (store: Store) => {
    initState(store, name)

    store.subscribe((mutation: any, state: any) => {
      let observerState: any = {}
      if (Observer) {
        if (isObserve) {
          for (let item of Observer) {
            observerState[item] = state[item]
          }
        } else {
          for (let item in state) {
            if (!(<any>Observer).includes(item)) {
              observerState[item] = state[item]
            }
          }
        }
      } else {
        observerState = state
      }
      setStorage(name, observerState)
    })
  }
}

storagePlugins.remove = () => removeStorage(KEY)
export default storagePlugins
