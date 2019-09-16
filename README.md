
# vuex-storage-state
[![NPM](https://nodei.co/npm/vuex-storage-state.png)](https://nodei.co/npm/vuex-storage-state/)

Vuex 状态持久化插件

Vuex 是一个状态管理器，有一个缺点是：在刷新页面后，Vuex 的状态都会被重置。

> 如何让 Vuex 数据持久化？

配合 HTML5 本地存储方案 localStorage 或者 sessionStorage 进行存储，但是有一些情况需要考虑：

- 并不是所有的状态都需要放入本地存储
- 状态默认值，重置状态默认值，默认值不一，''、0、false 各种类型（defaultState) ---- 初始备份 state
- safari 无痕模式 localstorage, sessionStorage 会被禁用
- 有的数据要存 localstorage，有的要存 sessionStorage?

本插件用于自动保存和还原 Vuex 状态，使得刷新页面后，Vuex 状态不变。

## Requirements
- Vue.js (v2.0.0+)
- Vuex (v2.0.0+)

## Install
```js
npm install vuex-storage-state --save

yarn add vuex-storage-state
```

## Use
```js
// import 导入
import VuexStorageState from 'vuex-storage-state'

// 添加到 store
const store = new Vuex.Store({
  // ...
  plugins: [VuexStorageState]
})
```

### 清除 storage
```js
VuexStorageState.remove()
```

### 添加观察者，默认保存所有 state
```js
/* array 是数组类型
   sign 是布尔类型
   sign: true 时候 array 是被保存的 state
   sign: false 时候 array 是不被保存的 state
*/

VuexStorageState.observer(array, sign)
```

## TODO
- 当使用到 Module，目前只能存储某个模块的所有状态，对于仅存储某个模块的某个 state 还没有做区分
- ts 版本 
