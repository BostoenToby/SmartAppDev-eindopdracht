import { StackNavigationProp } from "@react-navigation/stack"
import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { useEffect, useState } from "react"
import { Dimensions, Image, Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import { GenericButton } from "../../components/GenericButton"
import { InputField, InputFieldSmall } from "../../components/InputField"
import Reservation from "../../interfaces/Reservation"
import RoomType from "../../interfaces/RoomType"
import { statement, transaction } from "../../utils/db"
import { useNavigation, ParamListBase } from '@react-navigation/native';

export default function ReservationPage({route}: {route: any }){
    const [reservation, setReservation] = useState<Reservation>()
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [mail, setMail] = useState<string>();

    const getReservationId = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation2 WHERE id=(?)", [route.params.id])
        setReservation(res.rows._array[0])
        console.log(res.rows._array[0])
    }

    const putReservationDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "UPDATE reservation2 SET firstName=(?) , lastName=(?) , mail=(?)", [firstName, lastName, mail])
        getReservationId()
    }

    useEffect(() => {
        getReservationId()
    }, [])

    return(
        <SafeAreaView style={{marginHorizontal:Dimensions.get("window").width/20}}>
            <Text style={{fontSize: 20}}>Summary</Text>
            <View style={{backgroundColor: "#FFFFFF", marginBottom: 12}}>
                <Text style={{fontSize: 18}}>{reservation?.hotelName}</Text>
                <Text style={{fontSize: 14}}>{reservation?.roomTypeName}</Text>
                <Text>Inchecken: {reservation?.incheckDate}</Text>
                <Text>Outchecken: {reservation?.outcheckDate}</Text>
                <Text>Price: €{reservation?.price}</Text>
                <Text></Text>
            </View>
            <Text style={{fontSize: 20}}>Information</Text>
            <View style={{backgroundColor:"#FFFFFF"}}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <InputFieldSmall label="First name" placeholder="e.g. John" callback={(value: string) => setFirstName(value)}/>
                    <InputFieldSmall label="Last name" placeholder="e.g. Smith" callback={(value: string) => setLastName(value)}/>
                </View>
                <InputField label="E-mail address" placeholder="e.g. john.smith@gmail.com" callback={(value: string) => setMail(value)}/>
            </View>
            <GenericButton text="Reservate" callback={() => {
                putReservationDb()
            }} />
        </SafeAreaView>
    )
}