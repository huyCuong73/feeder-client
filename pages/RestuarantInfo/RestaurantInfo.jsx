import { ScrollView, StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect , useState} from "react";
import backward from "../../assets/backward.png";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import StarRating from "../../components/StarRating/StarRating";
import { getRestaurantInfo } from "../../api/restaurantAPI";

const RestaurantInfo = ({navigation, route}) => {


    const [restaurant, setRestaurant] = useState(null)
    const restaurantId = route.params.restaurant._id
   
    
    useEffect(() => {
        getRestaurantInfo({restaurantId: restaurantId})
            .then((res) => {
                setRestaurant(res.data)
            })
    },[])

    return (
        <SafeAreaView style = {{flex : 1}}>
            <Pressable
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: "#c2c1c1"
                }}
                onPress={() => navigation.goBack()}
            >
                <Image source={backward}></Image>
                <Text style={{ fontSize: 26, marginLeft: 15 }}>
                    Thông tin nhà hàng
                </Text>
            </Pressable>

                {
                    restaurant
                    &&

                    <View style = {{marginHorizontal: 15}}>
                        <Text style = {{marginVertical: 20, fontSize: 30, fontWeight: 700}}>{restaurant.name}</Text>                
                        

                        <View style = {{display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <View style = {{marginVertical: 10, marginRight: 10}}>
                                <StarRating averageRating = {restaurant.rating.value} size = {20}/>
                            </View>

                            <Text style= {{fontSize: 20}}>{restaurant.rating.value}</Text>
                            <Text style= {{fontSize: 20}}>{"  (" + restaurant.rating.numberOfRating + " đánh giá)"}</Text>
                        </View>
                        <MapView
                            style={styles.map}
                            // mapType = "standard"
                            initialRegion={{
                                latitude: restaurant.location.coordinates[1],
                                longitude: restaurant.location.coordinates[0],
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            >
                            <Marker
                                coordinate={{
                                    latitude: restaurant.location.coordinates[1],
                                    longitude: restaurant.location.coordinates[0],
                                }}
                                // title="My Location"
                            />
                        </MapView>
                        <Text style = {{margin: 15, fontSize: 20}}>{ "Địa chỉ:  " + restaurant.address }</Text>
                        <Text style = {{margin: 15, fontSize: 20}}>{ "Thời gian hoạt động:  " + restaurant.operatingTime }</Text>
                    </View>
                }
        </SafeAreaView>
    );
};

export default RestaurantInfo;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 300,
    },
});
