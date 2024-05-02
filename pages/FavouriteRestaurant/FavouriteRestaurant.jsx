import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { View, Text, Pressable, Image, StyleSheet , ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {  useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/actions/user";
import { getFavouriteRestaurants } from "../../api/restaurantAPI";

export default function FavouriteRestaurant({ navigation }) {
    const [option, setOption] = useState(1)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    console.log()

    useEffect(() => {
        getFavouriteRestaurants({restaurantIds: user.favouriteRestaurants})
        .then((res) => {
            console.log(res.data)
        })
    })
    
    return (
        <SafeAreaView         
            style={{
                flex: 1,
        }} >
            <View style = {styles.navbarContainer}>
                <NavBar navigation = {navigation}/>
            </View>

            <View style = {styles.container}>
                <View style = {styles.options}>

                    <Pressable style = {option === 1 ? styles.optionSelected : styles.option} onPress={() => setOption(1)}>
                        <Text style = {styles.textOption}>Đã thích</Text>
                    </Pressable>

                    <Pressable style = {option === 2 ? styles.optionSelected : styles.option} onPress={() => setOption(2)}>
                        <Text style = {styles.textOption}>Gần tôi</Text>
                    </Pressable>

                    <Pressable style = {option === 3 ? styles.optionSelected : styles.option} onPress={() => setOption(3)}>
                        <Text style = {styles.textOption}>Tự động</Text>
                    </Pressable>
                </View>    

                <ScrollView style = {{marginTop : 30}}>

                </ScrollView>        

            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container:{
        margin: 10,
        // backgroundColor: "gray"
    },
    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0 ,
        left:0,
        zIndex:999
    },

    options:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25
    },

    option: {
        fontSize: 20,
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#009842",

    },

    optionSelected: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#05F16C"  
    },


    textOption: {
        fontSize: 24,
        color: "white"
    }

})