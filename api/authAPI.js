import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/auth`

export const loginStart = user => axios.post(`${URL}/login`, user)