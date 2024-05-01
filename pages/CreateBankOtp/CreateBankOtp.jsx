import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
    Image,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import backward from "../../assets/backward.png";
import { addBankPayment } from "../../api/userAPI";
import { useSelector } from "react-redux";

const CreateBankOtp = ({navigation, route}) => {

    const user = useSelector(state => state.user.user)
    const [otp, setOtp] = useState("")

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable
                style={{
                    width: "100%",
                    height: 50,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={backward}
                    style={{ marginLeft: 20, width: 30 }}
                />
                <Text
                    style={{ fontSize: 30, fontWeight: "500", marginLeft: 20 }}
                >
                    Thêm mã Otp
                </Text>
            </Pressable>


            <TextInput
                style={{
                    marginHorizontal: 20,
                    height: 50,
                    backgroundColor: "#ccc",
                    fontSize: 24,
                    paddingLeft: 15,
                }}

                placeholder="Nhập mã OTP"
                keyboardType="numeric"
                value={otp}
                onChangeText={value => setOtp(value)}
            />

            <Pressable
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "green",
                    width: "100%",
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}

                onPress={async () => {
                    const newUser = await addBankPayment({
                        userId: user._id,
                        bankInfo: {
                            name: route.params.bank,
                            accountNumber: route.params.bankNumber,
                            otp
                        } 
                    })

                    navigation.navigate("Home")
                }}
            >
                <Text style={{ fontSize: 26, fontWeight: 600, color: "white" }}>
                    Lưu
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default CreateBankOtp;

const styles = StyleSheet.create({});
