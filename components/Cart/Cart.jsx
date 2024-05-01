import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { formatVND, getFoodInShoppingCart } from "../../helper";
import FoodContainer from "../FoodContainer/FoodContainer";

const Cart = ({ navigation,foodsList, shoppingCart ,  incrementFoodCount, decrementFoodCount, getFoodCount}) => {

    const [openCart, setOpenCart] = useState(false)

    const getCost = () => {
        let cost = 0
        shoppingCart.forEach((foodInCart) => {
            
            const food = foodsList.filter(foodInList => foodInList._id === foodInCart.foodId)

            cost += food[0].price * foodInCart.foodCount
    
        });
        return cost
    }
    const foods = getFoodInShoppingCart(foodsList, shoppingCart)

    return (
        <>
        
            <Pressable
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: 75,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#cccccc",
                }}

                onPress={() => setOpenCart(true)}
            >
                <View style = {{}}>
                    <Text style={{ fontSize: 26, marginLeft: 20 }}>
                        {formatVND(getCost())}
                    </Text>

                    <View style = {{position: "absolute", right: -15, top : -15, backgroundColor: "green" , width: 20, height: 20, display:"flex", justifyContent: "center", alignItems: "center" , borderRadius: 10}}>
                        <Text style = {{fontSize:20, color: "white",}}>{shoppingCart.length}</Text>
                    </View>
                </View>

                <Pressable
                    style={{
                        width: "40%",
                        height: "100%",
                        backgroundColor: "green",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() =>
                        navigation.navigate("Order", { foodsList, shoppingCart })
                    }
                >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: 600,
                            color: "white",
                        }}
                    >
                        Đặt hàng
                    </Text>
                </Pressable>
            </Pressable>

            {
                openCart === true
                &&
                <View style = {{position: "absolute", bottom: 75,left: 0,  width: "100%", height: "75%", backgroundColor: "white"}}>
                    <Text style = {{fontSize: 30}} onPress = {() => setOpenCart(false)}>close</Text>

                    {
                        foods.map((food, i) => 
                            <FoodContainer key = {i} navigation={navigation} food = {food} shoppingCart={shoppingCart} incrementFoodCount={incrementFoodCount} decrementFoodCount={decrementFoodCount} getFoodCount = {getFoodCount}/>
                        )
                    }
                </View>
            }
        </>
    );
};

export default Cart;

const styles = StyleSheet.create({});
