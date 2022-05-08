import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, TextInput, View } from "react-native";
import HotelCard from "../../components/HotelCard";
import Hotel from "../../interfaces/Hotel";
import generic from "../../styling/generic";
import { FontAwesome } from '@expo/vector-icons';
import { backendUrl } from "../../utils/enviroment";
import Filter from "../../components/Filter";
import FilterTag, { FilterTagDouble } from "../../components/FilterTag";
import { getData } from "../../utils/APIMethods";

export default function OverView({route}: {route: any}){
    const [hotels, setHotels] = useState<Hotel[]>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [region, setRegion] = useState<string>("")
    const [starRating, setStarRating] = useState<number>(0)
    const [pricePerNightMin, setPricePerNightMin] = useState<number>(0)
    const [pricePerNightMax, setPricePerNightMax] = useState<number>(10000)
    const [namePiece, setNamePiece] = useState<string>("");
    const [filter, setFilter] = useState({
        region: '',
        starRating: 0,
        pricePerNightMin: 0,
        pricePerNightMax: 10000,
        namePiece: ""
    })

    let filtersList: string[] = ["Region", "NamePiece", "StarRating", "Price"]

    const getHotels = async() => {
        const hotels = await getData(`${backendUrl}/hotels/`)
        setHotels(hotels);
        await applyFilters()
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

    const saveFilters = async() => {
        setFilter((currentFilters: any) => {
            filter.region = region
            filter.namePiece = namePiece
            filter.starRating = starRating
            filter.pricePerNightMax = pricePerNightMax
            filter.pricePerNightMin = pricePerNightMin
            return { ...currentFilters }
        })
    }

    const cancelFilters = async() => {
        setRegion(filter.region)
        setNamePiece(filter.namePiece)
        setStarRating(filter.starRating)
        setPricePerNightMin(filter.pricePerNightMin)
        setPricePerNightMax(filter.pricePerNightMax)
        setModalVisible(false)
    }

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

    useEffect(() => {
        getHotels()
    }, [])

    useEffect(() => {
        if(modalVisible == false){
            applyFilters()
        }
    }, [region, namePiece, starRating, pricePerNightMin, pricePerNightMax])

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
                callbackInput4={(value: number) => {
                    if(String(value) != ""){
                        setPricePerNightMax(value)
                    } else {
                        setPricePerNightMax(10000)
                    }
                }}
                label4="Maximum price (€):"
                placeholder4="10000"
                callbackCancel={() => cancelFilters()}
                callbackSave ={() => {saveFilters(); setModalVisible(false); getHotels()}}
                callbackPressButton={() => setModalVisible(true)}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                {filtersList.map((val: string, index: number) => {
                let filterValue: number|string = ""
                let filterValue2: number|string = ""
                let callback: any
                switch(val){
                    case "Region":
                        if(region != "")
                            filterValue = region
                            callback=() => setRegion(""); 
                            break;
                            
                    
                    case "StarRating":
                        if(starRating != 0)
                            filterValue = starRating
                            callback=() => setStarRating(0)
                            break;

                    case "Price":
                        if(pricePerNightMax != 10000 || pricePerNightMin != 0)
                            filterValue = pricePerNightMin
                            filterValue2 = pricePerNightMax
                            callback=() => {setPricePerNightMin(0); setPricePerNightMax(10000)}
                            break;

                    case "NamePiece":
                        if(namePiece != "")
                            filterValue = namePiece
                            callback=() => setNamePiece("")
                            break;

                    default:
                        filterValue = ""
                            
                }
                if(filterValue != "" && filterValue != 0 && val!="Price"){
                    return(<FilterTag filter={val} filterValue={filterValue} callback={callback}/>)
                }
                else if (val=="Price" &&(filterValue!= 0 || filterValue2!= 10000)){
                    return(<FilterTagDouble filter={val} filterValue1={filterValue} filterValue2={filterValue2} callback={callback}/>)
                }
                else
                    return(<></>)
                })}
            </View>
            <FlatList style={{marginBottom:54}} data={hotels} 
            renderItem={renderHotel}/>
        </SafeAreaView>
    )
}