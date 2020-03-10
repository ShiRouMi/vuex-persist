import Vue from "vue";
import Vuex from "vuex";
import Storage from "dom-storage";
import createVuexStorageState from "./lib"

Vue.config.productionTip = false;

Vue.use(Vuex)

it("can be created with the default options", () => {
  window.localStorage = new Storage();
  expect(() => createVuexStorageState()).not.toThrow();
});

