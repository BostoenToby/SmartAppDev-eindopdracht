import { Pressable, Text, View } from "react-native"
import { Entypo } from '@expo/vector-icons';
import filters from "../styling/filters";

export default({filter, filterValue, callback}: {filter: string, filterValue:string|number, callback: any}) => {
    return(
        <View style={filters.filterTagView}>
            <Text>{filter}: {filterValue}</Text>
            <Pressable onPress={callback}>
                <Entypo name="cross" size={24} color="black" /> 
            </Pressable>
        </View>  
    )
}

export const FilterTagDouble = ({filter, filterValue1, filterValue2, callback}: {filter: string, filterValue1: string|number, filterValue2: string|number, callback: any}) => {
    if(filterValue1 == "") filterValue1 = 0 
    return(
        <View style={filters.filterTagView}>
            <Text>{filter}: {filterValue1} - {filterValue2}</Text>
            <Pressable onPress={callback}>
                <Entypo name="cross" size={24} color="black" /> 
            </Pressable>
        </View>
    )
}