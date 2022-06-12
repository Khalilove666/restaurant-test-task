import performRequest from "./client";

export async function GetProducts() {
    return await performRequest("/products.json");
}

export async function GetOrders() {
    return await performRequest("/orders.json");
}

export async function GetWaiters() {
    return await performRequest("/waiters.json");
}

export async function GetTables() {
    return await performRequest("/tables.json");
}