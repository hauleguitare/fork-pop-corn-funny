import { IComment, IReactions, IReply, IUserData } from "@src/@types/__Firebase__";
import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "..";


export const updateFieldDocument = async (uid: string, keyDoc: keyof IUserData, path: string,  value: any) =>{
    const docRef = doc(db, 'users', uid);
    const snapshot = await getDoc(docRef);
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
        const docRef = doc(db, 'users', uid);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()){
            throw new Error("user don't have exists");
        }
        const data = snapshot.data() as IUserData;
        const snapshotImages = data.images;
        const images = {
            ...snapshotImages,
            [path]: value
        };
        await updateDoc(docRef, {images});
    } catch (error) {
        throw error;
    }
        
}



export const updateUserFieldInfomation = async (uid: string, information: IUserData['information']) => {
    try {
        const docRef = doc(db, 'users', uid);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()){
            throw new Error("user don't have exists");
        }
        await updateDoc(docRef, {information});        
    } catch (error) {
        throw error
    }
}



const MiddleWareReaction = (data: IReactions ,ReactionType: string ,type:'added' | 'removed' |'modified', sender_uid: string) => {
    if (type === 'added'){
        switch(ReactionType){
            case 'like': {
                const temp = data.reactions;
                temp.push({
                    type: 'like',
                    uid: sender_uid
                });
                return {
                    like_count: data.like_count + 1,
                    reactions: temp
                }
            }
            case 'dislike': {
                const temp = data.reactions;
                temp.push({
                    type: 'dislike',
                    uid: sender_uid
                });
                return {
                    dislike_count: data.dislike_count + 1,
                    reactions: temp
                }
            }
            case 'love':{
                const temp = data.reactions;
                temp.push({
                    type: 'love',
                    uid: sender_uid
                });
                return {
                    love_count: data.love_count + 1,
                    reactions: temp
                }
            }
               
            case 'sad':{
                const temp = data.reactions;
                temp.push({
                    type: 'sad',
                    uid: sender_uid
                });
                return {
                    sad_count: data.sad_count + 1,
                    reactions: temp
                }
            }
            default:
                return;
        }
    }
    else if (type === 'removed'){
        switch(ReactionType){
            case 'like': {
                const temp = data.reactions.filter((reaction) => reaction.uid !== sender_uid);
                return {
                    like_count: data.like_count - 1,
                    reactions: temp
                }
            }
            case 'dislike': {
                const temp = data.reactions.filter((reaction) => reaction.uid !== sender_uid);
                
                return {
                    dislike_count: data.dislike_count - 1,
                    reactions: temp
                }
            }
            case 'love':{
                const temp = data.reactions.filter((reaction) => reaction.uid !== sender_uid);
                return {
                    love_count: data.love_count - 1,
                    reactions: temp
                }
            }
               
            case 'sad':{
                const temp = data.reactions.filter((reaction) => reaction.uid !== sender_uid);
                return {
                    sad_count: data.sad_count - 1,
                    reactions: temp
                }
            }
            default:
                return;
        }
    }

    else if(type === 'modified'){
        
        switch(ReactionType){
            case 'like': {
                const tempCurrent = data.reactions;
                const currentReaction = tempCurrent.find((reaction) => reaction.uid === sender_uid);
                if (!currentReaction){
                    return
                }
                const currentType = currentReaction.type;
                const temp = data.reactions.map((reaction) =>{
                    if (reaction.uid === sender_uid){
                        const tempReaction = reaction;
                        tempReaction.type = 'like';
                        return tempReaction;
                    }else{
                        return reaction
                    }
                })
                return {
                    like_count: data.like_count + 1,
                    [`${currentType}_count`]: data[`${currentType}_count`] - 1,
                    reactions: temp
                }
            }

            case 'dislike': {
                const tempCurrent = data.reactions;
                const currentReaction = tempCurrent.find((reaction) => reaction.uid === sender_uid);
                if (!currentReaction){
                    return
                }
                const currentType = currentReaction.type;
                const temp = data.reactions.map((reaction) =>{
                    if (reaction.uid === sender_uid){
                        const tempReaction = reaction;
                        tempReaction.type = 'dislike';
                        return tempReaction;
                    }else{
                        return reaction
                    }
                })
                return {
                    dislike_count: data.dislike_count + 1,
                    [`${currentType}_count`]: data[`${currentType}_count`] - 1,
                    reactions: temp
                }
            }

            case 'love': {
                const tempCurrent = data.reactions;
                const currentReaction = tempCurrent.find((reaction) => reaction.uid === sender_uid);
                if (!currentReaction){
                    return
                }
                const currentType = currentReaction.type;
                const temp = data.reactions.map((reaction) =>{
                    if (reaction.uid === sender_uid){
                        const tempReaction = reaction;
                        tempReaction.type = 'love';
                        return tempReaction;
                    }else{
                        return reaction
                    }
                })
                return {
                    love_count: data.love_count + 1,
                    [`${currentType}_count`]: data[`${currentType}_count`] - 1,
                    reactions: temp
                }
            }


            case 'sad': {
                const tempCurrent = data.reactions;
                const currentReaction = tempCurrent.find((reaction) => reaction.uid === sender_uid);
                if (!currentReaction){
                    return
                }
                const currentType = currentReaction.type;
                const temp = data.reactions.map((reaction) =>{
                    if (reaction.uid === sender_uid){
                        const tempReaction = reaction;
                        tempReaction.type = 'sad';
                        return tempReaction;
                    }else{
                        return reaction
                    }
                })
                return {
                    sad_count: data.sad_count + 1,
                    [`${currentType}_count`]: data[`${currentType}_count`] - 1,
                    reactions: temp
                }
            }
            default:
            return;
        }
    }
}

export const createReactionField = async (media_type: string, movie_id: number, uid: string, ReactionType: string,reactionTo: string , referenceReplies?: boolean) => {
    try {
        // if as have ref, will map through replies to add reaction to in sub-collection of comment that
        if (referenceReplies){
            const rootCollectionRef = collection(db, 'replies');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async (doc) => {
                try {
                    const dataDoc = doc.data() as IReply;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType,'added', uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }else{
            const rootCollectionRef = collection(db, 'comments');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async(doc) => {
                try {
                    const dataDoc = doc.data() as IComment;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType,'added', uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }
    } catch (error) {
        throw error
    }
}

export const removeReactionField = async (media_type: string, movie_id: number, uid: string, ReactionType: string,reactionTo: string , referenceReplies?: boolean) =>{
    try {
        if (referenceReplies){
            const rootCollectionRef = collection(db, 'replies');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async (doc) => {
                try {
                    const dataDoc = doc.data() as IReply;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType,'removed', uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }else{
            const rootCollectionRef = collection(db, 'comments');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async(doc) => {
                try {
                    const dataDoc = doc.data() as IComment;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType,'removed', uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }
    } catch (error) {
        throw error
    }
}

export const updateReactionField = async (media_type: string, movie_id: number, uid: string, ReactionType: string,reactionTo: string , referenceReplies?: boolean) => {
    try {
        if (referenceReplies){
            const rootCollectionRef = collection(db, 'replies');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async (doc) => {
                try {
                    const dataDoc = doc.data() as IReply;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType,'modified' , uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }else{
            const rootCollectionRef = collection(db, 'comments');
            const q = query(collection(rootCollectionRef, media_type, movie_id.toString()));
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach(async(doc) => {
                try {
                    const dataDoc = doc.data() as IComment;
                    if (dataDoc.id === reactionTo){
                        const updateReactions = MiddleWareReaction(dataDoc, ReactionType,'modified', uid);
                        await updateDoc(doc.ref, {...updateReactions});
                    }
                } catch (error) {
                    throw error
                }
            })
        }
    } catch (error) {
        throw error
    }
}

export const updateContentCommentField = async (rootCollection: 'comments' | 'replies' ,media_type: string, movieId: number, comment_id: string, content: string) =>{
    try {
        const rootCollectionRef = collection(db, rootCollection);
        const q = query(collection(rootCollectionRef, media_type, movieId.toString()));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach(async (doc) => {
            try {
                const dataDoc = doc.data() as Pick<IComment, 'content' | 'id'>;
                if (dataDoc.id === comment_id){
                    await updateDoc(doc.ref, {content, isEdit: true});
                }
            } catch (error) {
                throw error
            }
        })
    } catch (error) {
        throw error
    }
}
