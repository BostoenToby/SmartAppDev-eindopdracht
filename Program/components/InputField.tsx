import { Dimensions, Text, TextInput, TextInputChangeEventData, View } from "react-native"

export const InputField = ({label, placeholder, callback, password}: {label: string, placeholder:string, callback: any, password: boolean}) => {
    return(
        <View style={{flexDirection:"column", paddingVertical: 10}}>
            <Text style={{paddingBottom: 4}}>{label}</Text>
            <TextInput style={{height: 30, borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5, width: Dimensions.get("window").width/20*15}} placeholder={placeholder} onChangeText={callback} secureTextEntry={password}/>
        </View>
    )
}

export const InputFieldSmall = ({label, placeholder, callback}: {label: string, placeholder:string, callback: any}) => {
    return(
        <View style={{flexDirection:"column", paddingVertical: 10}}>
            <Text style={{paddingBottom: 4}}>{label}</Text>
            <TextInput style={{height: 30, width: Dimensions.get("window").width/20*8 ,borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5}} placeholder={placeholder} onChangeText={callback}/>
        </View>
    )
}

export const InputFieldSmallHorizontal = ({label, placeholder, callback}: {label: string, placeholder:string, callback: any}) => {
    return(
        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{paddingRight: 8, fontSize: 16}}>{label}</Text>
            <TextInput style={{height: 40, width: Dimensions.get("window").width/20*9 ,borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5, paddingLeft: 8}} placeholder={placeholder} onChangeText={callback}/>
        </View>
    )
}

export const InputFieldXS = ({label, placeholder, callback}: {label: string, placeholder:string, callback: any}) => {
    return(
        <View style={{flexDirection:"row", alignItems:"center", marginTop: 8}}>
            <Text style={{paddingRight: 8, fontSize: 16}}>{label}</Text>
            <TextInput style={{height: 40, width: Dimensions.get("window").width/8 ,borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 5, paddingLeft: 8}} placeholder={placeholder} onChangeText={callback}/>
        </View>
    )
}