import { useEffect, useState } from "react";
import { Image, Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, ScrollView, Button, Alert, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ReviewCard from "../../components/ReviewCard";
import Hotel from "../../interfaces/Hotel";
import Review from "../../interfaces/Review";
import map from "../../styling/map";
import { getData } from "./Overview";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import {GenericButton} from "../../components/GenericButton";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/db";
import generic from "../../styling/generic";
import BottomBar from "../../components/BottomBar";
import {RouteProp}  from '@react-navigation/native'

export default function DetailPage ({ route }: { route: any }){
    const [hotel] = useState<Hotel>(route.params.hotel)
    const [reviews, setReviews] = useState<Review[]>()
    const {navigate, goBack} = useNavigation<StackNavigationProp<ParamListBase>>();

    const deleteReservation = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'DELETE FROM reservation2 WHERE id = (?)', [route.params.id])
        goBack()
        // navigate("Overview")
    }

    const getReservations = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation2")
    }

    useEffect(() => {
        getReservations()
    }, [])

    const renderReview = ({ item }: { item: Review }) => (
        <ReviewCard review={item}/>
    )

    useEffect(() => {
        setReviews(hotel.reviews)
    }, [])

    return(
        <SafeAreaView style={generic.fullScreen}>
                <ScrollView>
                    <Image style={generic.imageBig} source={{uri: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}}/>
                    <Text style={generic.title}>{hotel.name}</Text>
                    <Text style={generic.description}>{hotel.description}</Text>
                    <MapView style={map.smallMap} zoomEnabled={true} zoomControlEnabled={true} initialRegion={{
                        latitude: hotel.latitude,
                        longitude: hotel.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                        <Marker coordinate={{latitude: hotel.latitude, longitude: hotel.longitude}} title={"Howest"} description={"This is a test!"}/>
                    </MapView>
                    <Text style={[generic.ratingTitle, generic.marginHor]}>Rating & reviews</Text>
                    <View style={{flexDirection: 'row', marginHorizontal:Dimensions.get('window').width/20, justifyContent:"space-between"}}>
                        <Text style={generic.ratingNumber}>{hotel.rating}⭐</Text>
                        <View style={generic.row}>
                            <View>
                                <Text style={generic.font8}>⭐⭐⭐⭐⭐</Text>
                                <Text style={generic.font8}>⭐⭐⭐⭐</Text>
                                <Text style={generic.font8}>⭐⭐⭐</Text>
                                <Text style={generic.font8}>⭐⭐</Text>
                                <Text style={generic.font8}>⭐</Text>
                            </View>
                            <View>
                                <View style={generic.ratingBar}/>
                                <View style={generic.ratingBar}/>
                                <View style={generic.ratingBar}/>
                                <View style={generic.ratingBar}/>
                                <View style={generic.ratingBar}/>
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom: 60}}>
                        {reviews?.map((val, index) => {
                        return(<ReviewCard key={val.id} review={val}/>)
                    })}
                    </View>
                </ScrollView>
                <BottomBar returnCallback={() => deleteReservation()} nextCallback={() => navigate("RoomTypePage", {Hotel: hotel, id:route.params.id})} returnTitle="Return" nextTitle="Next"/>
        </SafeAreaView>
    )
}