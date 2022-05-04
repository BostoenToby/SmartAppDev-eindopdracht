import { Pressable, SafeAreaView, Text, View } from "react-native"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { auth } from "../../utils/Firebase";
import { InputField } from "../../components/InputField";
import { GenericButton, SilentButton } from "../../components/GenericButton";
import generic from "../../styling/generic";
import {getItemAsync, deleteItemAsync, setItemAsync, WHEN_UNLOCKED_THIS_DEVICE_ONLY} from 'expo-secure-store'
import { Entypo } from '@expo/vector-icons'; 

export default () => {
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    const [userCredentials, setUserCredentials] = useState({
        email: 'test@gmail.com',
        password: 'test12'
    })
    const [errors, setErrors] = useState<any>({ generic: {title: '', message:''}, fields: {
        email: {
            hasError: false,
            inlineErrorMessage: '',
            dirty: false
        },
        password: {
            hasError: false,
            inlineErrorMessage: '',
            dirty: false
        }
    }})

    const { user, setUser } = useAuth()

    const discardErrorMessage = () => {
        setErrors((currentErrors: any) => {
            currentErrors.generic = {title: '', message:''}
            return { ...currentErrors }
        })
    }

    const login = async() => {
        // TODO: kijken of er al ingelogd geweest is --> secure storage
        await setItemAsync("mail", userCredentials.email);
        // await setItemAsync(userCredentials.email, userCredentials.password);
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password).then((u: UserCredential) => {
            setUser(u.user) 
            const mail = userCredentials.email  
            navigate("OverView")     
        }).catch((err) => {
            setErrors((currentErrors: any) => {
                currentErrors.generic = {
                    title: err.code,
                    message: err.message
                }
                return { ...currentErrors }
            })
            console.dir(err)
        })
    }

    useEffect(() => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(userCredentials.email)){
            setErrors((currentErrors: any) => {
                currentErrors.fields.email.hasError = true,
                currentErrors.fields.email.inlineErrorMessage = "Not a valid email"
                return { ... currentErrors }
            })
        }
        else {
            setErrors((currentErrors: any) => {
                currentErrors.fields.email.hasError = false,
                currentErrors.fields.email.inlineErrorMessage = ""
                return { ... currentErrors }
            }) 
        }
    }, [userCredentials.email])

    useEffect(() => {
        deleteItemAsync("mail")
    }, [])

    return (
        <SafeAreaView style={[generic.fullScreen, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={generic.title}>Login</Text>
            <View style={{backgroundColor: '#FFFFFF', padding: 20}}>
                {(errors.generic.title && errors.generic.message) ? (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderRadius: 5, backgroundColor: '#FFFFFF', borderColor: 'red', maxWidth: 300}}>
                        <View>
                            <Text style={{fontWeight: '600', color: 'red'}}>{errors.generic.title}</Text>
                            <Text style={{color: 'red'}}>{errors.generic.message}</Text>
                        </View>
                        <Pressable onPress={discardErrorMessage}>
                            <Entypo name="cross" size={24} color="red" />
                        </Pressable>
                    </View>
                ) : null}                
                <InputField label="E-mail" placeholder="john.smith@gmail.com" password={false} callback={(value: string) => setUserCredentials((u) => {
                    // @ts-ignore
                    u.email = value
                    return{...u}
                })} />
                {errors.fields.email.inlineErrorMessage ? (
                    <Text style={{color: 'red', fontSize: 12}}>{errors.fields.email.inlineErrorMessage}</Text>
                ): null}
                <InputField label="Password" placeholder="somePassword123" password={true} callback={(value: string) => setUserCredentials((u) => {
                    // @ts-ignore
                    u.password = value
                    return{...u}
                })} />
                {errors.fields.password.inlineErrorMessage ? (
                    <Text style={{color: 'red', fontSize: 12}}>{errors.fields.password.inlineErrorMessage}</Text>
                ): null}
                <View style={{alignItems: 'center'}}><GenericButton text="Login" callback={()=>{login()}} /></View>
                <View style={{alignItems: 'center', paddingTop: 8}}><SilentButton text="Create an account" callback={() => navigate("Register")} /></View>
            </View>
        </SafeAreaView>
    )
}