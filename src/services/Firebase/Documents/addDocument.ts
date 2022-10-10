import { ISubmitComment, ISubmitReply, IUserData } from "@src/@types/__Firebase__";
import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { ulid } from 'ulid';
import { db } from "..";


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
        isEdit: false,
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
            reactions: [],
        }
        await addDoc(repliesCollectionRef, {
            id,
            createAt,
            isEdit: false,
            ...data
        })
    } catch (error) {
        throw error
    }
}

