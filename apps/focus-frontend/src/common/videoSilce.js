import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
    name: 'isPlay',
    initialState: {
        value: false,
    },
    reducers: {
        play: (state) => {
            state.value = true;
        },
        stop: (state) => {
            state.value = false;
        },
    },
});

export const { play, stop } = videoSlice.actions;

export default videoSlice.reducer;
