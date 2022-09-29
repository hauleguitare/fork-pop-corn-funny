import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../..';
import { createUserDocument } from '../../Collection/createCollection';


const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
export const SignInWithProvider = async (type: 'google' | 'facebook') =>{
    let provider: GoogleAuthProvider | FacebookAuthProvider;
    switch(type){
        case 'google':
            provider = new GoogleAuthProvider();
            break;
        case 'facebook':
            provider = new FacebookAuthProvider();
            break;
        default:
            throw new Error("cant not create with provider")
    }
    const credential = await signInWithPopup(auth, providerGoogle);
    let isHasStore = false;
    createUserDocument(credential.user);
}

// export const SignInWithFacebook = () =>{
//     return signInWithPopup(auth, providerFacebook);
// }