import { IUserData } from '@src/@types/__Firebase__';
import { db } from '@src/services/Firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import * as React from 'react';
import { useAuth } from '../Auth';

interface IUserDataProviderProps {
  children?: React.ReactNode;
}

const UserDataContext = React.createContext<IUserData | null>(null);

export const useUserData = () => {
  return React.useContext(UserDataContext);
};

const UserDataProvider: React.FunctionComponent<IUserDataProviderProps> = (props) => {
  const { children } = props;
  const auth = useAuth();
  const [userData, setUserData] = React.useState<IUserData | null>(null);
  React.useEffect(() => {
    if (!auth) {
      return;
    }
    const refDoc = doc(db, 'users', auth.uid);
    const unSubscribe = onSnapshot(refDoc, (snapshot) => {
      const data = snapshot.data() as IUserData;
      setUserData(data);
    });

    return () => unSubscribe();
  }, [auth]);
  return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};

export default UserDataProvider;
