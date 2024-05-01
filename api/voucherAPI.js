import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/voucher`

export const getValidVouchers = payload => axios.post(`${URL}/get-valid-vouchers`, payload)

export const addUserUsingVoucher = payload => axios.post(`${URL}/add-user-using-voucher`, payload)
