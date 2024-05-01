import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/ticket`

export const createNewTicket = (payload) => axios.post(`${URL}/create-new-ticket`, payload)

export const getUserTicket = payload => axios.post(`${URL}/get-user-tickets`, payload)