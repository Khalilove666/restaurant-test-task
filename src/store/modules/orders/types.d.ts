export interface OrderState {
    orders: Array<Order>,
}

export interface Order {
    id: string,
    table_id: string,
    table_name: string,
    waiter_id: string,
    waiter_name: string,
    status: string,
    start_time: number,
    finish_time: number,
    products: Array<OrderProduct>
}

export interface OrderProduct {
    id: string,
    product_id: string,
    name: string,
    type: string,
    quantity: number,
    price: number,
    order_time: number,
    waiting_minutes: number,
    status: string,
}

export interface Table {
    id: string,
    name: string,
}

export interface Waiter {
    id: string,
    name: string,
}

export interface Product {
    id: string,
    name: string,
    type: string,
    price: number,
}