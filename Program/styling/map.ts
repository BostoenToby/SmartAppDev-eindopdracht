import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width - 5,
        height: Dimensions.get('window').height - 5,
    }
})