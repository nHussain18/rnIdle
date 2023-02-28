import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slice/sessionSlice";
import { styles } from "../home";
import Icon from 'react-native-vector-icons/Ionicons'
const Settings = () => {

    const dispatch = useAppDispatch();

    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Text style={styles.title}>Settings Screen</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(logout())}>
                <Icon name='log-out-outline' size={25} color='#fff' />
                <Text style={styles.logoutText}>logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Settings