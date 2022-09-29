import { IUserData } from '@src/@types/__global__';
import { auth, db } from '@src/services/Firebase';
import { updateImages, updateInfomation, updateUserData, updateUserId } from '@src/services/Store/slices/userDataSlice';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IAuthProviderProps {
  children?: React.ReactNode;
}

const AuthContext = createContext<User | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FunctionComponent<IAuthProviderProps> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (result) => {
      setCurrentUser(result);
      if (!result) {
        localStorage.clear();
        dispatch(updateUserData(result));
        return;
      }
      const access_token = await result.getIdToken();
      localStorage.setItem('access_token', access_token);
      const docRef = doc(db, 'users', result.uid);
      onSnapshot(docRef, (snapshot) => {
        const data = snapshot.data() as IUserData;
        console.log('data information: ', data.information);
        dispatch(updateUserData(data));
        dispatch(updateImages(data.images));
        dispatch(updateInfomation(data.information));
        dispatch(updateUserId(result.uid));
      });
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
