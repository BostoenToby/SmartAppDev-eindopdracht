import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Map from './screens/Map';
import Reviews from './screens/Reviews';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import generic from './styling/generic';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {

  const getTabBarVisibility = (route: any) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
  
    if (routeName === 'CameraView') {
      return false;
    }
  
    return true;
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator screenOptions={{tabBarStyle: {position: 'relative', backgroundColor: '#FFFFFF'}, tabBarActiveTintColor: '#09F700',}}>
          <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
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
      </SafeAreaProvider>
    </NavigationContainer>
  );
}