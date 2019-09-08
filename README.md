
# vuex-persist

Vuex 状态持久化插件

Vuex 是一个状态管理器，有一个缺点是：在刷新页面后，Vuex 的状态都会被重置。

> 如何让 Vuex 数据持久化？

配合 HTML5 本地存储方案 localStorage 或者 sessionStorage 进行存储，但是有一些情况需要考虑：

- 并不是所有的状态都需要放入本地存储
- 状态默认值，重置状态默认值，默认值不一，''、0、false 各种类型（defaultState)
- safari 无痕模式 localstorage, sessionStorage 会被禁用
- 有的数据要存 localstorage，有的要存 sessionStorage?

本插件用于自动保存和还原 Vuex 状态，使得刷新页面后，Vuex 状态不变。

## Use
```js
// import 导入
import VuexPersist from 'vuex-persist'

// 添加到 store
const store = new Vuex.Store({
  // ...
  plugins: [VuexPersist]
})
```

### 清除 storage
```js
remove()
```