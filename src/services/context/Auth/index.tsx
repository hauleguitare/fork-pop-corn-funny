import { auth } from '@src/services/Firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (result) => {
      setCurrentUser(result);
      if (!result) {
        return;
      }
      const access_token = await result.getIdToken();
      localStorage.setItem('access_token', access_token);
    });
    return () => unSubscribe();
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
