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
    ScrollView,
} from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import { styles } from "./styles.Home";
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";
import * as Notifications from 'expo-notifications';

import Geolocation from "react-native-geolocation-service";
import {} from "react-native";

import forward from "../../assets/forward.png";
import homeImage from "../../assets/home-image.png";
import { useDispatch, useSelector } from "react-redux";
import { addressRequest } from "../../redux/actions/address";
import {
    getHighestRatedResturants,
    getNearestRestaurants,
    getTopSellingResturants,
} from "../../api/restaurantAPI";
import Icon from "react-native-vector-icons/MaterialIcons";
import shipping from "../../assets/shipping.png"
import { getGeocode } from "../../helper";
import CurrentAddress from "../../components/CurrentAddress/CurrentAddress";

async function getNotificationToken() {
    const {status} = await Notifications.getPermissionsAsync()
    if(status !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()

        if(status !== 'granted'){
            alert('Lỗi truy cập thông báo')
            return
        }
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId: '9b40e9a7-b21d-4647-b5b6-0bfc90e3bd1f' })
    const token = tokenData.data
    console.log({token});
    return token
}

export default function Home({ navigation }) {
    Location.setGoogleApiKey("AIzaSyB9jG7ROCL115gTV3Z1boznnkxN4lTM-wc");
    const dispatch = useDispatch();
    const address = useSelector((state) => state.address);

    const [restaurantListOption, setRestaurantListOption] = useState(1);
    const [restaurants, setRestaurants] = useState([]);
    const [location, setLocation] = useState();
    const [reverseCode, setReverseCode] = useState();

    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    const getDuration = (origin, destination) => {
        

        const originStr = `${origin.latitude},${origin.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        axios
            .get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originStr}&destinations=${destinationStr}&key=AIzaSyB9jG7ROCL115gTV3Z1boznnkxN4lTM-wc`
            )

            .then((res) => {
                return (res.data.rows[0].elements[0].duration.text);
            })
            // .catch((error) => {
            //     console.error(error);
            // });
    };


    
    useEffect(() => {
        const getPermissions = async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.log("Please grant location permissions");
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync(
                    {}
                );
                setLocation(currentLocation);
                console.log("Location:");
                console.log(currentLocation);
            } catch (error) {
                console.error("Error getting location permissions:", error);
            }
        };
        getPermissions();
    }, []);

    
    useEffect(() => {
        const findNearestRestaurants = async () => {
            const data = await getNearestRestaurants({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            });

            setRestaurants(data.data);
        };

        const findTopSellingRestaurants = async () => {
            const data = await getTopSellingResturants();

            setRestaurants(data.data);
        };
        const findHighestRatedRestaurants = async () => {
            const data = await getHighestRatedResturants();

            setRestaurants(data.data);
        };

        if (restaurantListOption === 1) {
            if (location) {
                findNearestRestaurants();
            }
        } else if (restaurantListOption === 2) {
            findTopSellingRestaurants();
        } else {
            findHighestRatedRestaurants();
        }
    }, [location, restaurantListOption]);


    useEffect(() => {
        if (location) {
            const reverseGeocode = async () => {
                const reverseGeocodedAddress =
                    await Location.reverseGeocodeAsync({
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    });
                dispatch(
                    addressRequest(reverseGeocodedAddress[0].formattedAddress)
                );
            };

            reverseGeocode();
        }
    }, [location]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >


            <View style={styles.navbarContainer}>
                <NavBar navigation={navigation} />
            </View>

            <View style={styles.container}>
                {/* <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18 }}>Giao đến: </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 18 }}>Địa chỉ:</Text>
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
                            <Text style={{ fontSize: 18 }}>
                                {address && address}
                            </Text>
                            <Image source={forward}></Image>
                        </Pressable>
                    </View>
                </View> */}

                <CurrentAddress navigation={navigation}/>

                <View style={{ width: "100%", marginTop: "30" }}>
                    <Image
                        source={homeImage}
                        style={{ width: "100%", height: 200 }}
                    ></Image>
                </View>

                <View
                    style={{
                        width: "100%",
                        padding: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable
                        style={restaurantListOption === 1 ? styles.optionWrapperSelected : styles.optionsWrapper}
                        onPress={() => setRestaurantListOption(1)}
                    >
                        <Text style={restaurantListOption === 1 ? styles.optionSelected : styles.option}>Gần tôi</Text>
                    </Pressable>

                    <Pressable
                        style={restaurantListOption === 2 ? styles.optionWrapperSelected : styles.optionsWrapper}
                        onPress={() => setRestaurantListOption(2)}
                    >
                        <Text style={restaurantListOption === 2 ? styles.optionSelected : styles.option}>Bán chạy</Text>
                    </Pressable>

                    <Pressable
                        style={restaurantListOption === 3 ? styles.optionWrapperSelected : styles.optionsWrapper}
                        onPress={() => setRestaurantListOption(3)}
                    >
                        <Text style={restaurantListOption === 3 ? styles.optionSelected : styles.option}>Đánh giá</Text>
                    </Pressable>
                </View>
            </View>

            <View>
                {/* <MapView
                    style={{ alignSelf: "stretch", height: 200 }}
                    region={{
                        latitude: (origin.latitude + destination.latitude) / 2,
                        longitude:
                            (origin.longitude + destination.longitude) / 2,
                        latitudeDelta:
                            Math.abs(origin.latitude - destination.latitude) *
                            2,
                        longitudeDelta:
                            Math.abs(origin.longitude - destination.longitude) *
                            2,
                    }}
                /> */}
                {/* <Text>Distance: {distance}</Text>
                <Text>Duration: {duration}</Text> */}
            </View>

            <ScrollView style={{ marginHorizontal: 15 , marginBottom: 100}}>
                {
                    restaurants.map((restaurant, i) => 
                        <Pressable key = {i} style = {{ height: 150, backgroundColor: "#d2d2d2", marginBottom: 20, display: "flex", flexDirection: "row", padding: 10}} onPress={() => (navigation.navigate("Restaurant", {restaurant: restaurant}))}>
                            <Image style = {{width: 150, marginRight: 15}} source={{uri: restaurant.imgsrc}}></Image>
                            <View style = {{flex: 1}}>
                                <Text style = {{fontSize: 20, flex: 1, fontWeight: 600, marginBottom: 20}}>
                                    {restaurant.name}
                                </Text>

                                <View style = {{display: "flex", flexDirection: "row"}}>
                                    <View style = {{marginHorizontal : 30, display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Icon size={22} name="location-on" color={"green"}/>
                                        <Text style = {{fontSize:18}}>{`${(restaurant.distance/1000).toFixed(1)} km`}</Text>
                                    </View>


                                    <View style = {{marginHorizontal : 30, display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Image source={shipping} style = {{marginRight: 10}}></Image>
                                        <Text style = {{fontSize:18}}>
                                            {(restaurant.distance/250).toFixed(1) + " phút"} 
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )
                }
            </ScrollView>

         
        </SafeAreaView>
    );
}
