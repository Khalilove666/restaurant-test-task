import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap";
import {router} from "./router";
import {store, key} from "./store";

createApp(App)
    .use(router)
    .use(store, key)
    .mount('#app')
