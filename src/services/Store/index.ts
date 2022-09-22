import { configureStore } from "@reduxjs/toolkit";
import reviewMovieReducer from '../Slices/reviewMovieSlice';

export const store = configureStore({
    reducer: {
        reviewMovie: reviewMovieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch