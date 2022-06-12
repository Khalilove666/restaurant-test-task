<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import moment from "moment";
import {useStore} from "../store";
import {Order, Product} from "../store/modules/orders/types";

const route = useRoute();
const store = useStore();

const orderId = route.params.orderId as string;

const currentOrder = computed(() => store.getters.allOrders.find((order: Order) => order.id == orderId));
const currentProducts = computed(() => currentOrder.value?.products || []);
const totalPrice = computed(() => {
    return currentProducts.value.reduce((prev: number, current: Product) => prev + current.price, 0)
});
const isOrderFinished = computed(() => currentOrder.value?.status == "finished");
const isOrderCancelled = computed(() => currentOrder.value?.status == "cancelled");
const isOrderFinishable = computed(() => {
    const index = currentOrder.value?.products.findIndex(p => p.status == "delivered");
    return index != undefined && index >= 0;
})

function handleCancelProduct(productId: string) {
    store.commit("cancelProduct", {orderId, productId});
}

function handleDeliverProduct(productId: string) {
    store.commit("deliverProduct", {orderId, productId});
}

function handleFinishOrder() {
    store.commit("finishOrder", {orderId});
}

function handleCancelOrder() {
    store.commit("cancelOrder", {orderId});
}
</script>

<template>
    <div class="container-fluid">
        <h3 class="mt-4">Sifariş detalları</h3>
        <h4 class="mt-4">Süfrəçi: {{ currentOrder.waiter_name }}</h4>
        <h4>Masa: {{ currentOrder.table_name }}</h4>
        <div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Say</th>
                        <th scope="col">Məhsul adı</th>
                        <th scope="col">Miqdar</th>
                        <th scope="col">Məbləğ</th>
                        <th scope="col">Sifariş saatı</th>
                        <th scope="col">Gözləmə</th>
                        <th scope="col">Status</th>
                        <th scope="col">Tamamla / Geri al</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(product, index) in currentProducts"
                        :key="product.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ product.name }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.price }} AZN</td>
                        <td>{{ moment.unix(product.order_time / 1000).format("hh:mm") }}</td>
                        <td>{{ product.waiting_minutes }} dəq</td>
                        <td>
                            <span v-if="product.status === 'delivered'" class="badge bg-success">{{
                                    product.status
                                }}</span>
                            <span v-else-if="product.status === 'ordered'" class="badge bg-warning">{{
                                    product.status
                                }}</span>
                            <span v-if="product.status === 'cancelled'" class="badge bg-secondary">{{
                                    product.status
                                }}</span>
                        </td>
                        <td class="d-flex">
                            <button :disabled="isOrderFinished || isOrderCancelled"
                                    v-if="product.status === 'ordered'"
                                    @click="handleDeliverProduct(product.id)"
                                    class="btn btn-primary">tamamla
                            </button>
                            <button v-if="product.status === 'ordered'"
                                    @click="handleCancelProduct(product.id)"
                                    :disabled="isOrderFinished || isOrderCancelled"
                                    class="ms-2 btn btn-outline-danger">geri al &lt;-
                            </button>
                            <span v-else-if="product.status === 'cancelled'">geri alındı</span>
                            <span v-else>tamamlandı</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3"><h3>Cəmi məbləğ:</h3></td>
                        <td><h3>{{ totalPrice }} AZN</h3></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-end">
                <template v-if="!isOrderFinished && !isOrderCancelled">
                    <button
                        v-if=" isOrderFinishable"
                        @click="handleFinishOrder()"
                        class="btn btn-primary"
                    >Sifarişi sonlandır
                    </button>
                    <button @click="handleCancelOrder()"
                            class="ms-2 btn btn-secondary"
                    >Sifarişi ləğv et
                    </button>
                </template>
                <p v-if="isOrderFinished" class="text-info">Sifariş sonlandırılıb</p>
                <p v-if="isOrderCancelled" class="text-info">Sifariş ləğv edilib</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>