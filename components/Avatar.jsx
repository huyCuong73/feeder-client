import { View, Text } from 'react-native'
import React from 'react'



const Avatar = ({username, size}) => {

    const a = username.split(" ")
    const word = a[a.length - 1]
    const letter = word[0]
  return (
    <View style = {{width: size, height: size, backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: size/2}}>
      <Text style = {{fontSize: size/2, color: "white"}}>{letter}</Text>
    </View>
  )
}

export default Avatar