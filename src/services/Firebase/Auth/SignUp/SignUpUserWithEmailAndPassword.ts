import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../..";


export const SignUpUserWithEmailAndPassWord = (displayName: string, email: string, password: string) =>{
    return createUserWithEmailAndPassword(auth, email, password);
}
