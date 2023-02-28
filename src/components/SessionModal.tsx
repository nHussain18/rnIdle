import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ms, s } from "react-native-size-matters";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Icon from 'react-native-vector-icons/Ionicons'
import dayjs from 'dayjs';
import { storage } from "../utils";
import { logout, setSession } from "../store/slice/sessionSlice";

const SessionModal = () => {
    const { startTime, endTime } = useAppSelector(state => state.session)
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        timer: dayjs(endTime).diff(dayjs(), 'second'),
        show: false,
        intervalId: 0
    })
    const { timer, show, intervalId } = state;
    console.log("timer", timer, startTime, endTime);
    console.log("DayJS", dayjs(endTime).diff(dayjs(), 'second'));

    useEffect(() => {
        setTimeout(() => {
            setState(prev => ({ ...prev, show: true, timer: dayjs(endTime).diff(dayjs(), 'second') }))
        }, (dayjs(endTime).diff(dayjs(), 'second') - 60) * 1000)
    }, [endTime])

    useEffect(() => {
        if (show) {
            let id = setInterval(() => {
                setState(prev => ({ ...prev, timer: prev.timer - 1 }))

            }, 1000)
            setState(prev => ({ ...prev, intervalId: id }))
        }
    }, [show])

    if (timer <= 0) {
        dispatch(logout())
    }

    const addTimer = () => {
        setState(prev => ({ ...prev, show: false, timer: prev?.timer + 3600 }))
        clearInterval(intervalId);
        let session = {
            startTime,
            endTime: dayjs(endTime).add(1, 'hour').format('YYYY/M/D HH:mm:ss')
        }
        dispatch(setSession(session))
        storage.set('session', JSON.stringify(session))
        console.log("session", session);
    }

    return (
        <Modal visible={show} transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Attention</Text>
                        <Icon name='close' size={ms(23)} onPress={() => setState(prev => ({ ...prev, show: false }))} />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.warning}>{'Your session is expiring soon.'}</Text>
                        <Text style={styles.timer}>{timer} sec</Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => addTimer()}>
                            <Text style={styles.buttonText}>{'Extend Session'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setState(prev => ({ ...prev, show: false }))}>
                            <Text style={styles.cancelText}>{'Cancel'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
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
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    modalView: {
        flex: 0.2,
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
    },
    cancelText: {
        fontSize: ms(16),
        color: 'red',
    },
})
export default React.memo(SessionModal);