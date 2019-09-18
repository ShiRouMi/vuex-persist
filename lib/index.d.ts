import { Store } from 'vuex';
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
declare class VuexStorageState {
    constructor({ name, observer }: VuexStorageState);
    initState(store: Store): void;
    storageState(state: any): void;
    remove(): void;
}
declare const storagePlugins: (options: VuexStorageState) => (store: Store) => void;
export default storagePlugins;
