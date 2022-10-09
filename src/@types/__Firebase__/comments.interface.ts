import { Timestamp } from "firebase/firestore";

export interface IReaction{
    uid: string
    type: 'like' | 'dislike' | 'love' | 'sad'
}

export interface IReactions {
  like_count: number,
  dislike_count: number,
  love_count: number,
  sad_count: number,
  reactions: IReaction[]
}


export interface IComment extends IReactions{
  id: string,
  uid: string,
  content: string,
  createAt: Timestamp,
}


export interface IReply extends IReactions{
  id: string,
  uid: string,
  content: string,
  ref: string,
  createAt: Timestamp,
}

export interface ISubmitComment extends Omit<IComment, 'createAt' | 'id'>{}
export interface ISubmitReply extends Omit<IReply, 'createAt' | 'id'>{}

