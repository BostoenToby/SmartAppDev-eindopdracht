import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'flex-end',
        height: 80,
        paddingHorizontal: 16,
        paddingBottom: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    icon: {
        position: 'absolute',
        right: 16,
        top: 45
    }
})