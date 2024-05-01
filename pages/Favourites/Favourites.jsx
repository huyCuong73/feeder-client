import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import {Text, View, Button,  Pressable, ScrollView, Image } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import {styles} from "./styles.Favourites"
import NavBar from '../../components/NavBar/NavBar';
import { foods } from '../../data';
import FavouriteFood from '../../components/FavouriteFood/FavouriteFood';
import { getFavouriteFoods } from '../../api/userAPI';
import { useSelector } from 'react-redux';
import { formatVND } from '../../helper';

export default function Favoutites({navigation, route}) {
    const user = useSelector(state => state.user.user)
    const [foods, setFoods] = useState([])
    const [option, setOption] = useState(1)


    useEffect(() => {
        setFoods(user.favouriteFoods)
    },[user])



    //     if(option == 3){
    //         setFoodsList([foods[0]])
    //     } else {
    //         setFoodsList([...foods])
    //     }
    // },[option])
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
                {
                    foods.map((food, i) => 
                        <Pressable key = {i} style = {{ height:150, margin: 10, display: "flex", flexDirection: "row", padding: 15, backgroundColor : "#d2d2d2"}} onPress={() => navigation.navigate("Food",{food})}>
                            <Image style = {{width: 150, height: "100%", marginRight: 15}} source={{uri: food.imgsrc}}></Image>


                            <View style = {{display: "flex", justifyContent : "space-between"}}>
                                <Text style = {{fontSize: 22, fontWeight: "bold"}}>{food.name}</Text>
                                <Text style = {{fontSize: 20, fontWeight: 500}}>{formatVND(food.price)}</Text>
                            </View>
                        </Pressable>
                    )
                }
            </ScrollView>        

            </View>

        </SafeAreaView>
    )
}
