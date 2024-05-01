import React from 'react'
import { View } from 'react-native-web'
import NavBar from '../../components/NavBar/NavBar'

export default function List({navigation}) {
  return (
    <View>
        <NavBar navigation = {navigation}/>
    </View>
  )
}
