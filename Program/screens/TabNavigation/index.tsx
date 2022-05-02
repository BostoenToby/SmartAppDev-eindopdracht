import { BottomTabHeaderProps, BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import HotelCard from "../../components/HotelCard"
import Hotel from "../../interfaces/Hotel"
import DetailPage from "./DetailPage";
import OverView from "./Overview";
import RoomTypePage from "./RoomTypePage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import Map from "../Map";
import Reviews from "../Reviews";
import { ComponentProps } from 'react';
import NavigationHeader from "../../components/NavigationHeader";

export default () => {
    const Tab = createBottomTabNavigator();

    const screenOptions = ({route}: {route: any}): BottomTabNavigationOptions => ({
        tabBarIcon: ({focused, color, size}: {focused: boolean, color: string, size: number}) => {
            let icon: ComponentProps<typeof MaterialCommunityIcons>['name'] = 'help'
            if(route.name === 'Overview') return <MaterialCommunityIcons name="home" color={color} size={size} />
            if(route.name === 'Map') return <MaterialCommunityIcons name="map" color={color} size={size} />
            if(route.name === 'Reviews') return <MaterialCommunityIcons name="note" color={color} size={size} />
        },
        header: (props: BottomTabHeaderProps) => {
            const title: string = props.route.name
            return <NavigationHeader title={title} />
        },
        tabBarStyle: {
            position: 'relative',
            backgroundColor: '#FFFFFF'
        },
        tabBarActiveTintColor: '#0084FF'
    })

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Overview" component={OverView} 
            // options={{
            // tabBarLabel: 'Home',
            // tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="home" color={color} size={size} />
            // )}}
            />
            <Tab.Screen name="Map" component={Map} 
            // options={{
            // tabBarLabel: 'Maps',
            // tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="map" color={color} size={size} />
            // )}} 
            />
            <Tab.Screen name="Reviews" component={Reviews} 
            // options={{
            // tabBarLabel: 'Reviews',
            // tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="note" color={color} size={size} />
            // )}} 
            />
      </Tab.Navigator>
    )
}