import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        backgroundColor: "#ECECEC"
    },
    fullScreen:{
        width: Dimensions.get("window").width, 
        height: Dimensions.get("window").height
    },
    fullScreenSpecial: {
        width: Dimensions.get("window").width/20*18, 
        height: Dimensions.get("window").height-80,
        marginTop: 80
    },
    fullScreenMiddle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    textInput: {
        width: '84%', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 5, 
        height: 30,
        marginLeft: "2,5%",
        marginVertical: 10
    },
    textInputFull: {
        width: '95%', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 5, 
        height: 30,
        marginLeft: "2,5%",
        marginVertical: 10
    },
    title: {
        fontSize: 32, 
        fontWeight: "500",
        paddingHorizontal: 20
    },
    description:{
        paddingHorizontal: 20
    },
    imageBig: {
        height: Dimensions.get('window').height / 3, 
        width: Dimensions.get('window').width - 10, 
        borderRadius: 10, 
        marginHorizontal: 5
    },
    imageSmall: {
        height: 80, 
        width: 80,
        borderRadius: 10, 
        marginHorizontal: 5
    },
    ratingTitle: {
        fontSize:24, 
        fontWeight:"600", 
    },
    ratingNumber: {
        fontSize: 32, 
        fontWeight: 'bold'
    },
    ratingBar:{
        width: 100, 
        height: 8, 
        backgroundColor:'#D3D3D3', 
        borderRadius: 5, 
        marginBottom: 2
    },
    row: {
        flexDirection: "row"
    },
    rowBetween:{
        flexDirection: "row", 
        justifyContent: "space-between"
    },

    spaceBetween: {
        justifyContent: 'space-between', 
    },
    font8: {
        fontSize: 8
    },
    marginHor: {
        marginHorizontal:Dimensions.get('window').width/20
    },
    reservationContainer: {
        backgroundColor: "#FFFFFF", 
        marginBottom: 12
    },
    reservationTitle: {
        fontSize: 24
    },
    inputContainer: {
        padding: 10
    },
    inputRow: {
        flexDirection:"row", 
        justifyContent:"space-between", 
    },
    loadingAnimation: {
        width: Dimensions.get("window").width/4*3,
        height: Dimensions.get("window").height/4*3,
        marginLeft: 50
    },
    menuItem: {
        marginLeft: 15, 
        paddingHorizontal: 3, 
        paddingVertical: 2, 
        borderRadius:5, 
        overflow:'hidden', 
        backgroundColor: "#FFFFFF"
    },
    button: {
        width: 80, 
        height: 35, 
        borderRadius: 20, 
        backgroundColor: "#0084ff", 
        justifyContent: "center", 
        alignItems: "center"
    },
    center: {
        justifyContent: "center", 
        alignItems: "center"
    },
    calendar: {
        flexDirection:'row', 
        alignItems: 'center', 
        justifyContent:'center', 
        borderRadius: 5, 
        backgroundColor:'#FFFFFF', 
        width: 100
    }
})