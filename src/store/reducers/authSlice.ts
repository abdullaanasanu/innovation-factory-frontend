
import Config from '@/utils/config';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    userData: any;
    token: any;
    isLoaded: boolean
}

const initialState: AuthState = {
    userData: {},
    token: null,
    isLoaded: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<any>) {
            state.userData = action.payload.userData
            state.token = action.payload.token
        },

        // incrementByAmount(state, action: PayloadAction<number>) {
        //   state.count += action.payload;
        // },
    },
});




export const { setUsers } = authSlice.actions;
export default authSlice.reducer;
