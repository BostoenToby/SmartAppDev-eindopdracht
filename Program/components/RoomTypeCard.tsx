import { Text, View, Image, Button, Alert, TouchableOpacity, Pressable } from "react-native"
import Hotel from "../interfaces/Hotel"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import {GenericButton} from "./GenericButton";
import RoomType from "../interfaces/RoomType";
import { MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import ReservationPage from "../screens/TabNavigation/ReservationPage"
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../utils/db";
import { useState } from "react";

export default ({ id, roomType }: { id: string, roomType: RoomType }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

    const putReservationDb = async() => {
        let inserted: boolean = false
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'UPDATE reservation2 SET roomTypeName = (?), price = (?) WHERE id=(?)', [roomType.name, roomType.price, id])
        inserted = res.rowsAffected === 1
        if(inserted) navigate("ReservationPage", {id: id});
        // TODO: get Id from insert statement --> if we return from the next page --> remove the reservation with id == Id
        // TODO: in further pages we need to update this reservation with roomTypeName, ... until we get to the last step of the reservation
    }

    return(
        <View style={{flexDirection: "row", height: 120, width:"auto", marginVertical: 5, paddingHorizontal: 5, borderRadius: 5, backgroundColor:"#FFFFFF", justifyContent:"space-between", alignItems: "center", marginHorizontal: 12}}>
            <Image style={{height: 100, width: 100, borderRadius:5}} source={{uri: roomType.image}}/>
            <View style={{position:"absolute", left: 120}}>
                <View style={{flexDirection:"column", alignItems:"flex-start"}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>{roomType.name}</Text>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flexDirection:"column"}}>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{fontSize:16}}>{roomType.numberOfBeds}</Text>
                                    <MaterialCommunityIcons name="bed-outline" color="#0084ff" size={16} />
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{fontSize: 16}}>{roomType.squareMeters}m²</Text>
                                    <MaterialCommunityIcons name="ruler" color="#0084ff" size={16} />
                                </View>
                            </View>
                            <View style={{flexDirection:"row", marginLeft:10}}>
                                <MaterialCommunityIcons style={{paddingRight:5}} name="television-classic" color={roomType.television? "#0084ff" : "#D3D3D3"} size={16} />
                                <MaterialIcons style={{paddingRight:5}} name="free-breakfast" size={16} color={roomType.breakfast? "#0084ff" : "#D3D3D3"} />
                                <Entypo style={{paddingRight:5}} name="air" size={16} color={roomType.airco? "#0084ff" : "#D3D3D3"} />
                                <AntDesign style={{paddingRight:5}} name="wifi" size={16} color={roomType.wifi? "#0084ff" : "#D3D3D3"} />
                                <SimpleLineIcons name="eye" size={16} color={roomType.view? "#0084ff" : "#D3D3D3"} />
                            </View>
                        </View>
                </View>
            </View>
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"flex-end"}}>
                <GenericButton text="See details" callback={() => putReservationDb()}/>
                <Text style={{paddingTop: 16}}>Price: {roomType.price}€</Text>
            </View>
        </View>
    )
}