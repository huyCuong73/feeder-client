import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import backward from "../../assets/backward.png";

const SelectPaymentMethod = ({navigation}) => {
    const user = useSelector((state) => state.user.user);
    const [accountSelected, setAccountSelected] = useState(-1)
    console.log(accountSelected);
    return (
        <SafeAreaView>
            <Pressable
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 20,
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    style={{ width: 30, marginLeft: 20 }}
                    source={backward}
                />

                <Text style={{ fontSize: 30, fontWeight: 600, marginLeft: 20 }}>
                    Thêm voucher
                </Text>
            </Pressable>

            <Pressable style= {{margin: 20}}>

                {[...user.paymentMethod.bank].map((bank, i) => (
                    <Pressable key={i} style = {{borderWidth: accountSelected === i ? 5 : 2, padding: 15, borderColor: accountSelected === i ?  "green" : "#a4a1a1bcb", marginBottom: 20}} onPress = {() => {setAccountSelected(i)}}>
                        <Text style = {{marginBottom: 10, fontSize: 20, fontWeight: 700}}>{bank.name}</Text>
                        <Text>{bank.accountNumber}</Text>
                    </Pressable>
                ))}
            </Pressable>
        </SafeAreaView>
    );
};

export default SelectPaymentMethod;

const styles = StyleSheet.create({});
