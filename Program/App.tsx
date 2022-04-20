import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Map from './screens/Map';
import Reviews from './screens/Reviews';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import generic from './styling/generic';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import TabNavigation from './screens/TabNavigation';
import DetailPage from './screens/TabNavigation/DetailPage';
import RoomTypePage from './screens/TabNavigation/RoomTypePage';

export default function App() {
  const Stack = createStackNavigator();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
}

  return (
    <NavigationContainer>
      <SafeAreaProvider>
      <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="OverView" component={TabNavigation} />
            <Stack.Screen name="DetailPage" component={DetailPage} />
            <Stack.Screen name="RoomTypePage" component={RoomTypePage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}