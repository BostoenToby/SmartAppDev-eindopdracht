import { Pressable, Text } from "react-native"
import generic from "../styling/generic"

export const GenericButton = ({text, callback}: {text: string, callback: any}) => {
    return(
        <Pressable style={generic.button} onPress={callback}>
            <Text style={{color:"#FFFFFF"}}>{text}</Text>
        </Pressable>
    )
}

export const SilentButton = ({text, callback}: {text: string, callback: any}) => {
    return(
        <Pressable style={generic.center} onPress={callback}>
            <Text style={{color: '#D3D3D3'}}>{text}</Text>
        </Pressable>
    )
}