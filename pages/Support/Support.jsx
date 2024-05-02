import React, { useEffect, useState } from 'react'
import {Text, View, Button,  Pressable, Image, Modal ,StatusBar, ScrollView } from "react-native";
import {styles} from "./styles.Support"
import {
    SafeAreaProvider,
    useSafeAreaInsets,
    SafeAreaView
  } from 'react-native-safe-area-context';
import ticketImage from "../../assets/ticket.png"
import NavBar from '../../components/NavBar/NavBar';
import { getUserTicket } from '../../api/ticketAPI';
import { useSelector } from 'react-redux';
import { formatDate } from '../../helper';

export default function Support({navigation, route}) {
    const user = useSelector(state => state.user.user)
    const [option, setOption] = useState(1)
    const [tickets, setTickets]  = useState([])
    const [listTickets, setListTickets] = useState([])
    

    useEffect(() => {
        getUserTicket({userId: user._id})
            .then(res => {
                setTickets(res.data)
            })
    },[])

    useEffect(() => {
        if(tickets.lenth !== 0){
            if(option == 1){
                setListTickets(tickets.filter(ticket => ticket.response === ""))
            }else{
                setListTickets(tickets.filter(ticket => ticket.response !== ""))
            }
        }
    },[option, tickets])


    return (

    <SafeAreaView             
        style={{
            flex: 1,

    }}>

        <View style = {styles.navbarContainer}>
            <NavBar navigation = {navigation}/>
        </View>

        <View style = {{margin: 10}}>

            <View style = {{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text style = {{fontWeight: "bold", fontSize: 30}}>Hỗ Trợ</Text>
                <Pressable style = {{
                    width: "45%",
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
                    <Text style = {styles.textOption}>Đã xử lý</Text>
                </Pressable>

            </View>   

            {
                listTickets.map((ticket, i) => 
                    <View key = {i} style = {{display: "flex", alignItems: "center", flexDirection: "row", backgroundColor: "#cfcfcf", padding: 10, marginBottom: 20, zIndex: 999}}>

                        <View style = {{width: 40, height: 40, zIndex: 999}}>
                            <Image style = {{width: 40, height: 40}} source={ticketImage}/>
                        </View>

           
                       
                        <View style = {{flex: 1, marginHorizontal: 15, fontSize: 18, height: 40,}}>
                            <Text style = {{fontSize:18, marginBottom: 5}}>
                                {ticket.header}
                            </Text>
                            <Text>
                                {formatDate(new Date(ticket.createdAt))}
                            </Text>
                        </View>

                    </View>
                )
            }


        </View>
    </SafeAreaView>
    )

}
