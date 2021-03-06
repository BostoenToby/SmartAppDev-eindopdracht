import { deleteItemAsync, getItemAsync } from "expo-secure-store"
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"
import navHeader from "../styling/navHeader"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import modal from "../styling/modal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { GenericButton } from "./GenericButton";

export default ({title}: {title: string}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

    const logOut = async() => {
        try {
            const mail = await getItemAsync("mail")
            if(mail){
            await deleteItemAsync(String(mail));
            await deleteItemAsync("mail");
            }
        } catch (error) {
            console.log(error)
        }
        navigate("Inloggen")
    }

    return(
        <View style={navHeader.header}>
            
            <Text style={navHeader.title}>{title}</Text>

            <Pressable style={navHeader.icon} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="account" size={24} color="black"/>
            </Pressable>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                style={{alignItems: "center", justifyContent: "center"}}
            >
            <TouchableOpacity style={modal.modalRightAbove} onPressOut={() => setModalVisible(false)}>
                <View style={modal.modalBoxSmall}>
                    <GenericButton text="Sign out" callback={() => logOut()} />
                </View>
            </TouchableOpacity>
            </Modal>
        </View>
    )
}