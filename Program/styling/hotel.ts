import { StyleSheet } from "react-native";

export default StyleSheet.create({
    hotelCard: {
        flexDirection: "row", 
        height: 120, 
        width:"auto", 
        marginVertical: 5, 
        paddingHorizontal: 5, 
        borderRadius: 5, 
        backgroundColor:"#FFFFFF", 
        justifyContent:"space-between", 
        alignItems: "center", 
        marginHorizontal: 12
    },
    hotelTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingVertical: 10
    },
    image: {
        height: 100, 
        width: 100, 
        borderRadius:5
    }
})