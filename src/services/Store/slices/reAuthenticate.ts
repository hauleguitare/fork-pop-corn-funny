import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

interface IReAuthenticateState {
    ReAuthenticateUser: UserCredential | null,
    promtAuthenticateUser: boolean;
    isShowDialog: boolean;
}

const initialState : IReAuthenticateState ={
    ReAuthenticateUser : null,
    promtAuthenticateUser: true,
    isShowDialog: false
}


export const reAuthenticateSlice = createSlice({
    name: 'reAuthenticate',
    initialState,
    reducers:{
        updateAuthenticateUser: (state, action: PayloadAction<UserCredential | null>) =>{
            if (action.payload){
                state.ReAuthenticateUser = action.payload;
                state.promtAuthenticateUser = false;
            }else{
                state.ReAuthenticateUser = null;
                state.promtAuthenticateUser = true;
            }
        },
        requireAuthenticateUser: (state) =>{
            // Action will dispatch asking user to re-authentication password and check. If user have verified, then ignore
            if (state.promtAuthenticateUser === true){
                state.isShowDialog = true;
            }else{
                state.isShowDialog = false;
            }
        },
        setStatusShowDialog: (state, action: PayloadAction<boolean>) => {
            state.isShowDialog = action.payload;
        }
    }
});

export const {updateAuthenticateUser, requireAuthenticateUser, setStatusShowDialog} = reAuthenticateSlice.actions;
export default reAuthenticateSlice.reducer;