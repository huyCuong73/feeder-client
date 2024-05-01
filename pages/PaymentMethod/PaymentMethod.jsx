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

const PaymentMethod = ({navigation}) => {
    const data = [
        { id: "1", bank: "ABBank - NHTMCP An Binh" },
        { id: "2", bank: "ACB - NH TMCP A Chau Quan Doi" },
        { id: "3", bank: "MBBank - NHTMCP Quan Doi" },
    ];

    const [bank, setBank] = useState("");
    const [openList, setOpenList] = useState(0);
    const [bankNumber, setBankNumber] = useState();

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
                    Thêm tài khoản ngân hàng
                </Text>
            </Pressable>

            <View>
                <Pressable
                    onPress={() => {
                        setOpenList(1);
                    }}
                    style={{
                        margin: 20,
                        backgroundColor: "#d4d4d4",
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {bank.length == 0 ? (
                        <Text style={{ fontSize: 26, paddingLeft: 15 }}>
                            Thêm tài khoản ngân hàng ...
                        </Text>
                    ) : (
                        <Text style={{ fontSize: 26, paddingLeft: 15 }}>
                            {bank}
                        </Text>
                    )}
                </Pressable>

                {openList == 1 && (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    setBank(item.bank);
                                    setOpenList(0);
                                }}
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    height: 50,
                                    borderBottomColor: "#ccc",
                                    borderBottomWidth: 1,
                                    paddingLeft: 15,
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>
                                    {item.bank}
                                </Text>
                            </Pressable>
                        )}
                        style={{
                            width: "92%",
                            backgroundColor: "#fff",
                            position: "absolute",
                            top: 70,
                            left: 20,
                        }}
                    />
                )}
            </View>

            <TextInput
                style={{
                    marginHorizontal: 20,
                    height: 50,
                    backgroundColor: "#ccc",
                    fontSize: 24,
                    paddingLeft: 15,
                }}
                placeholder="Nhập số tài khoản ..."
                value= {bankNumber}
                keyboardType='numeric'
                onChangeText={value => setBankNumber(value)}
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
                onPress={() => navigation.navigate("CreateBankOtp",{bank,bankNumber})}
       
            >
                <Text style={{ fontSize: 26, fontWeight: 600, color: "white" }}>
                    Tiếp theo
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
