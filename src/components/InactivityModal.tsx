import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ms, s } from "react-native-size-matters";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout, setInactivity } from "../store/slice/sessionSlice";

const InactivityModal = () => {
    const activityState = useAppSelector(state => state.session.activityState)
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        timer: 60,
        show: false,
        intervalId: 0
    })
    const { timer, intervalId } = state;

    useEffect(() => {
        if (activityState) {
            let id = setInterval(() => {
                setState(prev => ({ ...prev, timer: prev.timer - 1 }))
            }, 1000)
            setState(prev => ({ ...prev, intervalId: id }))
        }
    }, [activityState])

    if (timer <= 0) {
        dispatch(logout())
    }

    const stayLoggedIn = () => {
        setState(prev => ({ ...prev, timer: 60 }))
        clearInterval(intervalId);
        dispatch(setInactivity(false))
    }

    return (
        <Modal visible={activityState} transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Attention</Text>
                        {/* <Icon name='close' size={ms(23)} onPress={() => dispatch(setInactivity(false))} /> */}
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.warning}>{'Your were inactive for last 5 minutes.'}</Text>
                        <Text style={styles.warning}>{'You will be logged out in'}</Text>
                        <Text style={styles.timer}>{timer} sec</Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => stayLoggedIn()}>
                            <Text style={styles.buttonText}>{'Stay Logged In'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0009',
        justifyContent: 'center',
        paddingHorizontal: s(20),
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    footer: {
        padding: s(10),
        alignItems: 'center'
    },
    modalView: {
        flex: 0.25,
        padding: s(10),
        backgroundColor: '#fff',
        borderRadius: ms(10),
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    warning: {
        fontSize: ms(18),
        color: 'black',
    },
    heading: {
        fontSize: ms(22),
        color: 'black',
    },
    timer: {
        fontSize: ms(22),
        color: 'red',
    },
    buttonText: {
        fontSize: ms(16),
        color: 'blue',
    }
})
export default React.memo(InactivityModal);