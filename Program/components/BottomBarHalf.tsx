import { View } from "react-native"
import navFooter from "../styling/navFooter"
import {GenericButton} from "./GenericButton"

export default ({returnCallback, returnTitle }: {returnCallback: Function, returnTitle: string}) => {
    return (
        <View style={navFooter.footer}>
            <View style={{flexDirection:'row', paddingTop: 22.5}}>
                <GenericButton text={returnTitle} callback={returnCallback} />
            </View>
        </View>
    )
}
