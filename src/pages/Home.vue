<script setup lang="ts">
import {PieChart} from 'vue-chart-3';
import {Chart, registerables} from "chart.js";
import {useOrders} from "../store";
import {computed} from "vue";
Chart.register(...registerables);

const orderStore = useOrders();

const testData =computed(() => {
    const finished = orderStore.countFinished;
    const continuous = orderStore.countContinuous;
    const cancelled = orderStore.countCancelled;
    return {
        labels: ['Sonlanmış', 'Sonlanmamış', 'Ləğv edilmiş'],
            datasets: [
        {
            data: [finished, continuous, cancelled],
            backgroundColor: ['#22bb33', '#f0ad4e', '#bb2124'],
        },
    ],
    };
})
</script>

<template>
    <div class="container-fluid">
        <h3 class="mt-4">Haqqında</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur et expedita optio rem
            similique soluta, voluptatibus? Accusantium, aut dignissimos doloremque dolorum, inventore ipsam obcaecati
            porro rerum sed sunt, vero!</p>

        <div class="row mt-5">
            <div class="col-12 col-sm-6">
                <div class="d-flex justify-content-between">
                    <h2>Ümumi gəlir:</h2>
                    <h2>{{ orderStore.revenue }} AZN</h2>
                </div>
                <div class="mt-5 d-flex justify-content-between">
                    <h3>Bütün sifarişlər:</h3>
                    <h3>{{ orderStore.countAll }}</h3>
                </div>
                <div class="ms-4">
                    <div class="d-flex justify-content-between">
                        <h5>Sonlanmış:</h5>
                        <h5>{{ orderStore.countFinished }}</h5>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Sonlanmamış:</h5>
                        <h5>{{ orderStore.countContinuous }}</h5>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Ləğv edilmiş:</h5>
                        <h5>{{ orderStore.countCancelled }}</h5>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6">
                <PieChart :chartData="testData"/>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">

</style>