import { Text, View, Image, Pressable } from "react-native"
import Hotel from "../interfaces/Hotel"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../utils/db";
import uuid from 'react-native-uuid';
import hotelStyles from "../styling/hotelStyles";
import generic from "../styling/generic";

export default ({ hotel }: { hotel: Hotel }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

    const AddReservationDb = async() => {
        let inserted: boolean = false
        let Uuid: string = String(uuid.v4())
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'INSERT INTO `reservation3` (id, hotelName, roomTypeName, incheckDate, outcheckDate, price, firstName, lastName, mail, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Uuid, hotel.name, null, null, null, null, null, null, null, hotel.image])
        inserted = res.rowsAffected === 1
        if(inserted) navigate('DetailPage', {hotel: hotel, id: Uuid})
    }

    return(
        <View style={hotelStyles.hotelCard}>
            <Image style={hotelStyles.image} source={{uri: hotel.image}}/>
            <View style={{position:"absolute", left: 120}}>
                <View style={{flexDirection:"column", alignItems:"flex-start"}}>
                    <Text style={hotelStyles.hotelTitle}>{hotel.name}</Text>
                    <Text style={{paddingVertical: 7}}>{hotel.starRating}⭐</Text>
                    <Text style={{paddingVertical: 7}}>
                        <Feather name="map-pin" size={12} color="#0084ff" />
                        <Text>{hotel.city}</Text>
                    </Text>
                </View>
            </View>
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Pressable style={generic.button} onPress={() => {
                    AddReservationDb()
                }}>
                    <Text style={{color:"#FFFFFF"}}>See details</Text>
                </Pressable>
                <Text>Price range:</Text>
                <Text>{Math.round(hotel.pricePerNightMin)}€ - {Math.round(hotel.pricePerNightMax)}€</Text>
            </View>
        </View>
    )
}