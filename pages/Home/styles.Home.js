import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    navbarContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
        zIndex: 999,
    },

    optionsWrapper: {
        width: "30%",
        backgroundColor: "#dad9d9",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    optionWrapperSelected: {
        width: "30%",
        backgroundColor: "green",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    option: {
        fontSize: 18,
    },

    optionSelected: {
        fontSize: 18,
        color: "white"
    },
});
