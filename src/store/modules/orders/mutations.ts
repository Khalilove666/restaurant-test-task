import {MutationTree} from 'vuex';
import {Order, OrderState} from "./types";
import {OrderProduct} from "../../../store/types";

export const mutations: MutationTree<OrderState> = {
    importTemplate(state, payload: { orders: Array<Order> }) {
        state.orders = payload.orders;
    },
    addOrder(state, payload: { order: Order }) {
        state.orders.push(payload.order);
    },
    addProduct(state, payload: { orderId: string, product: OrderProduct }) {
        const index = state.orders.findIndex((order) => order.id == payload.orderId);
        state.orders[index].products.push(payload.product);
    },
    removeProduct(state, payload: { orderId: string, productId: string }) {
        const index = state.orders.findIndex((order) => order.id == payload.orderId);
        const productIndex = state.orders[index].products.findIndex(p => p.id == payload.productId);
        state.orders[index].products.splice(productIndex, 1);
    },
    cancelProduct(state, payload: { orderId: string, productId: string }) {
        const index = state.orders.findIndex((order) => order.id == payload.orderId);
        const productIndex = state.orders[index].products.findIndex(p => p.id == payload.productId);
        state.orders[index].products[productIndex].status = "cancelled";
        const wait = Math.ceil((Date.now() - state.orders[index].products[productIndex].order_time) / 60000);
        state.orders[index].products[productIndex].waiting_minutes = wait;
    },
    deliverProduct(state, payload: { orderId: string, productId: string }) {
        const index = state.orders.findIndex((order) => order.id == payload.orderId);
        const productIndex = state.orders[index].products.findIndex(p => p.id == payload.productId);
        state.orders[index].products[productIndex].status = "delivered";
        const wait = Math.ceil((Date.now() - state.orders[index].products[productIndex].order_time) / 60000);
        state.orders[index].products[productIndex].waiting_minutes = wait;
    },

    finishOrder(state, payload: { orderId: string }) {
        const index = state.orders.findIndex((order) => order.id == payload.orderId);
        const productIndex = state.orders[index].products.findIndex(p => p.status == "delivered");
        if (productIndex >= 0) {
            state.orders[index].status = "finished";
            state.orders[index].finish_time = Date.now();
        }
    },
    cancelOrder(state, payload: { orderId: string }) {
        const index = state.orders.findIndex((order) => order.id == payload.orderId);
        state.orders[index].status = "cancelled";
        state.orders[index].finish_time = Date.now();
    },
};