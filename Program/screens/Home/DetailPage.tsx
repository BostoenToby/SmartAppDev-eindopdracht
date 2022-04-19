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

export default function DetailPage ({ route }: { route: any }){
    const Hotel = route.params.hotel
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    // const testReviews: Review[] = [
    //     {
    //         author: 'John Peters',
    //         starRating: 3,
    //         image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //         reviewString: 'it was good and the breakfast was lovely. Only the service wasn\' that great but it was the only problem we had.'
    //     },
    //     {
    //         author: 'Peterson John',
    //         starRating: 7,
    //         image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    //         reviewString: 'it was a great experience'
    //     }
    // ]

    const renderReview = ({ item }: { item: Review }) => (
        <ReviewCard review={item}/>
    )

    const [reviews, setReviews] = useState<Review[]>()

    useEffect(() => {
        setReviews(Hotel.reviews)
        console.log(reviews)
    }, [])

    return(
        <SafeAreaView>
                <ScrollView>
                    <Image style={{height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width - 10, borderRadius: 10, marginHorizontal: 5}} source={{uri: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}}/>
                    <Text style={{fontSize: 32, paddingHorizontal: 20}}>{Hotel.name}</Text>
                    <Text style={{paddingHorizontal: 20}}>{Hotel.description}</Text>
                    <MapView style={[map.map, {width: Dimensions.get('window').width/10*9, height: Dimensions.get('window').height/10*3, marginVertical: 10, marginHorizontal: Dimensions.get('window').width/20, borderRadius:5}]} zoomEnabled={true} zoomControlEnabled={true} initialRegion={{
                        latitude: Hotel.latitude,
                        longitude: Hotel.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>
                        <Marker coordinate={{latitude: Hotel.latitude, longitude: Hotel.longitude}} title={"Howest"} description={"This is a test!"}/>
                    </MapView>
                    <FlatList data={reviews} renderItem={renderReview}/>
                </ScrollView>
                <View style={{}}>
                    <Pressable onPress={() => {navigation.goBack()}}>
                        <Text>Return</Text>
                    </Pressable>
                    <Pressable onPress={() => {navigation("")}}>
                        <Text>Next</Text>
                    </Pressable>
                </View>
        </SafeAreaView>
    )
}