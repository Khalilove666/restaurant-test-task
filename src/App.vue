<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <div id="app">
        <Header/>
        <router-view class="min-vh-100"></router-view>
        <Footer/>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

#app {
    font-family: Nunito, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>
