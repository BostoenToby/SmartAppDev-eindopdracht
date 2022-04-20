import { SafeAreaView, Text, TextInput } from "react-native"

export default () => {
    return(
        <SafeAreaView>
            <TextInput style={{width: '100%', backgroundColor: '#FFFFFF', borderRadius: 5, height: 30, paddingHorizontal: 10, marginVertical: 10}} placeholder="search for a room type"/>
        </SafeAreaView>
    )
}