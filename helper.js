export const getGeocode = async (address, Location) => {
    try {
        const geocodedLocation = await Location.geocodeAsync(address);
        // console.log(geocodedLocation);
        return geocodedLocation;
    } catch (error) {
        console.error("Error geocoding address:", error);
    }
};

export const getReverseGeocode = async(longitude, latitude, Location) => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude,
        latitude,
    });

    console.log("Reverse Geocoded:");
    // console.log(reverseGeocodedAddress);
    return reverseGeocodedAddress;
}

export const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

  
export function formatDate(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }


 export const getFoodInShoppingCart = (foodsList, shoppingCart) => {
    const foodsId = []
    shoppingCart.forEach((food) => {
        foodsId.push(food.foodId)
    })

    return foodsList.filter(food => foodsId.includes(food._id))
}