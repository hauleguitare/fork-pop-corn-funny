import { IUserData } from "@src/@types/__global__";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from ".."


export const createCollection = async (user: User) => {
    console.log('userid: ', user.uid);
    const refDoc = doc(db, 'users', user.uid);
    const docSnap = await getDoc(refDoc);
    if (docSnap.exists()){
        return;
    }
    const dataUser: IUserData = {
        uid: user.uid,
        displayName: user.displayName ?? '',
        email: user.email as string,
        photoURL: user.photoURL ?? '',
        watchlist: [],
        recently: [],
        bannerURL: '',
        description: "Something about me"
      }
    setDoc(refDoc, {
        ...dataUser,
    }).catch(error => {
        console.log(error)
    })
}