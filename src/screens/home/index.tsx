import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ms, s } from "react-native-size-matters";
import Icon from 'react-native-vector-icons/Fontisto'

const HomeScreen = () => {
    const [count, setCount] = useState(0);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Heme Screen</Text>
            <Text style={styles.text}>Keep doing activity...</Text>
            <View style={styles.counterView}>
                <Icon name='angle-dobule-left' size={ms(25)} disabled={count <= 9} onPress={() => setCount(prev => prev - 10)} />
                <Icon name='angle-left' size={ms(25)} disabled={count === 0} onPress={() => setCount(prev => prev - 1)} />
                <Text style={styles.count}>{count}</Text>
                <Icon name='angle-right' size={ms(25)} disabled={count >= 100} onPress={() => setCount(prev => prev + 1)} />
                <Icon name='angle-dobule-right' size={ms(25)} disabled={count >= 91} onPress={() => setCount(prev => prev + 10)} />
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: s(20)
    },
    title: {
        fontSize: ms(22),
        color: 'black'
    },
    text: {
        fontSize: ms(14),
        color: 'black'
    },
    count: {
        fontSize: ms(30),
        fontWeight: '600',
        color: 'black'
    },
    counterView: {
        flexDirection: 'row',
        width: '100%',
        padding: s(10),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    //Settings Screen
    logoutButton: {
        alignItems: 'center',
        paddingHorizontal: s(60),
        borderRadius: ms(5),
        paddingVertical: s(3),
        backgroundColor: '#f00'
    },
    logoutText: {
        fontSize: ms(18),
        color: '#fff'
    }

})
export default HomeScreen