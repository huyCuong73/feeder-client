import React from 'react'
import { Text, View, Button, Image, TouchableOpacity  } from "react-native";
import {styles} from "./styles.NavBar"
import home from "../../assets/nav/home.png"
import fav from "../../assets/nav/favourite.png"
import list from "../../assets/nav/list.png"
import person from "../../assets/nav/person.png"
import notification from "../../assets/nav/notification.png"
import support from "../../assets/support.png"

export default function NavBar({navigation}) {


    return (
        <View style = {styles.container}>
            <TouchableOpacity  style = {styles.iconContainer} onPress={() => navigation.navigate("Home")}>
                <Image 
                    style = {styles.navIcon} 
                    source = {home}
                    
                ></Image>
                <Text style = {styles.iconLabel}>Trang chủ</Text>
            </TouchableOpacity >

            <TouchableOpacity  style = {styles.iconContainer} onPress={() => navigation.navigate("ListOrders")}>
                <Image 
                    style = {styles.navIcon} 
                    source = {list}
                    
                ></Image>  
                <Text style = {styles.iconLabel}>Đơn hàng</Text>
            </TouchableOpacity >

            <TouchableOpacity  style = {styles.iconContainer} onPress={() => navigation.navigate("FavouriteRestaurant")}>
                <Image 
                    style = {styles.navIcon} 
                    source={require('../../assets/nav/favourite.png')}
                ></Image>
                <Text style = {styles.iconLabel}>Yêu thích</Text>
            </TouchableOpacity >

            <TouchableOpacity  style = {styles.iconContainer}  onPress={() => navigation.navigate("Notification")}  >
                <Image 
                    style = {styles.navIcon} 
                    source = {notification}
                    
                ></Image>
                <Text style = {styles.iconLabel}>Thông báo</Text>
            </TouchableOpacity >     

            <TouchableOpacity  style = {styles.iconContainer} onPress={() => {navigation.navigate("Profile")}}>
                <Image 
                    style = {styles.navIcon} 
                    source={person}
                    
                
                ></Image>  
                <Text style = {styles.iconLabel}>Hồ sơ</Text>
            </TouchableOpacity >

 
        </View>        
    )
}




