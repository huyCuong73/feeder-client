import { StyleSheet, Text, View, Button } from "react-native";



const foodHeight = 200
const elementPadding = 25


export const styles = StyleSheet.create({


    container: {
        flex: 1,


        // backgroundColor: "black",
    }, 


    orderLabel: {
        color: "white",
        fontSize: 20
    },


    header:{
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    confirmLabel:{
        fontSize: 30,
        fontWeight: "500",
        marginLeft: 20
    },

    section: {
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        display:"flex",
        flexDirection: "row",
        backgroundColor: "#dbdada",
        height: 140,
    },

    iconLocationContainer: {
        width: "10%",
        display: "flex",
        alignItems: "center"
    },
    location: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sectionContent: {
        fontSize: 20,
        marginBottom: 15,
    },
    sectionArrow: {
        fontSize: 20,
        color: '#4CAF50',
        alignSelf: 'flex-end',
    },
    iconForwardContainer: {
        width: "10%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    foodNameText:{
        fontSize:20
    },

    foodPriceText: {
        fontSize:18
    },

    scheduleLabel: {
        fontSize: 20
    },

    modalView: {
        position: "absolute",
        width: 400,
        top: 400,
        left: "50%",
        transform: [
            { translateX: -200 }, 
            { translateY: -50}, 
        ],
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionButton: {
        backgroundColor: '#009118',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width: "75%",
        fontSize: 30
    },
    
    optionText: {
        color: 'white',
        // fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    button: {
        display: "flex",
        flexDirection: "row",
        marginVertical: elementPadding,
        justifyContent: "space-between",
        paddingHorizontal: elementPadding
    },
    buttonText: {
        fontSize: 20,
        // fontWeight: 500,
        width: "70%"
    },
    buttonIcon: {
        // width: "10%"
    },

    





    foodContainer : {
        padding : elementPadding,
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: 'black',
        
        borderStyle: 'solid',

    },
    foodImage: {
        width: 100,
        height: 100,
        backgroundColor: "green",
        marginRight: 10,
    },

    foodInfo: {
        flex: 1,
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-between"
    },

    foodHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    foodCount: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    }, 

    foodCountProp: {
        marginLeft: 5,
        width: 30
    },
    foodCountPropText: {
        marginLeft: 5,
        fontSize:20
    },
    shippingContainer: {
        padding: 20,
    },

    shippingLabel: {
        display: "flex",
        flexDirection: "row"
    },

    
    shippingIcon:{
        marginRight:10
    },


    setShippingTime:{
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    }
    ,

    shippingTime: {
        fontSize: 40,
        fontWeight: "700"
    },
    timeButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: "green",
        color: "white",
        fontSize: 20
    },

    setShippingDate:{
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    }
    ,

    shippingDate: {
        fontSize: 24,
        marginLeft: 20
    },
    dateButton: {
        width: 30,
        height: 30
    },

    bill: {
        marginTop: 15,
        paddingHorizontal: elementPadding
    },

    billDetail: {
        
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: 'grey',
        
        borderStyle: 'solid',
    }
    ,
    detailText: {
        fontSize: 20,
        marginVertical: 10,
    },
    totalPrice: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "bold"  
    },



    dayPicker: {
        // padding: elementPadding,
        marginTop: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"

    },

    day: {
        width: 60,
        height: 60,
        backgroundColor: "#a8a8a8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    dayPicked: {
        width: 60,
        height: 60,
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    dayLabel: {
        color: "white",
        fontSize:20,
        fontWeight: "bold"
    },

    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0 ,
        left:0,
        zIndex:999
    },
    orderContainer:{
        width: "100%",
        height: 170,
        backgroundColor: "#cfcfcf",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    orderButton: {
        width: "80%",
        height: "30%",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
    },

    paymentMethod:{
        backgroundColor: "#e4e4e4",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        width: 170,
        height: 50,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },

    paymentMethodSelected:{
        backgroundColor: "#e4e4e4",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",

        shadowColor: '#187c11',
        borderColor:"#187c11",
        borderWidth: 2,
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
        width: 170,
        height: 50,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    paymentMethodLabel: {
        fontSize: 20
    },

    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        backgroundColor: "green",
    },

})