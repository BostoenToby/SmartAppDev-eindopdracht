import { Text, View, Image, Button, Alert, TouchableOpacity, Pressable } from "react-native"
import Hotel from "../interfaces/Hotel"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { GenericButton } from "./GenericButton";
import RoomType from "../interfaces/RoomType";
import { MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import ReservationPage from "../screens/TabNavigation/ReservationPage"

export default ({ roomType }: { roomType: RoomType }) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    return(
        <View style={{flexDirection: "row", height: 120, width:"auto", marginVertical: 5, paddingHorizontal: 5, borderRadius: 5, backgroundColor:"#FFFFFF", justifyContent:"space-between", alignItems: "center", marginHorizontal: 12}}>
            <Image style={{height: 100, width: 100, borderRadius:5}} source={{uri: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}}/>
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
                                <MaterialCommunityIcons style={{paddingRight:5}} name="television-classic" size={16} />
                                <MaterialIcons style={{paddingRight:5}} name="free-breakfast" size={16} color="#0084ff" />
                                <Entypo style={{paddingRight:5}} name="air" size={16} color="#0084ff" />
                                <AntDesign style={{paddingRight:5}} name="wifi" size={16} color="#0084ff" />
                                <SimpleLineIcons name="eye" size={16} color="#0084ff" />
                            </View>
                        </View>
                </View>
            </View>
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Pressable style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={() => {
                    console.log({roomType})
                    navigate("ReservationPage", {roomType: roomType});
                }}>
                    <Text style={{color:"#FFFFFF"}}>See details</Text>
                </Pressable>
                <Text style={{paddingTop: 8}}>Price: {roomType.price}</Text>
            </View>
        </View>
    )
}