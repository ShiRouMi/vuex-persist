
# vuex-storage-state
[![NPM](https://nodei.co/npm/vuex-storage-state.png)](https://nodei.co/npm/vuex-storage-state/)

Vuex 状态持久化插件

Vuex 是一个状态管理器，有一个缺点是：在刷新页面后，Vuex 的状态都会被重置。

> 如何让 Vuex 数据持久化？

配合 HTML5 本地存储方案 localStorage 或者 sessionStorage 进行存储，但是有一些情况需要考虑：

- 并不是所有的状态都需要放入本地存储
- 状态默认值，重置状态默认值，默认值不一，''、0、false 各种类型（defaultState) ---- 初始备份 state
- safari 无痕模式 localstorage, sessionStorage 会被禁用

本插件用于自动保存和还原 Vuex 状态，使得刷新页面后，Vuex 状态不变。

## DEMO
http://fefeng.cn/vuex-storage-state/

## Requirements
- Vue.js (v2.0.0+)
- Vuex (v2.0.0+)

## Install
```js
npm install vuex-storage-state --save

yarn add vuex-storage-state - D
```

## Use
```js
// import 导入
import VuexStorageState from 'vuex-storage-state'

// 添加到 store
const store = new Vuex.Store({
  // ...
  plugins: [
    VuexStorageState() // 默认存储所有状态
  ]
})
```

## API
`createPersistedState([options])`
- name: string
- list: Array 数组的每一项是监听的

```js
const store = new Vuex.Store({
  // ...
  plugins: [
    VuexStorageState({
      name: 'vuex-storage-state',
      observer: {
        list: ['cart'], // 存储 cart 模块
        isFilter: true // 默认 false, 如果设为 true，那么为过滤 cart 模块
      },
      observer: {
        list: ['cart.isCheckout'] // 存储 cart 模块下的 isCheckout 状态
      }
    })
  ]
})
```

### 清除 storage
```js
window.removeVuexStorageState()
```