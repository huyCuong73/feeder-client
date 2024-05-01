import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import restaurantImage from "../../assets/restaurantImage.png";
import backward from "../../assets/backward.png";
import minusBox from "../../assets/minus-box.png";
import { formatDate, formatVND } from "../../helper";
import { Icon } from "react-native-elements";
import StarRating from "../../components/StarRating/StarRating";

const Food = ({ navigation, route }) => {
    const food = route.params.food;
    const [foodCount, setFoodCount] = useState(0);

    const calculateAverageRating = (feedbackArray) => {
        const totalRating = feedbackArray.reduce(
            (acc, item) => acc + item.rating,
            0
        );
        const averageRating = totalRating / feedbackArray.length;
        return averageRating;
    };

    const averageRating = calculateAverageRating(food.feedback);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                source={restaurantImage}
                style={{ width: "100%", height: 200 }}
            />

            <Pressable
                style={{ position: "absolute", top: 0 }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={backward}
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "rgba(255,255,255,0.5)",
                        borderRadius: 25,
                        position: "absolute",
                        top: 40,
                        left: 10,
                    }}
                />
            </Pressable>


            <View style= {{margin: 20}}>
                <Text style = {{fontSize: 28, fontWeight: 600}}>{food.name}</Text>
            </View>
            <View style={{marginHorizontal: 20, display: "flex", flexDirection: "row"}}>
                <StarRating averageRating={averageRating} size={26}/>
            </View>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                    paddingBottom: 20,
                    borderColor: "#8080801b",
                    borderBottomWidth: 2,
                }}
            >
                <Text style={{ fontSize: 30 }}>{formatVND(food.price)}</Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >

                    <Icon
                        name="add-box"
                        size={30}
                        color={"green"}
                        onPress={() => setFoodCount((prev) => prev + 1)}
                    />
                </View>
            </View>

            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 30, color: "#4a4a4a" }}>
                    Bình luận
                </Text>
            </View>

            <ScrollView>
                <View style={{ margin: 20 }}>
                    {food.feedback.reverse().map((feedback, i ) => (
                        <View key = {i} style={{ marginBottom: 24 , borderBottomWidth: 2, borderBottomColor: "#d2d2d2"}}>
                            <Text style={{ fontSize: 20 }}>
                                {feedback.userId.username}
                            </Text>

                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: 10,
                                }}
                            >
                                <StarRating averageRating={averageRating} size = {16}/>
                            </View>
                            <Text style={{ fontSize: 18 , marginBottom: 10}}>
                                {feedback.comment}
                            </Text>

                            <View style = {{marginBottom: 10}}>
                                <Text>
                                    {formatDate(new Date(feedback.createdAt))}
                                </Text>

                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {foodCount > 0 && (
                <View
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
                >
                    <Text style={{ fontSize: 26, marginLeft: 20 }}>
                        {foodCount * food.price}
                    </Text>

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
                            navigation.navigate("Order", { food, foodCount })
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
                </View>
            )}
        </SafeAreaView>
    );
};

export default Food;

const styles = StyleSheet.create({});
