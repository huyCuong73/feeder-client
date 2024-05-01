import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollViewr,
    ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { getOrdersByUserId } from "../../api/orderAPI";
import { formatVND } from "../../helper";

const ListOrders = ({ navigation }) => {
    const user = useSelector((state) => state.user.user);
    const [orderType, setOrderType] = useState(1);

    const [listOrders, setListOrders] = useState([])
    const [orders, setOrders] = useState([])
    const [paidOrders, setPaidOrders] = useState([]);
    const [unPaidOrders, setUnPaidOrders] = useState([]);

    useEffect(() => {
        const findOrders = async () => {
            const data = await getOrdersByUserId({ userId: user._id });
            
            const listData = data.data.filter((e) => e.type === "immediate");
            setListOrders(listData)

        };

        findOrders();
    }, []);

    useLayoutEffect(() => {
       
        if(listOrders !== 0){
            if(orderType == 1){
            
                const paids = listOrders.filter((order) => order.paidStatus === false);
                
                setOrders(paids)
            }
    
            if(orderType == 2){
            
                const unpaids = listOrders.filter((order) => order.paidStatus === true);
                setOrders(unpaids)
            }
        }
    }, [orderType,listOrders])

   

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                    left: 0,
                    zIndex: 999,
                }}
            >
                <NavBar navigation={navigation} />
            </View>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Pressable
                    style={
                        orderType == 1
                            ? styles.optionContainerSelected
                            : styles.optionContainer
                    }
                    onPress={() => setOrderType(1)}
                >
                    <Text style={styles.optionLabel}>Đang đến</Text>
                </Pressable>

                <Pressable
                    style={
                        orderType == 2
                            ? styles.optionContainerSelected
                            : styles.optionContainer
                    }
                    onPress={() => setOrderType(2)}
                >
                    <Text style={styles.optionLabel}>Lịch sử</Text>
                </Pressable>
            </View>
            
            <View style = {{backgroundColor: "#dedcdc", marginBottom: 100}}>
                <ScrollView>
                    {
                        orders.map((order, i) => (
                            <Pressable key = {i} style = {{marginBottom: 25, backgroundColor: "white", padding: 20,}} onPress = {() => {navigation.navigate("OrderDetails", {orderId: order._id})}}>
                                <Pressable>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style = {{fontSize: 20, fontWeight: 700, marginBottom: 15}}>{order.restaurantId.name}</Text>
                                </Pressable>

                                <View  style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    <ScrollView horizontal style = {{zIndex: 999}}>
                                        {
                                            order.foods.map((food, i) => 
                                                <View key = {i} style = {{marginRight: 15}}>
                                                    <Image style = {{width: 100, height: 100}} source={{uri: food.foodId.imgsrc}}/>
                                                    <Text numberOfLines={1} ellipsizeMode="tail" style = {{fontSize: 16, marginTop: 15}}>{food.foodId.name}</Text>
                                                </View>
                                            )
                                        }
                                    </ScrollView>

                                    <View style = {{display: "flex",  alignItems:"center", marginLeft: 15, width: 150, justifyContent: orderType == 1 ? "center" : "flex-start"}}>
                                        <View>
                                            <Text style = {{fontSize: 20, fontWeight: 600}}>{formatVND(order.total)}</Text>
                                            <Text style = {{fontSize: 18}}>{`${order.foods.length} món`}</Text>
                                        </View>
                                        {
                                            orderType == 2 &&
                                            (
                                            order.rated == false
                                            ?
                                            <Pressable 
                                                style = {{width: 140, height: 50, backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0, right: -5}}
                                                onPress={() =>
                                                    navigation.navigate("FoodReview", {
                                                        foods: order.foods,
                                                        restaurant: order.restaurantId,
                                                        order: order
                                                    })
                                                }
                                            >
                                                <Text style = {{color: "white", fontSize: 20}}>
                                                    Đánh giá
                                                </Text>
                                            </Pressable>
                                            :
                                            <Pressable 
                                                style = {{width: 140, height: 50, backgroundColor: "#d0d0d0", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0, right: -5}}
                                            >
                                                <Text style = {{color: "white", fontSize: 20}}>
                                                    Đánh giá
                                                </Text>
                                            </Pressable>
                                            )
                                        }
                                    </View>
                                </View>
                            </Pressable>
                        ))
                        
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ListOrders;

const styles = StyleSheet.create({
    optionContainer: {
        width: "50%",
        // backgroundColor: "#00b300",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    optionContainerSelected: {
        width: "50%",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "green",
        borderBottomWidth: 2,
    },
    optionLabel: {
        fontSize: 20,
    },
});

        {/* {orderType === 2 &&
            paidOrders.map((order) => (
                <Pressable
                    style={{
                        height: 200,
                        margin: 20,
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#dbdada",
                        padding: 15,
                    }}
                    onPress={() => {
                        navigation.navigate("OrderDetails", {
                            orderId: order._id,
                        });
                    }}
                >
                    <Image
                        style={{
                            width: 170,
                            height: 170,
                            marginRight: 15,
                        }}
                        source={{ uri: order.foodId.imgsrc }}
                    />
                    <Text style={{ fontSize: 24, fontWeight: 600 }}>
                        {order.foodId.name}
                    </Text>
        
                    <Pressable
                        onPress={() =>
                            navigation.navigate("FoodReview", {
                                foodId: order.foodId,
                            })
                        }
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 15,
                            width: 150,
                            height: 50,
                            backgroundColor: "green",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 20 }}>
                            Đánh giá
                        </Text>
                    </Pressable>
                </Pressable>
            ))} */}