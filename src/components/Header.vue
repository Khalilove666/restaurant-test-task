<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useOrders} from "../store";
import {GetOrders} from "../api";
import {useStore} from "../store";

const router = useRouter();
const route = useRoute();
// const orderStore = useOrders();

const store = useStore();

async function importTemplate() {
    const res = await GetOrders();
    if (res.ok) {
        store.commit("importTemplate", {orders: res.data});
        // orderStore.importTemplate(res.data);
        await router.push("/");
    }
}

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Restaurant</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100vh;">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active"
                                     :class="{'text-decoration-underline': route.name==='home'}">Ana Səhifə
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/orders" class="nav-link active"
                                     :class="{'text-decoration-underline': route.name==='orders'}">Sifarişlər
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/create" class="nav-link active"
                                     :class="{'text-decoration-underline': route.name==='create'}">Yeni Sifariş
                        </router-link>
                    </li>
                </ul>
                <button @click="importTemplate()" class="btn btn-outline-success" type="submit">Şablonu daxil et
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>