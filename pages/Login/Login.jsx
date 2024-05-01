import React, { useState } from "react";
import { View, Text,TextInput, TouchableOpacity, Modal, StyleSheet, Pressable, SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/user";
import { login } from "../../api/authAPI";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	
    const user =  useSelector( state => state.user)

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(
            actions.loginRequest({
                email,
                password,
            })
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Tiêu đề..."
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={{
                    fontSize: 26,
                    marginTop: 20,
                }}
            />     
            <TextInput
                placeholder="Tiêu đề..."
                value={password}
                onChangeText={(value) => setPassword(value)}
                style={{
                    fontSize: 26,
                    marginTop: 20,
                }}
            />       

            <Pressable style = {{
                width: 200,
                height: 100,
                backgroundColor: "green"
            }}
            
                onPress = {() => handleLogin({email, password})}
            >
                <Text>
                    Log in    
                </Text>   
            </Pressable>  

            <Pressable style = {{
                width: 200,
                height: 100,
                backgroundColor: "green"
            }}
            
                onPress = {() => {
                    
                    console.log("user:", user)
                }}
            >
                <Text>
                    Log in    
                </Text>   
            </Pressable> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    timeDisplay: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        elevation: 2,
    },
    timeText: {
        fontSize: 32,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#6200EE",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
