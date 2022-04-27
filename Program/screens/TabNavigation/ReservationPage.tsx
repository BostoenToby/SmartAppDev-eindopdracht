import { StackNavigationProp } from "@react-navigation/stack"
import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { useEffect, useState } from "react"
import { Dimensions, Image, Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import {GenericButton} from "../../components/GenericButton"
import { InputField, InputFieldSmall } from "../../components/InputField"
import Reservation from "../../interfaces/Reservation"
import RoomType from "../../interfaces/RoomType"
import { statement, transaction } from "../../utils/db"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import BottomBar from "../../components/BottomBar"
import generic from "../../styling/generic"

export default function ReservationPage({route}: {route: any }){
    const [reservation, setReservation] = useState<Reservation>()
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [mail, setMail] = useState<string>();

    const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>();

    const getReservationId = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation2 WHERE id=(?)", [route.params.id])
        setReservation(res.rows._array[0])
    }

    const putReservationDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "UPDATE reservation2 SET firstName=(?) , lastName=(?) , mail=(?)", [firstName, lastName, mail])
        getReservationId()
    }

    const putReservationBackwardsDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "UPDATE reservation2 SET roomTypeName=(?), price=(?) WHERE id=(?)", [null, null, route.params.id])
        goBack()
    }

    useEffect(() => {
        getReservationId()
    }, [])

    return(
        <SafeAreaView style={generic.fullScreen}>
            <View style={generic.marginHor}>
                <Text style={generic.reservationTitle}>Summary</Text>
                <View style={generic.reservationContainer}>
                    <Text style={{fontSize: 18}}>{reservation?.hotelName}</Text>
                    <Text style={{fontSize: 14}}>{reservation?.roomTypeName}</Text>
                    <Text>Inchecken: {reservation?.incheckDate}</Text>
                    <Text>Outchecken: {reservation?.outcheckDate}</Text>
                    <Text>Price: €{reservation?.price}</Text>
                    <Text></Text>
                </View>
                <Text style={generic.reservationTitle}>Information</Text>
                <View style={generic.reservationContainer}>
                    <View style={generic.inputContainer}>
                        <InputFieldSmall label="First name" placeholder="e.g. John" callback={(value: string) => setFirstName(value)}/>
                        <InputFieldSmall label="Last name" placeholder="e.g. Smith" callback={(value: string) => setLastName(value)}/>
                    </View>
                    <InputField label="E-mail address" placeholder="e.g. john.smith@gmail.com" callback={(value: string) => setMail(value)}/>
                </View>
            </View>
            <BottomBar returnCallback={() => putReservationBackwardsDb()} nextCallback={() => putReservationDb()} returnTitle="Return" nextTitle="Reservate"/>
        </SafeAreaView>
    )
}