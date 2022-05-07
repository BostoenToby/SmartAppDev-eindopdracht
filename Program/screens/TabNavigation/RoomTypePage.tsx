import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, Text, TextInput, View, Modal, Pressable, TouchableWithoutFeedback, Dimensions } from "react-native"
import RoomTypeCard from "../../components/RoomTypeCard"
import RoomType from "../../interfaces/RoomType"
import DateTimePicker from '@react-native-community/datetimepicker';
import modal from "../../styling/modal";
import { GenericButton } from "../../components/GenericButton";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/db";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import generic from "../../styling/generic";
import BottomBarHalf from "../../components/BottomBarHalf";
import ModalCardDateTime from "../../components/ModalCardDateTime";
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default ({route}: {route: any}) => {
    const {goBack} = useNavigation<StackNavigationProp<ParamListBase>>();

    const [roomTypes, setRoomTypes] = useState<RoomType[]>(route.params.Hotel.roomTypes)
    const [namePiece, setNamePiece] = useState<string>()
    const [incheckDate, setIncheckDate] = useState<Date>(new Date(Date.now()))
    const [outcheckDate, setOutCheckDate] = useState<Date>(new Date(Date.now()))
    const [modalVisibleInCheck, setModalVisibleInCheck] = useState<boolean>(false)
    const [modalVisibleOutCheck, setModalVisibleOutCheck] = useState<boolean>(false)

    const renderRoomType = ({ item }: { item: RoomType }) => (
        <RoomTypeCard key={item.id} roomType={item} id={route.params.id} />
    )

    const applyFilters = () => {
        let roomTypesFound: RoomType[] = []
        if (namePiece != ""){
            for(let roomType of roomTypes){
                if(roomType.name.includes(String(namePiece))){
                    roomTypesFound.push(roomType)
                }
            }
            setRoomTypes(roomTypesFound)
        } else {
            setRoomTypes(route.params.Hotel.roomTypes)
        }
    }

    const onChangeInCheck = (event: any, selectedValue: Date | undefined) => {
        const currentDate = selectedValue || new Date();
        setIncheckDate(() => currentDate)
    }

    const onChangeOutCheck = (event: any, selectedValue: Date | undefined) => {
        const currentDate = selectedValue || new Date();
        setOutCheckDate(currentDate)
    }

    const putReservationDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'UPDATE reservation3 SET incheckDate = (?), outcheckDate = (?) WHERE id=(?)', [incheckDate.toLocaleDateString(), outcheckDate.toLocaleDateString(), route.params.id])
    }

    const getReservations = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation3 WHERE id = (?)", [route.params.id])
        console.log(res.rows._array)
    }

    useEffect(() => {
        putReservationDb()
        getReservations()
    }, [incheckDate, outcheckDate])

    return(
        <SafeAreaView style={generic.fullScreen}>
            <View style={[generic.row, {alignItems: 'center'}]}>
                <TextInput style={generic.textInputFull} placeholder="search for a room type" onChangeText={(value: string) => setNamePiece(value)}/>
                <Pressable onPress={() => applyFilters()}>
                    <FontAwesome style={{position:'absolute', top:-11, right:10}} name="search" size={20} color="black" />
                </Pressable> 
            </View>

                <View style={[modal.modalContainer, generic.row, generic.spaceBetween]}>
                    <ModalCardDateTime visible={modalVisibleInCheck} date={incheckDate} onChange={onChangeInCheck} buttonModalCallback={()=>setModalVisibleInCheck(false)} buttonCallback={() => setModalVisibleInCheck(true)}/>
                    <ModalCardDateTime visible={modalVisibleOutCheck} date={outcheckDate} onChange={onChangeOutCheck} buttonModalCallback={()=>setModalVisibleOutCheck(false)} buttonCallback={() => setModalVisibleOutCheck(true)}/>
                </View>
            <FlatList data={roomTypes} renderItem={renderRoomType}/>
            <BottomBarHalf returnTitle="Return" returnCallback={() => goBack()}/>
        </SafeAreaView>
    )
}