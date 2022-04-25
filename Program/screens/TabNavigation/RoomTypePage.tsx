import { useEffect, useState } from "react"
import { FlatList, Platform, SafeAreaView, Text, TextInput, View, Modal, Pressable, TouchableWithoutFeedback } from "react-native"
import RoomTypeCard from "../../components/RoomTypeCard"
import RoomType from "../../interfaces/RoomType"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo, AntDesign  } from '@expo/vector-icons';
import modal from "../../styling/modal";
import { GenericButton } from "../../components/GenericButton";
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { statement, transaction } from "../../utils/db";

export default ({route}: {route: any}) => {
    const [roomTypes, setRoomTypes] = useState<RoomType[]>(route.params.Hotel.roomTypes)
    const [incheckDate, setIncheckDate] = useState<Date>(new Date(Date.now()))
    const [outcheckDate, setOutCheckDate] = useState<Date>(new Date(Date.now()))
    const [modalVisibleInCheck, setModalVisibleInCheck] = useState<boolean>(false)
    const [modalVisibleOutCheck, setModalVisibleOutCheck] = useState<boolean>(false)

    const renderRoomType = ({ item }: { item: RoomType }) => (
        <RoomTypeCard roomType={item} id={route.params.id} />
    )

    const onChangeInCheck = (event: any, selectedValue: Date | undefined) => {
        const currentDate = selectedValue || new Date();
        setIncheckDate(currentDate)
    }

    const onChangeOutCheck = (event: any, selectedValue: Date | undefined) => {
        const currentDate = selectedValue || new Date();
        setOutCheckDate(currentDate)
    }

    const putReservationDb = async() => {
        let inserted: boolean = false
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'UPDATE reservation2 SET incheckDate = (?), outcheckDate = (?) WHERE id=(?)', [incheckDate.toLocaleDateString(), outcheckDate.toLocaleDateString(), route.params.id])
    }

    useEffect(() => {
        putReservationDb()
    }, [incheckDate, outcheckDate])

    return(
        <SafeAreaView>
            <TextInput style={{width: '100%', backgroundColor: '#FFFFFF', borderRadius: 5, height: 30, paddingHorizontal: 10, marginVertical: 10}} placeholder="search for a room type"/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                    <Modal
                        animationType="slide"
                        transparent = {true}
                        visible = {modalVisibleInCheck}
                        >
                        <View style={modal.modal}>
                            <View style={modal.modalBox}>
                                <DateTimePicker style={{height: 200, width: 400}}
                                    value={incheckDate}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={onChangeInCheck}
                                />
                                <View style={{flexDirection: 'row'}}>
                                    <Pressable  style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={() => {
                                        setModalVisibleInCheck(false)
                                    }}>
                                        <Text style={{color:"#FFFFFF"}}>Save</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Pressable style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', borderRadius: 5, backgroundColor:'#FFFFFF', width: 100}} onPress={() => {
                        setModalVisibleInCheck(true)
                    }}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{ fontSize: 12 }}>Check-in:</Text>
                            <Text style={{ fontSize: 12 }}>{incheckDate.toLocaleDateString()}</Text>
                        </View>
                    </Pressable>
    
                    <Modal
                        animationType="slide"
                        transparent = {true}
                        visible = {modalVisibleOutCheck}
                        >
                        <View style={modal.modal}>
                            <View style={modal.modalBox}>
                                <DateTimePicker style={{height: 200, width: 400}}
                                    value={outcheckDate}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={onChangeOutCheck}
                                />
                                <View style={{flexDirection: 'row'}}>
                                    <Pressable  style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={() => {
                                        setModalVisibleOutCheck(false)
                                    }}>
                                        <Text style={{color:"#FFFFFF"}}>Save</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Pressable style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', borderRadius: 5, backgroundColor:'#FFFFFF', width: 100}} onPress={() => {
                        setModalVisibleOutCheck(true)
                    }}>
                        <AntDesign name="calendar" size={24} color="black" />
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{ fontSize: 12 }}>Check-in:</Text>
                            <Text style={{ fontSize: 12 }}>{outcheckDate.toLocaleDateString()}</Text>
                        </View>
                    </Pressable>
                </View>
            <FlatList data={roomTypes} renderItem={renderRoomType}/>
        </SafeAreaView>
    )
}