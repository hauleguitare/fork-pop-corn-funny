import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAbstractMovie } from "@src/@types/__movies__";

export interface IReviewMovieState {
    value: {
        movie: IAbstractMovie,
        media_type: string
    } | null
}

export interface IActionReviewMovie {
    movie: IAbstractMovie,
    media_type: string
}


const initialState: IReviewMovieState = {
    value: null
}

export const reviewMovieSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        activeReview: (state, action: PayloadAction<IActionReviewMovie>) =>{
            state.value = action.payload
        },
        removeReview: (state) =>{
            state.value = null
        }
    }
});

export const {activeReview, removeReview} = reviewMovieSlice.actions
export default reviewMovieSlice.reducer