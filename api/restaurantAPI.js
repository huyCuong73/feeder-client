import axios from "axios"
import {url} from "./api"
const URL = `${url}/api/restaurant`

export const getNearestRestaurants = payload => axios.post(`${URL}/find-nearest-restaurants`, payload) 
export const getFavouriteRestaurants = payload => axios.post(`${URL}/find-favourite-restaurants`, payload) 
export const getRestaurantInfo = payload => axios.post(`${URL}/get-restaurant-info`, payload) 

export const addRestaurantRating = payload => axios.post(`${URL}/add-restaurant-rating`, payload) 
export const getTopSellingResturants = () => axios.get(`${URL}/find-top-selling-restaurants`)
export const getHighestRatedResturants = () => axios.get(`${URL}/find-highest-rated-restaurants`)