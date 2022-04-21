import { Text, View, Image, Button, Alert, TouchableOpacity, Pressable } from "react-native"
import Hotel from "../interfaces/Hotel"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { GenericButton } from "./GenericButton";
import { SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../utils/db";

export default ({ hotel }: { hotel: Hotel}) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    // TODO: look how we can work with navigation without generating it everytime we are at a new page

    const AddReservationDb = async() => {
        const tx: SQLTransaction = await transaction()
        const insert = await statement(tx, 'INSERT INTO `reservation` (id, hotelName, roomTypeName, incheckDate, outcheckDate, price, firstName, lastName, mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [undefined, hotel.name, null, null, null, null, null, null, null])
        // TODO: get Id from insert statement --> if we return from the next page --> remove the reservation with id == Id
        // TODO: in further pages we need to update this reservation with roomTypeName, ... until we get to the last step of the reservation
    }

    return(
        <View style={{flexDirection: "row", height: 120, width:"auto", marginVertical: 5, paddingHorizontal: 5, borderRadius: 5, backgroundColor:"#FFFFFF", justifyContent:"space-between", alignItems: "center", marginHorizontal: 12}}>
            {/* <Image source={{uri: hotel.image}}/> */}
            <Image style={{height: 100, width: 100, borderRadius:5}} source={{uri: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}}/>
            <View style={{position:"absolute", left: 120}}>
                <View style={{flexDirection:"column", alignItems:"flex-start"}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>{hotel.name}</Text>
                    <Text style={{paddingVertical: 7}}>{hotel.starRating}⭐</Text>
                    <Text style={{paddingVertical: 7}}>
                        <Feather name="map-pin" size={12} color="#0084ff" />
                        <Text>{hotel.city}</Text>
                    </Text>
                </View>
            </View>
            {/* <Pressable title="See details" onPress={() => }/> */}
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Pressable style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={() => {
                    navigate("DetailPage", {hotel: hotel});
                }}>
                    <Text style={{color:"#FFFFFF"}}>See details</Text>
                </Pressable>
                <Text>Price range:</Text>
                <Text>{Math.round(hotel.pricePerNightMin)}€ - {Math.round(hotel.pricePerNightMax)}€</Text>
            </View>
        </View>
    )
}