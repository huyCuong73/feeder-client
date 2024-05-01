import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import {  useDispatch, useSelector } from "react-redux";
import {styles} from "./styles.Profile"

import forward from "../../assets/forward.png"
import { logout } from "../../redux/actions/user";

export default function Profile({ navigation }) {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
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

            <View style = {{width: "100%", height: 300,  display: "flex", justifyContent: "center", alignItems: "center"}}>
              
                    <Avatar username = {user.username} size = {200}/>
            </View>

            
            <Pressable style = {styles.item} onPress = {() => {navigation.navigate("PaymentMethod")}}>
                <Text style = {styles.itemLabel}>Thanh toán</Text>
                <Image source = {forward}></Image>
            </Pressable>
            <Pressable style = {styles.item} onPress = {() => {navigation.navigate("Address")}}>
                <Text style = {styles.itemLabel}>Địa chỉ</Text>
                <Image source = {forward}></Image>
            </Pressable>
            <Pressable style = {styles.item}>
                <Text style = {styles.itemLabel}>Tích điểm</Text>
                <Text style = {styles.itemLabel}>{user.point + " điểm"}</Text>
                
            </Pressable>
            <Pressable style = {styles.item} onPress = {() => {navigation.navigate("Support")}}>
                <Text style = {styles.itemLabel}>Hỗ trợ</Text>
                <Image source = {forward}></Image>
            </Pressable>
            <Pressable style = {styles.item} onPress = {() => {dispatch(logout())}}>
                <Text style = {styles.itemLabel}>Đăng xuất</Text>
                <Image source = {forward}></Image>
            </Pressable>
        </SafeAreaView>
    );
}
