import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSilce';

export default configureStore({
    reducer: {
        isPlay: videoReducer,
    },
});
