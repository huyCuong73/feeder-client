import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import backward from "../../assets/backward.png";
import { useSelector } from "react-redux";
import voucherImage from "../../assets/voucher.png";
import { getValidVouchers } from "../../api/voucherAPI";
import last from "../../assets/last.png";

const AddVoucher = ({ navigation, route }) => {
    const foodsList = route.params.foodsList;
    const shoppingCart = route.params.shoppingCart;
    const user = useSelector((state) => state.user.user);

    const [vouchers, setVouchers] = useState([]);

    const [voucherSelected, setVoucherSelected] = useState();
    const [voucherIndex, setVoucherIndex] = useState(-1);

    useEffect(() => {
        const findValidVouchers = async () => {
            const validVouchers = await getValidVouchers({ userId: user._id });
            setVouchers(validVouchers.data);
        };

        findValidVouchers();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 20,
                }}
                onPress={() =>
                    navigation.goBack()
                }
            >
                <Image
                    style={{ width: 30, marginLeft: 20 }}
                    source={backward}
                />

                <Text style={{ fontSize: 30, fontWeight: 600, marginLeft: 20 }}>
                    Thêm voucher
                </Text>
            </Pressable>

            <View
                style={{
                    width: "100%",
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#bababa",
                }}
            >
                <Text style={{ fontSize: 28, fontWeight: 600 }}>
                    Chỉ chọn 1 voucher
                </Text>
            </View>

            <ScrollView style={{ margin: 20, marginBottom: 100 }}>
                {vouchers.map((voucher, i) => (
                    <Pressable
                    key = {i}
                        style={
                            voucherIndex !== i
                                ? {
                                      display: "flex",
                                      flexDirection: "row",
                                      marginBottom: 20,
                                      height: 100,
                                  }
                                : {
                                      display: "flex",
                                      flexDirection: "row",
                                      marginBottom: 20,
                                      height: 100,
                                      backgroundColor: "green",
                                  }
                        }
                        onPress={() => {
                            setVoucherSelected(voucher);
                            setVoucherIndex(i);
                        }}
                    >
                        <Image style={{}} source={last} />

                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    marginTop: 10,
                                    color:
                                        voucherIndex === i ? "white" : "black",
                                }}
                            >
                                {voucher.name}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 16,
                                    color:
                                        voucherIndex === i ? "white" : "black",
                                }}
                            >
                                {voucher.des}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>

            <Pressable
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 50,
                    backgroundColor: "green",
                    position: "absolute",
                }}

                onPress={() => navigation.navigate("Order", {foodsList, shoppingCart, voucher: voucherSelected})}
            >
                <Text style={{ color: "white", fontSize: 24, fontWeight: 500 }}>
                    Dùng ngay
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default AddVoucher;

const styles = StyleSheet.create({});
