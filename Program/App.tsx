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
import StackNavigation from './screens/TabNavigation';
import ReservationPage from './screens/TabNavigation/ReservationPage';
import { SQLResultSet, SQLTransaction } from 'expo-sqlite';
import { statement, transaction } from './utils/db';

export default function App() {

  const generateAppTable = async(): Promise<void> => {
    const tx: SQLTransaction = await transaction();
    const response: SQLResultSet | void = await statement(
      tx, 
      'CREATE TABLE IF NOT EXISTS reservation (id integer primary key autoincrement, hotelName text, roomTypeName text, incheckDate datetime, outcheckDate datetime, price float, firstName text, lastName text, mail text)', 
    ).catch((err) => console.log(err))
  }

  const Stack = createStackNavigator();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
}

  return (
    <NavigationContainer>
      <SafeAreaProvider>
      <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="OverView" component={StackNavigation} />
            <Stack.Screen name="DetailPage" component={DetailPage} />
            <Stack.Screen name="RoomTypePage" component={RoomTypePage} />
            <Stack.Screen name="ReservationPage" component={ReservationPage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}