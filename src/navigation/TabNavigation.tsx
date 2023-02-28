import React, { useState, useEffect, useRef } from "react";
import { View, PanResponder } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home";
import Search from "../screens/Search";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Settings from "../screens/Settings";
import Chat from "../screens/Chat";
import SessionModal from "../components/SessionModal";
import InactivityModal from "../components/InactivityModal";
import { useAppDispatch } from "../store/hooks";
import { setInactivity } from "../store/slice/sessionSlice";

const TabNavigation = () => {

    const [timeForInactivityInSecond] = useState(5 * 60) //5 minuts

    const timerId = useRef(0)
    const dispatch = useAppDispatch();

    useEffect(() => {
        resetInactivityTimeout()
    }, [])

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponderCapture: () => {
                console.log('touch event');
                resetInactivityTimeout()
            },
        })
    ).current

    const resetInactivityTimeout = () => {
        clearTimeout(timerId.current)
        timerId.current = setTimeout(() => {
            // action after user has been detected idle
            console.log("user inactive");
            dispatch(setInactivity(true))
            // Alert.alert('Attention', 'you were inactive for last 5 minuts')
        }, timeForInactivityInSecond * 1000)
    }

    const iconNames = {
        'Home1': 'home',
        'Home0': 'home-outline',
        'Search1': 'search',
        'Search0': 'search-outline',
        'Chat1': 'chatbox-ellipses',
        'Chat0': 'chatbox-ellipses-outline',
        'Setting1': 'settings',
        'Setting0': 'settings-outline',
    }
    const Tab = createBottomTabNavigator();
    return (
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // headerShown:false
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = iconNames[route.name + (focused ? '1' : '0')]
                        // console.log("ROUTE", focused, color, size, route);
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#ff0099',
                    tabBarInactiveTintColor: '#888',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name="Setting" component={Settings} />
            </Tab.Navigator>
            <SessionModal />
            <InactivityModal />
        </View>
    )
}
export default TabNavigation;