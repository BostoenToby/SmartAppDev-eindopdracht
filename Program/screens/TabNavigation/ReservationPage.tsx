import { StackNavigationProp } from "@react-navigation/stack"
import { SQLResultSet, SQLTransaction } from "expo-sqlite"
import { useEffect, useState } from "react"
import { Image, SafeAreaView, Text, View } from "react-native"
import { InputField, InputFieldSmall } from "../../components/InputField"
import Reservation from "../../interfaces/Reservation"
import { statement, transaction } from "../../utils/db"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import BottomBar from "../../components/BottomBar"
import generic from "../../styling/generic"
import { backendUrl } from "../../utils/enviroment"
import { postData } from "../../utils/APIMethods"
import { getItemAsync } from "expo-secure-store"

export default function ReservationPage({route}: {route: any }){
    const [reservation, setReservation] = useState<Reservation>()
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [mail, setMail] = useState<string>();
    const [errors, setErrors] = useState<any>({
            firstNameError: "",
            lastNameError: "",
            mailError: ""
    })

    const { navigate, goBack } = useNavigation<StackNavigationProp<ParamListBase>>();

    const getReservationId = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation3 WHERE id=(?)", [route.params.id])
        setReservation(res.rows._array[0])
    }

    const postHotelReservation = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT hotelName, roomTypeName, incheckDate, outcheckDate, price, firstName, lastName, mail, image FROM reservation3 WHERE id=(?)", [route.params.id])
        const reservation: Reservation = res.rows._array[0]
        const response = postData(`${backendUrl}/reservation`, reservation).then((data) => {
        })
    }

    const checkInput = async() => {
        console.log(firstName)
        console.log(lastName)
        console.log(mail)
        if(firstName == undefined || String(firstName).length < 2) {
            setErrors((currentErrors: any) => {
                currentErrors.firstNameError = "Must be at least 2 letters"
                return { ...currentErrors }
            })
        } else {
            setErrors((currentErrors: any) => {
                currentErrors.firstNameError = ""
                return { ...currentErrors }
            })
        }
        if(lastName == undefined || String(lastName).length < 2) {
            setErrors((currentErrors: any) => {
                currentErrors.lastNameError = "Must be at least 2 letters"
                return { ...currentErrors }
            })
        } else {
            setErrors((currentErrors: any) => {
                currentErrors.lastNameError = ""
                return { ...currentErrors }
            })
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(String(mail))){
            setErrors((currentErrors: any) => {
                currentErrors.mailError = "The mail address must be valid"
                return { ... currentErrors }
            })
        } else {
            setErrors((currentErrors: any) => {
                currentErrors.mailError = ""
                return { ...currentErrors }
            })
        }
    }

    const putReservationDb = async() => {
        await checkInput()
        console.log({errors})
        if(errors.firstNameError == "" && errors.lastNameError == "" && errors.mailError == ""){
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
    }

    const putReservationBackwardsDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "UPDATE reservation3 SET roomTypeName=(?), price=(?) WHERE id=(?)", [null, null, route.params.id])
        goBack()
    }

    const getMail = async() => {
        const mail = await getItemAsync("mail")
        setMail(String(mail))
    }

    useEffect(() => {
        getMail()
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
                            <View style = {{flexDirection: 'column'}}>
                                <InputFieldSmall label="First name" placeholder="e.g. John" callback={(value: string) => setFirstName(value)}/>
                                {errors.firstNameError? (
                                <Text style={{color: 'red', fontSize: 10}}>{errors.firstNameError}</Text>
                                ): null}
                            </View>
                            <View style ={{flexDirection: 'column'}}>
                                <InputFieldSmall label="Last name" placeholder="e.g. Smith" callback={(value: string) => setLastName(value)}/>
                                {errors.lastNameError? (
                                <Text style={{color: 'red', fontSize: 10}}>{errors.lastNameError}</Text>
                                ): null}
                            </View>
                        </View>
                        <InputField label="E-mail address" placeholder="e.g. john.smith@gmail.com" password={false} callback={(value: string) => setMail(value)} value={mail}/>
                        {errors.mailError? (
                        <Text style={{color: 'red', fontSize: 12}}>{errors.mailError}</Text>
                        ): null}
                    </View>
                </View>
            </View>
            <BottomBar returnCallback={() => putReservationBackwardsDb()} nextCallback={() => putReservationDb()} returnTitle="Return" nextTitle="Reservate"/>
        </SafeAreaView>
    )
}