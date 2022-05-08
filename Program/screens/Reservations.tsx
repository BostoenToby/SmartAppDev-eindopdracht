import { FlatList } from "react-native";
import { getData } from "../utils/APIMethods";
import { backendUrl } from "../utils/enviroment";
import { useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";
import Reservation from "../interfaces/Reservation";
import { SafeAreaView } from "react-native-safe-area-context";
import ReservationCard from "../components/ReservationCard";

export default function Reviews ({route}: {route: any}) {
    const [mail, setMail] = useState<string>()
    const [reservations, setReservations] = useState<Reservation[]>()
    const [render, setRender] = useState<boolean>(true)
    
    const getMail = async() => {
        const mailGet = await getItemAsync("mail");
        setMail(String(mailGet))
        getReservationsByMail(String(mailGet))
    }

    const getReservationsByMail = async(mail: string) => {
        const data = await getData(`${backendUrl}/reservations/Mail=${mail}`)
        setReservations(data)
        setRender(true)
    }

    useEffect(() => {
        getMail()
    }, [render]) 

    const renderReservations = ({ item }: { item: Reservation }) => (
        <ReservationCard key={item.id} reservation={item} callback={() => {setRender(false); getMail()}}/>
    )

    useEffect(() => {
        if(route.render == false){
            getMail()
        }
    }, [])

    return (
        <SafeAreaView>
            <FlatList style={{marginBottom:54}} data={reservations} 
            renderItem={renderReservations}/>
        </SafeAreaView>
    )
}