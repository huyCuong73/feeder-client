import { StyleSheet, Text, View, TextInput , Pressable} from "react-native";
import React , {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { addTicketResponse } from "../../api/ticketAPI";

const TicketResponse = ({ navigation, route }) => {
    const ticket = route.params.ticket

    const [response, setResponse] = useState("")

    return (
        <SafeAreaView style = {{flex : 1}}>

            <View style = {{margin: 20, borderBottomWidth: 2, borderBottomColor: "#cdcdcd"}}>

                <Text style = {{fontSize: 22}}>{ticket.header}</Text>

                <Text style = {{fontSize: 18, marginVertical: 10}}>{ticket.body}</Text>

                <Text style = {{fontSize: 22, fontWeight: 700, marginBottom: 20}}>{"orderId: " + ticket.orderId}</Text>
            </View>

            <TextInput
                placeholder="Nhập phản hồi..."
                onChangeText={(text) => setResponse(text)}
                multiline
                style={{
                    marginHorizontal: 20,
                    height: 500,
                    borderWidth: 2,
                    borderColor: "black",
                    fontSize: 20,
                    textAlignVertical: "top",
                    marginTop: 30,
                    padding: 10,
                }}
            ></TextInput>


            {
                response.length !== 0 
                &&
                <Pressable 
                    style = {{position: "absolute", left: 0, bottom: 0, width: "100%", height: 75, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "green"}}
                    onPress = {() => 
                        addTicketResponse({
                            ticketId: ticket._id,
                            response
                        })
                        .then(() => {
                            navigation.navigate("HelpCenter")
                        })
                }

                >
                    <Text style = {{color: "white", fontSize: 20}}>Gửi phản hồi</Text>
                </Pressable>
            }
        </SafeAreaView>
    );
};

export default TicketResponse;

const styles = StyleSheet.create({});
