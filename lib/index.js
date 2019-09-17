const LS = window.localStorage;
let KEY = "vuex-storage-state";
let Observer;
let isObserve = true;
const getStorage = (key) => {
    if (!key)
        return false;
    let val = LS.getItem(key);
    return JSON.parse(val);
};
const setStorage = (key, value) => {
    if (!key)
        return false;
    value = JSON.stringify(value);
    LS.setItem(key, value);
};
const removeStorage = (key) => {
    if (!key)
        return false;
    LS.removeItem(key);
};
const initState = (store, key) => {
    let data = getStorage(key), mergeData = Object.assign(store.state, data);
    data && store.replaceState(mergeData);
};
const storagePlugins = (options) => {
    let { name = KEY, observer } = options;
    let { list, sign = true } = observer;
    KEY = name;
    Observer = list;
    isObserve = sign;
    return (store) => {
        initState(store, name);
        store.subscribe((mutation, state) => {
            let observerState = {};
            if (Observer) {
                if (isObserve) {
                    for (let item of Observer) {
                        observerState[item] = state[item];
                    }
                }
                else {
                    for (let item in state) {
                        if (!Observer.includes(item)) {
                            observerState[item] = state[item];
                        }
                    }
                }
            }
            else {
                observerState = state;
            }
            setStorage(name, observerState);
        });
    };
};
storagePlugins.remove = () => removeStorage(KEY);
export default storagePlugins;
