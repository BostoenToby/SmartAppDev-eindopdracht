import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center', 
        alignItems: 'center',
    },
    modalRightAbove: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent:'center',
        alignItems: 'center'
    },
    modalBox: {
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width - 50,
        padding: 40,
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    modalBoxSmall: {
        height: Dimensions.get('window').height/15,
        width: Dimensions.get('window').width/4,
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        right: 10,
        top: 80
    },
    modalBoxDateTime: {
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width - 50,
        padding: 20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#FFFFFF'
    },
    modalContainer: {
        marginHorizontal: 12.5
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
    },
    modalTitle: {
        fontSize: 20, 
        justifyContent: 'center',
        fontWeight: 'bold'
    }
})