import { FlatList, Text, View } from "react-native";
import { getData } from "../utils/APIMethods";
import { backendUrl } from "../utils/enviroment";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { TabNavigatorProps } from 'react-native-tab-navigator';
import { createContext, useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";
import Reservation from "../interfaces/Reservation";
import { SafeAreaView } from "react-native-safe-area-context";
import ReservationCard from "../components/ReservationCard";

export default function Reviews ({route}: {route: any}) {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [mail, setMail] = useState<string>()
    const [reservations, setReservations] = useState<Reservation[]>()
    const [render, setRender] = useState<boolean>(true)
    const [interval2, setInterval] = useState<number>()
    const reRender = true
    
    const getMail = async() => {
        const mailGet = await getItemAsync("mail");
        setMail(String(mailGet))
        getReservationsByMail(String(mailGet))
    }

    const getReservationsByMail = async(mail: string) => {
        // console.log(`${backendUrl}/reservations/Mail=${mail}`)
        const data = await getData(`${backendUrl}/reservations/Mail=${mail}`)
        // console.log("***")
        setReservations(data)
        setRender(true)
        // console.log(data)
        // console.log(reservations)
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