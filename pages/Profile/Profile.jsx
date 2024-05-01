import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({ navigation }) {
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


            <Pressable onPress = {() => {navigation.navigate("PaymentMethod")}}>
                <Text>Thêm tài khoản ngân hàng</Text>
            </Pressable>
        </SafeAreaView>
    );
}
