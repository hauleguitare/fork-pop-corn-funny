import { IUserData } from "@src/@types/__global__";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";

export const updateFieldDocument = async(uid: string, path: string, keyDoc: keyof IUserData, value: any) =>{
    const refDoc = doc(db, 'users', uid);
    const snapshot = await getDoc(refDoc);
    if (!snapshot.exists()){
        return;
    }
    return updateDoc(refDoc, {
        [keyDoc]: value
    });
}
export const updateFieldUserDocumentWithObject = async (uid: string, path: string, data: any) => {
    const refDoc = doc(db, 'users', uid);
    const snapshot = await getDoc(refDoc);
    if (!snapshot.exists()){
        return;
    }
    return updateDoc(refDoc, {
        ...data
    });
}