import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../..';


const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
export const SignInWithGoogle = () =>{
    return signInWithPopup(auth, providerGoogle)
}

export const SignInWithFacebook = () =>{
    return signInWithPopup(auth, providerFacebook);
}