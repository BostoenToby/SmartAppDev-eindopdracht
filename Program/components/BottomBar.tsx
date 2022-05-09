import { View } from "react-native"
import actionFooter from "../styling/actionFooter"
import {GenericButton} from "./GenericButton"

export default ({ nextCallback, returnCallback, nextTitle, returnTitle }: { nextCallback: Function, returnCallback: Function, nextTitle: string, returnTitle: string}) => {
    return (
        <View style={actionFooter.footer}>
            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 22.5}}>
                <GenericButton text={returnTitle} callback={returnCallback} />
                <GenericButton text={nextTitle} callback={nextCallback} />
            </View>
        </View>
    )
}
