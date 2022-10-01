import { IupdateProfile } from "@src/@types/__global__";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, User } from "firebase/auth"
import { updateUserFieldInfomation } from "../Collection/updateDocument";

export const updateProfile = async (currentUser: User | null, data: IupdateProfile) =>{
    try {
        if (!currentUser){
            throw new Error("account is not access to update profile");
        }
        if (data.email !== currentUser.email){
            console.log('update email');
            await updateEmail(currentUser, data.email);
        }
        if (data.password){
            console.log('update password')
            await updatePassword(currentUser, data.password);
        }
        console.log('update field')
        await updateUserFieldInfomation(currentUser.uid, {
            email: data.email,
            description: data.description ?? '',
            displayName: data.displayName
        })
    } catch (error) {
        throw error;
    }
    
}
