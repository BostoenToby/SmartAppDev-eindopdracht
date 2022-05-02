import { Text, View } from "react-native";
import { getData } from "../utils/APIMethods";
import { backendUrl } from "../utils/enviroment";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { TabNavigatorProps } from 'react-native-tab-navigator';
import { createContext } from "react";

export default function Reviews ({mail}: {mail: string}) {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    const getReservationsByMail = () => {
        getData(`${backendUrl}/reservations/Mail=`)
    }
    return (
        <View>
            <Text>Reviews {mail}</Text>
        </View>
    )
}