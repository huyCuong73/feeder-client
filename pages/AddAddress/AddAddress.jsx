import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    Pressable,
    Image,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import search from "../../assets/search.png";
import { styles } from "./styles.AddAddress";
import { addAddress } from "../../api/userAPI";
import { updateAddress } from "../../redux/actions/user";
import backward from "../../assets/backward.png";

const AddAddress = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [inputAdress, setInputAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressType, setAddressType] = useState("");

    searchLocation = async (text) => {
        setQuery(text);
        axios
            .post(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyB9jG7ROCL115gTV3Z1boznnkxN4lTM-wc&input=${query}`
            )
            .then((response) => {
                if (response.data.predictions.length !== 0) {
                    setSuggestions(response.data.predictions);
                } else {
                    setSuggestions([
                        { place_id: 1231, description: "dsadasd dsf dsf df" },
                        {
                            place_id: 12343,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12334,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12354,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12354,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12365,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12365,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12365,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12365,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 12365,
                            description: "asd  asd dfas dsa asd",
                        },
                        {
                            place_id: 432,
                            description: " qer ef qw efgw grwe wefg",
                        },
                    ]);
                }
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

    const handleSavingAddrress = async () => {

        if((inputAdress !== "" && addressType !== "")){
            const payload = {
                userId: user._id,
                address: {
                    addressNo: user.address.length + 1,
                    place: inputAdress,
                    type: addressType,
                    phoneNumber
                },
            };
    
            addAddress(payload)
            .then(newUser => {
                dispatch(updateAddress(newUser.data));
                navigation.goBack()
            })
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Pressable
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginLeft: 20
                }}
                onPress={() => navigation.goBack()}
            >
                <Image source={backward}></Image>
                <Text style={{ fontSize: 26, marginLeft: 15 }}>
                    Thêm địa chỉ mới
                </Text>
            </Pressable> 

            <View style={{ padding: 15 }}>
                <View
                    style={{
                        backgroundColor: "grey",
                        width: "100%",
                        height: 60,
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        zIndex: 99
                    }}
                >
                    <Image source={search}></Image>
                    <TextInput
                        placeholder="Thêm địa chỉ..."
                        value={query}
                        onChangeText={searchLocation}
                        style={{
                            fontSize: 20,
                            flex: 1,
                            marginHorizontal: 10,
                        }}
                    />

                    <ScrollView
                        style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            position: "absolute",
                            top: 60,
                            zIndex: 999,
                            elevation: 1,
                            maxHeight: 300,
                        }}
                    >
                        {query &&
                            suggestions.map((suggestion , i) => (
                                <Pressable
                                key = {i}
                                    onPress={() => {
                                        setInputAddress(suggestion.description)
                                        setQuery("")
                                    }}
                                    style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        height: 50,
                                        borderBottomColor: "#ccc",
                                        borderBottomWidth: 1,
                                        paddingLeft: 15,
                                        zIndex: 999999,
                                        opacity: 1,
                                    }}
                                >
                                    <Text style={{ fontSize: 18 }}>
                                        {suggestion.description}
                                    </Text>
                                </Pressable>
                            ))}
                    </ScrollView>
                </View>
                <View style={{ marginVertical: 20 }}>
                    {inputAdress.length != 0 ? (
                        <Text style={{ fontSize: 24, fontWeight: 700 }}>{inputAdress}</Text>
                    ) : (
                        <Text style={{ color: "grey", fontSize: 20 }}>
                            Địa chỉ mới
                        </Text>
                    )}
                </View>

                <View style = {{width: "100%", height: 50}}>

                    <TextInput
                        placeholder="Thêm số điện thoại..."
                        keyboardType = "numeric"
                        value={phoneNumber}
                        onChangeText={value => setPhoneNumber(value)}
                        style={{
                            
                            fontSize: 20,
                            flex: 1,
                            height: 50,
                            
                        }}
                    />
                </View>

                
                <View
                    style={{
                        marginVertical: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable
                        style={[styles.selectAddressContainer, addressType === "home" && {backgroundColor: "green"}]}
                        onPress={() => setAddressType("home")}
                    >
                        <Text style={[styles.optionLabel, addressType === "home" && {color: "white"}]}>Nhà riêng</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.selectAddressContainer, addressType === "workplace" && {backgroundColor: "green"}]}
                        onPress={() => setAddressType("workplace")}
                    >
                        <Text style={[styles.optionLabel,addressType === "workplace" && {color: "white"}]}>Cơ quan</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.selectAddressContainer, addressType === "others" && {backgroundColor: "green"}]}
                        onPress={() => setAddressType("others")}
                    >
                        <Text style={[styles.optionLabel, addressType === "others" && {color: "white"}]}>Khác</Text>
                    </Pressable>
                </View>
            </View>
            




            <Pressable
                style={{
                    position: "absolute",
                    backgroundColor: (inputAdress !== "" && addressType !== 0) ? "green" : "grey",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => handleSavingAddrress()}
            >
                <Text style = {{fontSize: 20, fontWeight: 700, color: "white"}}>Lưu</Text>
            </Pressable>
            
        </SafeAreaView>
    );
};

export default AddAddress;
