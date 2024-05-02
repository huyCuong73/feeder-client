import { StyleSheet, Text, View , Image, Pressable} from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllTickets } from '../../api/ticketAPI'
import ticketImage from "../../assets/ticket.png"
import { formatDate } from '../../helper'
import { logout } from '../../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'


const HelpCenter = ({navigation}) => {

    const [tickets, setTickets] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getAllTickets()
            .then((res) => {
                setTickets(res.data.filter(ticket => ticket.response === ""))
            })
            .catch(err => console.log(err))
    },)
  return (
    <SafeAreaView style = {{flex: 1}}>
            <Pressable style = {{backgroundColor: "green", width: 200, height: 50, diplay: "flex", justifyContent:"center", alignItems: "center", position: "absolute", right: 0}}
                onPress = {() => dispatch(logout())}
                >
                <Text>Logout</Text>
            </Pressable>

            <View style = {{marginTop: 40}}>

                    {
                    tickets.map((ticket, i) => 
                    <Pressable onPress = {() => navigation. navigate("TicketResponse", {ticket: ticket})}>
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
                    </Pressable>
                        
                    )
                }
            </View>
    </SafeAreaView>
  )
}

export default HelpCenter

const styles = StyleSheet.create({})





// const HelpCenter = () => {

//     const [tickets, setTickets] = useState([])

//     useEffect(() => {
//         getAllTickets()
//             .then((res) => {
//                 setTickets(res.data)
//             })
//             .catch(err => console.log(err))
//     },[])
//     return 
//     (
//     <SafeAreaView style = {{flex: 1}}>

//             {
//                 tickets.map((ticket, i) => 
//                     <View key = {i} style = {{display: "flex", alignItems: "center", flexDirection: "row", backgroundColor: "#cfcfcf", padding: 10, marginBottom: 20, zIndex: 999}}>

//                         <View style = {{width: 40, height: 40, zIndex: 999}}>
//                             <Image style = {{width: 40, height: 40}} source={ticketImage}/>
//                         </View>

           
                       
//                         <View style = {{flex: 1, marginHorizontal: 15, fontSize: 18, height: 40,}}>
//                             <Text style = {{fontSize:18, marginBottom: 5}}>
//                                 {ticket.header}
//                             </Text>
//                             <Text>
//                                 {formatDate(new Date(ticket.createdAt))}
//                             </Text>
//                         </View>

//                     </View>
//                 )
//             }
//     </SafeAreaView>;
//     )
// };

// export default HelpCenter;