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


const FoodContainer = ({navigation, food,shoppingCart, incrementFoodCount, decrementFoodCount, getFoodCount}) => {
    return (
        <Pressable
            style={{
                height: 150,
                margin: 10,
                display: "flex",
                flexDirection: "row",
                padding: 15,
                backgroundColor: "#d2d2d2",
            }}
            onPress={() => navigation.navigate("Food", { food })}
        >
            <Image
                style={{
                    width: 150,
                    height: "100%",
                    marginRight: 15,
                }}
                source={{ uri: food.imgsrc }}
            ></Image>

            <View
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                }}
            >
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    {food.name}
                </Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 500 }}>
                        {formatVND(food.price)}
                    </Text>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        {shoppingCart.some(
                            (foodInCart) =>
                                foodInCart.foodId === food._id &&
                                foodInCart.foodCount > 0
                        ) && (
                            <>
                                <Pressable
                                    onPress={() => decrementFoodCount(food._id)}
                                >
                                    <Image
                                        source={minusBox}
                                        style={{ width: 30 }}
                                    />
                                </Pressable>
                                <Text
                                    style={{
                                        fontSize: 26,
                                        marginHorizontal: 5,
                                    }}
                                >
                                    {getFoodCount(food._id)}
                                </Text>
                            </>
                        )}
                        <Icon
                            name="add-box"
                            size={30}
                            color={"green"}
                            onPress={() => incrementFoodCount(food._id)}
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default FoodContainer;

const styles = StyleSheet.create({});
