import {Module} from "vuex";
import {OrderState} from "./types";
import {RootState} from "../../types";
import {actions} from "./actions";
import {getters} from "./getters";
import {mutations} from "./mutations";

export const state: OrderState = {
    orders: [],
};

export const orders: Module<OrderState, RootState> = {
    state,
    getters,
    actions,
    mutations
};