import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Button,
    Image,
    Pressable,
    ToastAndroid,
    PermissionsAndroid,
    Platform,
    TextInput,
    FlatList,
    ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavBar from "../../components/NavBar/NavBar";
import { styles } from "./styles.Adress";
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Location from "expo-location";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Geolocation from "react-native-geolocation-service";
import {} from "react-native";

import forward from "../../assets/forward.png";
import homeImage from "../../assets/home-image.png";
import { useNavigation } from "@react-navigation/native";
import backward from "../../assets/backward.png";
import search from "../../assets/search.png";
import location from "../../assets/location.png";
import { addressRequest } from "../../redux/actions/address";
import { deleteAddress, updatePhoneNumberAddress } from "../../api/userAPI";
import { updateAddress } from "../../redux/actions/user";
import { phoneNumberRequest } from "../../redux/actions/phoneNumber";

export default function Home({ navigation }) {
    const currentAddress = useSelector((state) => state.address);
    const currentPhoneNumber = useSelector((state) => state.phoneNumber);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [inputPhoneNumber, setInputPhoneNumber] = useState("")
    const [phoneNumberChanging, setPhoneNumberChanging] = useState(-1)
    const [updating, setUpdating] = useState(false)


    
    searchLocation = async (text) => {
        setQuery(text);

        axios
            .post(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyB9jG7ROCL115gTV3Z1boznnkxN4lTM-wc&input=${query}`
            )
            .then((response) => {
            
                    setSuggestions(response.data.predictions);
                
        
                
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

 



    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <View style={{ flex: 1, padding: 20 }}>
                <Pressable
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={backward}></Image>
                    <Text style={{ fontSize: 26, marginLeft: 15 }}>
                        Địa chỉ giao hàng
                    </Text>
                </Pressable>

                <View
                    style={{
                        backgroundColor: "#dadada",
                        width: "100%",
                        height: 60,
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        zIndex: 9,
                    }}
                >
                    <Image source={search}></Image>

                    <TextInput
                        placeholder="Tìm vị trí..."
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
                            maxHeight: 300
                        }}
                    >
                        {query &&
                            suggestions.map((suggestion, i) => (
                                <Pressable
                                key =  {i}
                                    onPress={() => {
                                        dispatch(
                                            addressRequest(
                                                suggestion.description
                                            )
                                        );

                                        dispatch(
                                            phoneNumberRequest(
                                                user.phoneNumber
                                            )
                                        );
                                        navigation.goBack();
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
                
                <View
                    style={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginVertical: 20,
                            paddingBottom: 20,
                        },
                        styles.border,
                    ]}
                >   
                    
                    <Image source={location} />
                    <View style = {{}}>

                        <Text style={{fontSize: 20, marginLeft: 15 }}>
                            {currentAddress}
                        </Text>

                        <Text style={{fontSize: 18, marginLeft: 15 , marginTop: 10}}>{"SĐT: " + currentPhoneNumber}</Text>
                    </View>
                </View>
                

                <Text style = {{color: "grey", fontSize: 20, marginVertical: 10}}>Địa chỉ đã lưu</Text>

                {user.address.length !== 0 && user.address.map((address, i) => (
                    <Pressable key = {i} style = {{backgroundColor: "#dadada", marginBottom: 20}}                                     
                        
                        onPress={() => {
                            dispatch(
                                addressRequest(
                                    address.place
                                )
                            );
                            dispatch(
                                phoneNumberRequest(
                                    address.phoneNumber
                                )
                            );
                            navigation.goBack();
                        }
                    }>
                        <View style = {{backgroundColor: "#dadada", padding: 10, display: "flex", flexDirection:"row", }}>
                            <View style = {{flex : 1}}>

                                {
                                    address.type !== "others" 
                                    &&
                                    <Text style = {{fontSize: 22, fontWeight: 700, marginBottom: 5}}>{address.type}</Text>
                                }
                                
                                <Text style = {{fontSize: 18}}>{address.place}</Text>
                            </View>

                            <View style = {{display: "flex", justifyContent: "space-between", alignItems: "center"}}>


                                <Pressable onPress={() => {
                                    deleteAddress({
                                        userId: user._id,
                                        addressNo: address.addressNo
                                    })
                                    .then(newUser => {
                                        
                                        dispatch(updateAddress(newUser.data));
                    
                                    })
                                }}>
                                    <Text style = {{color: "red", fontSize: 16}}>Xoá</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style = {{padding: 10, díplay: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {
                                phoneNumberChanging !== i
                                ?
                                <View style = {{flex: 1, height: 30, display: "flex", justifyContent: "center"}}>
                                    <Text style = {{fontSize: 18}}>{"SĐT: " + address.phoneNumber}</Text>
                                </View>
                                :
                                <View style = {{flex: 1, height: 30}}>
                                    <TextInput value = {inputPhoneNumber} onChangeText={(e) => setInputPhoneNumber(e)} placeholder="Nhập số điện thoại ..." style = {{fontSize: 18}}/>
                                </View>
                            }

                            {
                                phoneNumberChanging !== i
                                ?
                                <Pressable style = {{display: "flex", flexDirection: "row", alignItems: "center"}} 
                                onPress = {() => {
                                    setPhoneNumberChanging(i)
                                    setInputPhoneNumber("")
                                }}>
                                    <Text style = {{fontSize: 16, color: "green"}}>Sửa</Text>
                                </Pressable>
                                :
                                <View style = {{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <Pressable onPress = {() => {
                                        setPhoneNumberChanging(-1)
                                        setInputPhoneNumber("")
                                    }}>
                                        <Text style = {{fontSize: 16, color: "red", marginRight: 15}}>Huỷ</Text>
                                    </Pressable>
                                    <Pressable onPress = {() => {
                                        setUpdating(true)

                                        updatePhoneNumberAddress({userId: user._id, addressNo: address.addressNo, phoneNumber: inputPhoneNumber})
                                        .then(newUser => {
                                            dispatch(updateAddress(newUser.data));
                                            setUpdating(false)
                                            setPhoneNumberChanging(-1)
                                        })
                                    }}>
                                        <Text style = {{fontSize: 16, color: "green"}}>Lưu</Text>
                                    </Pressable>
                                </View>
                            }
                        </View>
                    </Pressable>
                ))}
            </View>





            {
                updating
                &&
                <View style = {{position: "absolute", backgroundColor: "grey", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.7, zIndex: 9999}}>

                </View>
            }

            <Pressable
                onPress={() => navigation.navigate("AddAddress")}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 50,
                    backgroundColor: "green",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 22, fontWeight: 700 }}>
                    Thêm địa chỉ mới
                </Text>
            </Pressable>
        </SafeAreaView> 
    );
}
