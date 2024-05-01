import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { confirmOrder, finishOrder, getAllOrders } from "../../api/orderAPI";
import { useSelector } from "react-redux";
import { sendPushNotification } from "../../getPushToken";
import { addNotification } from "../../api/notificationAPI";

const Shipper = () => {
    const [orders, setOrders] = useState([]);
    const socket = useSelector((state) => state.socket);
    const user = useSelector((state) => state.user.user);
    console.log(user);
    const [reload, setReload] = useState(0);
    useEffect(() => {
        const findAllOrders = async () => {
            const all = await getAllOrders();

            const list = all.data.filter((order) => order.paidStatus === false);
            setOrders(list);
        };

        findAllOrders();
    }, [reload]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {orders.map((order, i) => (
                    <View key = {i} style={{ margin: 20 }}>
                        <Text>{order._id}</Text>
                        <Text>{"Đến: " + order.orderTo}</Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            {order.orderConfirmedTime === "" && (
                                <Pressable
                                    style={{
                                        width: 100,
                                        height: 40,
                                        backgroundColor: "green",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}

                                >
                                    <Text
                                        style={{ color: "white" }}
                                        onPress={() => {
                                    
                                            confirmOrder({
                                                orderId: order._id,
                                                time: new Date(),
                                                shipperId: user._id,
                                            })
                                                .then((data) => {
                                                    socket.emit("orderAccepted", {
                                                        userId: order.userId,
                                                        orderId: order._id,
                                                    });
                                                    setReload((pre) => pre + 1);
                                                })
                                                .catch((err) => console.log(err));
                                        }}
                                    >
                                        Nhận đơn
                                    </Text>
                                </Pressable>
                            )}

                            <Pressable
                                style={{
                                    width: 100,
                                    height: 40,
                                    backgroundColor: "green",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() => {

                           
                                    finishOrder({
                                        orderId: order._id,
                                        time: new Date(),
                                    })
                                        .then((res) => {
                                       
                                            addNotification({
                                                notification: {
                                                    userId: order.userId,
                                                    orderId: order._id,
                                                    restaurantId: order.restaurantId._id,
                                                    content: `Đơn hàng tại ${order.restaurantId.name} của bạn đã hoàn tất`
                                                }
                                            })
                                                .then(() => {
                                                    socket.emit("orderCompleted", {
                                                        userId: order.userId,
                                                        orderId: order._id,
                                                    });
                                                })
                                            setReload((pre) => pre + 1);
                                        })
                                        .catch((err) => console.log(err));
                                }}
                            >
                                <Text style={{ color: "white" }}>
                                    Hoàn Thành
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Pressable
                style={{
                    width: 300,
                    heigt: 300,
                    backgroundColor: "green",
                    position: "absolute",
                    bottom: 0,
                }}
                onPress={() => {
                    setReload(pre => pre+1)
                }}
            >
                <Text>PUSH</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Shipper;

const styles = StyleSheet.create({});
