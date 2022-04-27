import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TextInput } from "react-native";
import HotelCard from "../../components/HotelCard";
import Hotel from "../../interfaces/Hotel";
import generic from "../../styling/generic";
import { statement, transaction } from "../../utils/db";

export async function getData(url=''): Promise<any>{
    const response = await fetch(url)
    return await response.json()
}

export default function OverView(){
    const [hotels, setHotels] = useState<any>()

    const getHotels = async() => {
        const hotels = await getData("http://172.30.19.14:3000/hotels")
        setHotels(hotels);
    }

    const getReservations = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation2")
    }

    useEffect(() => {
        getHotels()
        getReservations()
    }, [])

    const renderHotel = ({ item }: { item: Hotel }) => (
        <HotelCard key={item.id} hotel={item}/>
    )
    return(
        <SafeAreaView>
            <TextInput style={generic.textInput} placeholder="search for a hotel"/>
            <FlatList style={{marginBottom:54}} data={hotels} 
            renderItem={renderHotel}/>
        </SafeAreaView>
    )
}