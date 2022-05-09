import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    footer: {
        position:'absolute', 
        bottom:0, 
        left:0, 
        width: Dimensions.get('window').width, 
        height:80, 
        backgroundColor:'#FFFFFF', 
        paddingHorizontal:20, 
        borderTopWidth:1, 
        borderColor:"#D3D3D3"
    },
    footerItems: {}
})