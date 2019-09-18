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

const getStorage: (key: string) => string | boolean = (key: string):string | boolean => {
  if (!key) return false
  let val: any = LS.getItem(key)
  return JSON.parse(val)
}

const setStorage: (key: string, value: any) => any = (key: string, value: any): any => {
  if (!key) return false
  value = JSON.stringify(value)
  LS.setItem(key, value)
}

const removeStorage: (key: string) => any = (key: string): any => {
  if (!key) return false
  LS.removeItem(key)
}

class VuexStorageState {
  constructor({ name = KEY, observer }: VuexStorageState) {
    this.name = name
    this.observer = observer

    window
      ? window.removeVuexStorageState = ():void => {
          this.remove()
        }
      : undefined
  }

  initState(store: Store): void {
    let data = getStorage(this.name),
      mergeData = (<any>Object).assign(store.state, data)
    data && store.replaceState(mergeData)
  }

  storageState(state: any):void {
    let observerState: any = {}
    let { list, sign = true } = this.observer
    if (list) {
      if (sign) {
        for (let item of list) {
          observerState[item] = state[item]
        }
      } else {
        for (let item in state) {
          if (!(<any>list).includes(item)) {
            observerState[item] = state[item]
          }
        }
      }
    } else {
      observerState = state
    }
    setStorage(this.name, observerState)
  }

  remove(): void {
    removeStorage(this.name)
  }
}
const storagePlugins = (options: VuexStorageState) => {

  let vuexStorageState = new VuexStorageState(options)

  return (store: Store): void => {
    vuexStorageState.initState(store)

    store.subscribe((mutation, state) => {
      vuexStorageState.storageState(state)
    })
  }
}

export default storagePlugins
