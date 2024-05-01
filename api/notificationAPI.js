import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/notification`

export const addNotification = payload => axios.post(`${URL}/add-notification`, payload) 
export const findNotification = payload => axios.post(`${URL}/find-notification`, payload) 
