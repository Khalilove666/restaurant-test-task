<script setup lang="ts">
import moment from "moment";
import {computed} from "vue";
import {useStore} from "../store";
import {Order} from "../store/modules/orders/types";

const store = useStore();

const orders = computed(() => {
    const allOrders = [...store.getters.allOrders];
    return allOrders.sort((a: Order, b: Order) => {
        if (a.finish_time > b.finish_time) return -1
        else return 1;
    }).sort((a: Order, b: Order) => {
        if (a.status === "ordered" && b.status !== "ordered") return -1
        else return 0;
    })
});
</script>

<template>
    <div class="container-fluid">
        <h3 class="mt-4">Bütün sifarişlər</h3>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Say</th>
                    <th scope="col">Masa</th>
                    <th scope="col">Süfrəçi</th>
                    <th scope="col">Status</th>
                    <th scope="col">Məbləğ</th>
                    <th scope="col">Sonlanma tarixi</th>
                    <th scope="col">Ətraflı</th>
                    <th scope="col">Redaktə et</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ order.table_name }}</td>
                    <td>{{ order.waiter_name }}</td>
                    <td>
                        <span v-if="order.status === 'finished'" class="badge bg-success">{{ order.status }}</span>
                        <span v-else-if="order.status === 'ordered'" class="badge bg-warning">{{
                                order.status
                            }}</span>
                        <span v-if="order.status === 'cancelled'" class="badge bg-secondary">{{
                                order.status
                            }}</span>
                    </td>
                    <td>{{ order.products.reduce((prev, current) => prev + current.price, 0) }} AZN</td>
                    <td>
                        {{
                            order.finish_time ? moment.unix(order.finish_time / 1000).format("DD-MM-YYYY hh:mm:ss") : '-'
                        }}
                    </td>
                    <td>
                        <router-link :to="'/orders/' + order.id" class="btn btn-primary">bax</router-link>
                    </td>
                    <td>
                        <router-link :to="'/edit/' + order.id" class="btn btn-outline-warning"><i
                            class="bi bi-pencil"></i>
                        </router-link>
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><h3>Ümumi gəlir:</h3></td>
                    <td><h3>{{ store.getters.revenue }} AZN</h3></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>