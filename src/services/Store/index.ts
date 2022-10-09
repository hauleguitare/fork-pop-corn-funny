import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reviewMovieReducer from './slices/reviewMovieSlice';
import userDataReducer from './slices/userDataSlice';
import reAuthenticateReducer from "./slices/reAuthenticate";
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
    reducer: {
        reviewMovie: reviewMovieReducer,
        userData: userDataReducer,
        reAuthenticate: reAuthenticateReducer,
        comments: commentsReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;