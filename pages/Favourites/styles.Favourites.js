import { StyleSheet } from "react-native";

const foodHeight = 120
export const styles = StyleSheet.create({
    container:{
        margin: 10,
        // backgroundColor: "gray"
    },
    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0 ,
        left:0,
        zIndex:999
    },

    options:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25
    },

    option: {
        fontSize: 20,
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#009842",

    },

    optionSelected: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#05F16C"  
    },


    textOption: {
        fontSize: 24,
        color: "white"
    }


});
