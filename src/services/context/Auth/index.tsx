import { IUserData } from '@src/@types/__Firebase__';
import { auth, db } from '@src/services/Firebase';
import { updateAuthenticateUser } from '@src/services/Store/slices/reAuthenticate';
import { updateUserData } from '@src/services/Store/slices/userDataSlice';
import { onAuthStateChanged, User } from 'firebase/auth';
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
        dispatch(updateUserData(null)); // Action update Data from database
        dispatch(updateAuthenticateUser(null)); // Action update Re-Authenticate when user using setting profile or future features required Re-Authentication
        return;
      }
      const access_token = await result.getIdToken();
      localStorage.setItem('access_token', access_token);
      const docRef = doc(db, 'users', result.uid);
      onSnapshot(docRef, (snapshot) => {
        const data = snapshot.data() as IUserData;
        dispatch(updateUserData(data));
      });
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
