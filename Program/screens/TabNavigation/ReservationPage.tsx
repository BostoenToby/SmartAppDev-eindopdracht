import { Dimensions, Image, SafeAreaView, Text, TextInput, View } from "react-native"
import { InputField, InputFieldSmall } from "../../components/InputField"
import RoomType from "../../interfaces/RoomType"

export default function ReservationPage({route}: {route: any}){
    console.log("***************")
    console.log({route})
    return(
        <SafeAreaView style={{marginHorizontal:Dimensions.get("window").width/20}}>
            <Text style={{fontSize: 20}}>Summary</Text>
            <View style={{backgroundColor: "#FFFFFF", marginBottom: 12}}>
                <Text style={{fontSize: 18}}>Hotel</Text>
                <Text></Text>
            </View>
            <Text style={{fontSize: 20}}>Information</Text>
            <View style={{backgroundColor:"#FFFFFF"}}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <InputFieldSmall label="First name" placeholder="e.g. John"/>
                    <InputFieldSmall label="Last name" placeholder="e.g. Smith"/>
                </View>
                <InputField label="E-mail address" placeholder="e.g. john.smith@gmail.com"/>
            </View>
        </SafeAreaView>
    )
}