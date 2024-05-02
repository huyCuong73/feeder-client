import React, { useEffect, useState } from "react";
import {
    TextInput,
    Text,
    View,
    Button,
    Pressable,
    Image,
    Modal,
    StatusBar,
    ScrollView,
} from "react-native";
import { styles } from "./styles.Support";
import {
    SafeAreaView,
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import expand from "../../assets/expand.png";
import * as ImagePicker from 'expo-image-picker';
import { createNewTicket } from "../../api/ticketAPI";
import { useSelector } from "react-redux";

export default function CreateTicket({navigation}) {

    const user = useSelector(state => state.user.user)
    const [orderId, setOrderId] = useState("");
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");

    const [classification, setClassification] = useState("");
    const [modalVisible, setModalVisible] = useState(false);




    const OptionButton = ({ option, onPress }) => (
        <Pressable style={styles.optionButton} onPress={onPress}>
            <Text style={styles.optionText}>{option}</Text>
        </Pressable>
    );



    return (
        <SafeAreaView
            style={{
     
                flex: 1,

            }}
        >
            <View style = {{margin: 10}}>

                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerLabel}>PHÂN LOẠI</Text>

                        <Pressable
                            style={styles.headerDetail}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text styles={styles.headerDetailText}>
                                {classification}
                            </Text>
                            <Image source={expand}></Image>
                        </Pressable>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headerLabel}>MÃ ĐƠN HÀNG</Text>

                        <Pressable style={styles.headerDetail}>
                            <TextInput
                                value = {orderId}
                                editable
                                onChangeText={(value) => setOrderId(value)}
                                style={{ flex: 1 }}
                            />

                        
                        </Pressable>
                    </View>
                </View>

                <TextInput
                    placeholder="Tiêu đề..."
                    value={header}
                    onChangeText={(value) => setHeader(value)}
                    style={{
                        fontSize: 26,
                        marginTop: 20,
                    }}
                />

                <View style = {{height: 600}}>
                    <TextInput
                        placeholder="Nội dung..."
                        value={content}
                        onChangeText={(value) => setContent(value)}
                        style={{
                            fontSize: 20,
                            marginTop: 20,

                        }}
                    />
                </View>




            </View>
            <View style = {{position: "absolute", bottom: 0, left: 0, width: "100%"}}>
                <View style = {styles.orderContainer}>
                    <Pressable style = {styles.orderButton} onPress={() => {
                            createNewTicket({
                                userId: user._id,
                                header: header,
                                body: content,
                                orderId: orderId,
                                type: classification
                            })
                                .then(res => {
                                    
                                    navigation.navigate("Home", {reload: 1})
                                })

                        }
                        
                        }>
                        <Text style = {styles.orderLabel}>
                            Gửi
                        </Text>
                    </Pressable>
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
                            option="Không nhận được hàng"
                            onPress={() => {
                                setClassification("Không nhân được hàng");
                                setModalVisible(false);
                            }}
                        />

                        <OptionButton
                            option="Hàng không giống mô tả"
                            onPress={() => {
                                setClassification("Hàng không giống mô tả");
                                setModalVisible(false);
                            }}
                        />

                        <OptionButton
                            option="Yêu cầu trả hàng"
                            onPress={() => {
                                setClassification("Yêu cầu trả hàng");
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
