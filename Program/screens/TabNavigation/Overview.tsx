import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Modal, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import HotelCard from "../../components/HotelCard";
import Hotel from "../../interfaces/Hotel";
import generic from "../../styling/generic";
import { statement, transaction } from "../../utils/db";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import modal from "../../styling/modal";
import { GenericButton } from "../../components/GenericButton";
import { InputFieldSmall, InputFieldSmallHorizontal, InputFieldXS } from "../../components/InputField";
import { backendUrl } from "../../utils/enviroment";
import Filter from "../../components/Filter";
import FilterTag from "../../components/FilterTag";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import {getItemAsync, deleteItemAsync, setItemAsync, WHEN_UNLOCKED_THIS_DEVICE_ONLY} from 'expo-secure-store'


export async function getData(url=''): Promise<any>{
    // header meegeven voor JWT
    const response = await fetch(url)
    return await response.json()
}

export default function OverView({mail}: {mail: string}){
    const [hotels, setHotels] = useState<Hotel[]>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [region, setRegion] = useState<string>("")
    const [starRating, setStarRating] = useState<number>(0)
    const [pricePerNightMin, setPricePerNightMin] = useState<number>(0)
    const [pricePerNightMax, setPricePerNightMax] = useState<number>(10000)
    const [namePiece, setNamePiece] = useState<string>("");
    const {navigate, goBack} = useNavigation<StackNavigationProp<ParamListBase>>();

    const readReservationsDb = async() => {
        const tx: SQLTransaction = await transaction()
        const res: SQLResultSet = await statement(tx, 'SELECT * FROM reservation2')
    }

    const getHotels = async() => {
        const hotels = await getData(`${backendUrl}/hotels/`)
        setHotels(hotels);
    }

    const getHotelsFilterRegionNamepiece = async() => {
        const hotels = await getData(`${backendUrl}/hotels/Region/Filter/Namepiece/Region=${region}&PricePerNightMin=${String(pricePerNightMin).replace(",", ".")}&PricePerNightMax=${String(pricePerNightMax).replace(",", ".")}&StarRating=${String(starRating).replace(",", ".")}&Namepiece=${namePiece}`)
        setHotels(hotels);
    }

    const getHotelsFilterNamePiece = async() => {
        const hotels = await getData(`${backendUrl}/hotels/Filter/Namepiece/PricePerNightMin=${String(pricePerNightMin).replace(",", ".")}&PricePerNightMax=${String(pricePerNightMax).replace(",", ".")}&StarRating=${String(starRating).replace(",", ".")}&Namepiece=${namePiece}`)
        setHotels(hotels);
    }

    const getHotelsFilter = async() => {
        const hotels = await getData(`${backendUrl}/hotels/Filter/StarRating=${String(starRating).replace(",",'.')}&PricePerNightMin=${String(pricePerNightMin).replace(",",'.')}&PricePerNightMax=${String(pricePerNightMax).replace(",",'.')}`)
        setHotels(hotels);
    }

    const getHotelsFilterRegion = async() => {
        const hotels = await getData(`${backendUrl}/hotels/Region/Filter/Region=${region}&PricePerNightMin=${String(pricePerNightMin).replace(",",'.')}&PricePerNightMax=${String(pricePerNightMax).replace(",",'.')}&StarRating=${String(starRating).replace(",",'.')}`)
        setHotels(hotels);
    }

    const cancelFilters = async() => {
        setModalVisible(false)
    }

    let filters: string[] = ["Region", "Stars", "Min price", "Max price", "Name"]

    const applyFilters = async() => {
        if(region != ""){
            if(namePiece != "")
                await getHotelsFilterRegionNamepiece();
            else
                await getHotelsFilterRegion();
        } else {
            if(namePiece != "")
                await getHotelsFilterNamePiece()
            else
                await getHotelsFilter();
        }
        setModalVisible(false)
    }

    const getSecure = async() => {
        const token = await getItemAsync("mail")
        console.log(token)
    }

    useEffect(() => {
        getSecure()
        getHotels()
    }, [])

    const renderHotel = ({ item }: { item: Hotel }) => (
        <HotelCard key={item.id} hotel={item}/>
    )
    return(
        <SafeAreaView>
            <View style={[generic.row, {alignItems: 'center'}]}>
                <TextInput style={generic.textInput} placeholder="search for a hotel" onChangeText={(value: string) => setNamePiece(value)}/>
                <Pressable onPress={() => applyFilters()}>
                    <FontAwesome style={{position:'absolute', top:-11, right:10}} name="search" size={20} color="black" />
                </Pressable>
                <Filter visible={modalVisible} 
                title="Hotel filters"
                callbackInput1={(value: string) => {setRegion(value)}}
                label1="Region:"
                placeholder1="Kortrijk/West-Vlaanderen"
                callbackInput2={(value: number) => {setStarRating(value)}}
                label2="Stars"
                placeholder2="5"
                callbackInput3={(value: number) => {setPricePerNightMin(value)}}
                label3="Minimum price (€):"
                placeholder3="0" 
                callbackInput4={(value: number) => {setPricePerNightMax(value)}}
                label4="Maximum price (€):"
                placeholder4="10000"
                callbackCancel={() => cancelFilters()}
                callbackSave ={() => applyFilters()}
                callbackPressButton={() => setModalVisible(true)}
                />
            </View>
            <View>
                {filters.map((val, index) => {
                    let filterValue: number|string = ""
                    let callback: any
                    switch(val){
                        case "Region":
                            if(region != "")
                                filterValue = region
                                callback=async() => {
                                    await setRegion(""); 
                                    applyFilters()}
                                break;
                                
                        
                        case "Stars":
                            if(starRating != 0)
                                filterValue = starRating
                                callback=async() => {await setStarRating(0); applyFilters()}
                                break;

                        case "Min price":
                            if(pricePerNightMin >= 0)
                                filterValue = pricePerNightMin
                                callback=async() => {await setPricePerNightMin(0); applyFilters()}
                                break;

                        case "Max price":
                            if(pricePerNightMax < 10000)
                                filterValue = pricePerNightMax
                                callback=async() => {await setPricePerNightMax(0); applyFilters()}
                                break;

                        case "Name":
                            if(namePiece != "")
                                filterValue = namePiece
                                callback=async() => {await setNamePiece(""); applyFilters()}
                                break;

                        default:
                            break;
                                
                    }
                    if(filterValue != "" && filterValue != 0) 
                        return(<FilterTag filter={val} filterValue={filterValue} callback={callback}/>)
                    else
                        return(<></>)
                })}
            </View>
            <FlatList style={{marginBottom:54}} data={hotels} 
            renderItem={renderHotel}/>
            <Pressable onPress={()=>{navigate("Inloggen")}}>
                <Text>Go back</Text>
            </Pressable>
        </SafeAreaView>
    )
}