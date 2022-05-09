import { Alert, SafeAreaView, View } from "react-native"
import LottieView from 'lottie-react-native';
import generic from "../../styling/generic";
import { GenericButton } from "../../components/GenericButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';

export default () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

    return(
        <SafeAreaView style={generic.fullScreenMiddle}>
            <View style={generic.loadingAnimation}>
                <LottieView style={{justifyContent:'center', alignItems:'center'}} autoPlay source={require('../../assets/AnimationDone.json')}/>
            </View>
            <View style={[generic.row, {justifyContent:'space-between', paddingHorizontal: 20}]}>
                <GenericButton text="Home" callback={() => navigate("Overview")}/>
                <GenericButton text="Agenda" callback={() => Alert.alert("Go to agenda")} />
            </View>
        </SafeAreaView>
    )
}