import { Dimensions, Modal, Pressable, Text, View } from "react-native"
import generic from "../styling/generic"
import { GenericButton } from "./GenericButton"
import { InputFieldSmallHorizontal, InputFieldXS } from "./InputField"
import { Entypo, FontAwesome } from '@expo/vector-icons';
import modal from "../styling/modal";
import { useEffect } from "react";

export default ({visible, title, callbackInput1, label1, placeholder1, callbackInput2, label2, placeholder2, callbackInput3, label3, placeholder3, callbackInput4, label4, placeholder4, callbackCancel, callbackSave, callbackPressButton}: {visible: boolean, title: string, callbackInput1: Function, callbackInput2: Function, callbackInput3: Function, callbackInput4:Function, callbackCancel: Function, callbackSave: Function, callbackPressButton: Function, label1: string, label2: string, label3: string, label4: string, placeholder1: string, placeholder2: string, placeholder3: string, placeholder4: string}) => {
    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                >
                <View style={modal.modal}>
                    <View style={modal.modalBox}>
                        <Text style={modal.modalTitle}>{title}</Text>
                        <View style={{justifyContent:'flex-start'}}>
                                <InputFieldSmallHorizontal label={label1} placeholder={placeholder1} callback={callbackInput1}/>
                                <InputFieldXS label={label2} placeholder={placeholder2} callback={callbackInput2} />
                                <InputFieldXS label={label3} placeholder={placeholder3} callback={callbackInput3}/>
                                <InputFieldXS label={label4} placeholder={placeholder4} callback={callbackInput4} />
                            
                        </View>
                        <View style={[generic.row, {justifyContent:'space-between'}]}>
                            <GenericButton text="Cancel" callback={callbackCancel}/>
                            <GenericButton text="Save" callback={callbackSave}/>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => callbackPressButton()}>
                <Entypo style={{marginLeft: 15, paddingHorizontal: 3, paddingVertical: 2, borderRadius:5, overflow:'hidden', backgroundColor: "#FFFFFF"}} name="menu" size={24} color="gray" />
            </Pressable>
        </>
    )
}