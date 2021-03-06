import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import TabNavigation from './screens/TabNavigation';
import DetailPage from './screens/TabNavigation/DetailPage';
import RoomTypePage from './screens/TabNavigation/RoomTypePage';
import ReservationPage from './screens/TabNavigation/ReservationPage';
import { SQLResultSet, SQLTransaction } from 'expo-sqlite';
import { statement, transaction } from './utils/db';
import { useEffect } from 'react';
import LoadingPage from './screens/TabNavigation/LoadingPage';
import InlogNavigation from './screens/InlogNavigation';

export default function App() {
  console.disableYellowBox = true;
  const generateAppTable = async(): Promise<void> => {
    const tx: SQLTransaction = await transaction();
    const response: SQLResultSet | void = await statement(
      tx, 
      'CREATE TABLE IF NOT EXISTS reservation3 (id TEXT PRIMARY KEY, hotelName text, roomTypeName text, incheckDate string, outcheckDate string, price float, firstName text, lastName text, mail text, image text)', 
    ).catch((err) => console.log(err))
  }

  const Stack = createStackNavigator();

  useEffect(() => {
    generateAppTable()
  }, [])

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
}

  return (
    <NavigationContainer>
      <SafeAreaProvider>
      <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Inloggen" component={InlogNavigation} />
            <Stack.Screen name="OverView" component={TabNavigation} />
            <Stack.Screen name="DetailPage" component={DetailPage} />
            <Stack.Screen name="RoomTypePage" component={RoomTypePage} />
            <Stack.Screen name="ReservationPage" component={ReservationPage} />
            <Stack.Screen name="LoadingPage" component={LoadingPage} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}