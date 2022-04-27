import { useEffect, useState } from "react"
import { FlatList, Platform, SafeAreaView, Text, TextInput, View, Modal, Pressable, TouchableWithoutFeedback, Dimensions } from "react-native"
import RoomTypeCard from "../../components/RoomTypeCard"
import RoomType from "../../interfaces/RoomType"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, AntDesign  } from '@expo/vector-icons';
import modal from "../../styling/modal";
import { GenericButton } from "../../components/GenericButton";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/db";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import generic from "../../styling/generic";
import ModalCard from "../../components/ModalCard";
import BottomBarHalf from "../../components/BottomBarHalf";

export default ({route}: {route: any}) => {
    const {goBack} = useNavigation<StackNavigationProp<ParamListBase>>();

    const [roomTypes, setRoomTypes] = useState<RoomType[]>(route.params.Hotel.roomTypes)
    const [incheckDate, setIncheckDate] = useState<Date>(new Date(Date.now()))
    const [outcheckDate, setOutCheckDate] = useState<Date>(new Date(Date.now()))
    const [modalVisibleInCheck, setModalVisibleInCheck] = useState<boolean>(false)
    const [modalVisibleOutCheck, setModalVisibleOutCheck] = useState<boolean>(false)

    const renderRoomType = ({ item }: { item: RoomType }) => (
        <RoomTypeCard key={item.id} roomType={item} id={route.params.id} />
    )

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
        const res: SQLResultSet = await statement(tx, 'UPDATE reservation2 SET incheckDate = (?), outcheckDate = (?) WHERE id=(?)', [incheckDate.toLocaleDateString(), outcheckDate.toLocaleDateString(), route.params.id])
    }

    useEffect(() => {
        putReservationDb()
    }, [incheckDate, outcheckDate])

    return(
        <SafeAreaView style={generic.fullScreen}>
            <TextInput style={generic.textInput} placeholder="search for a room type"/>
                <View style={[modal.modalContainer, generic.row, generic.spaceBetween]}>
                    <ModalCard visible={modalVisibleInCheck} date={incheckDate} onChange={onChangeInCheck} buttonModalCallback={()=>setModalVisibleInCheck(false)} buttonCallback={() => setModalVisibleInCheck(true)}/>
                    <ModalCard visible={modalVisibleOutCheck} date={outcheckDate} onChange={onChangeOutCheck} buttonModalCallback={()=>setModalVisibleOutCheck(false)} buttonCallback={() => setModalVisibleOutCheck(true)}/>
                </View>
            <FlatList data={roomTypes} renderItem={renderRoomType}/>
            <BottomBarHalf returnTitle="Return" returnCallback={() => goBack()}/>
        </SafeAreaView>
    )
}