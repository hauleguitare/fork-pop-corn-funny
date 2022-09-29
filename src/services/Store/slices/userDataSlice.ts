import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "@src/@types/__global__";
import { useSelector } from "react-redux";
import { RootState } from "..";


interface IUserDataState {
    uid: string | null
    user: IUserData | null
    images: Images | null
    infomation: Information | null;
    recently: recently;
    watchlist: watchlist;

}
type Images = IUserData["images"];
type Information = IUserData["information"];

type recently = IUserData["recently"];
type watchlist = IUserData["watchlist"];


const initialState: IUserDataState = {
    uid: null,
    user: null,
    images: null,
    infomation: null,
    recently: [],
    watchlist: []
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<IUserData | null>) =>{
            state.user = action.payload
        },
        updateImages: (state, action: PayloadAction<Images | null>) =>{
            state.images = action.payload
        },
        updateInfomation: (state, action:PayloadAction<Information | null>) =>{
            state.infomation = action.payload;
        },
        updateUserId:(state, action:PayloadAction<string | null>) =>{
            state.uid = action.payload;
        }

    }
});

export const {updateUserData, updateImages, updateInfomation, updateUserId} = userDataSlice.actions;
export default userDataSlice.reducer;
