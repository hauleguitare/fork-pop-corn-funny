import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../.."

export const SignInUserWithEmailAndPassWord = (email: string, password: string) =>{
    return signInWithEmailAndPassword(auth, email, password);
}