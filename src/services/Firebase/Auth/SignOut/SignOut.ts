import { auth } from "../..";

export const SignOut = async () =>{
    try {
        await auth.signOut();
        setTimeout(() =>{
            window.location.reload();
        }, 3000);
       
    } catch (error) {
        throw error
    }
}