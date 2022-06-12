import {createLogger, createStore, Store, StoreOptions, useStore as baseUseStore} from "vuex";
import {InjectionKey} from 'vue'
import {RootState} from "./types";
import {orders} from "./modules/orders";

const debug = import.meta.env.DEV

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    state: {
        version: 1,
    },
    modules: {
        orders,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})


export function useStore() {
    return baseUseStore(key)
}



