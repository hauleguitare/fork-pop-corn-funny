import { IupdateProfile } from "@src/@types/__global__";
import { FirebaseError } from "firebase/app";
import { updateEmail, updatePassword, User } from "firebase/auth"
import { updateFieldUserDocumentWithObject } from "../Collection/updateDocument";

export const updateProfile = async (currentUser: User | null, dataUpdate: IupdateProfile) =>{
    if (!currentUser){
        return;
    }
    return new Promise((resolve, reject) =>{
        if (dataUpdate.email !== currentUser.email){
            updateEmail(currentUser, dataUpdate.email).catch((error) => reject(error));
        }
        if (dataUpdate.password){
            updatePassword(currentUser, dataUpdate.password).catch((error) => reject(error));
        }
        updateFieldUserDocumentWithObject(currentUser.uid, 'users', {
            displayName: dataUpdate.displayName,
            description: dataUpdate.description,
            email: dataUpdate.email
        }).catch((error) => reject(error));
        resolve('success');
    })
    
}

/**
 
if (currentUser.providerId === 'google' || currentUser.providerId === 'facebook'){
            reject()
        }

        updatePassword(currentUser, dataUpdate.password).catch((error) => reject(`can't updatePassword: ${error}`));
 */




        // try {
    //     if (dataUpdate.email !== currentUser.email){
    //         console.log('update email')
    //         await updateEmail(currentUser, dataUpdate.email);
    //     }
    //     if (dataUpdate.password){
    //         console.log('update password')
    //         await updatePassword(currentUser, dataUpdate.password);
    //     }
    //     console.log('update document')
    //     await updateFieldUserDocumentWithObject(currentUser.uid, 'users', {
    //         displayName: dataUpdate.displayName,
    //         description: dataUpdate.description,
    //        email: dataUpdate.email
    //     })
    // } catch (error: any) {
    //     console.log('error: ', error.code);
    // }