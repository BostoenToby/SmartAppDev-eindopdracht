import { Dimensions, Text, TextInput, View } from "react-native"

export const InputField = ({label, placeholder}: {label: string, placeholder:string}) => {
    return(
        <View style={{flexDirection:"column", paddingVertical: 10}}>
            <Text style={{paddingBottom: 4}}>{label}</Text>
            <TextInput style={{height: 20, borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5}} placeholder={placeholder}/>
        </View>
    )
}

export const InputFieldSmall = ({label, placeholder}: {label: string, placeholder:string}) => {
    return(
        <View style={{flexDirection:"column", paddingVertical: 10}}>
            <Text style={{paddingBottom: 4}}>{label}</Text>
            <TextInput style={{height: 20, width: Dimensions.get("window").width/20*8 ,borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5}} placeholder={placeholder}/>
        </View>
    )
}