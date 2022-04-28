import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { useNavigation, ParamListBase } from '@react-navigation/native';

export default () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
    )
}