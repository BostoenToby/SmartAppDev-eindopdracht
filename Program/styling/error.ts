import { StyleSheet } from "react-native";

export default StyleSheet.create({
    errorBox: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 8, 
        backgroundColor: '#FFFFFF', 
        maxWidth: 300
    },
    errorTitle: {
        fontWeight: '600',
        color: 'red'
    },
    text: {
        color: 'red'
    }
})