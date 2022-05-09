import { Text, View, Image } from "react-native"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import {GenericButton} from "./GenericButton";
import RoomType from "../interfaces/RoomType";
import { MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../utils/db";
import hotelStyles from "../styling/hotelStyles";

export default ({ id, roomType }: { id: string, roomType: RoomType }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

    const putReservationDb = async() => {
        let inserted: boolean = false
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'UPDATE reservation3 SET roomTypeName = (?), price = (?) WHERE id=(?)', [roomType.name, roomType.price, id])
        inserted = res.rowsAffected === 1
        if(inserted) navigate("ReservationPage", {id: id});
    }

    return(
        <View style={hotelStyles.hotelCard}>
            <Image style={hotelStyles.image} source={{uri: roomType.image}}/>
            <View style={{position:"absolute", left: 120}}>
                <View style={{flexDirection:"column", alignItems:"flex-start"}}>
                    <Text style={hotelStyles.hotelTitle}>{roomType.name}</Text>
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