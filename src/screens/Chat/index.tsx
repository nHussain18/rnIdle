import React from "react";
import { View, Text } from "react-native";
import { styles } from "../home";

const Chat = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Chat Screen</Text>
        </View>
    );
}
export default Chat