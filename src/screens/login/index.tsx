import React, { PropsWithChildren, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { s, vs, ms } from 'react-native-size-matters'
import { EMAIL, PASSWORD } from "../../../config";
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login } from "../../store/slice/sessionSlice";

type LoginProps = PropsWithChildren<{
    navigation: any
}>;

const Login = (props: LoginProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const onSubmit = () => {
        if (email && password) {
            if (email.toLowerCase() === EMAIL && PASSWORD === password) {
                let session = {
                    startTime: dayjs().format('YYYY/M/D HH:mm:ss'),
                    endTime: dayjs().add(1, 'h').format('YYYY/M/D HH:mm:ss'),
                    isLoggedIn: true
                }
                dispatch(login(session))
            }
            else Alert.alert('Invalid credentials.')
        } else Alert.alert('Please enter credentials.')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.view}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>{"Email"}</Text>
                        <TextInput autoCapitalize="none" placeholder="Enter email here" style={styles.textInput} value={email} onChangeText={(text) => setEmail(text)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>{"Password"}</Text>
                        <TextInput style={styles.textInput} placeholder="Enter password here" value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                    <Text style={[styles.title, styles.login]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 0.45,
        paddingHorizontal: s(25),
        paddingVertical: s(10),
        justifyContent: 'space-around'
    },
    container: {
        flex: 0.6,
        justifyContent: 'space-between'
    },
    inputContainer: {

    },
    title: {
        fontSize: ms(16),
        color: 'black',
        marginBottom: vs(3)
    },
    textInput: {
        height: vs(35),
        color: 'black',
        fontSize: ms(14),
        paddingHorizontal: s(8),
        borderRadius: ms(20),
        borderColor: 'gray',
        borderWidth: 0.5
    },
    button: {
        height: vs(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ms(7),
        backgroundColor: 'blue'
    },
    login: {
        fontSize: ms(18),
        color: '#fff'
    }
})
export default Login