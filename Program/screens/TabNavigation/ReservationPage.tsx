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
import { backendUrl } from "../../utils/enviroment"
import { postData } from "../../utils/APIMethods"
import { getData } from "./Overview"

export default function ReservationPage({route}: {route: any }){
    // console.log({route})
    const [reservation, setReservation] = useState<Reservation>()
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [mail, setMail] = useState<string>();

    const { navigate, goBack } = useNavigation<StackNavigationProp<ParamListBase>>();

    const getReservationId = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation3 WHERE id=(?)", [route.params.id])
        console.log("end")
        console.log(res.rows._array)
        setReservation(res.rows._array[0])
    }

    const postHotelReservation = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT hotelName, roomTypeName, incheckDate, outcheckDate, price, firstName, lastName, mail, image FROM reservation3 WHERE id=(?)", [route.params.id])
        const reservation: Reservation = res.rows._array[0]
        const response = postData(`${backendUrl}/reservation`, reservation).then((data) => {
            // console.log(data)
        })
        // console.log(`${backendUrl}/reservation`)
    }

    const putReservationDb = async() => {
        let inserted: boolean = false
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "UPDATE reservation3 SET firstName=(?) , lastName=(?) , mail=(?) WHERE id=(?)", [firstName, lastName, mail, route.params.id])
        inserted = res.rowsAffected === 1
        if(inserted){
            await getReservationId()
            postHotelReservation()
            navigate("LoadingPage")
        }
    }

    const putReservationBackwardsDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "UPDATE reservation3 SET roomTypeName=(?), price=(?) WHERE id=(?)", [null, null, route.params.id])
        goBack()
    }

    useEffect(() => {
        getReservationId()
    }, [])

    return(
        <SafeAreaView style={generic.fullScreen}>
            <View style={[generic.marginHor, generic.fullScreenSpecial]}>
                <Text style={generic.reservationTitle}>Summary</Text>
                <View style={[generic.row, generic.reservationContainer, {justifyContent: "space-between", alignItems:"center", padding: 10}]}>
                <View style={{flexDirection: "column", alignItems: "center"}}>
                    <Image style={[generic.imageSmall, {alignItems: "center"}]} source={{uri: reservation?.image}}/>
                    <Text style={{fontSize: 16}}>{reservation?.hotelName}</Text>
                </View>
                    <View>
                        <Text style={{fontSize: 16}}>{reservation?.roomTypeName}</Text>
                        <Text style={{fontSize: 16}}>Inchecken: {reservation?.incheckDate}</Text>
                        <Text style={{fontSize: 16}}>Outchecken: {reservation?.outcheckDate}</Text>
                        <Text style={{fontSize: 16}}>Price: €{reservation?.price}</Text>
                    </View>
                </View>
                <Text style={generic.reservationTitle}>Information</Text>
                <View style={generic.reservationContainer}>
                    <View style={generic.inputContainer}>
                        <View style ={generic.inputRow}>
                            <InputFieldSmall label="First name" placeholder="e.g. John" callback={(value: string) => setFirstName(value)}/>
                            <InputFieldSmall label="Last name" placeholder="e.g. Smith" callback={(value: string) => setLastName(value)}/>
                        </View>
                        <InputField label="E-mail address" placeholder="e.g. john.smith@gmail.com" password={false} callback={(value: string) => setMail(value)}/>
                    </View>
                </View>
            </View>
            <BottomBar returnCallback={() => putReservationBackwardsDb()} nextCallback={() => putReservationDb()} returnTitle="Return" nextTitle="Reservate"/>
        </SafeAreaView>
    )
}