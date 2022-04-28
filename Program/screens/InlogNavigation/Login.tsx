import { Pressable, Text, View } from "react-native"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

export default () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Pressable onPress={() => {navigate("OverView")}}>
                <Text>Login</Text>
            </Pressable>
        </View>
    )
}