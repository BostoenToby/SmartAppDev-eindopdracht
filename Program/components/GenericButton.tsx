import { Pressable, Text } from "react-native"

export const GenericButton = ({text, callback}: {text: string, callback: any}) => {
    return(
        <Pressable style={{width: 80, height: 35, borderRadius: 20, backgroundColor: "#0084ff", justifyContent: "center", alignItems: "center"}} onPress={callback}>
            <Text style={{color:"#FFFFFF"}}>{text}</Text>
        </Pressable>
    )
}