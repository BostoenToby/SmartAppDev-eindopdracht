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
    }
})