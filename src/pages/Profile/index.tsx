import MotionChangePage from '@src/components/MotionChangePage';
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
  document.title = 'Profile page';
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionChangePage className="text-white">
      <ToastContainer autoClose={2000} />
      <ReAuthenticateField onError={handleOnError} />
      <ProfileImage />

      {/* This setting I will try to separate from the component that can only be accessed when that person is the owner of this user */}
      <div className="mt-4 up-mobile:flex-row up-mobile:flex up-mobile:gap-4 up-mobile:justify-center container font-roboto">
        <div className="flex-grow up-mobile:max-w-[600px]">
          <span className="ml-2 text-xl font-roboto text-dark-smooth-text-default">Profile</span>
          <FormUpdate access={access} providerAccess={providerAccess} auth={auth} />
        </div>
        {access && <AdvanceSetting auth={auth} />}
      </div>
    </MotionChangePage>
  );
};

export default ProfilePage;
