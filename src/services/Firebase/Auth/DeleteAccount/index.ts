import { deleteUser, User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../..";

export const DeleteAccount = async(currentUser: User) =>{
    try{
        const refDoc = doc(db, 'users', currentUser.uid);
        await deleteUser(currentUser);
        await deleteDoc(refDoc);
    }catch(error){
        throw error;
    }
}