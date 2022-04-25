import { Dimensions, Text, TextInput, TextInputChangeEventData, View } from "react-native"

export const InputField = ({label, placeholder, callback}: {label: string, placeholder:string, callback: any}) => {
    return(
        <View style={{flexDirection:"column", paddingVertical: 10}}>
            <Text style={{paddingBottom: 4}}>{label}</Text>
            <TextInput style={{height: 20, borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5}} placeholder={placeholder} onChangeText={callback}/>
        </View>
    )
}

export const InputFieldSmall = ({label, placeholder, callback}: {label: string, placeholder:string, callback: any}) => {
    return(
        <View style={{flexDirection:"column", paddingVertical: 10}}>
            <Text style={{paddingBottom: 4}}>{label}</Text>
            <TextInput style={{height: 20, width: Dimensions.get("window").width/20*8 ,borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5}} placeholder={placeholder} onChangeText={callback}/>
        </View>
    )
}