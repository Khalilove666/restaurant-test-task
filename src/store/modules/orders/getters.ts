import {GetterTree} from 'vuex';
import {Order, OrderState} from "./types";
import {RootState} from "../../types";

export const getters: GetterTree<OrderState, RootState> = {
    allOrders({orders}): Array<Order> {
        return orders;
    },
    countAll({orders}) {
        return orders.length
    },
    countFinished({orders}) {
        return orders.filter((o) => o.status == "finished").length
    },
    countCancelled({orders}) {
        return orders.filter((o) => o.status == "cancelled").length
    },
    countContinuous(state, getters) {
        return getters.countAll - (getters.countFinished + getters.countCancelled)
    },
    revenue({orders}) {
        return orders.reduce((sum, order) => sum + order.products.reduce((acc, prod) => acc + prod.price, 0), 0)
    },
};