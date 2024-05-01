import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Favourites from "./pages/Favourites/Favourites";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Order/Order";
import { Sample } from "./pages/Sample";
import Support from "./pages/Support/Support";
import CreateTicket from "./pages/Support/CreateTicket";
import Login from "./pages/Login/Login";
import { Test } from "./pages/Login/Test";
import Address from "./pages/Address/Address";
import AddAddress from "./pages/AddAddress/AddAddress";
import Restaurant from "./pages/Restuarant/Restaurant";
import Food from "./pages/Food/Food";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import CreateBankOtp from "./pages/CreateBankOtp/CreateBankOtp";
import SelectPaymentMethod from "./pages/SelectPaymentMethod/SelectPaymentMethod";
// const io = require("socket.io-client");?
import io from "socket.io-client";
import { socketRequest } from "./redux/actions/socket";
import { url } from "./api/api";
import AddVoucher from "./pages/AddVoucher/AddVoucher";
import ListOrders from "./pages/ListOrders/ListOrders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Shipper from "./pages/Shipper/Shipper";

import { Alert } from 'react-native';
import FoodReview from "./pages/FoodReview/FoodReview";
import RestaurantInfo from "./pages/RestuarantInfo/RestaurantInfo";
import HelpCenter from "./pages/HelpCenter/HelpCenter";


const showAlert = (id) => {
    Alert.alert(
      "Alert Title",
      "Đơn hàng" + id +  "của bạn đã được xác nhận bới shipper",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK") }
      ],
      { cancelable: true }
    );
  }
  



const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }

    token = (await Notifications.getExpoPushTokenAsync({ projectId: '9b40e9a7-b21d-4647-b5b6-0bfc90e3bd1f' })).data;
    console.log(token);

    return token;
}

export default function Index() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const socket = useSelector((state) => state.socket);

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();



    useEffect(() => {
        if (user.accessToken !== null) {
            if (user.user) {
                dispatch(socketRequest(io(url)));
            }
        }
    }, [user.accessToken, dispatch]);

    useEffect(() => {
        if (socket && user.user) {
            socket.emit("newUser", user.user._id);

            socket.on("orderAcceptedByShipper", ({userId, orderId}) => {
                if(user.user._id = userId ){
                    showAlert(orderId)
                }
            })

            socket.on("orderCompletedByShipper", ({userId, orderId}) => {
                if(user.user._id = userId ){
                    console.log("orderCompletedByShipper");
                    showAlert(orderId)
                }
            })
         
    }}, [socket]);


    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);


    return (
        <SafeAreaProvider>

            <NavigationContainer>
                {user.accessToken === null ? (
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Navigator>
                ) : user.type == "user" ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ListOrders"
                            component={ListOrders}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="FoodReview"
                            component={FoodReview}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="RestaurantInfo"
                            component={RestaurantInfo}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="OrderDetails"
                            component={OrderDetails}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Address"
                            component={Address}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="PaymentMethod"
                            component={PaymentMethod}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SelectPaymentMethod"
                            component={SelectPaymentMethod}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AddVoucher"
                            component={AddVoucher}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Restaurant"
                            component={Restaurant}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="CreateBankOtp"
                            component={CreateBankOtp}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Food"
                            component={Food}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AddAddress"
                            component={AddAddress}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Favourites"
                            component={Favourites}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Support"
                            component={Support}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="List"
                            component={List}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Notification"
                            component={Notification}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={Profile}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Order"
                            component={Order}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Ticket"
                            component={CreateTicket}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                ) 
                : 
                
                (
                    user.type === "shipper"
                    ?
                    (
                        <Shipper></Shipper>
                    )
                    :
                    (   
                        <Stack.Navigator>
                            <Stack.Screen
                                name="HelpCenter"
                                component={HelpCenter}
                                options={{ headerShown: true }}
                            />
                        </Stack.Navigator>
                       
                    )
                )
            }
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
});
