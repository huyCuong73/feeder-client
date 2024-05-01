import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { getOneOrder } from "../../api/orderAPI";
import backward from "../../assets/backward.png"
import { Image } from "react-native";
import { formatDate, formatVND } from "../../helper";
import { BackgroundImage } from "react-native-elements/dist/config";
import { useSelector } from "react-redux";

const OrderDetails = ({ navigation, route }) => {
    const user = useSelector((state) => state.user);
    const socket = useSelector((state) => state.socket);
    const orderId = route.params.orderId;
    // console.log(orderId);
    const [order, setOrder] = useState({})

    useEffect(() => {
        getOneOrder({orderId})
            .then(data => setOrder(data.data))
    },[orderId])

    useEffect(() => {
        console.log("socket running");
        if (socket && user.user) {

            socket.on("orderAcceptedByShipper", ({userId, orderId}) => {
                console.log("orderAcceptedByShipper");
                if(user.user._id = userId ){
                    getOneOrder({orderId})
                    .then(data => setOrder(data.data))
                }
            })

            socket.on("orderCompletedByShipper", ({userId, orderId}) => {
                console.log("orderAcceptedByShipper");
                if(user.user._id = userId ){
                    getOneOrder({orderId})
                    .then(data => setOrder(data.data))
                }
            })
         
    }}, [socket]);


    return (
    <SafeAreaView style={{ flex: 1 , margin: 20}}>
        <Pressable style = {{display: "flex", flexDirection: "row", alignItems: "center"}} onPress={() => navigation.goBack()}>
            <Image style = {{marginHorizontal :10, width: 34, height :34}} source={backward}></Image>
            <Text style = {{fontSize: 34}}>Trạng thái đơn hàng</Text>
        </Pressable>

        <View style = {{marginVertical: 10, paddingVertical:15 ,  borderBottomWidth: 2, borderBottomColor: "#cacaca"}}>
            
            {
                order.orderTime && 
                <View>
                    <Text style = {styles.orderStateLabel}>Đã đặt hàng: </Text>
                    <Text style = {{fontSize: 18}}>{formatDate(new Date(order.orderTime))}</Text>
                </View>
                
            }

            {
                order.orderConfirmedTime && 
                <View>
                    <Text style = {styles.orderStateLabel}>Shipper đã lấy hàng: </Text>
                    <Text style = {{fontSize: 18}}>{formatDate(new Date(order.orderConfirmedTime))}</Text>
                </View>
                
            }        

            {
                order.receiveTime && 
                <View>
                    <Text style = {styles.orderStateLabel}>Đơn hàng đã hoàn thành: </Text>
                    <Text style = {{fontSize: 18}}>{formatDate(new Date(order.receiveTime))}</Text>
                </View>
                
            }     
        </View>
        
        {
            Object.keys(order).length !== 0
            &&
            <>
                <View style = {{paddingBottom : 20, borderBottomWidth: 2, borderBottomColor: "#cacaca"}}>
                    <Text style= {{fontSize: 20, fontWeight: 700}}>Giao hàng đến</Text>
                    <Text style = {{fontSize: 18}}>{order.orderTo}</Text>
                </View>
            
                <View>
                    <Text style = {styles.capLabel}>
                        {order.restaurantId.name}
                    </Text>
                </View>

                <View style = {{marginVertical: 10, paddingVertical:15 ,  borderBottomWidth: 2, borderBottomColor: "#cacaca"}}>

                    {
                        order.foods.map((food, i) => 
                            <View key = {i} style = {{display: "flex", flexDirection: "row", marginBottom: 15}}>
                                <Image style = {{width:50, height:50}} source = {{uri: food.foodId.imgsrc}}/>

                                <View style = {{padding: 10, display: "flex", justifyContent: "space-between", flexDirection: "row", flex: 1}}>
                                    <View style = {{display: "flex", flexDirection: "row"}}>
                                        <Text style = {{fontWeight: 700, fontSize: 18}}>
                                            {`${food.foodCount} X `}
                                        </Text>
                                        <Text style = {{ fontSize: 18}}>
                                            {food.foodId.name}
                                        </Text>
                                    </View>
                                    <Text style = {{fontSize: 20, fontWeight: 700}}>
                                        {formatVND(food.foodCount * food.foodId.price)}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>

                <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    
                    <Text style = {styles.capLabel}>
                        Tổng cộng:
                    </Text>

                    <Text style = {styles.capLabel}>
                        {formatVND(order.total)}
                    </Text>
                </View>

                <View style = {{marginVertical: 10, paddingVertical:15 ,  borderBottomWidth: 2, borderBottomColor: "#cacaca"}}>
                    <Text style = {styles.capLabel}>
                        Chi tiết đơn hàng
                    </Text>

                    <View style = {styles.orderDetailContainer}>
                        <Text style = {styles.detail}>
                            Mã đơn hàng
                        </Text>
                        <Text style = {styles.detail}>
                            {order._id}
                        </Text>
                    </View>

                    <View style = {styles.orderDetailContainer}>
                        <Text style = {styles.detail}>
                            Thời gian đặt hàng:
                        </Text>
                        <Text style = {styles.detail}>
                            {formatDate(new Date(order.orderTime))}
                        </Text>
                    </View>

                    <View style = {styles.orderDetailContainer}>
                        <Text style = {styles.detail}>
                            Thanh toán: 
                        </Text>
                        <Text style = {styles.detail}>
                            {order.paymentMethod}
                        </Text>
                    </View>
                </View>
            </>
        }
    </SafeAreaView>

    
    )
};

export default OrderDetails;

const styles = StyleSheet.create({
    capLabel: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20
    },

    orderDetailContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },

    detail :{
        fontSize: 18
    },
    orderStateLabel: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 5
    }
});
