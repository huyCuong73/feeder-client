import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from "react-native-elements";

const StarRating = ({averageRating, size}) => {
  return (
    <View                                 
    style={{
        display: "flex",
        flexDirection: "row",
  
    }}>
        {[1, 2, 3, 4, 5].map((index) => {
            return (
                
                <Icon
                    key = {index}
                    name={index <= averageRating ? "star" : "star"}
                    size={size}
                    color={
                        index <= averageRating ? "#FFD700" : "#B0C4DE"
                    }
                />
                
            );
        })}
    </View>
  )
}

export default StarRating

const styles = StyleSheet.create({})