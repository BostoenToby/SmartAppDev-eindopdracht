import { Alert, Image, Pressable, Text, View } from "react-native"
import Reservation from "../interfaces/Reservation"
import { deleteData } from "../utils/APIMethods";
import { backendUrl } from "../utils/enviroment";
import { AntDesign } from '@expo/vector-icons'; 

export default ({reservation, callback}: {reservation: Reservation, callback: Function}) => {
    const deleteReservation = async() => {
        deleteData(`${backendUrl}/reservation/${reservation.id}`)
    }

    return(
        <View style={{flexDirection: "row", height: 120, width:"auto", marginVertical: 5, paddingHorizontal: 5, borderRadius: 5, backgroundColor:"#FFFFFF", justifyContent:"space-between", alignItems: "center", marginHorizontal: 12}}>
            <Image style={{height: 100, width: 100, borderRadius: 5}} source={{uri: reservation.image}}/>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 20, paddingBottom: 10, fontWeight: 'bold'}}>{reservation.hotelName}</Text>
                <Text>Room: {reservation.roomTypeName}</Text>
                <Text>Dates: {reservation.incheckDate} / {reservation.outcheckDate}</Text>
            </View>
            <Pressable onPress={() => Alert.alert("Delete reservation", `Are you sure you want to delete the reservation for ${reservation.hotelName}?`, [{text: 'No', onPress: () => console.log("no")},{text: 'Yes', onPress: async() => {await deleteReservation(); callback();}}])}>
                <AntDesign name="delete" size={24} color="black" />
            </Pressable>
        </View>
    )
}