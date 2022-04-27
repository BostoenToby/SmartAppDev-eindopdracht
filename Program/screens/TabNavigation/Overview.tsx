import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import HotelCard from "../../components/HotelCard";
import Hotel from "../../interfaces/Hotel";
import generic from "../../styling/generic";
import { statement, transaction } from "../../utils/db";
import { Entypo } from '@expo/vector-icons';
import modal from "../../styling/modal";
import { GenericButton } from "../../components/GenericButton";
import { InputFieldSmall, InputFieldSmallHorizontal, InputFieldXS } from "../../components/InputField";
import { backendUrl } from "../../utils/enviroments";

export async function getData(url=''): Promise<any>{
    // header meegeven voor JWT
    const response = await fetch(url)
    return await response.json()
}

export default function OverView(){
    const [hotels, setHotels] = useState<Hotel[]>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [region, setRegion] = useState<string>()
    const [starRating, setStarRating] = useState<number>(0)
    const [pricePerNightMin, setPricePerNightMin] = useState<number>(0)
    const [pricePerNightMax, setPricePerNightMax] = useState<number>(10000)

    const getHotels = async() => {
        const hotels = await getData(`${backendUrl}/hotels/`)
        setHotels(hotels);
    }

    const getHotelsFilter = async() => {
        const hotels = await getData(`${backendUrl}/hotels/Region/Filter/Region=${region}&PricePerNightMin=${pricePerNightMin}&PricePerNightMax=${pricePerNightMax}&StarRating=${starRating}`);
        setHotels(hotels);
    }

    const getReservations = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, "SELECT * FROM reservation2")
    }

    const cancelFilters = async() => {
        console.log("Cancel")
        setModalVisible(false)
    }

    const applyFilters = async() => {
        console.log("Save")
        getHotelsFilter();
        setModalVisible(false)
    }

    useEffect(() => {
        getHotels()
        getReservations()
    }, [])

    const renderHotel = ({ item }: { item: Hotel }) => (
        <HotelCard key={item.id} hotel={item}/>
    )
    return(
        <SafeAreaView>
            <View style={[generic.row, {alignItems: 'center'}]}>
                <TextInput style={generic.textInput} placeholder="search for a hotel"/>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={modal.modal}>
                        <View style={modal.modalBox}>
                            <View>
                                <View style={[generic.row, {alignItems: "center", justifyContent:"space-between", width: Dimensions.get('window').width - 90}]}>
                                    <InputFieldSmallHorizontal label="Region" placeholder="Kortrijk/West-Vlaanderen" callback={(value: string) => setRegion(value)}/>
                                    <InputFieldXS label="Stars" placeholder="5" callback={(value: number) => setStarRating(value)} />
                                </View>
                                <View style={[generic.row, {alignItems: "center", justifyContent:"space-between", width: Dimensions.get('window').width - 90}]}>
                                    <InputFieldXS label="Minimum price" placeholder="100" callback={(value: number) => setPricePerNightMin(value)}/>
                                    <InputFieldXS label="Maximum price" placeholder="1000" callback={(value: number) => setPricePerNightMax(value)} />
                                </View>
                            </View>
                            <View style={generic.row}>
                                <GenericButton text="Cancel" callback={() => cancelFilters()}/>
                                <GenericButton text="Save" callback={() => applyFilters()}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => {
                    setModalVisible(true)
                }}>
                    <Entypo style={{marginLeft: 15, paddingHorizontal: 3, paddingVertical: 2, borderRadius:5, overflow:'hidden', backgroundColor: "#FFFFFF"}} name="menu" size={24} color="gray" />
                </Pressable>
            </View>
            <FlatList style={{marginBottom:54}} data={hotels} 
            renderItem={renderHotel}/>
        </SafeAreaView>
    )
}