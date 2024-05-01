import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/user`


export const addAddress = payload => axios.post(`${URL}/add-address`, payload)

export const deleteAddress = payload => axios.post(`${URL}/delete-address`, payload)

export const updatePhoneNumberAddress = payload => axios.post(`${URL}/update-phone-number-address`, payload)

export const addBankPayment = payload => axios.post(`${URL}/add-bank-payment`, payload)

export const updatePushToken = payload => axios.post(`${URL}/update-push-token`, payload)

export const getFavouriteFoods = payload => axios.post(`${URL}/update-push-token`, payload)

export const addUserPoint = payload => axios.post(`${URL}/add-user-point`, payload)

export const removeUserPoint = payload => axios.post(`${URL}/remove-user-point`, payload)