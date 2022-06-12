import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/Home.vue";
import Orders from "../pages/Orders.vue";
import OrderPage from "../pages/OrderPage.vue";
import CreateOrder from "../pages/CreateOrder.vue";
import EditOrder from "../pages/EditOrder.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/orders",
        name: "orders",
        component: Orders
    },
    {
        path: "/orders/:orderId",
        name: "orderPage",
        component: OrderPage
    },
    {
        path: "/create",
        name: "create",
        component: CreateOrder
    },
    {
        path: "/edit/:orderId",
        name: "edit",
        component: EditOrder
    },
    {
        path: '/:pathMatch(.*)*',
        name: "notFound",
        component: NotFound
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
})