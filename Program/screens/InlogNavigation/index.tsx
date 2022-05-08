import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import Login from "./Login";
import { AuthContext } from "../../utils/AuthContext";
import { User } from "firebase/auth";
import { useState } from "react";
import Register from "./Register";

export default () => {
    const Stack = createStackNavigator();
    const [user, setUser] = useState<User>()

    const screenOptions: StackNavigationOptions = {
        headerShown: false,
    }

    return(
        <AuthContext.Provider value={{user, setUser}}>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </AuthContext.Provider>
    )
}