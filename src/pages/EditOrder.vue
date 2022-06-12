<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import moment from "moment";
import {uuid} from "vue3-uuid"
import {OrderProduct, Product, Table} from "../store/types";
import {useOrders} from "../store";
import {GetProducts} from "../api";

const router = useRouter();
const route = useRoute();
const orderStore = useOrders();

const selectedProduct = ref("");
const selectedQuantity = ref(1);
const quantityError = ref(false);
const productError = ref(false);
const currentOrderId = ref("");
const products = ref<Array<Product>>([]);

const selectedProductPrice = computed(() => {
    return (products.value.find((item) => item.id === selectedProduct.value)?.price || 0) * selectedQuantity.value
})
const currentOrder = computed(() => orderStore.orders.find((order) => order.id == currentOrderId.value));
const currentProducts = computed(() => currentOrder.value?.products || [])

onMounted(async () => {
    currentOrderId.value = route.params.orderId as string;
    if (!currentOrder.value) await router.replace({name: "notFound"})
    const res = await GetProducts();
    if (res.ok) products.value = res.data;
});


function handleAddProduct() {
    if (!validateProductFields()) return
    const _id = uuid.v4();
    const product = products.value.find((p) => p.id === selectedProduct.value);
    const orderProduct: OrderProduct = {
        id: _id,
        product_id: product!.id,
        name: product!.name,
        type: product!.type,
        quantity: selectedQuantity.value,
        price: selectedProductPrice.value,
        order_time: Date.now(),
        status: "ordered",
        waiting_minutes: 0,
    }
    orderStore.addProduct(currentOrderId.value, orderProduct);
}

function handleRemoveProduct(productId: string) {
    orderStore.removeProduct(currentOrderId.value, productId);
}

function validateProductFields() {
    let check = true;
    if (!selectedProduct.value) {
        productError.value = true;
        check = false;
    }
    if (!selectedQuantity.value || selectedQuantity.value < 1) {
        quantityError.value = true;
        check = false;
    }
    return check;
}

</script>

<template>
    <div class="container-fluid">
        <h3 class="mt-4">Sifarişi redaktə et</h3>
        <h4 class="mt-4">Süfrəçi: {{ currentOrder?.waiter_name }}</h4>
        <h4>Masa: {{ currentOrder?.table_name }}</h4>
        <h5 class="mt-5">Aşağıdakı listdən məhsul seçimi edin</h5>
        <div class="row gy-2">
            <div class="col-12 col-sm-5">
                <label for="product-name-select" class="form-label">Name of product</label>
                <select v-model="selectedProduct"
                        class="form-select"
                        :class="{'border-danger': productError}"
                        id="product-name-select"
                        @change="productError = false"
                >
                    <option v-for="product in products"
                            :key="product.id"
                            :value="product.id"
                            class="d-flex justify-content-between"
                    >{{ product.name }}
                    </option>
                </select>
            </div>
            <div class="col-12 col-sm-5">
                <div class="d-flex">
                    <div>
                        <label for="product-quantity-input" class="form-label">Quantity</label>
                        <input v-model="selectedQuantity"
                               type="number" min="1"
                               class="form-control"
                               :class="{'border-danger': quantityError}"
                               id="product-quantity-input"
                               @input="quantityError=false"
                        >
                    </div>
                    <div class="ms-3">
                        <label for="product-quantity-input" class="form-label">Price</label>
                        <p class="m-0" id="product-quantity-input">{{ selectedProductPrice }} AZN</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-2 d-grid align-items-end">
                <button @click="handleAddProduct()" class="btn btn-primary btn-block" type="button">Add
                </button>
            </div>
        </div>
        <h5 class="mt-5">Seçilmiş məhsullar</h5>
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
                    <th scope="col">Sil</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(product, index) in currentProducts"
                    :key="product.id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ product.name }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.price }} AZN</td>
                    <td>{{ moment.unix(product.order_time / 1000).format("hh:mm") }}</td>
                    <td>{{ product.waiting_minutes }} dəq</td>
                    <td>{{ product.status }}</td>
                    <td>
                        <button @click="handleRemoveProduct(product.id)" class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><h3>Cəmi məbləğ:</h3></td>
                    <td><h3>{{ currentProducts.reduce((prev, current) => prev + current.price, 0) }} AZN</h3></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>