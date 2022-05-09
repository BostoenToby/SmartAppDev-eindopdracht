import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    reviewCard: {
        marginVertical: 10, 
        backgroundColor: '#FFFFFF', 
        width: Dimensions.get('window').width /10*9, 
        marginHorizontal: Dimensions.get('window').width/20, 
        borderRadius: 5
    },
    reviewBox: {
        flexDirection: "row", 
        alignItems:'center', 
        paddingTop: 12, 
        paddingLeft: 12, 
        paddingBottom: 12
    },
    reviewImage: {
        height: 40, 
        width: 40, 
        borderRadius: 100, 
        marginRight:20
    }
})