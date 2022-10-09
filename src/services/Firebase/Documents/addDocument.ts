import { IComment, IReactions, IReply, ISubmitComment, ISubmitReply, IUserData } from "@src/@types/__Firebase__";
import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "..";
import {ulid} from 'ulid';


export const createUserDocument = async (user: User) => {
    const docRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()){
        return;
    }
    const dataUser: IUserData = {
        uid: user.uid,
        images: {
            photoURL: user.photoURL ?? '',
            bannerURL: ''
        },
        information: {
            email: user.email as string,
            description: "Say something about me",
            displayName: user.displayName ?? ""
        },
        watchlist: [],
        recently: []
    }

    setDoc(docRef, {
        ...dataUser,
    }).catch(error => {
        console.log(error)
    })
}

export const createCommentDocument = async (media_type: string, movie_id: number,uid: string , data_submit: string) => {
    try {
        const rootCollectionRef = collection(db, 'comments');
    const commentsCollectionRef = collection(rootCollectionRef, media_type, movie_id.toString());
    const id = ulid(new Date().getTime());
    const createAt = Timestamp.now();
    const data : ISubmitComment = {
        content: data_submit,
        uid: uid,
        like_count: 0,
        dislike_count: 0,
        sad_count: 0,
        love_count: 0,
        reactions: [],
    }
    await addDoc(commentsCollectionRef, {
        id,
        createAt,
        ...data
    })
    } catch (error) {
        throw error
    }
}

export const createReplyDocument = async (media_type: string, movie_id: number,uid: string , ref: string, data_submit: string) =>{
    try {
        const rootColletionRef = collection(db, 'replies');
        const repliesCollectionRef = collection(rootColletionRef, media_type, movie_id.toString());
        const id = ulid(new Date().getDate());
        const createAt = Timestamp.now();
        const data: ISubmitReply = {
            uid: uid,
            ref: ref,
            content: data_submit,
            like_count: 0,
            dislike_count: 0,
            sad_count: 0,
            love_count: 0,
            reactions: []
        }
        await addDoc(repliesCollectionRef, {
            id,
            createAt,
            ...data
        })
    } catch (error) {
        throw error
    }
}

const MiddleWareReaction = (data: IReactions ,ReactionType: string, sender_uid: string) => {
    switch(ReactionType){
        case 'like': {
            const temp = data.reactions;
            temp.push({
                type: 'like',
                uid: sender_uid
            });
            return {
                like_count: data.like_count + 1,
                reactions: temp
            }
        }
        case 'dislike': {
            const temp = data.reactions;
            temp.push({
                type: 'dislike',
                uid: sender_uid
            });
            return {
                dislike: data.dislike_count + 1,
                reactions: temp
            }
        }
        case 'love':{
            const temp = data.reactions;
            temp.push({
                type: 'love',
                uid: sender_uid
            });
            return {
                love_count: data.love_count + 1,
                reactions: temp
            }
        }
           
        case 'sad':{
            const temp = data.reactions;
            temp.push({
                type: 'sad',
                uid: sender_uid
            });
            return {
                sad_count: data.sad_count + 1,
                reactions: temp
            }
        }
        default:
            return;
    }
}

export const createReactionDocument = async (media_type: string, movie_id: number, uid: string, ReactionType: string,reactionTo: string , referenceReplies?: boolean) => {
    try {
        // if as have ref, will map through replies to add reaction to in sub-collection of comment that
        if (referenceReplies){
            const rootCollectionRef = collection(db, 'replies');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async (doc) => {
                try {
                    const dataDoc = doc.data() as IReply;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType, uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }else{
            const rootCollectionRef = collection(db, 'comments');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async(doc) => {
                try {
                    const dataDoc = doc.data() as IComment;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType, uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }
    } catch (error) {
        throw error
    }
}