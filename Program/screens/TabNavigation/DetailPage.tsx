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
import { GenericButton } from "../../components/GenericButton";

export default function DetailPage ({ route }: { route: any}){
    const Hotel = route.params.hotel
    const {navigate} = useNavigation<StackNavigationProp<ParamListBase>>();
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
                    <Text style={{fontSize:24, fontWeight:"600", marginHorizontal:Dimensions.get('window').width/20}}>Rating & reviews</Text>
                    <View style={{flexDirection: 'row', marginHorizontal:Dimensions.get('window').width/20, justifyContent:"space-between"}}>
                        <Text style={{fontSize: 32, fontWeight: 'bold'}}>{Hotel.rating}⭐</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{}}>
                                <Text style={{fontSize:8}}>⭐⭐⭐⭐⭐</Text>
                                <Text style={{fontSize:8}}>⭐⭐⭐⭐</Text>
                                <Text style={{fontSize:8}}>⭐⭐⭐</Text>
                                <Text style={{fontSize:8}}>⭐⭐</Text>
                                <Text style={{fontSize:8}}>⭐</Text>
                            </View>
                            <View>
                                <View style={{width: 100, height: 8, backgroundColor:'#D3D3D3', borderRadius: 5, marginBottom: 2}}/>
                                <View style={{width: 100, height: 8, backgroundColor:'#D3D3D3', borderRadius: 5, marginBottom: 2}}/>
                                <View style={{width: 100, height: 8, backgroundColor:'#D3D3D3', borderRadius: 5, marginBottom: 2}}/>
                                <View style={{width: 100, height: 8, backgroundColor:'#D3D3D3', borderRadius: 5, marginBottom: 2}}/>
                                <View style={{width: 100, height: 8, backgroundColor:'#D3D3D3', borderRadius: 5}}/>
                            </View>
                        </View>
                    </View>
                    <FlatList style={{marginBottom: 80}} data={reviews} renderItem={renderReview}/>
                </ScrollView>
                <View style={{position:'absolute', bottom:0, left:0, width: Dimensions.get('window').width, height:80, backgroundColor:'#FFFFFF', paddingHorizontal:20, borderTopWidth:1, borderColor:"#D3D3D3"}}>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 22.5}}>
                        <GenericButton text="Return" callback={() => navigation.goBack()} />
                        <GenericButton text="Next" callback={() => navigate("RoomTypePage", {Hotel: Hotel})} />
                    </View>
                </View>
        </SafeAreaView>
    )
}