import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, TextInput, View, Pressable } from "react-native"
import RoomTypeCard from "../../components/RoomTypeCard"
import RoomType from "../../interfaces/RoomType"
import modal from "../../styling/modal";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/db";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import generic from "../../styling/generic";
import BottomBarHalf from "../../components/BottomBarHalf";
import ModalCardDateTime from "../../components/ModalCardDateTime";
import { FontAwesome } from '@expo/vector-icons';

export default ({route}: {route: any}) => {
    const {goBack} = useNavigation<StackNavigationProp<ParamListBase>>();
    const [roomTypes, setRoomTypes] = useState<RoomType[]>(route.params.Hotel.roomTypes)
    const [namePiece, setNamePiece] = useState<string>("")
    const [incheckDate, setIncheckDate] = useState<Date>(new Date(Date.now()))
    const [outcheckDate, setOutCheckDate] = useState<Date>(new Date((Date.now())))
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
        let currentDate = selectedValue || new Date();
        if(currentDate <= new Date()){
            currentDate = new Date()
            setIncheckDate(currentDate)
        }
        else if(currentDate >= outcheckDate){
            let outcheck = currentDate
            outcheck.setDate(currentDate.getDate() + 1)
            currentDate.setDate(outcheck.getDate() - 1)
            setOutCheckDate(outcheck)
        } else {
            setIncheckDate(currentDate)
        }
    }

    const onChangeOutCheck = (event: any, selectedValue: Date | undefined) => {
        let currentDate = selectedValue || new Date();
        if(currentDate <= new Date()){
            currentDate = new Date()
            currentDate.setDate(currentDate.getDate()+1)
        }
        if(currentDate <= incheckDate){
            let incheck = incheckDate
            currentDate.setDate(incheck.getDate() + 1)
        }
        setOutCheckDate(currentDate)
    }

    const putReservationDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'UPDATE reservation3 SET incheckDate = (?), outcheckDate = (?) WHERE id=(?)', [incheckDate.toLocaleDateString(), outcheckDate.toLocaleDateString(), route.params.id])
    }

    useEffect(() => {
        putReservationDb()
    }, [incheckDate, outcheckDate])

    useEffect(() => {
        applyFilters()
    }, [namePiece])

    useEffect(() => {
        let tommorow: Date = new Date(Date.now())
        tommorow.setDate(tommorow.getDate() + 1)
        setOutCheckDate(tommorow)
    }, [])

    return(
        <SafeAreaView style={generic.fullScreen}>
            <View style={[generic.row, {alignItems: 'center'}]}>
                <TextInput style={generic.textInputFull} placeholder="search for a room type" onChangeText={(value: string) => setNamePiece(value)}/>
                <Pressable onPress={() => applyFilters()}>
                    <FontAwesome style={{position:'absolute', top:-11, right:10}} name="search" size={20} color="black" />
                </Pressable> 
            </View>

                <View style={[modal.modalContainer, generic.row, generic.spaceBetween]}>
                    <ModalCardDateTime title="Check-in:" visible={modalVisibleInCheck} date={incheckDate} onChange={onChangeInCheck} buttonModalCallback={()=>setModalVisibleInCheck(false)} buttonCallback={() => setModalVisibleInCheck(true)}/>
                    <ModalCardDateTime title="Check-out:" visible={modalVisibleOutCheck} date={outcheckDate} onChange={onChangeOutCheck} buttonModalCallback={()=>setModalVisibleOutCheck(false)} buttonCallback={() => setModalVisibleOutCheck(true)}/>
                </View>
            <FlatList data={roomTypes} renderItem={renderRoomType}/>
            <BottomBarHalf returnTitle="Return" returnCallback={() => goBack()}/>
        </SafeAreaView>
    )
}