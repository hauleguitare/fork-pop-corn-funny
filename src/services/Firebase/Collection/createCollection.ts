import { IDataUser } from "@src/@types/__global__";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from ".."


export const createCollection = async (user_data: User) => {
    const refDoc = doc(db, 'users', user_data.uid);
    const docSnap = await getDoc(refDoc);
    if (docSnap.exists()){
        return;
    }
    const dataUser: IDataUser = {
        uid: user_data.uid,
        displayName: user_data.displayName ?? '',
        email: user_data.email as string,
        photoURL: user_data.photoURL ?? ''
      }
    setDoc(refDoc, {
        ...dataUser,
        watchlist: [],
        history: []
    }).catch(error => {
        console.log(error)
    })
}