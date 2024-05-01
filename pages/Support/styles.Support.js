import { StyleSheet } from "react-native";



const foodHeight = 120
export const styles = StyleSheet.create({
    options:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25
    },
    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0 ,
        left:0,
        zIndex:999
    },
    option: {
        fontSize: 20,
        width: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#009842",

    },

    optionSelected: {
        width: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#05F16C"  
    },


    textOption: {
        fontSize: 24,
        color: "white"
    },






    headerContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderColor: 'black',
        paddingBottom: 20,
        borderStyle: 'solid',
    }
    ,
    header: {
        width: "48%"
    }
    ,
    headerLabel: {
        fontSize:28,
        fontWeight: "bold",
        marginBottom: 10
    },
    headerDetail: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#dbd9d9",
        alignItems: "center",
        padding:5
    },
    headerDetailText: {
        fontSize: 18
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


    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0 ,
        left:0,
        zIndex:999
    },
    orderContainer:{
        width: "100%",
        height: 100,
        backgroundColor: "#cfcfcf",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    orderButton: {
        width: "80%",
        height: "60%",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
    },

    orderLabel: {
        color: "white",
        fontSize: 20
    },
});
