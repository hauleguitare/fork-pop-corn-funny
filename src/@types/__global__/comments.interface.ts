import { IComment, IReply, IUserData } from "../__Firebase__"

export interface Sender extends Omit<IUserData, 'recently' | 'watchlist'> {}


export interface IConvertComment {
    sender: Sender,
    data: IComment,
    replies: IConvertReplies[] | null
  }
  
  export interface IConvertReplies {
    sender: Sender,
    data: IReply
  }
  