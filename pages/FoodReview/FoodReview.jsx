import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import backward from "../../assets/backward.png";
import { Icon } from "react-native-elements";
import { addFoodFeedback, getOneFood } from "../../api/foodAPI";
import { useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";
import { addRestaurantRating } from "../../api/restaurantAPI";
import { changeRatedStatus } from "../../api/orderAPI";


const FoodReview = ({ navigation, route }) => {
    const foods = route.params.foods;
    const restaurant = route.params.restaurant;
    const order = route.params.order;
    const [rating, setRating] = useState(0);
    const [foodsChecked, setfoodsChecked] = useState([]);
    const [comment, setComment] = useState("");
    const user = useSelector((state) => state.user.user);
    const [isChecked, setIsChecked] = useState(false);

    const handleRating = (rate) => {
        setRating(rate);
    };
    // console.log(order);
    // useEffect(() => {
    //     getOneFood({ foodId }).then((data) => setFood(data.data));
    // }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            <Pressable
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
                onPress={() => navigation.goBack()}
            >
                <Image style={{ width: 40, height: 40 }} source={backward} />
                <Text style={{ fontSize: 30, marginHorizontal: 20 }}>
                    Đánh giá{""}
                </Text>
            </Pressable>

            <ScrollView style = {{marginBottom: 50}}>

                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={{ fontSize: 26, marginVertical: 20 }}>
                        Đánh giá quán và món
                    </Text>

                    <View
                        style={{
                            display: "flex",
                            alignItems: "ceenter",
                            flexDirection: "row",
                            marginBottom: 30,
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((index) => {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => handleRating(index)}
                                >
                                    <Icon
                                        name={index <= rating ? "star" : "star"}
                                        size={32}
                                        color={
                                            index <= rating ? "#FFD700" : "#B0C4DE"
                                        }
                                    />
                                </Pressable>
                            );
                        })}
                    </View>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: restaurant.imgsrc }}
                    ></Image>
                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 700 }}>
                        {restaurant.name}
                    </Text>
                    <TextInput
                        placeholder="Nhập bình luận của bạn ở đây..."
                        onChangeText={(text) => setComment(text)}
                        multiline
                        style={{
                            width: "90%",
                            height: 300,
                            borderWidth: 2,
                            borderColor: "black",
                            fontSize: 20,
                            textAlignVertical: "top",
                            marginTop: 30,
                            padding: 10,
                        }}
                    ></TextInput>


                    <Text style = {{marginTop: 20, fontSize: 24, fontWeight: 700}}>
                        Gửi đánh giá của bạn đến: 
                    </Text>


                </View>

                <View style = {{margin: 20}}>
                    {
                        foods.map((food, i) => 
                            <View key = {i} style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 20}}>
                                <View style = {{display: "flex", flexDirection: "row"}}>
                                    <Image style = {{width: 50, height: 50}}source = {{uri: food.foodId.imgsrc}}/>
                                    <Text style = {{marginLeft: 10, fontSize: 16, fontWeight: 600}}>{food.foodId.name}</Text>
                                </View>
                                
                                <View>
                                    <Pressable
                                        style={[styles.checkbox, isChecked && styles.checked]}
                                        onPress={() => {
                                            if(!foodsChecked.includes(food.foodId._id)){
                                                setfoodsChecked([...foodsChecked, food.foodId._id])
                                            }else{
                                                const a = foodsChecked.filter(foodId => foodId !== food.foodId._id)
                                                setfoodsChecked(a)
                                            }
                                        }}
                                    >
                                        {foodsChecked.includes(food.foodId._id) && <Text style = {{fontSize: 20}}>✓</Text>}
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }
                </View>
            </ScrollView>


            <Pressable
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "green",
                    width: "100%",
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    if(rating !== 0){

                        addRestaurantRating({
                            restaurantId : restaurant._id,
                            rating
                        })

                        addFoodFeedback({
                            foodsChecked,
                            userId: user._id,
                            rating,
                            comment,
                            createdAt: new Date()
                        })

                        changeRatedStatus({orderId: order._id})
                        navigation.navigate("Home")
                    } 


                    // console.log({
                            
                    //         foodsChecked,
                    //         userId: user._id,
                    //         rating,
                    //         comment,
                    //     });
                }}
            >
                <Text style={{ fontSize: 24, color: "white" }}>Gửi</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default FoodReview;

const styles = StyleSheet.create({
    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        backgroundColor: "green",
    },
});
  