import { Pressable, SafeAreaView, Text, View } from "react-native"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { auth } from "../../utils/Firebase";
import { InputField } from "../../components/InputField";
import { GenericButton } from "../../components/GenericButton";
import generic from "../../styling/generic";

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

    const login = (): void => {
        // TODO: kijken of er al ingelogd geweest is --> secure storage
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password).then((u: UserCredential) => {
            setUser(u.user)   
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
        console.log(userCredentials.email)
        console.log(userCredentials.password)
    }, [userCredentials.email, userCredentials.password])

    return (
        <SafeAreaView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {/* <Pressable onPress={() => {navigate("OverView")}}>
                </Pressable> */}

                <Text style={generic.title}>Login</Text>
                    <View style={{backgroundColor: '#FFFFFF', padding: 20}}>
                        <InputField label="E-mail" placeholder="john.smith@gmail.com" callback={(value: string) => setUserCredentials((u) => {
                            // @ts-ignore
                            u.email = value
                            return{...u}
                        })} />
                        <InputField label="Password" placeholder="somePassword123" callback={(value: string) => setUserCredentials((u) => {
                            // @ts-ignore
                            u.password = value
                            return{...u}
                        })} />
                        <View style={{alignItems: 'center'}}><GenericButton text="Login" callback={()=>{login()}} /></View>
                    </View>
            </View>
        </SafeAreaView>
    )
}