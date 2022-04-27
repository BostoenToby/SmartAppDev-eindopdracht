import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center', 
        alignItems: 'center',
    },
    modalBox: {
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width - 50,
        padding: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    modalContainer: {
        marginHorizontal: 10
    },
    modalDateTime: {
        height: 200, 
        width: 400
    },
    modalPressable: {
        width: 80, 
        height: 35, 
        borderRadius: 20, 
        backgroundColor: "#0084ff", 
        justifyContent: "center", 
        alignItems: "center"
    }
})