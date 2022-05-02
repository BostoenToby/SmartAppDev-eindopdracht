import { Dimensions, Image, Text, View } from "react-native";
import Review from "../interfaces/Review";

export default ({ review }: { review: Review }) => {
    return(
        <View style={{marginVertical: 10, backgroundColor: '#FFFFFF', width: Dimensions.get('window').width /10*9, marginHorizontal: Dimensions.get('window').width/20, borderRadius: 5}}>
            <View style={{flexDirection: "row", alignItems:'center', paddingTop: 12, paddingLeft: 12, paddingBottom: 12}}>
                <Image style={{height: 40, width: 40, borderRadius: 100, marginRight:20}} source={{uri: review.image}} />
                <View style={{flexDirection: "column",justifyContent: 'center'}}>
                    <Text style={{fontWeight: "600"}}>{review.author}</Text>
                    <Text>{review.starRating}⭐</Text>
                </View>
            </View>
            <Text style={{paddingBottom: 12, paddingHorizontal: 12}}>{review.reviewDescription}</Text>
        </View>
    )
}