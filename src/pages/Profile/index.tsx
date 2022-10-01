import ReAuthenticateField from '@src/components/ReAuthenticateField';
import { useAuth } from '@src/services/context/Auth';
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdvanceSetting from './components/AdvanceSetting';
import FormUpdate from './components/Form/FormUpdate';
import ProfileImage from './components/Image';

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const [access, setAccess] = React.useState(true);
  const [providerAccess, setProviderAccess] = React.useState(false);
  const auth = useAuth();
  React.useEffect(() => {
    if (auth) {
      setAccess(true);
      if (auth.providerData[0].providerId === 'password') {
        setProviderAccess(true);
      }
    } else {
      setAccess(false);
    }
  }, [auth]);

  const handleOnError = (error: any) => {
    if (!error) {
      toast.success('Authentication is successful, enjoy!');
    } else {
      toast.error(`Authentication is fail, please try again ${error}`);
    }
  };
  return (
    <div className="text-white">
      <ToastContainer autoClose={2000} />
      <ReAuthenticateField onError={handleOnError} />
      {/* <p>My account</p> */}
      <ProfileImage />
      <div className="mt-16 ml-2 text-white text-lg font-roboto">
        <span>Hau Le Trung</span>
      </div>
      {/* This setting I will try to separate from the component that can only be accessed when that person is the owner of this user */}
      <div className="mt-4 up-mobile:flex-row up-mobile:flex up-mobile:gap-4 up-mobile:justify-center container font-roboto">
        <div className="flex-grow up-mobile:max-w-[600px]">
          <span className="ml-2 text-xl font-roboto text-dark-smooth-text-default">Setting Profile</span>
          <FormUpdate access={access} providerAccess={providerAccess} auth={auth} />
        </div>
        {access && <AdvanceSetting auth={auth} />}
      </div>
    </div>
  );
};

export default ProfilePage;
