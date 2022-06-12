<script setup lang="ts">
import {PieChart} from 'vue-chart-3';
import {Chart, registerables} from "chart.js";
import {computed} from "vue";
import {useStore} from "../store";

Chart.register(...registerables);

const store = useStore();

const testData = computed(() => {
    const finished = store.getters.countFinished;
    const continuous = store.getters.countContinuous;
    const cancelled = store.getters.countCancelled;
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
                    <h2>{{ store.getters.revenue }} AZN</h2>
                </div>
                <div class="mt-5 d-flex justify-content-between">
                    <h3>Bütün sifarişlər:</h3>
                    <h3>{{ store.getters.countAll }}</h3>
                </div>
                <div class="ms-4">
                    <div class="d-flex justify-content-between">
                        <h5>Sonlanmış:</h5>
                        <h5>{{ store.getters.countFinished }}</h5>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Sonlanmamış:</h5>
                        <h5>{{ store.getters.countContinuous }}</h5>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h5>Ləğv edilmiş:</h5>
                        <h5>{{ store.getters.countCancelled }}</h5>
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