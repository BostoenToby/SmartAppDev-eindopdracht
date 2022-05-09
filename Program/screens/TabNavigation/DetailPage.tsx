import { useEffect, useState } from "react";
import { Image, Text, View, Dimensions, SafeAreaView, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ReviewCard from "../../components/ReviewCard";
import Hotel from "../../interfaces/Hotel";
import Review from "../../interfaces/Review";
import map from "../../styling/map";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/db";
import generic from "../../styling/generic";
import BottomBar from "../../components/BottomBar";

export default function DetailPage ({ route }: { route: any }){
    const [hotel] = useState<Hotel>(route.params.hotel)
    const [reviews, setReviews] = useState<Review[]>()
    const [averageStars, setAverageStars] = useState<number>(0)
    const {navigate, goBack} = useNavigation<StackNavigationProp<ParamListBase>>();

    const deleteReservation = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'DELETE FROM reservation3 WHERE id = (?)', [route.params.id])
        goBack()
    }

    const getReservations = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation3 WHERE id = (?)", [route.params.id])
    }

    const getAverage = async() => {
        let averageStars: number = 0
        let count: number = 0
        if(reviews)
        for(let review of reviews){
            averageStars += review.starRating
            count += 1
        }
        averageStars = averageStars / count
        setAverageStars(averageStars)
    }

    useEffect(() => {
        getReservations()
        setReviews(hotel.reviews)
    }, [])

    useEffect(() => {
        getAverage()
    }, [reviews])

    return(
        <SafeAreaView style={generic.fullScreen}>
                <ScrollView>
                    <Image style={generic.imageBig} source={{uri: route.params.hotel.image}}/>
                    <Text style={generic.title}>{hotel.name}</Text>
                    <Text style={generic.description}>{hotel.description}</Text>
                    <MapView style={map.smallMap} zoomEnabled={true} zoomControlEnabled={true} initialRegion={{
                        latitude: hotel.latitude,
                        longitude: hotel.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                        <Marker coordinate={{latitude: hotel.latitude, longitude: hotel.longitude}} title={hotel.name} description={hotel.description}/>
                    </MapView>
                    <Text style={[generic.ratingTitle, generic.marginHor]}>Rating & reviews</Text>
                    <View style={{flexDirection: 'row', marginHorizontal:Dimensions.get('window').width/20, justifyContent:"space-between"}}>
                        <Text style={generic.ratingNumber}>{averageStars.toFixed(2)}⭐</Text>
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