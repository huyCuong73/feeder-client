import React, { useState } from 'react'
import {Text, View, Button,  Pressable } from "react-native";
import {styles} from "./styles.FavouriteFood"
import NavBar from '../../components/NavBar/NavBar';
import { foods } from '../../data';
import { formatVND } from '../../helper';

export default function FavouriteFood({navigation, food, option}) {
  return (
    <View style = {styles.foodContainer}>
        <Pressable style = {styles.foodWrapper}>
            <View style = {styles.foodImageContainer}>
                <View style = {styles.foodImage}>

                </View>
            </View>

            <View style = {styles.foodInfo}>
                <View style = {styles.foodHeader}>
                    <Text style = {styles.foodName}>
                        {food.name}
                    </Text>
                    <Text > 
                        {/* {`${food.sold} đã bán | ${food.likes} lượt thích`} */}
                    </Text>
                    <Text>
                        {/* {food.distance + "km"} */}
                    </Text>
                </View>

                <View style = {styles.foodAction}>
                    <Text style = {styles.price}>
                        {formatVND(food.price)}
                    </Text>

                    {
                        option == 3
                        ?
                        <View style = {styles.foodActions}>
                            <Pressable>
                                <Text style = {styles.actionLabel}>
                                    Sửa
                                </Text>
                            </Pressable>
                            <Pressable>
                                <Text style = {styles.actionLabel}>
                                    Huỷ đặt hàng
                                </Text>
                            </Pressable>
                        </View>
                        :
                        <View style = {styles.order}>
                            <Pressable onPress={() => navigation.navigate("Order",{ food: food})}>
                                <Text style = {styles.orderLabel}>
                                    Đặt ngay
                                </Text>
                            </Pressable>
                        </View>
                    }
                </View>
            </View>
        </Pressable>
    </View>
  )
}
