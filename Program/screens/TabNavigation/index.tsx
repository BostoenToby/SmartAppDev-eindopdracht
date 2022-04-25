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

    return (
        <Tab.Navigator screenOptions={{tabBarStyle: {position: 'relative', backgroundColor: '#FFFFFF'}, tabBarActiveTintColor: '#0084ff',}}>
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