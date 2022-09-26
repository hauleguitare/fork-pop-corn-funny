import { IDataUser } from "@src/@types/__global__";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../..";




export const SignUpUserWithEmailAndPassWord = async (displayName: string ,email: string, password: string) =>{
    // Handle create user
     new Promise((resolve, reject) =>{
        createUserWithEmailAndPassword(auth, email, password).then((val) =>{
            sendEmailVerification(val.user).catch((error: FirebaseError) =>{
                reject(error);
            });
            updateProfile(val.user, {
                displayName: displayName
            }).catch((error: FirebaseError) =>{
                reject(error);
            })
        }).catch((error: FirebaseError) =>{
            reject(error);
        })
    });
}