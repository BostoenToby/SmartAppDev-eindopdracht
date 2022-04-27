import { Modal, Platform, Pressable, Text, View } from "react-native"
import modal from "../styling/modal"
import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import generic from "../styling/generic";
import { GenericButton } from "./GenericButton";
import { Entypo, AntDesign  } from '@expo/vector-icons';


export default ({visible, date, onChange, buttonModalCallback, buttonCallback}: {visible: boolean, date: Date, onChange: Function, buttonModalCallback: Function, buttonCallback: Function}) => {
    
    return(
        <>
            <Modal
                animationType="slide"
                transparent = {true}
                visible = {visible}
                >
                <View style={modal.modal}>
                    <View style={modal.modalBox}>
                        <DateTimePicker style={modal.modalDateTime}
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={(event: any, date: Date|undefined) => onChange(event, date)}
                        />
                        <GenericButton text="Save" callback={() => buttonModalCallback()}/>
                    </View>
                </View>
            </Modal>
            <Pressable style={{flexDirection:'row', alignItems: 'center', justifyContent:'center', borderRadius: 5, backgroundColor:'#FFFFFF', width: 100}} onPress={() => buttonCallback()}>
                <AntDesign name="calendar" size={24} color="black" />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{ fontSize: 12 }}>Check-in:</Text>
                    <Text style={{ fontSize: 12 }}>{date.toLocaleDateString()}</Text>
                </View>
            </Pressable>
        </>
    )
}