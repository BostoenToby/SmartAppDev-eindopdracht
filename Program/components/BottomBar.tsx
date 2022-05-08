import { Dimensions, View } from "react-native"
import {GenericButton} from "./GenericButton"

export default ({ nextCallback, returnCallback, nextTitle, returnTitle }: { nextCallback: Function, returnCallback: Function, nextTitle: string, returnTitle: string}) => {
    return (
        <View style={{position:'absolute', bottom:0, left:0, width: Dimensions.get('window').width, height:80, backgroundColor:'#FFFFFF', paddingHorizontal:20, borderTopWidth:1, borderColor:"#D3D3D3"}}>
            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 22.5}}>
                <GenericButton text={returnTitle} callback={returnCallback} />
                <GenericButton text={nextTitle} callback={nextCallback} />
            </View>
        </View>
    )
}
