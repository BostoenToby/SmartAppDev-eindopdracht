import { Text, View, Image, Button, Alert, TouchableOpacity, Pressable } from "react-native"
import Hotel from "../interfaces/Hotel"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"

export default ({ hotel }: { hotel: Hotel}) => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    return(
        <View style={{flexDirection: "row", height: 120, marginVertical: 5, paddingHorizontal: 5, borderRadius: 5, backgroundColor:"#FFFFFF", alignItems: "center", justifyContent:"space-between", marginHorizontal: 12}}>
            {/* <Image source={{uri: hotel.image}}/> */}
            <Image style={{height: 100, width: 100, borderRadius:5}} source={{uri: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}}/>
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"flex-start"}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>{hotel.name}</Text>
                <Text style={{paddingVertical: 7}}>{hotel.starRating}⭐</Text>
                <Text style={{paddingVertical: 7}}>
                    <Feather name="map-pin" size={12} color="#09F700" />
                    <Text>{hotel.city}</Text>
                </Text>
            </View>
            {/* <Pressable title="See details" onPress={() => }/> */}
            <View style={{flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Pressable style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={() => {
                    navigate("DetailPage", {hotel: hotel, navigation: navigate});
                }}>
                    <Text style={{color:"#FFFFFF"}}>See details</Text>
                </Pressable>
                <Text>Price range:</Text>
                <Text>{Math.round(hotel.pricePerNightMin)}€ - {Math.round(hotel.pricePerNightMax)}€</Text>
            </View>
        </View>
    )
}