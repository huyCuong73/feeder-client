import React, { useEffect, useState } from "react";
import {
    TextInput,
    Text,
    View,
    Button,
    Pressable,
    Image,
    Modal,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from "react-native";
import { styles } from "./styles.Support";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import expand from "../../assets/expand.png";
import * as ImagePicker from 'expo-image-picker';

export default function CreateTicket({navigation}) {
    const insets = useSafeAreaInsets();
    const [value, setValue] = useState("");
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");

    const [classification, setClassification] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [image, setImage] = useState(null);
    console.log('====================================');
    console.log(image);
    console.log('====================================');
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const OptionButton = ({ option, onPress }) => (
        <Pressable style={styles.optionButton} onPress={onPress}>
            <Text style={styles.optionText}>{option}</Text>
        </Pressable>
    );



    return (
        <SafeAreaView
            style={{
                margin: 10,
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
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
                            editable
                            onChangeText={(value) => setValue(value)}
                            style={{ flex: 1 }}
                        />

                        <Image source={expand}></Image>
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

            <View style={styles.container}>
                <Pressable
                    onPress={pickImage}

                    style = {{
                        backgroundColor: "green",
                        width: 120,
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style = {{ color : 'white', fontSize: 20, fontWeight: "bold" }}>
                        Thêm ảnh
                    </Text>
                </Pressable>
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
            </View>


            <View style = {styles.navbarContainer}>
                <View style = {styles.orderContainer}>
                    <Pressable style = {styles.orderButton} onPress={() => {
                            navigation.navigate("Support")

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
                            option="Không nhân được hàng"
                            onPress={() => {
                                setClassification("Không nhân được hàng");
                                setModalVisible(false);
                            }}
                        />

                        <OptionButton
                            option="Không thanh toán được"
                            onPress={() => {
                                setClassification("Không thanh toán được");
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
