import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "@src/@types/__Firebase__";
import { useSelector } from "react-redux";
import { RootState } from "..";


interface IUserDataState {
    user: IUserData | null
}


const initialState: IUserDataState = {
    user: null,
}


const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<IUserData | null>) =>{
            state.user = action.payload
        },
    }
});

export const {updateUserData} = userDataSlice.actions;
export default userDataSlice.reducer;
