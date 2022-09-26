import { auth } from "../..";

export const SignOut = () =>{
    auth.signOut();
    localStorage.removeItem('access_token');
}