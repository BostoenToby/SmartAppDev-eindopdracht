import { Dimensions, Image, Text, View } from "react-native";
import Review from "../interfaces/Review";
import reviewStyles from "../styling/reviewStyles";

export default ({ review }: { review: Review }) => {
    return(
        <View style={reviewStyles.reviewCard}>
            <View style={reviewStyles.reviewBox}>
                <Image style={reviewStyles.reviewImage} source={{uri: review.image}} />
                <View style={{flexDirection: "column",justifyContent: 'center'}}>
                    <Text style={{fontWeight: "600"}}>{review.author}</Text>
                    <Text>{review.starRating}⭐</Text>
                </View>
            </View>
            <Text style={{paddingBottom: 12, paddingHorizontal: 12}}>{review.reviewDescription}</Text>
        </View>
    )
}