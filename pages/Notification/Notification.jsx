import { Pressable, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { findNotification } from "../../api/notificationAPI";
import { useSelector } from "react-redux";
import { formatDate } from "../../helper";

const Notification = ({ navigation }) => {
    const user = useSelector(state => state.user.user)

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        findNotification({userId: user._id})
            .then(res => {
                setNotifications(res.data)
            })
            .catch(err => console.log(err))
    },[])
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View>
                <Text style = {{margin: 20, fontSize: 30, fontWeight: 700}}>Thông báo</Text>
            </View>

            <View style={styles.navbarContainer}>
                <NavBar navigation={navigation} />
            </View>

            <ScrollView style = {{marginHorizontal: 20}}>
                {
                    notifications.map ((notification, i) => 
                        <Pressable key = {i} style = {{display: "flex", flexDirection: "row", borderBottomColor: "#d2d2d2", borderBottomWidth: 2, paddingBottom: 20, marginTop: 10}} onPress={() => navigation.navigate("OrderDetails", {orderId: notification.orderId})}>
                            <Image style = {{width: 100, height: 100}} source = {{uri: notification.restaurantId.imgsrc}}></Image>
                            <View style = {{flex: 1, marginLeft: 10, display: "flex", justifyContent:"space-between"}}>
                                <Text style = {{fontSize: 20, fontWeight: "500"}}>{notification.content}</Text>
                                <Text style = {{fontSize: 16}}>{formatDate(new Date(notification.createdAt))}</Text>
                            </View>
                        </Pressable>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notification;

const styles = StyleSheet.create({
    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0 ,
        left:0,
        zIndex:999
    },
});
