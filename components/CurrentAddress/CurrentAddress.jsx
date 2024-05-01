import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import forward from "../../assets/forward.png";

const CurrentAddress = ({ navigation }) => {
    const currentAddress = useSelector((state) => state.address);
    const currentPhoneNumber = useSelector((state) => state.phoneNumber);

    return (
        <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
            <Text style={{ fontSize: 18 , marginLeft: 10, fontSize: 20, fontWeight: 700,}}>Giao đến: </Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Pressable
                    style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        marginHorizontal: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("Address")}
                >   
                    <View>

                        <Text style={{ fontSize: 18 }}>{currentAddress && currentAddress}</Text>
                        <Text style={{ fontSize: 18 }}>{currentPhoneNumber && currentPhoneNumber}</Text>
                    </View>
                    <Image source={forward}></Image>
                </Pressable>
            </View>
        </View>
    );
};

export default CurrentAddress;

const styles = StyleSheet.create({});
