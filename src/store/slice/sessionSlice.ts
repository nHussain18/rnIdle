import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { storage } from '../../utils'

// Define a type for the slice state
interface SessionState {
    startTime: string,
    endTime: string,
    isLoggedIn: boolean,
    activityState: boolean
}

// Define the initial state using that type
const initialState: SessionState = {
    startTime: '',
    endTime: '',
    isLoggedIn: storage.getBoolean('isLoggedIn') || false,
    activityState: false,
}

export const sessionSlice = createSlice({
    name: 'session',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
            storage.set('session', JSON.stringify(action.payload));
            storage.set('isLoggedIn', true);
        },
        logout: (state) => {
            storage.clearAll()
            state.isLoggedIn = false
            state.startTime = '';
            state.endTime = '';
        },
        setSession: (state, action) => {
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
        },
        setInactivity: (state, action) => {
            state.activityState = action.payload
        },
    },
})

export const { login, logout, setSession, setInactivity } = sessionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const sessionState = (state: RootState) => state.session

export default sessionSlice.reducer