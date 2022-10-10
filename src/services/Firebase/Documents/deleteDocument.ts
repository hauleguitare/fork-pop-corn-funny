import { IComment, IReply } from "@src/@types/__Firebase__";
import { collection, deleteDoc, getDocs, query } from "firebase/firestore"
import { db } from ".."

export const deleteCommentDocument =async (rootCollection: 'comments' | 'replies' ,media_type: string, movieId: number, comment_id: string, referenceReplies?: boolean) => {
    try {
        if (referenceReplies){
            const rootCollectionRef = collection(db, 'replies');
            const q = query(collection(rootCollectionRef, media_type, movieId.toString()));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async(doc) => {
                try {
                    const dataDoc = doc.data() as IReply;
                    if (dataDoc.ref === comment_id){
                        await deleteDoc(doc.ref);
                    }
                } catch (error) {
                    throw error
                }
            })
        }else{
            const rootCollectionRef = collection(db, rootCollection);
            const q = query(collection(rootCollectionRef, media_type, movieId.toString()));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                try {
                    const dataDoc = doc.data() as IComment;
                    if (dataDoc.id === comment_id){
                        await deleteDoc(doc.ref);
                        if (rootCollection === 'comments'){
                            await deleteCommentDocument('replies',media_type, movieId, dataDoc.id, true);
                        }
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