import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Order, OrderProduct} from "./types";


export const useOrders = defineStore("orders", () => {

    // STATE
    const ordersState = ref<Array<Order>>([]);

    // GETTERS
    const orders = computed(() => ordersState.value);
    const countAll = computed(() => ordersState.value.length);
    const countFinished = computed(() => ordersState.value.filter((o) => o.status == "finished").length);
    const countCancelled = computed(() => ordersState.value.filter((o) => o.status == "cancelled").length);
    const countContinuous = computed(() => countAll.value - (countFinished.value + countCancelled.value));
    const revenue = computed(() =>
        ordersState.value.reduce((sum, order) => sum + order.products.reduce((acc, prod) => acc + prod.price, 0), 0)
    );

    // ACTIONS
    function importTemplate(orders: Array<Order>) {
        ordersState.value = orders;
    }

    function addOrder(order: Order) {
        ordersState.value.push(order);
    }

    function addProduct(orderId: string, product: OrderProduct) {
        const index = orderIndexById(orderId);
        ordersState.value[index].products.push(product);
    }

    function removeProduct(orderId: string, productId: string) {
        const index = orderIndexById(orderId);
        const productIndex = ordersState.value[index].products.findIndex(p => p.id == productId);
        ordersState.value[index].products.splice(productIndex, 1);
    }

    function cancelProduct(orderId: string, productId: string) {
        changeProductStatus(orderId, productId, "cancelled");
    }

    function deliverProduct(orderId: string, productId: string) {
        changeProductStatus(orderId, productId, "delivered");
    }

    function finishOrder(orderId: string) {
        const index = orderIndexById(orderId)
        const productIndex = ordersState.value[index].products.findIndex(p => p.status == "delivered");
        if (productIndex >= 0) {
            ordersState.value[index].status = "finished";
            ordersState.value[index].finish_time = Date.now();
        }
    }

    function cancelOrder(orderId: string) {
        const index = orderIndexById(orderId);
        ordersState.value[index].status = "cancelled";
        ordersState.value[index].finish_time = Date.now();
    }

    // FUNCTIONS
    function changeProductStatus(orderId: string, productId: string, status: string) {
        const index = orderIndexById(orderId)
        const productIndex = ordersState.value[index].products.findIndex(p => p.id == productId);
        ordersState.value[index].products[productIndex].status = status;
        const wait = Math.ceil((Date.now() - ordersState.value[index].products[productIndex].order_time) / 60000);
        ordersState.value[index].products[productIndex].waiting_minutes = wait;
    }

    function orderIndexById(orderId: string): number {
        return ordersState.value.findIndex((order) => order.id == orderId);
    }

    return {
        orders,
        countAll,
        countFinished,
        countCancelled,
        countContinuous,
        revenue,
        importTemplate,
        addOrder,
        addProduct,
        removeProduct,
        cancelProduct,
        deliverProduct,
        finishOrder,
        cancelOrder
    };
})