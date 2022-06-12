import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap";
import {createPinia} from "pinia";
import {router} from "./router";


createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
