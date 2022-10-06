import { IUserData } from "@src/@types/__Firebase__";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";

export const updateFieldDocument = async (uid: string, keyDoc: keyof IUserData, path: string,  value: any) =>{
    const refDoc = doc(db, 'users', uid);
    const snapshot = await getDoc(refDoc);
    if (!snapshot.exists()){
        return;
    }
    const data = snapshot.data() as IUserData;
    const images = data.images;
    const updateImages = {
        ...images,
        [path]: value
    };
    console.log(updateImages);
}


export const updateUserFieldImages = async (uid: string, path: keyof IUserData['images'], value: any):Promise<void> => {
    try {
        const refDoc = doc(db, 'users', uid);
        const snapshot = await getDoc(refDoc);
        if (!snapshot.exists()){
            throw new Error("user don't have exists");
        }
        const data = snapshot.data() as IUserData;
        const snapshotImages = data.images;
        const images = {
            ...snapshotImages,
            [path]: value
        };
        await updateDoc(refDoc, {images});
    } catch (error) {
        throw error;
    }
        
}


export const updateUserFieldInfomation = async (uid: string, information: IUserData['information']) => {
    try {
        const refDoc = doc(db, 'users', uid);
        const snapshot = await getDoc(refDoc);
        if (!snapshot.exists()){
            throw new Error("user don't have exists");
        }
        await updateDoc(refDoc, {information});        
    } catch (error) {
        throw error
    }
}

/*
return new Promise(async (resolve, reject) =>{
        const refDoc = doc(db, 'users', uid);
        const snapshot = await getDoc(refDoc);
        if (!snapshot.exists()){
            reject(new Error("user don't have exists"));
            return;
        }
        const data = snapshot.data() as IUserData;
        const snapshotImages = data.images;
        const images = {
            ...snapshotImages,
            [path]: value
        };
        resolve(updateDoc(refDoc, {images}))
    })


*/