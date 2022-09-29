import { IUserData } from "@src/@types/__global__";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from ".."


export const createUserDocument = async (user: User) => {
    const refDoc = doc(db, 'users', user.uid);
    const snapshot = await getDoc(refDoc);
    if (snapshot.exists()){
        return;
    }
    const dataUser = {
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

    setDoc(refDoc, {
        ...dataUser,
    }).catch(error => {
        console.log(error)
    })
}