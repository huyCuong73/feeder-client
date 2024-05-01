import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/restaurant`

export const getNearestRestaurants = location => axios.post(`${URL}/find-nearest-restaurants`, location) 
export const addRestaurantRating = payload => axios.post(`${URL}//add-restaurant-rating`, payload) 
export const getTopSellingResturants = () => axios.get(`${URL}/find-top-selling-restaurants`)
export const getHighestRatedResturants = () => axios.get(`${URL}/find-highest-rated-restaurants`)