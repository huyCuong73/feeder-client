import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/food`

export const findFoodsByRestaurant = restaurantId => axios.post(`${URL}/find-foods-by-restaurant`, restaurantId) 

export const getOneFood = payload => axios.post(`${URL}/get-one-food`, payload) 
export const addFoodFeedback = (payload) => axios.post(`${URL}/add-food-feedback`, payload) 