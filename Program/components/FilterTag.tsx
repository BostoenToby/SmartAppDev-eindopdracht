import { Pressable, Text, View } from "react-native"
import { Entypo, FontAwesome } from '@expo/vector-icons';
import generic from "../styling/generic";

export default({filter, filterValue, callback}: {filter: string, filterValue:string|number, callback: any}) => {
    return(
        <View style={[generic.row, {alignItems: 'center', backgroundColor:'#FFFFFF', width: 'auto', paddingHorizontal: 5, borderRadius: 5, marginHorizontal: 12}]}>
            <Text>{filter}: {filterValue}</Text>
            <Pressable onPress={callback}>
                <Entypo name="cross" size={24} color="black" /> 
            </Pressable>
        </View>  
    )
}