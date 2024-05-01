import React, { useState } from "react";
import {
    Text,
    View,
    Button,
    Pressable,
    Image,
    Modal,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Alert,
} from "react-native";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles.Order";
import NavBar from "../../components/NavBar/NavBar";
import { foods } from "../../data";
import location from "../../assets/location.png";
import forward from "../../assets/forward.png";
import schedule from "../../assets/schedule.png";
import expand from "../../assets/expand.png";
import shipping from "../../assets/shipping.png";
import fav from "../../assets/nav/favourite.png";
import calendar from "../../assets/calendar.png";
import sub from "../../assets/minus-box.png";
import backward from "../../assets/backward.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getDistance } from "geolib";

import { auto } from "../../data";
import { useSelector } from "react-redux";
import { formatVND, formatDate, getFoodInShoppingCart } from "../../helper";
import { addNewOrder } from "../../api/orderAPI";

export default function Order({ navigation, route }) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const user = useSelector((state) => state.user.user);
    const currentAddress = useSelector((state) => state.address);
    const phoneNumber = useSelector(state => state.phoneNumber)
    const shippingFee = 15000;
    const foodsList = route.params.foodsList
    const shoppingCart = route.params.shoppingCart


    const foodsInCart = getFoodInShoppingCart(foodsList, shoppingCart)

    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);
    const [option, setOption] = useState(1);

    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dayPicked, setDayPicked] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState(2);

    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    const OptionButton = ({ option, onPress }) => (
        <Pressable style={styles.optionButton} onPress={onPress}>
            <Text style={styles.optionText}>{option}</Text>
        </Pressable>
    );

    const handleTimeChange = (event, selectedTime) => {
        if (event.type === "set") {
            const currentTime = selectedTime || time;
            setTime(currentTime);
            setShowPicker(false);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        if (event.type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowDatePicker(false);
        }
    };

    const getFoodsInCartId = () => {

        const foodsInCartId = []
        shoppingCart.forEach((food) => {
            foodsInCartId.push(food.foodId)
        })

        return foodsInCartId
    }

    const getFoodCount = (foodId) => {
        const foods = shoppingCart

        const foodInCart = foods.filter(food => food.foodId === foodId)
        return foodInCart[0].foodCount
    }

    const getTotalCost = () => {
        let cost = 0
        const foodsInCartId = []

        shoppingCart.forEach((food) => {
            foodsInCartId.push(food.foodId)
        })

        foodsList.forEach(food => {
            if(foodsInCartId.includes(food._id)){
                cost += food.price * getFoodCount(food._id)
            }
        })
        return cost
    }


    const getDateTime = () => {
        const combinedDateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(),
            time.getSeconds()
          );
    
       
        return combinedDateTime
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "space-between",
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                }}
            >
                <ScrollView>
                    <Pressable
                        style={styles.header}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={backward}
                            style={{ marginLeft: 20, width: 30 }}
                        ></Image>
                        <Text style={styles.confirmLabel}>
                            Xác nhận đơn hàng
                        </Text>
                    </Pressable>

                    <View style={styles.section}>
                        <View style={styles.iconLocationContainer}>
                            <Image
                                style={styles.navIcon}
                                source={location}
                            ></Image>
                        </View>
                        <View style={styles.location}>
                            <Text style={styles.sectionTitle}>
                                Địa chỉ giao hàng
                            </Text>
                            <Text style={styles.sectionContent}>
                                Nguyễn Văn A | 0123456789
                            </Text>
                            <Text style={styles.sectionContent}>
                                nhà 12A12, Ng.92D Trần Phú, Mỗ Lao, Hà Đông, Hà
                                Nội
                            </Text>
                        </View>

                        <View style={styles.iconForwardContainer}>
                            <Image
                                style={styles.navIcon}
                                source={forward}
                            ></Image>
                        </View>
                    </View>
                    
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <OptionButton
                                    option="Đặt ngay"
                                    onPress={() => {
                                        setOption(1);
                                        setModalVisible(false);
                                    }}
                                />

                                <OptionButton
                                    option="Một lần"
                                    onPress={() => {
                                        setOption(2);
                                        setModalVisible(false);
                                    }}
                                />

                                <OptionButton
                                    option="Định kỳ"
                                    onPress={() => {
                                        setOption(3);
                                        setModalVisible(false);
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>


                    <Pressable
                        style={styles.button}
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            style={styles.buttonIcon}
                            source={schedule}
                        ></Image>

                        <Text style={styles.buttonText}>
                            {option === 1 && "Đặt ngay"}
                            {option === 2 && "Một lần"}
                            {option === 3 && "Định kỳ"}
                        </Text>
                        <Image
                            style={styles.buttonIcon}
                            source={expand}
                        ></Image>
                    </Pressable>
                    

                    <View style = {{marginHorizontal: 20}}>

                        {
                            foodsInCart.map((food, i) => 
                                <View key = {i} style = {{display: "flex", flexDirection: "row", marginBottom: 15}}>
                                    <Image style = {{width:50, height:50}} source = {{uri: food.imgsrc}}/>

                                    <View style = {{padding: 10, display: "flex", justifyContent: "space-between", flexDirection: "row", flex: 1}}>
                                        <View style = {{display: "flex", flexDirection: "row"}}>
                                            <Text style = {{fontWeight: 700, fontSize: 18}}>
                                                {`${getFoodCount(food._id)} X `}
                                            </Text>
                                            <Text style = {{ fontSize: 18}}>
                                                {food.name}
                                            </Text>
                                        </View>
                                        <Text style = {{fontSize: 20, fontWeight: 700}}>
                                            {formatVND(getFoodCount(food._id) * food.price)}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>


                    {option !== 1 && (
                        <View style={styles.shippingContainer}>
                            <View style={styles.shippingLabel}>
                                <Image
                                    style={styles.shippingIcon}
                                    source={shipping}
                                ></Image>

                                <Text style={styles.scheduleLabel}>
                                    Thời gian giao hàng
                                </Text>
                            </View>

                            <View style={styles.setShippingTime}>
                                <Text style={styles.shippingTime}>
                                    {time &&
                                        time.getHours() +
                                            ":" +
                                            ("0" + time.getMinutes()).slice(-2)}
                                </Text>
                                <Pressable onPress={() => setShowPicker(true)}>
                                    <Text style={styles.timeButton}>
                                        Thay đổi
                                    </Text>
                                </Pressable>
                            </View>

                            {option == 2 && (
                                <Pressable
                                    style={styles.setShippingDate}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Image
                                        style={styles.dateButton}
                                        source={calendar}
                                    ></Image>
                                    <Text style={styles.shippingDate}>
                                        {date && formatDate(date)}
                                    </Text>
                                </Pressable>
                            )}

                            {option == 3 && (
                                <View style={styles.dayPicker}>
                                    {days.map((day, i) => (
                                        <Pressable
                                            style={
                                                dayPicked.includes(i + 1)
                                                    ? styles.dayPicked
                                                    : styles.day
                                            }
                                            onPress={() => {
                                                if (dayPicked.includes(i + 1)) {
                                                    const newDayPicked =
                                                        dayPicked.filter(
                                                            function (ele) {
                                                                return (
                                                                    ele != i + 1
                                                                );
                                                            }
                                                        );

                                                    setDayPicked(newDayPicked);
                                                } else {
                                                    setDayPicked([
                                                        ...dayPicked,
                                                        i + 1,
                                                    ]);
                                                }
                                            }}
                                        >
                                            <Text style={styles.dayLabel}>
                                                {day}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {option !== 3 && (
                        <View style={styles.bill}>
                            <View style={styles.billDetail}>
                                <Text style={styles.detailText}>Giá</Text>
                                <Text style={styles.detailText}>
                                    {formatVND(getTotalCost())}
                                </Text>
                            </View>
                            <View style={styles.billDetail}>
                                <Text style={styles.detailText}>
                                    Phí giao hàng
                                </Text>
                                <Text style={styles.detailText}>
                                    {formatVND(shippingFee)}
                                </Text>
                            </View>
                            {route.params.voucher && (
                                <View style={styles.billDetail}>
                                    <Text style={styles.detailText}>
                                        Mã khuyến mãi
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {`-${formatVND(route.params.voucher.discount)}`}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.billDetail}>
                                <Text style={styles.totalPrice}>Tổng cộng</Text>
                                <Text style={styles.totalPrice}>
                                    {route.params.voucher
                                        ? formatVND(
                                            getTotalCost() +
                                                  shippingFee -
                                                  route.params.voucher.discount
                                          )
                                        : formatVND(
                                            getTotalCost() +
                                                  shippingFee
                                          )}
                                </Text>
                            </View>
                        </View>
                    )}

                    {option == 1 && (
                        <Pressable
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 30,
                                backgroundColor: "#bababa",
                            }}
                            onPress={() =>
                                navigation.navigate("AddVoucher", {
                                    foodsList,
                                    shoppingCart,
                                })
                            }
                        >
                            <Text style={{ fontSize: 22, fontWeight: 600 }}>
                                Thêm voucher
                            </Text>
                            <Image style={{ width: 40 }} source={forward} />
                        </Pressable>
                    )}

                    {showPicker && (
                        <DateTimePicker
                            mode="time"
                            is24Hour={true}
                            value={time || new Date()}
                            onChange={handleTimeChange}
                        />
                    )}
                    {showDatePicker && (
                        <DateTimePicker
                            mode="date"
                            value={date || new Date()}
                            onChange={handleDateChange}
                        />
                    )}
                </ScrollView>

                <View style={styles.navbarContainer}>
                    <View style={styles.orderContainer}>
                        {option == 1 && (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: "100%",
                                    marginVertical: 10,
                                }}
                            >
                                <Pressable
                                    style={
                                        paymentMethod == 1
                                            ? styles.paymentMethodSelected
                                            : styles.paymentMethod
                                    }
                                    onPress={() => setPaymentMethod(1)}
                                >
                                    <Text style={styles.paymentMethodLabel}>
                                        Khác
                                    </Text>
                                </Pressable>

                                <Pressable
                                    style={
                                        paymentMethod == 2
                                            ? styles.paymentMethodSelected
                                            : styles.paymentMethod
                                    }
                                    onPress={() => setPaymentMethod(2)}
                                >
                                    <Text style={styles.paymentMethodLabel}>
                                        Tiền mặt
                                    </Text>
                                </Pressable>
                            </View>
                        )}


                        <Pressable
                            style={styles.orderButton}
                            onPress={() => {
                                if (option == 1) {
                                    if (paymentMethod == 1) {
                                        navigation.navigate(
                                            "SelectPaymentMethod"
                                        );
                                    }

                                    if (paymentMethod == 2) {
                                        const createNewOrder = async () => {
                                          
                                                
                                            await addNewOrder({
                                                type:"immediate",
                                                total: getTotalCost(),
                                                paidStatus: false,
                                                paymentMethod: "cash",
                                                foods: getFoodsInCartId().map(id => ({
                                                    foodId: id,
                                                    foodCount: getFoodCount(id)
                                                })),
                                                restaurantId: foodsList[0].restaurantId,
                                                userId: user._id,
                                                orderTime: new Date(),
                                                orderTo: currentAddress,
                                                voucher: route.params.voucher ? route.params.voucher._id : "",
                                                phoneNumber
                                            })
                                            .then(() => {
                                                navigation.navigate("ListOrders");
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            })
                                            
                                            // await addUserUsingVoucher({voucherId: route.params.voucher._id, userId: user._id})
                                        };

                                        createNewOrder();
                                    }
                                }

                                // if(option == 2){
                                   
                                //     addNewOrder({
                                //         type: "once",
                                //         total:
                                //             foodCount *
                                //             food.price +
                                //             shippingFee,
                                //         paidStatus: false,
                                //         paymentMethod: "cash",
                                //         foodId: food._id,
                                //         userId: user._id,
                                //         orderTime: formatDate(getDateTime()),
                                //         orderTo: currentAddress,
                                      
                                //     });
                               
                                // }
                            }}
                        >
                            <Text style={styles.orderLabel}>Đặt hàng</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
