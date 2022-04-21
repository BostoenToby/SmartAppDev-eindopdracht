import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TextInput } from "react-native";
import HotelCard from "../../components/HotelCard";
import Hotel from "../../interfaces/Hotel";

export async function getData(url=''): Promise<any>{
    const response = await fetch(url)
    // console.log(response)
    return await response.json()
}

export default function OverView(){
    // const testHotels: Hotel[] = [
    //     {
    //         name: 'Ibis hotel',
    //         city: 'Kortrijk',
    //         address: 'Kortrijkstraat 123',
    //         province: 'West Vlaanderen',
    //         description: 'Een veel te duur hotel in Kortrijk',
    //         starRating: 4,
    //         longitude: 2.43534,
    //         latitude: 5.23664,
    //         pricePerNightMin: 40.56,
    //         pricePerNightMax: 500.98,
    //         rating: 7.5,
    //     },
    //     {
    //         name: 'Parkhotel',
    //         city: 'Kortrijk',
    //         address: 'Kortrijkstraat 321',
    //         province: 'West Vlaanderen',
    //         description: 'Een veel te duur hotel in Kortrijk aan het station',
    //         starRating: 3,
    //         longitude: 3.55634,
    //         latitude: 7.65462,
    //         pricePerNightMin: 35.88,
    //         pricePerNightMax: 798.00,
    //         rating: 9.8
    //     }
    //     ];

    const [hotels, setHotels] = useState<any>()

    // const test: Hotel[] = getData('http://0.0.0.0:3000/hotels')
    const getHotels = async() => {
        const hotels = await getData("http://172.30.19.15:3000/hotels")
        console.log(hotels);
        setHotels(hotels);
    }

    useEffect(() => {
        getHotels()
        console.log(hotels)
    }, [])
    // console.warn(hotels)

    const renderHotel = ({ item }: { item: Hotel }) => (
        <HotelCard hotel={item}/>
    )
    return(
        <SafeAreaView>
            <TextInput style={{width: '100%', backgroundColor: '#FFFFFF', borderRadius: 5, height: 30, paddingHorizontal: 10, marginVertical: 10}} placeholder="search for a hotel"/>
            <FlatList style={{marginBottom:54}} data={hotels} renderItem={renderHotel}/>
        </SafeAreaView>
    )
}