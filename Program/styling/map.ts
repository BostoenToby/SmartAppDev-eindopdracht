import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get("window").width, 
        height: Dimensions.get("window").height
    },
    smallMap: {
        width: Dimensions.get('window').width/10*9, 
        height: Dimensions.get('window').height/10*3, 
        marginVertical: 10, 
        marginHorizontal: Dimensions.get('window').width/20, 
        borderRadius:5
    }
})