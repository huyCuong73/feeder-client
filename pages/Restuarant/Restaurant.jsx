import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    Share,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import restaurantImage from "../../assets/restaurantImage.png";
import backward from "../../assets/backward.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import { findFoodsByRestaurant } from "../../api/foodAPI";
import { formatVND } from "../../helper";
import minusBox from "../../assets/minus-box.png";
import MapView from "react-native-maps";
import Cart from "../../components/Cart/Cart";
import FoodContainer from "../../components/FoodContainer/FoodContainer";

const Restaurant = ({ route, navigation }) => {
    const restaurant = route.params.restaurant;
    const [foodsList, setFoodsList] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [cost, setCost] = useState()

    useEffect(() => {
        const getFoods = async () => {
            const foodsData = await findFoodsByRestaurant({
                restaurantId: restaurant._id,
            });
            setFoodsList(foodsData.data);
        };

        getFoods();
    }, []);

    // useEffect(() => {
    //     const updatedShoppingCart = shoppingCart.filter((food) => food.foodCount !== 0);
    //     setShoppingCart(updatedShoppingCart)
    // },[shoppingCart])

    const incrementFoodCount = (targetFoodId) => {
        if (shoppingCart.some((food) => food.foodId === targetFoodId)) {

            setShoppingCart((prevShoppingCart) =>
                prevShoppingCart.map((food) =>
                    food.foodId === targetFoodId
                        ? { ...food, foodCount: food.foodCount + 1 }
                        : food
                )
            );
        } else {
            setShoppingCart((prevShoppingCart) => [
                ...prevShoppingCart,
                {
                    foodId: targetFoodId,
                    foodCount: 1,
                },
            ]);
        }
    };

    const decrementFoodCount = (foodId) => {
        if(getFoodCount(foodId) == 1){
                                                        
            console.log(shoppingCart.some((foodInCart) => foodInCart.foodId === foodId));
            const updatedShoppingCart = shoppingCart.filter((foodInCart) => foodInCart.foodId != foodId);
            setShoppingCart(updatedShoppingCart)
        } else {

            setShoppingCart((prevShoppingCart) =>
            prevShoppingCart.map((foodInCart) =>
                foodInCart.foodId === foodId
                    ? { ...foodInCart, foodCount: foodInCart.foodCount - 1 }
                    : foodInCart
                )
            )
        }
    };

    

    const getFoodCount = (foodId) => {

        let foodCount
        shoppingCart.forEach((food) => {
            if (food.foodId === foodId) {
                foodCount = food.foodCount;
            }
        });
        return foodCount
    };

    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: 200 }}>
                <Image
                    source={restaurantImage}
                    style={{ width: "100%", height: 200, position: "absolute" }}
                />
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Image
                        source={backward}
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: "rgba(255,255,255,0.5)",
                            borderRadius: 25,
                            position: "absolute",
                            top: 20,
                            left: 10,
                        }}
                    />
                </Pressable>
            </View>


            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: 700 }}>
                    {restaurant.name}
                </Text>
            </View>

            <ScrollView style={{ marginTop: 30 , marginBottom: shoppingCart.length > 0 ? 75 : 0}}>
                {foodsList.map((food, i ) => (
                    <FoodContainer key = {i} navigation={navigation} food = {food} shoppingCart={shoppingCart} incrementFoodCount={incrementFoodCount} decrementFoodCount={decrementFoodCount} getFoodCount = {getFoodCount}/>
                ))}
            </ScrollView>

            {shoppingCart.length > 0 && (

                <Cart navigation={navigation} foodsList = {foodsList} shoppingCart={shoppingCart} incrementFoodCount={incrementFoodCount} decrementFoodCount={decrementFoodCount} getFoodCount = {getFoodCount}/>
            )}


        </SafeAreaView>
    );
};

export default Restaurant;

const styles = StyleSheet.create({});













                // <View
                //     style={{
                //         position: "absolute",
                //         bottom: 0,
                //         width: "100%",
                //         height: 75,
                //         display: "flex",
                //         flexDirection: "row",
                //         alignItems: "center",
                //         justifyContent: "space-between",
                //         backgroundColor: "#cccccc",
                //     }}
                // >
                //     <Text style={{ fontSize: 26, marginLeft: 20 }}>
                //         {formatVND(getCost())}
                //     </Text>

                //     <Pressable
                //         style={{
                //             width: "40%",
                //             height: "100%",
                //             backgroundColor: "green",
                //             display: "flex",
                //             justifyContent: "center",
                //             alignItems: "center",
                //         }}
                //         onPress={() =>
                //             navigation.navigate("Order", { food, foodCount })
                //         }
                //     >
                //         <Text
                //             style={{
                //                 fontSize: 30,
                //                 fontWeight: 600,
                //                 color: "white",
                //             }}
                //         >
                //             Đặt hàng
                //         </Text>
                //     </Pressable>
                // </View>