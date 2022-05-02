import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import Coordinates from "../interfaces/Coordinates";
import Hotel from "../interfaces/Hotel";
import map from "../styling/map";
import { getData } from "./TabNavigation/Overview";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { backendUrl } from "../utils/enviroment";

export default function Map () {
    const [hotels, setHotels] = useState<Hotel[]>()
    const [coordinates, setCoordinates] = useState<Coordinates[]>()
    const getHotels = async() => {
        const hotels = await getData(`${backendUrl}/hotels`)
        setHotels(hotels);
    }

    const { navigate, getParent } = useNavigation<BottomTabNavigationProp<ParamListBase>>();

    useEffect(() => {
        getHotels()
    }, [])

    return (
        <View style={map.container}>
            <MapView style={[map.map, StyleSheet.absoluteFillObject]} zoomEnabled={true} zoomControlEnabled={true}>
                {/* <Marker coordinate={{latitude: 50.821791, longitude: 3.250677}} title={"Howest"} description={"This is a test!"}/> */}
                {hotels?.map((val, index) => {
                    return(<Marker coordinate={{latitude: val.latitude, longitude: val.longitude}} title={val.name} description={val.description} onCalloutPress={() => {getParent()?.navigate("DetailPage", {hotel: hotels[index]})}}>
                            <Callout>
                                <View style={{padding: 5}}>
                                <Text style={{}}>{val.name}</Text>
                                   <Text>{val.description}</Text>
                               </View>
                            </Callout>
                        </Marker>)
                })}
            </MapView>
        </View>
    )
}