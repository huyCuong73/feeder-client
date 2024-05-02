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
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="nhập email của bạn"
                // keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="nhập mật khẩu"
                secureTextEntry
            />  

            <Pressable style = {{
                width: 200,
                height: 70,
                
                backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            }}
            
                onPress = {() => handleLogin({email, password})}
            >
                <Text style = {{color: "white", fontSize: 24}}>
                    Đăng nhập
                </Text>   
            </Pressable>  


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
      },
      input: {
        width: '80%',
        height: 60,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        fontSize: 20
      },
});
