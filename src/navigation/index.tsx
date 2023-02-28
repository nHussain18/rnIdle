import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import Login from "../screens/login";
import { storage } from "../utils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSession } from "../store/slice/sessionSlice";

const RootNavigation = () => {

    const dispatch = useAppDispatch();

    const Stack = createNativeStackNavigator();
    const isLoggedIn = useAppSelector(state => state.session.isLoggedIn)
    const storageLoggedIn = storage.getBoolean('isLoggedIn')
    if (storageLoggedIn) {
        let session = storage.getString('session') || '{}';
        session = JSON.parse(session);
        dispatch(setSession(session))
    }
    console.log("IsLoggedIJN", isLoggedIn, storageLoggedIn);

    return (
        <NavigationContainer>
            {(isLoggedIn || storageLoggedIn)
                ? <TabNavigation />
                : <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            }
            {/* <Stack.Navigator>
                {(isLoggedIn || storageLoggedIn)
                    ? <Stack.Screen name="TabNavigation" options={{ headerShown: false }} component={TabNavigation} />
                    : <Stack.Screen name="Login" component={Login} />
                }
            </Stack.Navigator> */}
        </NavigationContainer>
    )
}

export default RootNavigation;
