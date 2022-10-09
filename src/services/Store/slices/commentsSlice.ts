import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "@src/@types/__Firebase__";
import { IConvertComment } from "@src/@types/__global__/comments.interface";


interface ICommentState {
    data : IConvertComment[] | null
}


const initialState: ICommentState = {
    data: null
}

export const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        mountInitialComments: (state, action: PayloadAction<IConvertComment[]>) =>{
            state.data = action.payload
        },
        unmountComments: (state) =>{
            state.data = null
        },

        addComment:(state, action:PayloadAction<IConvertComment>) =>{
            
            if (state.data){
                // Check if comment nested array has equal id will be not add to array because onsnapshot will be called for the first time
                state.data.filter((val) => val.data.id !== action.payload.data.id);
            }else{
                //Because it's array is null, it's definitely impossible to duplicate comments
                state.data = [action.payload];
            }
        },
        updateComment:(state, action: PayloadAction<IComment>) =>{
            if (state.data){
                const comment = state.data.find(comment => comment.data.id === action.payload.id);
                if (comment){
                    comment.data = action.payload
                }
            }
        }

    }
})

export const {mountInitialComments, unmountComments,addComment , updateComment} = CommentsSlice.actions;
export default CommentsSlice.reducer