import React, { useState } from 'react'
import {Text, View, Button,  Pressable, Image, Modal,SafeAreaView ,StatusBar, ScrollView } from "react-native";
import {styles} from "./styles.Support"
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import ticket from "../../assets/ticket.png"
import NavBar from '../../components/NavBar/NavBar';

export default function Support({navigation}) {
    const insets = useSafeAreaInsets();
    const [option, setOption] = useState(1)


    return (

    <SafeAreaView             
        style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
    }}>

        <View style = {styles.navbarContainer}>
            <NavBar navigation = {navigation}/>
        </View>

        <View style = {{margin: 10}}>

            <View style = {{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text style = {{fontWeight: "bold", fontSize: 30}}>Hỗ Trợ</Text>
                <Pressable style = {{
                    width: 200,
                    height: 50, 
                    backgroundColor: "green",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}  onPress={() => navigation.navigate("Ticket")}>
                    <Text style = {{color: "white", fontSize: 20}}>
                        Tạo ticket
                    </Text>
                </Pressable>
            </View>


            <View style = {styles.options}>

                <Pressable style = {option === 1 ? styles.optionSelected : styles.option} onPress={() => setOption(1)}>
                    <Text style = {styles.textOption}>Đang xử lý</Text>
                </Pressable>

                <Pressable style = {option === 2 ? styles.optionSelected : styles.option} onPress={() => setOption(2)}>
                    <Text style = {styles.textOption}>Chưa xử lý</Text>
                </Pressable>

                <Pressable style = {option === 3 ? styles.optionSelected : styles.option} onPress={() => setOption(3)}>
                    <Text style = {styles.textOption}>Đã xử lý</Text>
                </Pressable>
            </View>   

            <View style = {{display: "flex", alignItems: "center", flexDirection: "row", backgroundColor: "#cfcfcf", padding: 10, marginBottom: 20}}>
                <Image style = {{width: "10%"}} source={ticket}>

                </Image>

                <View style = {{width: "70%", marginHorizontal: 15, fontSize: 18, height: 40,}}>
                    <Text style = {{fontSize:18, marginBottom: 5}}>
                        Lorem ipsum dolor sit amet
                    </Text>
                    <Text>
                    20:20 20/20/2020
                    </Text>
                </View>

                <Text style = {{flex : 1}}>
                    #12345
                </Text>
            </View>
            <View style = {{display: "flex", alignItems: "center", flexDirection: "row", backgroundColor: "#cfcfcf", padding: 10}}>
                <Image source={ticket}>

                </Image>

                <View style = {{width: "80%", marginHorizontal: 15, fontSize: 18, height: 40,}}>
                    <Text style = {{fontSize:18, marginBottom: 5}}>
                        Lorem ipsum dolor sit amet
                    </Text>
                    <Text>
                    20:20 20/20/2020
                    </Text>
                </View>

                <Text>
                    #12345
                </Text>
            </View>
        </View>
    </SafeAreaView>
    )

}
