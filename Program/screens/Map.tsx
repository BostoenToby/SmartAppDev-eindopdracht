import { StyleSheet, Text, View } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import map from "../styling/map";

export default function Map () {
    return (
        <View style={map.container}>
            <MapView style={[map.map, StyleSheet.absoluteFillObject]} zoomEnabled={true} zoomControlEnabled={true}>
            <Marker coordinate={{latitude: 50.821791, longitude: 3.250677}} title={"Howest"} description={"This is a test!"}/>
            </MapView>
        </View>
    )
}