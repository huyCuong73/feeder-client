import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {

        width: "100vw",
        height: 50,
        backgroundColor: "#cfcfcf",
        color: "white",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center"
    },

    iconContainer: {
        width: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex:999
    },


    iconLabel: {
        // fontFamily: "san-serif",
        fontSize: 13
    },
    text: {
        color: "white"
    },

    navIcon: {
        // color: "white",
        width: 30,
        height: 30
    }

});
