import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment, IReply } from "@src/@types/__Firebase__";
import { IConvertComment, IConvertReplies } from "@src/@types/__global__/comments.interface";


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
                const IndexExistComment = state.data.findIndex((comment) => comment.data.id === action.payload.data.id);
                // If the index returns -1, this array does not currently exist comments and we can add them
                if (IndexExistComment === -1){
                    state.data.push(action.payload);
                }
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
        },
        // will remove comment with provided comment_id
        removeComment:(state, action: PayloadAction<string>) =>{
            if (state.data){
                const newComments = state.data.filter((comment) => comment.data.id !== action.payload);
                state.data = newComments
            }
        },
        addReply:(state, action: PayloadAction<IConvertReplies>) =>{
            if (state.data){
                state.data.forEach((comment) => {
                    if (comment.data.id === action.payload.data.ref){
                        if (comment.replies){
                            const IndexExistReply = comment.replies.findIndex((reply) => reply.data.id === action.payload.data.id);
                            if (IndexExistReply === -1){
                                comment.replies.push(action.payload);
                            }
                            //Because it's array is null, it's definitely impossible to duplicate reply
                        }else{
                            comment.replies = [action.payload]
                        }
                    }
                })
            }
        },
        updateReply:(state, action: PayloadAction<IReply>) =>{
            if (state.data){
                state.data.forEach((comment) =>{
                    if (comment.replies){
                        comment.replies.forEach((reply) => {
                            if (reply.data.id === action.payload.id){
                                reply.data = action.payload
                            }
                        })
                    }
                })
            }
        },
        removeReply:(state, action: PayloadAction<string>) =>{
            if (state.data){
                state.data.forEach((comment) => {
                    if (comment.replies){
                        const newReplies = comment.replies.filter((reply) => reply.data.id !== action.payload);
                        comment.replies = newReplies;
                    }
                })
            }
        }
    }
})

export const {mountInitialComments, unmountComments,addComment , updateComment, removeComment, addReply, updateReply, removeReply} = CommentsSlice.actions;
export default CommentsSlice.reducer