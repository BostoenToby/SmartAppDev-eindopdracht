import { useEffect, useState } from "react"
import { Pressable, SafeAreaView, Text, View } from "react-native"
import { GenericButton, SilentButton } from "../../components/GenericButton"
import { InputField } from "../../components/InputField"
import generic from "../../styling/generic"
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import { useAuth } from "../../utils/AuthContext"
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth"
import { auth } from "../../utils/Firebase"
import { Entypo } from '@expo/vector-icons'; 

export default () => {
    const [newUser, setNewUser] = useState({
        email: '', 
        password: '',
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
    const { setUser } = useAuth()
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
    
    const discardErrorMessage = () => {
        setErrors((currentErrors: any) => {
            currentErrors.generic = {title: '', message:''}
            return { ...currentErrors }
        })
    }

    const registerUser = async() => {
        await checkMail()
        if (newUser.email && newUser.password){
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((user: UserCredential) => {
                setUser(user.user)
                navigate('Login')
            }).catch((err) => {
                setErrors((currentErrors: any) => {
                    currentErrors.generic = {
                        title: err.code,
                        message: err.message
                    }
                    return { ...currentErrors }
                })
                console.log(err)
            })
        }
    }

    const checkMail = async() => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(newUser.email)){
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
    }

    useEffect(() => {
        setErrors((currentErrors: any) => {
            currentErrors.fields.email.hasError = false,
            currentErrors.fields.email.inlineErrorMessage = ""
            return { ... currentErrors }
        }) 
    }, [])

    return (
        <SafeAreaView style={[generic.fullScreen, {justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={generic.title}>Register</Text>
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
                <InputField label="E-mail" placeholder="john.smith@gmail.com" password={false} callback={(value: string) => setNewUser((u) => {
                        u.email = value
                        return{...u}
                })} />
                {errors.fields.email.inlineErrorMessage ? (
                    <Text style={{color: 'red', fontSize: 12}}>{errors.fields.email.inlineErrorMessage}</Text>
                ): null}
                <InputField label="Password" placeholder="somePassword123" password={true} callback={(value: string) => setNewUser((u) => {
                    u.password = value
                    return{...u}
                })} />
                {errors.fields.password.inlineErrorMessage ? (
                    <Text style={{color: 'red', fontSize: 12}}>{errors.fields.password.inlineErrorMessage}</Text>
                ): null}
                <View style={{alignItems: 'center'}}><GenericButton text="Login" callback={()=>{registerUser()}} /></View>
                <View style={{alignItems: 'center', paddingTop: 8, flexDirection:'row', justifyContent: 'center'}}>
                    <Text style={{paddingRight: 4}}>Already have an account?</Text>
                    <SilentButton text="Log in" callback={() => navigate("Login")} />
                </View>
            </View>
        </SafeAreaView>
    )
}