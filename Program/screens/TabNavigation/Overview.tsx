import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TextInput } from "react-native";
import HotelCard from "../../components/HotelCard";
import Hotel from "../../interfaces/Hotel";
import { statement, transaction } from "../../utils/db";

export async function getData(url=''): Promise<any>{
    const response = await fetch(url)
    // console.log(response)
    return await response.json()
}

export default function OverView(){
    const [hotels, setHotels] = useState<any>()

    const getHotels = async() => {
        const hotels = await getData("http://172.30.19.43:3000/hotels")
        setHotels(hotels);
    }

    const getReservations = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation2")
        console.log(res.rows._array)
    }

    useEffect(() => {
        getHotels()
        getReservations()
    }, [])

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