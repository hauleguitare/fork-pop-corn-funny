import { Timestamp } from "firebase/firestore";
import { IUserData } from "./userdata.interface"

export interface IComment {
    sender: Omit<IUserData, 'recently' | 'watchlist'>
    content: string,
    createAt: Timestamp,
    down_vote_count: number,
    love_vote_count: number,
    sad_vote_count: number,
    up_vote_count:number,
    comments?: IComment | null
}

export interface IResponseComment {
    comments: IComment[];
}