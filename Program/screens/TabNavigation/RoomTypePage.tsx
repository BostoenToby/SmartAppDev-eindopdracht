import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, Text, TextInput } from "react-native"
import RoomTypeCard from "../../components/RoomTypeCard"
import Hotel from "../../interfaces/Hotel"
import RoomType from "../../interfaces/RoomType"

export default ({route}: {route: any}) => {
    const [roomTypes, setRoomTypes] = useState<RoomType[]>()
    // make hotel a list to send the hotel with the flatlist --> must be a list 

    const renderRoomType = ({ item }: { item: RoomType }) => (
        <RoomTypeCard roomType={item} />
    )

    useEffect(() => {
        setRoomTypes(route.params.Hotel.roomTypes)
    }, [])
    // in roomtype model --> hotelnaam toevoegen zodat deze meegegeven word in roomtypecard --> gemakkelijk kom reservation te maken

    return(
        <SafeAreaView>
            <TextInput style={{width: '100%', backgroundColor: '#FFFFFF', borderRadius: 5, height: 30, paddingHorizontal: 10, marginVertical: 10}} placeholder="search for a room type"/>
            <FlatList data={roomTypes} renderItem={renderRoomType}/>
        </SafeAreaView>
    )
}