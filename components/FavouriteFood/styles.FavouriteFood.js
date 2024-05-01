import { StyleSheet } from "react-native";

const foodHeight = 120
export const styles = StyleSheet.create({

    foodContainer: {
        width: "100%",
        height: foodHeight,
        backgroundColor: "#dfdfdf",
        marginBottom: 20,

    },

    foodWrapper: {
        width: "100%",
        height: foodHeight,
        display: "flex",
        flexDirection: "row",
    },

    foodImageContainer: {
        width: foodHeight,
        height: foodHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },

    foodImage: {
        width: foodHeight-5,
        height: foodHeight -5,
        backgroundColor: "green"
    },


    foodInfo:{
        // backgroundColor: 'white',
        flex: 1,
        fontSize:22
    },

    foodHeader: {
        marginTop: 5,
        marginBottom: 10
    },

    foodName: {
        fontSize: 24,
        fontWeight: "500"
    },

    foodAction: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"    
    },
    
    foodActions: {
        display: "flex",
        flexDirection: "row",
    }
    ,
    actionLabel: {
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "green",
        marginHorizontal: 5,
        fontSize: 20
    },

    price: {
        fontSize: 18
    },
    order: {
        display: "flex",
        flexDirection: "row",

    },
    orderLabel: {
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: "green",
        marginHorizontal: 20,
        fontSize: 22
        
    },
})