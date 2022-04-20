import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import HotelCard from "../../components/HotelCard"
import Hotel from "../../interfaces/Hotel"
import DetailPage from "./DetailPage";
import OverView from "./Overview";
import RoomTypePage from "./RoomTypePage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Map from "../Map";
import Reviews from "../Reviews";

export default () => {

    const Tab = createBottomTabNavigator();
    const testHotels: Hotel[] = [
    {
        name: 'Ibis hotel',
        city: 'Kortrijk',
        address: 'Kortrijkstraat 123',
        province: 'West Vlaanderen',
        description: 'Een veel te duur hotel in Kortrijk',
        starRating: 4,
        longitude: 2.43534,
        latitude: 5.23664,
        pricePerNightMin: 40.56,
        pricePerNightMax: 500.98,
        rating: 7.5,
    },
    {
        name: 'Parkhotel',
        city: 'Kortrijk',
        address: 'Kortrijkstraat 321',
        province: 'West Vlaanderen',
        description: 'Een veel te duur hotel in Kortrijk aan het station',
        starRating: 3,
        longitude: 3.55634,
        latitude: 7.65462,
        pricePerNightMin: 35.88,
        pricePerNightMax: 798.00,
        rating: 9.8
    }
    ]

    const renderHotel = ({ item }: { item: Hotel }) => (
        <HotelCard hotel={item}/>
    )

    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {position: 'relative', backgroundColor: '#FFFFFF'}, tabBarActiveTintColor: '#09F700',}}>
            <Tab.Screen name="Overview" component={OverView} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }}/>
            <Tab.Screen name="Map" component={Map} options={{
            tabBarLabel: 'Maps',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
            ),
        }} />
            <Tab.Screen name="Reviews" component={Reviews} options={{
            tabBarLabel: 'Reviews',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note" color={color} size={size} />
            ),
        }} />
      </Tab.Navigator>
    )
}