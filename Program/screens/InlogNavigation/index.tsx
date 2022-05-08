import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import Login from "./Login";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { AuthContext } from "../../utils/AuthContext";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../utils/Firebase";
import Register from "./Register";

export default () => {
    const Stack = createStackNavigator();
    const [user, setUser] = useState<User>()
    // const [resolved, setResolved] = useState<boolean>()

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //      // console.log(user)
    //      setUser(user as User)
    //     }
    //     setResolved(true)
    //  }, (error => {
    //      console.error(error)
    //  }))
    // //  if a user is logged in

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