import { useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import { GenericButton, SilentButton } from "../../components/GenericButton"
import { InputField } from "../../components/InputField"
import generic from "../../styling/generic"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import { useAuth } from "../../utils/AuthContext"
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth"
import { auth } from "../../utils/Firebase"

export default () => {
    const [newUser, setNewUser] = useState({
        email: '', 
        password: '',
    })
    const { setUser } = useAuth()
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    const registerUser = (): void => {
        if (newUser.email && newUser.password){
            console.log('Register')
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((user: UserCredential) => {
                setUser(user.user)
                navigate('Login')
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <SafeAreaView style={[generic.fullScreen, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={generic.title}>Register</Text>
            <View style={{backgroundColor: '#FFFFFF', padding: 20}}>
            <InputField label="E-mail" placeholder="john.smith@gmail.com" callback={(value: string) => setNewUser((u) => {
                    // @ts-ignore
                    u.email = value
                    return{...u}
                })} />
                <InputField label="Password" placeholder="somePassword123" callback={(value: string) => setNewUser((u) => {
                    // @ts-ignore
                    u.password = value
                    return{...u}
                })} />
                <View style={{alignItems: 'center'}}><GenericButton text="Login" callback={()=>{registerUser()}} /></View>
            </View>
        </SafeAreaView>
    )
}