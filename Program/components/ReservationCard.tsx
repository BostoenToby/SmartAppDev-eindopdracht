import { Alert, Image, Pressable, Text, View } from "react-native"
import Reservation from "../interfaces/Reservation"
import { deleteData } from "../utils/APIMethods";
import { backendUrl } from "../utils/enviroment";
import { AntDesign } from '@expo/vector-icons'; 
import hotelStyles from "../styling/hotelStyles";

export default ({reservation, callback}: {reservation: Reservation, callback: Function}) => {
    const deleteReservation = async() => {
        deleteData(`${backendUrl}/reservation/${reservation.id}`)
    }

    return(
        <View style={hotelStyles.hotelCard}>
            <Image style={hotelStyles.image} source={{uri: reservation.image}}/>
            <View style={{flexDirection: 'column'}}>
                <Text style={hotelStyles.hotelTitle}>{reservation.hotelName}</Text>
                <Text>Room: {reservation.roomTypeName}</Text>
                <Text>Dates: {reservation.incheckDate} / {reservation.outcheckDate}</Text>
            </View>
            <Pressable onPress={() => Alert.alert("Delete reservation", `Are you sure you want to delete the reservation for ${reservation.hotelName}?`, [{text: 'No', onPress: () => console.log("no")},{text: 'Yes', onPress: async() => {await deleteReservation(); callback();}}])}>
                <AntDesign name="delete" size={24} color="black" />
            </Pressable>
        </View>
    )
}