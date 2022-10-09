import { IComment, IReply, IUserData } from "@src/@types/__Firebase__";
import { IConvertComment, IConvertReplies } from "@src/@types/__global__";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "..";


export const readUserDocument = async (uid: string) => {
    try {
        const docRef = doc(db, 'users', uid);
    const querySnapshot = await getDoc(docRef);
    if (!querySnapshot.exists()){
        throw new Error('firestore/user-not-found');
    }
    return querySnapshot.data() as IUserData;
    } catch (error) {
        throw error
    }
    
}

export const readAllRepliesDocument = async (media_type: string,movieId: number ,ref: string):Promise<IConvertReplies[] | null> => {
    try {
        const rootCollectionRef = collection(db, 'replies');
        const q = query(collection(rootCollectionRef,media_type, movieId.toString()));
        const querySnapshot = await getDocs(q);

        //Case 1 if don't have one reply
        if (querySnapshot.empty){
            return null
        }
        const arrayDoc = querySnapshot.docs;
        //Case 2 read all reply and return IConvertReplies
        const dataReplies = await Promise.all(arrayDoc.map(async (doc) => {
            try {
                const dataDoc = doc.data() as IReply;
                if (dataDoc.ref === ref){
                    const sender = await readUserDocument(dataDoc.uid);
                    return {
                        sender,
                        data: dataDoc
                    }
                }
            } catch (error) {
                throw error
            }
        }));
        //Case 3 check if this comment don't have comment will return null
        const FilterData = dataReplies.filter((val) => val !== undefined);
        if (FilterData.length <= 0){
            return null
        }else{
            return FilterData as IConvertReplies[];
        }
        
    } catch (error) {
        throw error
    }
}

export const readAllCommentsDocument =async (media_type: string, movieId: number):Promise<IConvertComment[] | null> => {
    try {
        const rootCollectionRef = collection(db, 'comments');
        const q = query(collection(rootCollectionRef,media_type, movieId.toString()));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty){
            return null
        }
        const arrayDoc = querySnapshot.docs;
        const dataComments: IConvertComment[] = await Promise.all(arrayDoc.map( async (doc) => {
            try {
                const dataDoc = doc.data() as IComment;
                const sender = await readUserDocument(dataDoc.uid);
                const dataReplies = await readAllRepliesDocument(media_type, movieId, dataDoc.id);
                return {
                    sender,
                    data: dataDoc,
                    replies: dataReplies
                }
               
            } catch (error) {
                throw error
            }
        }))
        return dataComments;
    } catch (error) {
        throw error
    }
}

export const readSingleCommentDocument =async (media_type: string, movieId: number, comment_id: string): Promise<IConvertComment | null> => {
    try {
        const rootCollectionRef = collection(db, 'comments');
        const q = query(collection(rootCollectionRef,media_type, movieId.toString()));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty){
            return null
        }
        var docRef: any;
        querySnapshot.forEach((doc) => {
            const dataDoc = doc.data() as IComment;
            if (dataDoc.id === comment_id){
                docRef = doc.ref;
            }
        })
        if (!docRef){
            throw new Error("Don't find document Ref");
        }
        const commentDoc = await getDoc(docRef);
        const dataDoc = commentDoc.data() as IComment;
        const sender = await readUserDocument(dataDoc.uid);
        const dataReplies = await readAllRepliesDocument(media_type, movieId, dataDoc.id);
        return {
            sender,
            data: dataDoc,
            replies: dataReplies
        }
    } catch (error) {
        throw error
    }
}
