import { configureStore } from "@reduxjs/toolkit";
import reviewMovieReducer from './slices/reviewMovieSlice';
import userDataReducer from './slices/userDataSlice';

export const store = configureStore({
    reducer: {
        reviewMovie: reviewMovieReducer,
        userData: userDataReducer
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
