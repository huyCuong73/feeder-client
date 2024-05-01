import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/order`


export const addNewOrder = (order) => axios.post(`${URL}/add-order`, order)
export const changeRatedStatus = (payload) => axios.post(`${URL}/change-rated-status`, payload)

export const getOrdersByUserId = (payload) => axios.post(`${URL}/get-orders-by-user-id`, payload)
export const getOneOrder = (payload) => axios.post(`${URL}/find-one-order`, payload)

export const finishOrder = (payload) => axios.post(`${URL}/finish-order`, payload)
export const getAllOrders = () => axios.get(`${URL}/find-all-orders`, )

export const confirmOrder = (payload) => axios.post(`${URL}/confirm-order`,payload)