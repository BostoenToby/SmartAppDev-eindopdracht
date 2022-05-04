import { Text, View, Image, Button, Alert, TouchableOpacity, Pressable, ImageSourcePropType } from "react-native"
import Hotel from "../interfaces/Hotel"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import {GenericButton} from "./GenericButton";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../utils/db";
import uuid from 'react-native-uuid';
import { useEffect, useState } from "react";

export default ({ hotel }: { hotel: Hotel }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

    const AddReservationDb = async() => {
        console.log(hotel.image)
        let inserted: boolean = false
        let Uuid: string = String(uuid.v4())
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'INSERT INTO `reservation3` (id, hotelName, roomTypeName, incheckDate, outcheckDate, price, firstName, lastName, mail, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Uuid, hotel.name, null, null, null, null, null, null, null, hotel.image])
        inserted = res.rowsAffected === 1
        if(inserted) navigate('DetailPage', {hotel: hotel, id: Uuid})
    }

    return(
        <View style={{flexDirection: "row", height: 120, width:"auto", marginVertical: 5, paddingHorizontal: 5, borderRadius: 5, backgroundColor:"#FFFFFF", justifyContent:"space-between", alignItems: "center", marginHorizontal: 12}}>
            <Image style={{height: 100, width: 100, borderRadius:5}} source={{uri: hotel.image}}/>
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
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Pressable style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={() => {
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