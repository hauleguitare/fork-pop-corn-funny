import { IResponseComment, IUserData } from "@src/@types/__Firebase__";
import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from ".."


export const createUserDocument = async (user: User) => {
    const refDoc = doc(db, 'users', user.uid);
    const snapshot = await getDoc(refDoc);
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

    setDoc(refDoc, {
        ...dataUser,
    }).catch(error => {
        console.log(error)
    })
}

export const readCommentDocument = async (type: 'movie' | 'tv', movieId: number | string, callback:(data: IResponseComment) => void) => {
    try {
        const collectionRef = collection(db, 'comments');
        const movie_id = String(movieId);
        const q = query(collectionRef);
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((result) => {
            if (result.id === type){
                const fieldMovies = result.data();
                if (Object.keys(fieldMovies).includes(movie_id)){
                    const fieldMovie = fieldMovies[movie_id];
                    callback(fieldMovie);
                }else{
                    throw new Error("firestore/not-found-field");
                }
            }
        })
    } catch (error) {
        throw error
    }
    
}